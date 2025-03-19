---
title: How to get your LLM model to run and interpret R code
layout: default
category: rstats
published: TRUE
---

# How to get your LLM model to run and interpret R code

Tools let AI models run code and access other applications. This can be
a tool on your computer (like an R function), or access and API.

By creating tools you can give your LLM access to databases online (via
their APIs) or let them run code on your computer, interpret the output
and use it in their responses.

There are many ways to use tools. So far many tool examples are for
computer programmers. There are some generally useful tools out there
(like creating files or searching the web). However, I wanted to see if
I could make a tool that was specifically useful in my research field.

In this tutorial I’ll look at using them to get ocean data from a public database that has an API. 

## How tools work

The basic example of a tool is getting the current date and time. Then
when you ask for the time, instead of hallucinating a time and date, the
model can use a tool to get an accurate current time and date.

Tools are defined using a Model Context Protocol, which is a
standardized structure for connecting natural language models to
programmatic tools (which have all the normal programming rules like
being case-sensitive, syntax appropriate to the language etc).

Its hard to find clear explanations of how they work, but here’s what I
understand:

The tool is ‘registered’ with the model. This registering is just a
prompt to the model, but it is done with a specific structure that
defines the tool, its parameters, outputs and use cases. This way the
model knows how to write code to run the tool.

Then when you chat with the model it might interpret that tool use would
be helpful. Like if you ask the time and it ‘knows’ about a time-date
tool, it might use it. It writes the appropriate code to use the tool,
sends that back to your computer (or to the API), where the code is
evaluated. The output is then sent back to the model. The model
interprets this into the final response it will give you.

[There’s a good example of how tools don’t work and do work in the
ellmer
documentation.](https://ellmer.tidyverse.org/articles/tool-calling.html)

Let’s try a more interesting tool than the usual example of getting date
and time.

## Use case

[The `remora` package lets you extract ocean data from the IMOS BlueLink
database](https://imos-animaltracking.github.io/remora/index.html). We
can give an LLM access to this data by creating a tool that uses
`remora` to extract the data.

## remora

We’ll start by making some data and testing out `remora`. [Note that
`remora` isn’t on cran, so you will need to install it from
github.](https://imos-animaltracking.github.io/remora/index.html)

What we do below is download ocean temperatures for some made up data.
We just need coordinates and dates.

[For a more detailed example see the remora
documentation](https://imos-animaltracking.github.io/remora/articles/extractBlue.html)

    library(remora)
    library(tidyverse)
    library(raster)

    # Create a dataframe of coordinates near Tasmania with different dates in 2021
    tas_dat <- data.frame(
      datetime = ymd_hms(paste(
            c("2021-02-15", "2021-02-15", "2021-02-15", 
                       "2021-02-15", "2021-02-15"),
                       "10:00:00")),
      X = c(147.2, 148.5, 146.8, 145.3, 144.7),  # Longitudes around Tasmania
      Y = c(-42.5, -41.8, -43.2, -42.9, -41.5)
    )
    write.csv(tas_dat, "tas_dat.csv", row.names = FALSE)

Extracting the SST data at a given depth is simple:

    tas_temp <- 
        extractBlue(df = tas_dat,
                    X = "X", 
                    Y = "Y", 
                    datetime = "datetime", 
                    env_var = "BRAN_temp",
                    extract_depth = 30,
                    verbose = TRUE,
                    full_timeperiod = FALSE)

## Defining the tool

Now we know how to use `remora` to get the data, we can define a tool so
the LLM can do it.

We’ll use the `ellmer` package to define the tool. First step is to make
a function.

The `ellmer` documentation recommends you keep the function inputs and
outputs simple. First of all, LLMs can’t handle complex R data
structures (like complex lists). Second, the LLM will be consuming the
inputs and outputs. This means it uses tokens, which cost you $ and use
up the model’s context window (capacity for prompts).

So you don’t want to have gigabytes of data going into or out of the
tool.

To get around this I’ve defined a tool that takes a path and write a
file. That way the LLM doesn’t ‘see’ the data, it only sees the input
and output paths and my depth request.

    #' Extracts SST data from the IMOS BlueLink database
    #'
    #' @param data_path A path to a csv dataframe
    #' @param depth The depth to extract the SST data from
    #' @return The current time in the given time zone.
    get_sst <- function(data_path, depth) {
      dat <- read.csv(data_path)
      datout <- extractBlue(df = dat,
                    X = "X", 
                    Y = "Y", 
                    datetime = "datetime", 
                    env_var = "BRAN_temp",
                    extract_depth = depth,
                    verbose = FALSE,
                    full_timeperiod = FALSE)
      write.csv(datout, "temp_data.csv", row.names = FALSE)
      return("File written to sst_data.csv")
    }

Now just test the function works:

    get_sst("tas_dat.csv", 30)

The `ellmer` package has a `create_tool_def` that semi-automates the
next step based on the roxygen documentation I wrote above the function.
However, this currently seems only to work if you have an openAI API
key.

## Register the tool with a chat

Start a new chat:

    library(ellmer)
    chat <- chat_claude(
      model = "claude-3-5-haiku-20241022", 
      max_tokens = 1000
    )

(You should probably use a strong logic model, like sonnet or GPT4.0 for
tool use, but haiku worked fine for this simple one).

Now we register the tool with the chat:

    mytool <- tool(
      get_sst,
      "Gets SST data from the IMOS BlueLink database",
      data_path = type_string(
        "Path to a csv dataframe that has columns datetime, X, Y",
        required = TRUE
      ),
      depth = type_number(
        "The depth to extract the SST data from",
        required = TRUE
      )
    )

    chat$register_tool(mytool)

Note the careful documentation of the tool. This is going to become
prompts for the model, so use all your normal prompt strategies to help
it figure out when to use the tool .

We also use the `type_xxx` functions from `ellmer` to define the types
of the inputs. This is important to ensure the model knows how to
properly write the code for the tool use.

## Using the tool

This is the easy bit:

    chat$chat("Can you get me SST data at 21m depth for the coordinates in tas_dat.csv?")

If that works for you (as it did for me) you should have a new csv file
in your working directory with the SST data.

## Conclusion

With a little bit of code you can give your LLM prompts and responses
new types of capabilities.

My simple example could be improved by adding more parameters into the
function and adding error checking and reports.

If we wanted to keep going we could create an analysis tool that then
analyses the data from file, makes the plots, and so on.

Tool definitions are based on function documentation. This means you can
take any existing R function and easily turn it into a tool.

You do want to be careful about how much and the types of data that go
into tools. There are obviously security concerns (what if the model
created malicious code?) as well as privacy concerns if you are working
with sensitive data.

API costs could also blow up. `ellmer` provides a function
`token_usage()`, to help you keep track of spending.

Overall, I was excited at how easy it was to make a tool with
interesting applications in my field of ocean sciences.

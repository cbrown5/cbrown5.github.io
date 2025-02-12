---
title: How to use large language models to assist in systematic literature reviews
layout: default
category: rstats
published: TRUE
---

# How to use large language models to assist in systematic literature reviews


In the near future, we will all be doing systematic lit reviews by
getting LLMs to gather data from papers. Below is an example of how to
extract text data from a study. Once you can interact with LLM from R,
you can then batch process many documents to turn text into structured
data.

TLDR; Developing a data extraction workflow is hard work. The
development of prompts, data extraction and data cleaning is time
consuming and requires thought. So it will still take work to do a
systematic review. I’d also recommend you manually check results so that
you still learn something yourself and to correct errors.

I’ll also mention that papers are coming out now testing this idea,
e.g. this one shows the [AI’s results can be accurate, but only for some
types of requests](https://www.nature.com/articles/s44185-024-00043-9).
The supplemental code for that paper also has helpful guidance.

We’ll need a few R skills to extract data from papers for lit reviews:

1.  How to interact with LLMs through APIs from R
2.  How to handle pdf docments and extract text from them
3.  How to clean up semi-structured text data and turn it into
    structured data.
4.  How to batch process.

I’ll mainly focus on step 1 here. Step 2 is possible, by can be finniky
and depend on how the pdf is formated. Step 3 is pretty straightforward
with a package like `stringr`. Step 4 is just looping with whatever
framework you prefer for that (e.g. for loops or purrr).

This blog deals with only one type of application of LLMs to lit
reviews, that is maybe the most straightforward and cheapest. There are
other ways to use them to write syntheses or discover research trends,
such as finetuning models on a large corpus of papers.

### Setting up your API access

API = application programming interface. This is a way to interact with
a service (the LLM provider) via R.

First you will need to go to your LLM provider of choice (here I’m using
anthropic) and get an API key. This will require you to register and
then buy some credits. You will per charged per token (fragment of a
word) that you use.

I’ve started out with 25USD which seems to be sufficient for testing.
I’ve got no idea yet how much it will cost to do a full systematic lit
review with 100s of papers.

Now get your API key. Keep this secret its like a password. Also you can
only view it once, so you’ll need to save it, e.g. in a password
manager.

### Using the API key in R

I’m using the `dotenv` package to help manage API. First, make sure
`.env` is in your `.gitignore` file. This way you can’t inadvertently
share your key with the world.

Now create a file in a text editor (e.g. Rstudio or VSCode) called
`.env`. Put this is your project folder.

The file will look like this:

    ANTHROPIC_KEY="your_api_key_here"

Be sure to hit enter after the last line.

Now you can use the `dotenv` package to load the key into your R
session. [This blog has good advice on managing
secrets](https://www.r-bloggers.com/2018/08/structuring-r-projects/)

    dotenv::load_dot_env('.env')

Check it worked to load the key:

    Sys.getenv("ANTHROPIC_KEY")

This should print your key.

## Interacting with the API from R

Now you are ready to use the API. There are quite a few packages that
can help you do this. I’m going to use the new `tidychatmodels` package,
because I like its syntax (its like tidymodels).

[Install instructions are
here](https://albert-rapp.de/posts/20_tidychatmodels/20_tidychatmodels)
(its not on cran as of writing) and [here is a nice example of how to
use LLMs with
pdfs](https://albert-rapp.de/posts/21_pdf_extraction/21_pdf_extraction),
which helped me greatly with writing this blog.

    library(tidyverse)
    library(tidychatmodels)

Now start building the instructions to send to the API. tidychatmodels
does this step by step with pipes. So we are going to build up a
sequence of commands. In the final step we’ll send it to the API.

    newchat <- create_chat("anthropic", 
        api_key = Sys.getenv("ANTHROPIC_KEY"),
        api_version = '2023-06-01')

Here I’m using ‘anthropic’, but there are others e.g. openai and
mistral.

Now add a model. I got the model name on the [APIs
webpage](https://docs.anthropic.com/en/docs/about-claude/models)

Model choice is dictated by speed, cost and the type of task you want to
do. Do some research to optimise this.

I’m also setting the temperature to control the level of creativitiy in
the output, lower values = less creative. max\_tokens controls the
length of the output.

    newchat <- add_model(newchat, "claude-3-5-haiku-20241022") |>
          add_params('temperature' = 0.2, max_tokens = 800) 

## Prompting through the API

Let’s do a test run. I’ll create some text

    newchat <- newchat |>
      add_message(
        role = 'user',
        message = 'You are a funky dude who loves writing online R lessons.
        Write a paragraph about loading dataframes in R. '
      ) 

Now we’re ready to hit the dance floor. This is the bit where we
actually ask the LLM to do something. It is also the bit that costs
money….

    newchat <- newchat |>
        perform_chat()
    responses <- newchat |> extract_chat()

So the first time I ran this I got a ‘400’ error. Turns out the
‘max\_tokens’ parameter was essential to set. This parameter controls
the length of output. Longer outputs cost more (you’re charged per
token).

Error in `httr2::req_perform()`: ! HTTP 400 Bad Request. Backtrace: 1.
tidychatmodels::perform\_chat(newchat) 5.
httr2::req\_perform(prepared\_engine)

## Roles

Most LLMs have different roles, often a ‘user’ and a ‘system’ role.
These give you more precise control over the LLM’s output. There is
great advice from vendors on how to use these roles, e.g.  with
(anthropic)\[<https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts#legal-contract-analysis-with-role-prompting>\]

Setting a system role controls how the LLM behaves. People use these to
make the AI act like a certain character, such as a research assistant.
Let’s see it in action.

Prompting is like programming, but less precise (annoyingly for me, who
likes programming and things to be exact!). Good prompts will tend to
get you better results. But of course, as with all deep learning,
outcomes have an element of randomness, so can be inconsistent.

    base_settings <- create_chat("anthropic", 
        api_key = Sys.getenv("ANTHROPIC_KEY"),
        api_version = '2023-06-01') |> 
        add_model("claude-3-5-haiku-20241022") |>
        add_params('temperature' = 0.8, max_tokens = 100) 

    newchat <- base_settings |>
      add_message(
        role = 'system',
        message = 'You are a funky dude who loves writing online R lessons.'
      ) |> 
      add_message(
        #defaults to 'user' role
        message = 'Write a paragraph about loading dataframes in R. ') |>
        perform_chat() 

    extract_chat(newchat)

Ok, so the system role didn’t work very well in this case. To get the
‘funky dude’ output you need to put that into the user role.

Now let’s look at doing this for a real paper.

## Extracting text from a pdf

I’m going to use my [recent paper on turtle mortality as an example,
becuase I know it well](https://doi.org/10.1111/conl.13056) and the file
size isn’t too large.

Now we can use the pdftools package to read in the text from file. You
could also try reading this directly from the web as HTML, which might
allow you to identify particular sections, or data in tables, more
effectively (by using html tags).

Just note that making repeat requests for html pages might get you
temporarily blocked from the publisher’s server.

    library(pdftools)
    text <- pdf_text("data/Brown_etal2024 national scale turtle mortality.pdf")

Now doing the above failed to work, I got that darn 400 error again when
I sent it to the API. The issue seemed to be in the formatting of the
text. So I can get on with the next step, I’ve just cut and paste the
text into a text file. Clearly the cleaning up of pdfs/html for use will
be a big part of this process. (like all modelling, data cleaning
usually takes up most of the time).

    methods_text <- readLines("data/example-text.txt") |>
        paste(collapse = " ")

## Sending text to the LLM

Now we have our text we can send it to the LLM.

    newchat <- base_settings |>
        add_params('temperature' = 0.2, max_tokens = 600) |> 
        add_message(
        role = 'system',
        message = "You are a research assistant who has been asked to summarise the methods section of a paper on turtle mortality.
        You will extract key statistics on:
        Sample size: << Insert sample size here>>
        Year of the study: << Insert year here>>
        DONT EXTRACT ANY MORE INFORMATION BEYOND THIS POINT.
        "
      ) |> 
         add_message(
             message = methods_text
        ) |>
      perform_chat()

    extract_chat(newchat)

The prompt is key here. In the system role we’ve told it to extract the
data in a structured way. I also included ‘DONT EXTRACT ANY MORE
INFORMATION BEYOND THIS POINT.’ to prevent it from continuing to talk.
Using caps emphasises the point to the AI.

Here’s the output:

> Based on the methods section, here are the key statistics: Sample
> size: 357 sets (electronic monitoring) for large-scale longline
> fishery (LLF) Year of the study: 2018

Here’s the output without the final part in caps:

> Assistant: Based on the methods section, here are the key statistics:
> Sample size: - For Small-Scale Fisheries (SSF): Monitored catches from
> 10 communities across 8 of 9 provinces - For Large-Longline Fisheries
> (LLF): 357 sets reviewed, spanning from 2018-01-24 to 2019-08-17 -
> Total catch events for LLF: 25,403 catch events - Electronic
> monitoring deployed on 7 vessels Year of the study: 2018 (primary year
> of data collection) Additional notable details: - Used non-parametric
> bootstrapping for scaling up and estimating confidence intervals -
> Monitoring methods involved trained community members and electronic
> monitoring systems - Video review of LLF data took 0.5 to 2 days per
> set - Used three different methods to scale up turtle catch for LLF to
> account for variability

This is all very accurate, but includes too much ‘additional details’.
However, it does get more of the methods details with regards to the
various sample sizes for different parts of the study.

Let’s get the output text:

    chatout <- extract_chat(newchat)
    output <- chatout[chatout$role == 'assistant', 'message']

For repeatability just for the blog I’m hard coding that

    output <- data.frame(message = "Based on the methods section, here are the key statistics:\n\nSample size: 357 sets (electronic monitoring) for large-scale longline fishery (LLF)\nYear of the study: 2018")

## Turn text into structured data

Our data is semi structured by the way we did the prompt. Now we want to
put the sample size and year into data fields.

I’m using `separate_wider_delim` to first seperate out the first
paragraph that had two breaks ‘’, then again to split the sample size
and year into columns (they were seperated by ‘’).

Finally, str\_remove\_all gets rid of the ‘Sample size:’ and ‘Year of
the study:’ text.

    library(stringr)

    cleaned_output <- output |> 
      separate_wider_delim(
        cols = message, 
        delim = '\n\n',
        names = c('response', 'stats')
      ) |> 
    separate_wider_delim(
        cols = stats, 
        delim = '\n',
        names = c('sample_size', 'year')
    ) |> 
      mutate(
        across(
          sample_size:year,
          \(x) str_remove_all(
            x, 
            'Sample size: |Year of the study: '
          )
        ))

So now we can easily get our variables (sort of)

    cleaned_output$sample_size
    cleaned_output$year

## Reflections on challenges and next steps for automating data extraction

### Cost uncertainty

This should be cheap. It cost &lt;1c to make this post with all the
testing. So in theory you could do 100s of methods sections for
&lt;100USD. However, if you are testing back and forwards a lot or using
full papers the cost could add up. It will be hard to estimate this
until people get more experience.

### Obtaining the papers and dealing with unstructued text in PDFs or HTML

A big challenge will be getting the text into a format that the LLM can
use. Then there are issues like obtaining the text. Downloading pdfs is
time consuming and data intensive. Trying to read text data from
webpages can also be hard, due to paywalls and rate limits (you might
get blocked for making reqeat requests).

For instance, [in a past study we did where we did simple ‘bag of words
analysis’](https://onlinelibrary.wiley.com/doi/full/10.1111/brv.12344?casa_token=LVnFzoFBBU8AAAAA%3AcsyopYDWDBRZN7y2JL7eHYxzqayxu2GvKB-7gdEYkdeZSi5p5o1oXTwj49FqwBJz-IpPS6wxJ_SX0h2f)
we either downloaded the pdfs manually, or set timers to delay web hits
and avoid getting blocked.

HTML format would be ideal, because the tags mean the sections of the
paper, and the figures already semi-structured.

### Prompting

Need to experiment with this to get it right. It might also be good to
repeat prompt the same text to triangulate accurate results.

### LLM text output cleaning

In my simple example this was easy. However, with a large number of
prompts and papers the LLM responses might have more variability that
needs to be dealt with, e.g. will it always use one line break between
my data questions? You can help control this issue by asking it to
structure output in xml or JSON format, which is easier to then parse
into data sheets.

### The data still isn’t data and requires interpretation

You can see from my simple examples above that the output can’t be
plotted direclty. In fact, it requires more interpretation. The sample
size was given as ‘357 sets (electronic monitoring) for large-scale
longline fishery (LLF)’. So is it 357? Are there other sample sizes that
might be relevant?

### Validation

You’ll definitely want to manually check the output and report accuracy
statistics in your study. So maybe your review has 1000 papers, you’ll
want to manually check 100 of them to see how accurate the LLM was.

### You’ll still need to read a lot of papers to write a good lit review

A lit review is more than the systematic data. I still believe you need
to read a lot of papers in order to understand the literature and make a
useful synthesis. If you just use AI you’re vulnerable to the [‘illusion
of understanding’](https://www.nature.com/articles/s41586-024-07146-0).

### Conclusion

This tool will be best for well defined tasks and consistently written
papers. For instance, an ideal use case would be reviewing 500 ocean
acidification papers that all used similar experimental designs and
terminology. You’ll then be able to get consistent answers to prompts
about sample size etc…

Another good use case would be to extract model types from species
distribution model papers.

Harder tasks will be where the papers are from diverse disciplines, or
use inconsistent terminology, or methods. My study was a good example of
that, there were about 5 different sample sizes reported. So in this
example we’d need first to think clearly about what sample size you
wanted to extract before writing the prompt.

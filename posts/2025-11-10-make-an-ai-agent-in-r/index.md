---
date: '11/10/2025'
title: Its easy to make your own AI agent in R 
categories: [rstats, genAI]
published: true
---
 
There’s a lot of hype about AI agents, but buried under the hype there is a really simple architecture. I got inspired by [this post that points out how easy it is to make an AI agent](https://fly.io/blog/everyone-write-an-agent/).

In this post I’ll show how to make an agent in R with the [`ellmer` package](https://ellmer.tidyverse.org/).

A large language model agent is a [large language models that can run tools in a loop](https://simonwillison.net/2025/Sep/18/agents/).

Tools give the agent powers to take actions like read data, create files, access the internet. Anything software task you can think of really.

Here’s the cool thing, the ‘run tools in a loop’ architecture is simple. Building an AI (the LLM) is really complex and super expensive (like cost of $100 millions). But you can easily get access to 100s of these LLMs cheaply via API calls. Then its easy to plug them into DIY agents.

The simplicity means you can create just about anything you can dream up.

Let’s make an agent that reads R help files. A chat agent could give better advice if it read the up-to-date R help files first.

## Chatting with LLMs from Rs

``` r
library(ellmer)
```

Set up an [API key with the provider](https://www.seascapemodels.org/AI-assistants-for-scientific-coding/03-set-up.html#sec-apikeys) you choose and you can easily talk to a large language model with ellmer:

``` r
chat <- chat_anthropic(model = "claude-haiku-4-5")
chat$chat("How do I do a regression in R?")
```

We can then string together a chat:

``` r
chat <- chat_anthropic(model = "claude-haiku-4-5")
turn1 <- chat$chat("How do I do a regression in R?")
turn2 <- chat$chat("Show how to verify the model.")
```

The way a multi-turn conversation works is that on the second turn the entire conversation thread (system message, user message, assistant message, new user message) is sent back to the LLM at each turn.

Repeated calls to `chat` just manage that for us.

The LLM talking to itself isn’t very useful, we can use tools to inject new information into the conversation.

## Create a tool to read a help file

The tool has two parts: (1) An R script that does something; (2) a specification that tells the LLM how to use the tool.

### R function

``` r
read_help_as_text <- function(topic, pkg = NULL) {
    h <- utils::help(topic, package = eval(pkg))
    if (length(h) == 0) stop("Help topic not found")
    rd <- utils:::.getHelpFile(h)             
    txt <- paste(capture.output(tools::Rd2txt(rd)), collapse = "\n")
    return(txt)
}
```

This R function takes a topic and optionally a package name. It then returns the relevant help file as a string

``` r
help_txt <- read_help_as_text("lm")
cat(substr(help_txt, 1, 1000), "\n") 
```

### Tool definition

The tool definition tells the LLM how to use the read_help_as_text tool.

``` r
read_help_as_text <- tool(
  read_help_as_text,
  .description = "Returns an R help file as a string",
  topic = type_string(
      "R function or topic",
      required = TRUE
    ),
    pkg = type_string(
      "R package to get help file from",
      required = FALSE
    )
)
```

### Using the tool

``` r
chat <- chat_anthropic(model = "claude-haiku-4-5")
chat$register_tool(read_help_as_text)

chat$chat("Quote the definition of residuals from the lm() function, don't provide any other explanation or code")
```

    "residuals: the residuals, that is response minus fitted values."

That’s a pointless use case, but it demonstrates the tool is working. You can check the chat log to see when the tool was called:

``` r
chat
```

    <Chat Anthropic/claude-haiku-4-5 turns=4 tokens=4529/77>
    ── user [626] ──────────────────────────────────────────────────────────────────
    Quote the definition of residuals from the lm() function, don't provide any other explanation or code
    ── assistant [59] ──────────────────────────────────────────────────────────────
    [tool request (toolu_)]: read_help_as_text(topic = "lm")
    ── user [3218] ─────────────────────────────────────────────────────────────────
    [tool result  (toolu_)]:
    ...
         
    ── assistant [18] ──────────────────────────────────────────────────────────────
    "residuals: the residuals, that is response minus fitted values."

## Getting advice on recent packages

LLMs often get tripped up if you ask them for code for niche or very recent packages. The [`FakeDataR` package](https://zobaer09.github.io/FakeDataR/) is a recently released package that helps you make synthetic data to use with LLMs (if you are concerned about privacy of your real data).

If you ask an LLM to use this package, it will tend to hallucinate a response, that won’t work. With our tool however, it can create accurate code:

``` r
chat <- chat_anthropic(model = "claude-haiku-4-5")
chat$register_tool(read_help_as_text)

chat$chat("How to use the generate_fake_data function from the R package FakeDataR to make a synthetic copy of mtcars")
```

    I'll help you find information about the `generate_fake_data` function from the
    FakeDataR package.

    ◯ [tool call] read_help_as_text(pkg = "FakeDataR", topic =
    "generate_fake_data")
    ...

    Great! Now I can show you how to use `generate_fake_data` to create a synthetic
    copy of the `mtcars` dataset. Here's how to do it:

    ## Basic Usage

    ```r
    # Install FakeDataR if you haven't already
    # install.packages("FakeDataR")

    library(FakeDataR)

    # Generate synthetic data from mtcars
    synthetic_mtcars <- generate_fake_data(
      data = mtcars,
      n = 32  # Create same number of rows as original mtcars
    )

    # View the result
    head(synthetic_mtcars)
    ```

    ## More Detailed Examples
    ...
    The resulting synthetic dataset preserves the structure and statistical 
    properties of the original while being completely artificial!

## Creating an agentic loop

Let’s add one more tool to show how they can be chained together to build the beginnings of an agentic loop.

This tool will grab the R code from the markdown code blocks in the LLMs response, then write it to a file.

First the function definition:

``` r
write_r_code <- function(rcode){
    code_blocks <- stringr::str_extract_all(rcode, "```r\\s*([\\s\\S]*?)```")[[1]]
    code <- paste(stringr::str_replace_all(code_blocks, "```r\\s*|```", ""), collapse = "\n")
    writeLines(code, con = "temp_code.R")
    return("R code written to temp_code.R")
}
```

Now the tool definition:

``` r
write_r_code <- tool(
  write_r_code,
  .description = "Writes R code contained in markdown code blocks to a file.",
  rcode = type_string(
      "Character string containing R code in markdown code blocks",
      required = TRUE
    )
)
```

Now we just register both tools and start our chat.

``` r
chat <- chat_anthropic(model =  "claude-haiku-4-5")
chat$register_tool(read_help_as_text)
chat$register_tool(write_r_code)

chat_out <- chat$chat("Use generate_fake_data function from the R package FakeDataR to make a single synthetic version of mtcars. ")
```

`ellmer` will pass the results of the tool call back to the LLM, which can decide to call more tools if needed. Inspecting the chat log shows the sequence of tool calls, with no user intervention required.

## Tuning agents

The write R code tool worked, some of the time… Other times it wrote a blank file. There’s a lot of niggly details to making agents work reliably, including choosing a powerful enough LLM, writing a system prompt that guides tool use, and writing powerful but secure tools.

If I was going to take this example further I could add a function to run the Rscript that was created, that might require some extra security considerations (see below for one example).

Going further I would also work on system prompt that provided guidance to the LLM on its role and how to approach problems. There’s many open source system prompts out there that I could draw on to create this.

## Conclusion

Its an exciting time to be working on AI agents. The field is so new you can easily make new discoveries and be ahead of even world leading AI labs.

An example. Scott Spillias, a postdoc at CSIRO, developed an agent framework that uses an evolutionary algorithm to write math to [create ecosystem models](https://www.biorxiv.org/content/10.1101/2025.07.14.664628v1.abstract). He showed the agent could create models that are great at predicting out-of-sample data, and that have biologically meaningful parameters.

A month or so after he published his pre-print, the Google DeepMind team published a similar idea of using LLM evolutionary algorithms to generate scientific models.

I look forwards to seeing what the R community creates with agents.

## Example of using tool_reject for user permission

Check out `?tool_reject` for a way to require user permission before tools are used. Here’s how to implement that in our `write_r_code` function.

``` r
write_r_code <- function(rcode){
  allow_read <- utils::askYesNo(
    "Would you like to allow access to write files?"
  )
  if (isTRUE(allow_read)) {
    code_blocks <- stringr::str_extract_all(rcode, "```r\\s*([\\s\\S]*?)```")[[1]]
    code <- paste(stringr::str_replace_all(code_blocks, "```r\\s*|```", ""), collapse = "\n")
    writeLines(code, con = "temp_code.R")
    return("R code written to temp_code.R")
  } else {
    tool_reject()
  } 
}
```

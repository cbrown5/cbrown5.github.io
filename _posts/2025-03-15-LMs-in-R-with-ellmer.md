---
title: The ellmer package for using LLMs with R is a game changer for scientists
layout: default
category: rstats
published: TRUE
---

# The ellmer package for using LLMs with R is a game changer for scientists

## Why is ellmer a game changer for scientists? 

In this tutorial we'll look at how we can access LLM agents 
through API calls. We'll use this skill for created structued data from documents. 

We'll use the R [`ellmer` package](https://ellmer.tidyverse.org/index.html) (launched 25th Feb 2025). 

There are a few package options [(I was also using 
`tidychatmodels` before)](https://www.seascapemodels.org/rstats/2025/02/12/LLMs-for-literature-reviews.html). 

`ellmer` is a game changer for scientists using R: It supports tool use and has 
functions for structured data. 

Before `ellmer` you had to know other languages and data-structures, like JSON. 
Ellmer means that many powerful LLM uses are now easily accessible to R users.

Tool use means the LLM can run commands on your computer to retrieve information. 
You know how LLMs can be bad at simple math like 2+2 or today's date? 
Well, with a tool, the LLM would know to use R to calculate this to return
the correct answer. Tools can also connect to web APIs, means they 
can also be used to retrieve information or databases from the web.

The functions that assist you in creating structured data from text are also 
important. 

For instance, by combining tool use with structured data extraction, `ellmer`
could be used to synthesize literature for a quantitative review. We'll cover that here. 

Another application would be to interpret the meta-data from an online database, 
download the data, write and run the analysis and then write up the findings. 

Because you are running the LLM from R it means you can batch process prompts, such
as asking it to summarize many documents.

They are a couple of obvious uses. I'm sure people will soon come up with
many more.

Let's see how to use ellmer to extract structured data from peer reviewed studies. 

### Setup authorisation

First, you need to get an API key from the provider. Login to the provider's website and
follow the instructions. 

Then, you need to add the key to your `.Renviron` file: 

`usethis::edit_r_environ()`

Then type in  your key like this:

`ANTHROPIC_API_KEY="xxxxxx"`

Then restart R. `ellmer` will automatically find your key so long as you use the recommended envirment variable names. 
See `?ellmer::chat_claude` (or `chat_xxx` where xxx is whatever provider you are using). 

### Interactive chat 

Posit recommends this is useful for experimenting with new prompts. It can also be better
than the web interfaces you might be used to. This is because, unlike on the web interfaces, 
you can control the system message. 

Most models have three types of messages:

**system**, which sets the context, role and is given higher priority than the user message

**user**, which is your conversation or request

**assistant**, which is the model's response

Many prompt engineer pros have found better results if you put as much of your request in the
system as possible. So I recommend you play around with this yourself. 

```
library(ellmer)

chat <- chat_claude(
  system_prompt = "You are a friendly but terse assistant.",
  model = "claude-3-5-haiku-20241022", 
  max_tokens = 1000
)

live_console(chat)
live_browser(chat)
```

Try this but experiment with a new system prompts. Here's an example, try your own. 

```
chat <- chat_claude(
  system_prompt = "You are a mystic with expertise in R programming. You answer questions indirectly in riddles and rhymes.",
  model = "claude-3-5-haiku-20241022", 
  max_tokens = 1000
)

live_console(chat)
```

>User: how can I do a glm in R?

```
*Swirling mystical orb glows with R code*

Through statistics' mist, a model takes flight,
glm() is the spell to cast in the night,
With family bound, be it gaussian or more,
And formula written as y ~ x4.
...
```

### Programmatically generate content

So once you've tested your prompt you can run it like this: 

```
chat <- chat_claude(
  system_prompt = "You are a surfy dude who likes waves, tubes and statistics.",
  model = "claude-3-5-haiku-20241022", 
  max_tokens = 1000
)

chat$chat("How can I do a glm in R?")
```

'... Hang ten with your statistical surfboard! 🏄‍♂️📊'

That was cheesy... 

## Example: Clean pdfs text and summarize

Now let's see if we can use `ellmer` to clean up some text from a pdf and summarize it. `ellmer`
has some handy functions for processing pdfs to text, so they can then be fed into prompts. 

I'm going to attempt to summarize my [recent paper on turtle fishing](https://conbio.onlinelibrary.wiley.com/doi/10.1111/conl.13056). 

```
x <- content_pdf_url("https://conbio.onlinelibrary.wiley.com/doi/epdf/10.1111/conl.13056")
```

This fails with a 403 error. This means the server is blocking the request, it probably guesses
(correctly) that I'm calling the pdf programmatically: it thinks I'm a bot (which this tutorial kind of is creating). 

We can also try with a file on our hard drive, we just have to manually download the pdf. 

```
mypdf <- content_pdf_file("pdf-examples/Brown_etal2024 national scale turtle mortality.pdf")
```

That works, now let's use it within a chat. First set-up our chat: 

```
chat <- chat_claude(
  system_prompt = "You are a research assistant who specializes in extracting structured data from scientific papers.",
  model = "claude-3-5-haiku-20241022", 
  max_tokens = 1000
)

```

Now, we can use ellmer's functions for specifying structured data. Many LLMs can be used 
to generate data in the JSON format (they were specifically trained with that in mind).

`ellmer` handles the conversion from JSON to R objects that are easier for us R users to understand.

You use the `type_object` then `type_number`, `type_string` etc.. to specify the 
types of data. [Read more in the ellmer package vignettes](https://ellmer.tidyverse.org/articles/structured-data.html)

```
paper_stats <- type_object(
  sample_size = type_number("Sample size of the study"),
  year_of_study = type_number("Year data was collected"),
  method = type_string("Summary of statistical method, one paragraph max")
)

```

Finally, we send the request for a summary to the provider: 

```
turtle_study <- chat$extract_data(mypdf, type = paper_stats)
```

The `turtle_study` object will contain the structured data from the pdf. I *think*
(the ellmer documentation is a bit sparse on implementation details) ellmer is converting 
a JSON that comes from the LLM to a friendly R list. 

```
class(turtle_study)
#list
```

And: 

```
turtle_study$sample_size
#11935
turtle_study$year_of_study
#2018
turtle_study$method
#The study estimated national-scale turtle catches for two fisheries in the Solomon Islands 
#- a small-scale reef fishery and a tuna longline fishery - using community surveys and 
#electronic monitoring. The researchers used nonparametric bootstrapping to scale up 
#catch data and calculate national-level estimates with confidence intervals.
```

It works, but like any structured lit review you need to be careful what questions you ask.
Even more so with an LLM as you are not reading the paper and understanding the context. 

In this case the sample size its given us is the estimated number of turtles caught. This 
was a model output, not a sample size. In fact this paper has several methods with 
different sample sizes. So some work would be needed to fine-tune the prompt, especially
if you are batch processing many papers.

You should also experiment with models, I used Claude haiku because its cheap, but Claude sonnet would
probably be more accurate. 

## Batch processing prompts

Let's try this with a batch of papers (here I'll just use two). For this example I'll just use
two abstracts, which I've obtained as plain text. The first is from [another study on turtle catch
in Madagascar](https://zslpublications.onlinelibrary.wiley.com/doi/10.1111/j.1469-1795.2010.00413.x).
 The second is from my study above. 

What we'll do is create a function that reads in the text, then passes it to the LLM, using
the request for structured data from above. 

```
  process_abstract <- function(file_path, chat) {
  # Read in the text file
  abstract_text <- readLines(file_path, warn = FALSE)
  
  # Extract data from the abstract
  result <- chat$extract_data(abstract_text, type = paper_stats)
  
  return(result)
}
```

Now set-up our chat and data request

```
# Create chat object if not already created
chat <- chat_claude(
      system_prompt = "You are a research assistant who specializes in extracting structured data from scientific papers.",
      model = "claude-3-5-haiku-20241022", 
      max_tokens = 1000
)
```

There's a risk that the LLM will hallucinate data if it can't find an answer. To 
try to prevent this we can set an option , required = FALSE. Then the LLM should
return 'NULL' if it can't find the data.

```
# Define the structured data format
paper_stats <- type_object(
    sample_size = type_number("Number of surveys conducted to estimate turtle catch", required = FALSE),
    turtles_caught = type_number("Estimate for number of turtles caught", required = FALSE),
    year_of_study = type_number("Year data was collected", required = FALSE),
    region = type_string("Country or geographic region of the study", required = FALSE)
  )
```

Now we can batch process the abstracts and get the structured data

```

abstract_files <- list.files(path = "pdf-examples", pattern = "\\.txt$", full.names = TRUE)
results <- lapply(abstract_files, function(file) process_abstract(file, chat))
names(results) <- basename(abstract_files)

# Display results
print(results)
```

In my first take without the required = FALSE I got some fake results. It hallucinated that
the Humber study was conducted in 2023 (it was published in 2010!) and that there were
2 villages surveyed in my study. The problem was that you can't get that data from 
the abstracts. So the model is hallucinating a response. 

Unfortunately, with required = FALSE it still hallucinated answers. I then tried Claude sonnet 
(a more powerful reasoning model) and it correctly put NULL for my study's sample size, but
still got the year wrong for the Humber study. 

I think this could work, but some work on the prompts would be needed. 

## Reflections 

The ellmer package solves some of the challenges [I outlined in my last blog on LLM access](https://www.seascapemodels.org/rstats/2025/02/12/LLMs-for-literature-reviews.html) from R. 
But others are deeper conceptual challengs and remain. I'll repeat those here

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
analysis'](https://onlinelibrary.wiley.com/doi/full/10.1111/brv.12344?casa_token=LVnFzoFBBU8AAAAA%3AcsyopYDWDBRZN7y2JL7eHYxzqayxu2GvKB-7gdEYkdeZSi5p5o1oXTwj49FqwBJz-IpPS6wxJ_SX0h2f)
we either downloaded the pdfs manually, or set timers to delay web hits
and avoid getting blocked.

HTML format would be ideal, because the tags mean the sections of the
paper, and the figures already semi-structured.

The ellmer pdf utility function seems to work ok for getting text from pdfs. I'm 
guessing it could be improved though, e.g. to remove wastefull (=$) text like page headers. 

### Prompting

Need to experiment with this to get it right. It might also be good to
repeat prompt the same text to triangulate accurate results.

### Validation

You'll definitely want to manually check the output and report accuracy
statistics in your study. So maybe your review has 1000 papers, you'll
want to manually check 100 of them to see how accurate the LLM was.

### You'll still need to read a lot of papers to write a good lit review

A lit review is more than the systematic data. I still believe you need
to read a lot of papers in order to understand the literature and make a
useful synthesis. If you just use AI you're vulnerable to the [‘illusion
of understanding'](https://www.nature.com/articles/s41586-024-07146-0).

### Conclusion

This tool will be best for well defined tasks and consistently written
papers. For instance, an ideal use case would be reviewing 500 ocean
acidification papers that all used similar experimental designs and
terminology. You'll then be able to get consistent answers to prompts
about sample size etc…

Another good use case would be to extract model types from species
distribution model papers.

Harder tasks will be where the papers are from diverse disciplines, or
use inconsistent terminology, or methods. My study was a good example of
that, there were about 5 different sample sizes reported. So in this
example we'd need first to think clearly about what sample size you
wanted to extract before writing the prompt.



---
date: '08/22/2026'
title: Running local large language models not as difficult as you might think
categories: [genAI, research, rstats]
published: true
---

This post was [originally published on our collaborative substack site](https://vitaexmachina.substack.com/p/running-local-large-language-models). Visit the site to follow us and read more similar posts. 

*Jointly authored by Chris Brown, Scott Spillias, Carla Sbrocchi and Luis D. Verde Arregoitia.* 

Chris had putting off trying local models as the setup seemed too complex for him, but Scott convinced him to try it out. Chris did and says it was easier than he had thought. This tutorial walks through the setup.

## What you’ll need

*   A desktop or laptop computer, more on hardware below.

*   **Download the [Ollama](https://ollama.com/)** software

*   **A large language model**, it’s simple to use Ollama to download one.

*   **Ideally, another piece of software that interacts with Ollama** — this can either be, say, [ellmer](https://ellmer.tidyverse.org/), the R package, which can make calls to Ollama, or it can be an extension like [Continue](https://www.continue.dev/), which lets you do agentic coding and autocomplete.

## Ollama

The main software you need to get is Ollama. Go to [ollama.com](https://ollama.com/) and download and install Ollama (you may need to seek IT approval if you are doing this on a work computer). Then you have several choices for [models](https://ollama.com/library) to download directly from Ollama These are open source models, and we recommend researching their webpage for which model would be best for the particular application you want to use Ollama for. More on this below.

The way Ollama works is it sets up a localhost server. This is like a web server, where you would access a service from the internet, except the server runs locally on your computer. It just sits there waiting until you make a request of the LLM. Then what it’s going to do is load a large language model into memory and pass that request to a locally run large language model.

## The commands you need

Ollama comes with a clickable interface, but we find it more convenient to use the terminal. Here are some of the key commands.

```
ollama serve                  # start the server (the desktop app does this for you)
ollama pull qwen2.5-coder     # download a model
ollama run qwen2.5-coder      # chat with a model (downloads it first if you don't have it)
ollama list                   # see which models you've already downloaded
ollama ps                     # see which models are currently loaded in memory
ollama stop qwen2.5-coder     # unload a model from memory now
ollama rm qwen2.5-coder       # delete a downloaded model from disk
```

Full list: [CLI reference](https://docs.ollama.com/cli).

Before starting on these, let’s look at model choice.

## Performance and hardware

Now its important to understand the difference between hard-disk memory, RAM, GPUs and CPUs.

Hard-disk memory is where data is stored long term. You need enough of this just to download the model file. This is unlikely to be a constraint for downloading a model, unless your computers memory is really chockers.

Common LLM choices range from about 8GB up to terabytes. You will need at least 10GB of free hard-disk memory to download a basic coding assistant model.

RAM is the accessible memory where Ollama (and other programs) hold data so its ready for quick access. The local LLM needs to fit in your RAM for Ollama to do inference with it. If the LLM is using most of your RAM it may still work, but not you will find other software on your computer slows down or breaks while the model is in use, because it can’t use that RAM.

For a basic 7 billion parameter model (‘7B’) you will need 8GB RAM minimum. But practically you will want 16GB+ for responses to be fast enough and to allow you to use other software simultaneously.

Ollama only holds an LLM in RAM while it’s in use. By default Ollama unloads it after five minutes of inactivity, or use the `stop` command to get it out of RAM sooner.

GPUs and CPUs are what do the inference. They take your prompt and process it to produce text/images/audio. Hopefully you have a computer with a decent GPU, this is much faster. Read more on [Hardware support](https://docs.ollama.com/gpu) if you are not sure.

GPU setups differ with different brands of computers. For instance, a mid-range Macbook will be sufficient to run basic models. For windows machines, you will want to have a performance NVidia GPU. Developers are aggressively compressing and quantizing local models to help us run decent local models on memory'-constrained machines, and hopefully good coding assistants will soon perform similarly to cloud-hosted frontier models on the consumer grade laptops most of us use.

## Choosing a model

Some of these models are very large (use a lot of memory), and there’s a fair bit of choice that needs to go into selecting the right model. Memory size roughly correlates with the number of parameters an LLM has (e.g. 7B, 14B). LLMs with more parameters are in general smarter, but you’re going to need more RAM and a more powerful GPU to use them.

When he tried Ollama, Chris was surprised that there are lots of quite good, relatively small models these days that will run on most modern laptops.

Useful references for picking one:

*   [Browse models](https://ollama.com/search) — filter by chat, coding, vision, embeddings and reasoning

*   [Context length](https://docs.ollama.com/context-length) — how much text the model can take in at once

*   [Ollama quickstart](https://docs.ollama.com/quickstart)

Now let’s look at a couple of applications of Ollama.

## Autocomplete and agentic coding

Chris started with the [Qwen 2.5 Coder base](https://ollama.com/library/qwen2.5-coder), because he wanted to try using Ollama for autocomplete suggestions while coding.

To get the model he just ran `ollama pull qwen2.5-coder:7b-base`. Then it downloaded from the internet. This took a while as the file is several gigabytes.

He used the ‘base’ version as it seems to perform better for line completion. Other models are trained for back and forth chatting, so tend not to want to complete your sentences (which would be annoying in a chat interface!).

So download that model, and then you’re going to need another extension to help with the autocomplete. If you’re using Visual Studio Code, you can install the [Continue extension](https://marketplace.visualstudio.com/items?itemName=Continue.continue) and then just follow [their instructions](https://docs.continue.dev/customize/model-providers/ollama) for connecting Continue to Ollama. Note that Continue has been acquired by the company Cursor and the actual extension may not be around for much longer. We can also use [Kilo Code](https://kilo.ai/docs/automate/extending/local-models) as an alternative extension that also supports local models.

[Check their list of recommended models.](https://docs.continue.dev/customize/models)

Other applications you might want to try out are the chat agents option in Continue. This will make changes to your scripts. The base model we used above won’t work for this task, you will want a different model that is optimized for chat and agentic workflows. Usually these models are significantly larger.

## Agentic programming

Agents write code, run code, look at the results, update the code and keep going until they decide to finish the task.

It is possible to do agentic coding with local LLMs, but you will need a really good consumer grade computer that can handle much bigger models than used for autocomplete or chatting.

See this [post](https://simonpcouch.com/blog/2026-04-16-local-agents-2/) by Simon Couch on driving coding agents on a laptop using local models such as variants of Qwen 3.5 and Gemma 4.

Qwen 3.8 (27B) is also [getting great reviews for agentic coding](https://simonwillison.net/2026/Aug/16/qwen-38-27b/). That blogger has found it works ok with both a 128GB M5 Max MacBook Pro and an NVIDIA DGX Spark (about $16,000 and $9000 AUD respectively at post publication).

The good news is that clever people are finding new ways to compress and use these LLMs such that they run faster on smaller computers.

Note there are some cybersecurity issues with agents because they run code on your computer. You want to be careful that you know what you’re doing before you start using agents, and get permission from your work if you’re using them on your work computer.

## Processing files and literature in R

Another application of local LLMs is processing text through the LLM. If you’re doing this in R, it’s relatively simple to set up, just use the ellmer package to chat with the model. ellmer will link to Ollama via its API (application programming interface), and then you can send text to that API to have ellmer process it through the LLM.

You don’t have to use R. There is software written in many languages for accessing Ollama programmatically, including python, javascript and bash.

We’ve written previously about using [ellmer to batch process text files](https://www.seascapemodels.org/posts/2025-03-15-LMs-in-R-with-ellmer/index.html), such as if you want to automate the extraction of meta-data from papers for a literature review. The main difference is you would use `chat_ollama`to send text to the model.

One thing to keep in mind when using Ollama for scientific workflows, is that the default commands provided above will download the 4 bit [quantized](https://huggingface.co/docs/optimum/concept_guides/quantization) versions of the LLMs. Quantization roughly means rounding some of the numbers in the massive matrices of weights that make up an LLM’s neural networks. This saves memory, but reduces precision.

In our experience, for text-processing tasks the difference in different quantizations is negligible, but needs reporting when writing up results.

We hope this quick guide helps those who are curious about local models. We are interested to hear from readers about your experiences with local LLMs and what applications you are using them for.

* * *

*Note that Ollama as a wrapper for llama.cpp is considered [problematic](https://sleepingrobots.com/dreams/stop-using-ollama/) by some. In R we can use other bindings to the llama.cpp library for local inference of large language models (LLMs), such as the[llamaR](https://github.com/Zabis13/llamaR) package by Yuri Baramykov.

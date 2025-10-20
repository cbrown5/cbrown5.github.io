---
date: '6/8/2025'
title: Vibe coding with AI agents is not for scientists
categories: [rstats, genAI]
published: TRUE
---

Vibe coding is the idea of creating software with large language models (e.g. chat GPT, Claude), using only prompting and no, or very little [human written code](https://en.wikipedia.org/wiki/Vibe_coding). 

Co-founder of openAI says of vibe coding: ["It's not really coding - I just see things, say things, run things, and copy-paste things, and it mostly works."](https://www.businessinsider.com/vibe-coding-ai-silicon-valley-andrej-karpathy-2025-2).

The problem with vibe coding for scientists is modelling requires precision in coding and statistical logic. Small differences in data wrangling or model formulation can result in logically flawed results. 

My experience of vibe coding is that it tends to make code that runs, but has mistakes in the critical places. This is very problematic if you do not manually check all the logic. 

## What is vibe coding

Vibe coding has gained popularity with agentic AI systems, such as Github Copilot, Cline, Roo Code and Claude Code. These are systems that take your initial instructions and then iterate it through creating it and debugging it with minimal or no human intervention. 

Anthropic claims that their latest model can work for hours on software development without need for human intervention. The way it works is that the LLM returns the results of its code to itself, checks those results, then decides on the next action to take. 

As an ecological modeller I thought these tools could be useful for developing routine R code. Common tasks include data wrangling, building and running various versions of a regression model and then generating plots. 

So I've been experimenting with agentic AI, including with Cline, Roo Code and Github Copilot for ecological statistics. 

## Flawed logic

The clincher from the quote above is **"...and it mostly works."** 

I've found for statistics the bits that don't work are the critical science parts. So vibe coding tends to produce code that runs and produces believable plots, but results that are logically flawed. 

**Here's an example of how vibe coding can produce flawed science:**

I'm analysing some turtle monitoring data to calculate mean number of nests per night. The problem is that zeros, nights with no nests, are implicit. Monitoring was done every night for three months, and the field team records nesting events the observe. 

I tried vibe coding to calculate mean number of nests per night. It just calculated the mean number out of the total number of unique dates in the dataset. What we actually need to do first is add zeros, nights without nesting, back into the data first. Otherwise, we get a mean that isn't comparable across years or sites 

## Over-engineering

You might say - so just go back and fix the error. That's exactly what I did. However, herein lies a problem. 

AI agents tend to totally over-engineer R code, producing scripts that are very robust to programmatic errors, but also very lengthy (see example below). There's an overwhelming amount of code to go through to find these small but significant mistakes. 

AI has a great breadth of knowledge, so a lengthy vibe coding session will produce a diversity functions and coding logic. You need to be experienced to interpet a lot of what it produces. 

Your typical R user knows enough to analyse their data and make some plots. They are going to be overwhelmed trying to interpret 100s of lines of R code.  

## How to use AI agents safely

AI agents are still very useful. But for scientific coding they need careful oversight. You can either: 

1) Let it run autonomously, then carefully go back through what its created and review everything
2) Check and review it step-by-step, and redirect it 

If you are getting out of your depth, then I suggest stopping and reviewing the code until you are sure what it does. You can also prompt the agent to add checks in (like checking number of samples matches your expectations). 

Remember that the commercial agents, like Claude code or github copilot, are designed for software engineers. So they write robust R code, but they are also not very good at statistics. 

### Example of over engineering

AI Agents love to cover all the bases. This can be nice, and I've learnt some new tricks this way. However, its total overkill if you just want to create a few plots. Here's one example where I was getting copilot to do an multivariate analysis. It started by creating this whole script, complete with custom functions, just to load a few packages:

```

# List of required packages
required_packages <- c(
  "tidyverse",  # For data manipulation and visualization
  "vegan",      # For community analysis
  "ggplot2",    # For data visualization
  "ggrepel",    # For non-overlapping text labels
  "cluster",    # For cluster analysis
  "knitr",      # For report generation
  "kableExtra"  # For table formatting in reports
)

# Function to check and install packages
install_if_missing <- function(pkg) {
  if (!requireNamespace(pkg, quietly = TRUE)) {
    cat(paste0("Installing package: ", pkg, "\n"))
    install.packages(pkg, dependencies = TRUE)
  } else {
    cat(paste0("Package already installed: ", pkg, "\n"))
  }
}

# Install missing packages
cat("Checking and installing required packages...\n")
for (pkg in required_packages) {
  install_if_missing(pkg)
}

# Load the packages to verify installation
cat("\nLoading packages to verify installation...\n")
for (pkg in required_packages) {
  cat(paste0("Loading package: ", pkg, "\n"))
  library(pkg, character.only = TRUE)
}

cat("\nAll required packages are installed and loaded.\n")
cat("You can now proceed with running the analysis scripts.\n")

```

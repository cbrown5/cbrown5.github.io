---
date: '12/09/2025'
title: How AI coding assistants can bias your coding and analysis
categories: [rstats, genAI]
published: true
---

I'm a frequent user of AI coding assistants to speed up my coding. I'm mostly using Github Copilot and the Roo Code agentic extension for VSCode, with various large language models (LLMs). 

We hear a lot about biases and LLMs, which got me wondering, what biases might the use of coding assistants induce in my coding and data analysis? 

Biases are a concern in other areas of applications of LLMs to the workplace. For instance, LLMs are known to be sexist, biased towards recommending science articles from certain parts of the world and even biased towards [Elon Musk's opinions](https://futurism.com/grok-looks-up-what-elon-musk-thinks). 

I had thought that using LLMs mainly to assist with R code would mean that I'm reasonably immune to issues with biases in LLMs. 

But after a recent experience in Python I realized there are subtle types of biases in LLMs that could have a big impact on the quality of an analysis. 

I had considered that LLMs might recommend certain types of statistical tests more frequently than others, perhaps biasing me to the dominant statistical methodologies (like they seem to more commonly recommend frequentist over Bayesian generalized linear models). 

But I wasn't concerned about that. I have a pretty broad view of stats in my field, and I usually don't use LLMs for recommending new methods. I look to the scientific literature for that advice. 

LLMs might have their own particular ways of implementing code, but the end result of a given statistical test, is the same, it doesn't matter much how you get there. 

Using Python changed my view on this. I'm a lifelong R coder, not a Python coder. However, I wanted to learn some deep learning analyses, for which I needed Python. So I set about using my coding assistant to write me a tutorial on learn deep learning in Python. 

The way LLM coding assistants can bias your code is that most are set-up to be sycophantic. So they amplify your own biases by affirming that whatever you have is good. 

This became apparent when me, the R coder, was bringing my R informed ideas for writing code to Python. The LLM led me down paths for implementing code that make sense in R land, but which are not best practice for implementation in Python. 

I realized this once I started referring to real Python tutorials. 

More generally, LLMs tend to be affirmative of your requests. For a data analysis workflow this means they will tend to amplify whatever biases you start out with. 

Errors that cause code to fail are ok, because they are easy to detect. What is more concerning is if the LLM amplify subtle mistakes in choice of statistics. 

I have a [pre-print on using LLMs and AI coding assistants for ecological data analysis](https://ecoevorxiv.org/repository/view/9493/). One of our recommendations is to split your workflow into parts. 

In particular, it helps to choose the analysis before you plan how the code will be written (and what software or packages you will use). If you conflate these two different decisions you are more likely to make mistakes that are amplified. Best to choose your analysis using AI but also by reading the literature. Then get the AI to help you implement that. 

The other problem is that you finish your analysis and the LLM has led you to think it is excellent. You submit that analysis for peer-review and the reviewers think differently. 

So its a good idea to check your work against the discipline norms, and ideally get expert colleagues to take a look too. Take everything an LLM says with a grain of salt, especially if it agrees with you. 



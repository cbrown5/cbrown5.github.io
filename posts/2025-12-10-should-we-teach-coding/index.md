---
date: '12/10/2025'
title: Should we still teach R coding in this age of genAI?
categories: [rstats, genAI]
published: true
---

I often get asked if we should still be teaching coding skills to students and researchers now that we have generative AI tools that can write code for us. 

The general consensus is yes, we should still teach coding. For an ecology specific [argument see here](https://besjournals.onlinelibrary.wiley.com/doi/full/10.1111/2041-210X.14325). 

Teaching coding is teaching people how to think logically and structure problems. These skills are essential not only in coding, but also for good science and problem solving in general. 

So you need to learn to code to learn to think logically and structure problems.

A more practical standpoint is that LLMs are good at generating code that they have seen a lot of examples of in their data. But they are not so good at creative work on novel topics or niche areas. 

For example, AI coding assistants struggle to make a simple `tmap` (the R mapping package) work well. `tmap` was updated recently, meaning the examples in the LLM's training are out of date. 

The coding assistants also seem to default to code patterns they are most familiar with, like `ggplot2` syntax. Not all of this works with `tmap`. 

In general, I find they perform much better at statistical modelling in R than they do with complex geospatial analyses. 

This practical issue may increasingly become less relevant as LLMs get better and we create better resources to inform their actions (like a tmap specific guide for LLMs to read before advising you, or web searches of the tmap page).

But it is still likely that frontier modelling will require deep human engagement with code. So learning to code is important for researchers. 

I'll leave the final say to Andrej Karpathy, former head of AI at Tesla and founding member of OpenAI's research group. 

In a [recent podcast interview](https://www.dwarkesh.com/p/andrej-karpathy) he talks about a repo he made to help teach people how to work with LLMs. His advice to learners is literally to re-write his repo by hand, not even to cut and paste. 

He goes on to explain that AI agents are good for very standard code or code that is common on the internet. But they perform poorly for creating new code, or code that contradicts common patterns. 

For any research code he most commonly uses the code auto-complete features that AI assistants have, rather than AI agents. 

He suggests that to really learn something you should code it yourself, using examples only as references. 

Karpathy came up with the term 'vibe-coding' which means creating code by prompting, without reviewing the code. Usually an AI agent is used. So its saying a lot if he thinks that learning means doing it the old fashioned way of writing code yourself. 



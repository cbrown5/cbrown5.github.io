---
title: "Do AI coding agents save scientists time?"
layout: default
categories: [rstats, research, genAI]
published: true
date: '04/14/2026'
excerpt: "They speed up initial code development, but then tests for errors can add more time. Its still an open question if there is a net benefit
"
---

I’m often asked if using AI coding agents saves time. Yes they write code very quickly and can [complete entire ecological data analyses](https://onlinelibrary.wiley.com/doi/10.1111/faf.70079).

![Do agents really help when the deadlines are approaching?](coding-time.png)

Do agents really help when the deadlines are approaching?

But the code also requires careful checking for logical errors. Our recent analysis shows this. The best LLMs can complete entire analyses and all the code works well. But there was a decent chance of subtle logical errors. These logical errors would require pretty deep human understanding of the code to correct.

There’s another issue and that is using code you don’t understand. I often find the agents produce so much code, but I’m not comfortable using it until I understand the logic line-by-line.

In those cases I find its faster to use an autocomplete AI assistant so I’m going line-by-line, rather than an agentic loop that completes the entire piece of work.

I think the jury is still out on this question of whether there is a net time benefit to using agents. The only way to really answer is a randomised control trial where you time how long it takes scientists to fully complete a task.

The only study I’m aware of is quite limited and looked at software developers. They found the [developers often projected they would be faster with the AI tools, but were actually slower at tasks by the end of the project.](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)

Its true that using AI is fun because it makes so much progress, but that fun feeling might be a trap for us.

Its likely that the answer is context dependent.

I suspect for scientists most of the coding we do (like writing models that represent ecosystems) actually requires the human to understand what it does. In these cases agents don’t make sense, because you need to go back and review the code carefully to understand it anyway.

On the other hand, if you are making software tools that are easy to verify then agents are great. For instance, I often use them to write code for non-standard figures. I don’t need to know the code in that case because I can check the output is correct visually.

Likewise interactive shiny apps are another example of time saving. The agent can take some (good) code you already have and turn it into an app. Its easy to test and check because you just use the app.

People often point to advances in LLMs and say that soon they will be good enough to do all the coding for us. I’m not so sure that applies to science. [In fact, we found the later version of Claude Sonnet performed about the same as an earlier version on scientific logic, it just made different types of errors.](https://onlinelibrary.wiley.com/doi/10.1111/faf.70079)

I think the advances need to come in the ways we interact and use the LLMs.

The ultimately goal should be efficient but also high quality work. That’s something I want to look at in my next agentic AI study.
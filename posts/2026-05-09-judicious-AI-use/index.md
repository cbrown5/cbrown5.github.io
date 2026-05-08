---
title: "Mitigating the risks of AI coding tools with judicious use for research tasks"
layout: default
categories: [genAI; research-skills]
published: true
date: '05/08/2026'
---

I was recently invited to talk to an environmental science coding club ([slides here](https://www.seascapemodels.org/posts/2026-05-07-genAI-for-coding-FAQ-slides/#/title-slide)).

My mind is constantly buzzing with ideas on generative AI and different ways for how this new technology fits into the research process. So I often struggle to find the focus needed for a sub hour presentation. Needless to say, it wasn’t my best presentation. But like many presentations, I had a clearer picture of what I wanted to say after I presented it.

What I realized is that being judicious with AI coding tools like Claude Code or Github Copilot mitigates many of the risks that concern researchers:

\* Will it save me time or will I waste time later fixing up slop?

\* How much electricity does it use and what are the carbon emissions?

\* Is it safe to use on my computer in a cybersecurity sense?

\* Will foreign companies steal my personal data and use it against me?

By judicious I mean using AI tools in a targeted way for specific tasks where you know it works well. I also mean carefully preparing the context and prompts for the AI.

Lots of the problems arise with careless use of AI tools.

There’s a fair bit of “let’s just throw AI at this problem and see what it does” in the workforce at the moment. I think this happens either out of awe for its abilities, naivety or just frustration with lack of progress on something.

Throwing an immense AI machine like Claude Opus at a poorly defined problem is not judicious use.

The now famous [Metr](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) study found software developers thought they would spend less time but actually spent more time on a task using AI.

Researchers aren’t software developers and we have different workflows. AI coding agents seem to be delivering some truly useful software improvements now. But my guess is that this time wasting problem is actually worse for researchers than for software developers.

Researchers care more about the ‘how its done’ than software developers do, software developers put more emphasis on a good end product. Software developers also have the advantage of a clear goal that is easy to verify for accuracy (e.g. an app that works). Its harder to verify that a research output is accurate, because novel research by definition has never been done before. In fact, it takes some fields decades to verify new results.

I think the AI time wasting happens (and I’ve see it happen in my own work) because we have lazy primate brains and its tempting to just see what AI can do. But then you end up burning time correcting mistakes, correcting slop or fixing things to your own style (anyone else tired of Claude’s ubiquitous contrastive logic popping up on social media, blogs and papers everywhere?).

The trick is to experiment just enough to know at what points in a research workflow AI can truly be useful. Then put hard mental work in up front to plan your prompts and context. This gives the coding agent (or whatever AI tool) the best chance of creating a useful answer that meets your standards and style of writing/coding/visualization.

Scott and I tested the benefits of more detailed and specific prompts in our test of [how coding agents do ecological analyses](https://besjournals.onlinelibrary.wiley.com/doi/10.1111/2041-210x.70267). They make more statistically defensible recommendations, write more accurate code and write code in a more consistent style if you use carefully prepared prompts, detailed plans and give more relevant context.

That’s one reason we recommended breaking research workflows into steps for AI tools. For data analysis, plan the methods first, then plan how the code will be structured, finally get the AI to write the code. That gives you more control and more understanding, which is what you need if you are putting your reputation on the study at the end of the day.

An unexpected result was that a clear workflow with carefully prepared prompts meant that cheaper LLMs could perform as well as the best LLMs (at the time).

Which brings me back to the list at the start.

Cheaper LLMs have fewer parameters and use less energy. So a judicious approach uses less electricity. In fact, long running AI agents use [many times more electricity than the equivalent task done in several smalls steps with human intervention](https://hannahritchie.substack.com/p/ai-electricity-2025). So fewer more careful prompts that are part of your plan will save energy.

A judicious approach is more surgical about where on your computer you use AI and what context you provide. Access to fewer files creates fewer security risks (but be warned, AI agents like Claude Code can use the terminal and can do just about anything on your computer, like steal data or delete all your files. They just rarely do these bad things).

Getting good results out of smaller cheaper LLMs pushes you into the realm of open-weight models being useful. These are models that are free to download and run locally, avoiding issues with data and prompts leaving your computer.

Generative AI isn’t the tool for every job you need to do on the computer. Take a bit of time now to figure out what works and what is actually wasting your time. It will save you time later.
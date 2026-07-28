---
date: '07/28/2026'
title: What agentic misalignment could mean for science
categories: [genAI, research-skills]
published: true
---

Earlier this month OpenAI made the international news for a serious cybersecurity incident. They were testing a new model on a set of security puzzles. The model was meant to solve them inside a walled-off sandbox. Instead it broke out, got onto the internet, hacked into another company's systems, and stole the answers. Simon Willison's [write-up](https://simonwillison.net/2026/Jul/22/openai-cyberattack/) is worth reading in full.

Two things stand out. The first is the misalignment. The model was given a goal — solve the problems — and it went after that goal by whatever route worked, including routes nobody intended or authorised. The second is what Willison calls "relentless proactivity": give this generation of models a goal and any possible pathway, and they will figure it out. It didn't stumble into the answer. It chained together stolen credentials and a cyber security vulnerabilities to get there.

There's an importance less in this story for the use of generative AI in science. 

## What it means for using genAI in science

When I use an AI agent to help with data analysis, I'm doing the same thing OpenAI did, just with lower stakes and friendlier goals. I give it an objective like "figure out whether temperature is driving this decline" or "get this model to fit". Then I let it work.

The misalignment problem means the agent can find an answer that looks good but is wrong. It may will drop the inconvenient data points, pick the model structure that produces the cleanest result, or quietly reframe the question until the numbers cooperate. 

The relentless proactivity makes it worse. It will try transformation after transformation, subset after subset, until something turns up — and with enough attempts, something always turns up. This is p-hacking, except the agent does it in seconds and doesn't get bored. 

## It doesn't have to hallucinate to mislead you

We've spent a couple of years worrying about hallucination — the model making up a citation or stating a fact that's wrong. 

Agentic misalignment is different. The agent doesn't need to hallucinate to mislead you. The problem is when the agent steers toward "a good paper that gets published" rather than "what's actually true". 

So the guardrail can't just be "check the AI's facts". You have to check its goal. The prompts "help me understand this data" and "help me get this published" may send you and your agent down very different paths. Only one of these paths results in good science. 

---
title: "Tips for using coding agents in ecological modelling workflows"
layout: default
categories: [genAI; research-skills]
published: true
date: '06/06/2026'
---

With AI agents getting increasingly powerful, the temptation for modelling is to launch in with a simple prompt to see if it can just create the code and analysis for you. But in practice, it is hard to get the agent to do what you want and produce an analysis that is [to peer-review standard.](https://www.seascapemodels.org/posts/2026-03-28-agentic-AI-ecological-modelling/)

We’ve researched how AI coding assistants can be best used in data analysis workflows ([thoughts here](https://vitaexmachina.substack.com/p/mitigating-the-risks-of-ai-coding), [paper here](https://besjournals.onlinelibrary.wiley.com/doi/10.1111/2041-210x.70267?af=R)).

The lesson from that research is to first prioritise your planning and thought. At this point an agent, if you want to use one, is best used in 'ask' or 'planning' mode, to help explore analysis options. Once you have a clear idea of what you are doing, you then create clear guidelines. The agent then gets involved to help create code to your specifications. The more routine the tasks and the better described they are, the more useful the agent’s code will be.

I’m finding a similar workflow works well for ecological modelling more generally.

## 1. Plan your model

Pen and paper work to plan the model’s structure, write the core equations. You might go back and forwards with code to test out components of the model.

If you use an AI at this point, it will be conversational problem solving. Like, “suggest five alternative ways to represent cohort dynamics in an ecological model”.

You will need to check the literature frequently and the peer-reviewed literature should be your main reference point, not AI.

## 2. Plan your model

Once I’m clear on the model, I like to code up for a single case-study and parameter set. This helps me iron out issues and identify inconsistencies in the original plan.

I prefer an AI line completion tool for this step. That way I maintain control of the code and logic, the AI is just helping save keystrokes.

There are several options, I still use Github Copilot (which still has a free tier), there is also [Windsurf](https://devin.ai/desktop) (formerly Codeium, from Devin.ai, which has unlimited free autocompletes), Google’s [codeassist](https://codeassist.google/products/business#available-in-your-terminal-favorite-ides-and-platforms) and several self-hosted tools I haven’t tried.

If you’re using R, then the [Gander](https://github.com/simonpcouch/gander/) package could also be used. This package lets you bring up a dialogue box where you can type what code you want. It works well going line-by-line.

I don’t use any special AI tools to explore the model at this point. Once the model runs I’m just trying different parameter sets to see that results make sense and to fix bugs.

## 3. Spin up sensitivity analyses

AI agents are effective at taking scientifically robust code, then writing all the routine structure around that to automate sensitivity analyses.

This last step is where I find it is effective to let an AI agent loose on your code.

I’d take my test case code then ask an agent (like Claude Code) to refactor it into functions and set-up scripts to run sensitivity analyses against parameters a, b, c etc….

You should also ask for it to generate tests. The obvious one is to test the refactored code against your original case-study. Other tests depend on your model, but there are often outcomes where the exact answer is known, get the AI to write tests to check its working.

For example, in a population model, when fishing mortality is high, abundance should trend to zero. When fishing mortality is zero abundance should be equal the population’s carrying capacity.

## Scientific research requires a high ratio of input to output tokens

AI agents can do so much, you can get addicted to the apparent productivity of having them spin up entire project’s worth of code with one short prompt.

This is fun for inconsequential projects, like the [single-use games I make as teaching aids.](https://www.seascapemodels.org/posts/2026-04-22-quick-and-easy-AI-generated-games-for-teaching/)

The problem for scientists is ensuring the scientific validity of the code. Our tests on AI written models show that [small errors creep in and are hard to detect](https://onlinelibrary.wiley.com/doi/10.1111/faf.70079).

To have confidence that your code is scientifically valid your need to understand it. To understand agent written code you need to spend a long time exploring it.

I’m finding its faster to just write the code for myself in the first place, rather than to try an understand AI written code bases.

Another way to think about this issue is as the ratio of input:output tokens across the project’s lifespan. A low ratio (low input, high output) will tend to result in misalignment between what you want (and what is scientifically valid) and what the agent does.

I’d recommend a high ratio of input to output for scientific research, like 3:1. You are still getting some efficiency benefits from the AI, but extra the work you put into writing the original code and writing specifications for the AI will result in higher quality code.
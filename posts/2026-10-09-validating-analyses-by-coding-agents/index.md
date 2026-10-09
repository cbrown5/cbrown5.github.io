---
date: '10/09/2026'
title: Validating data analyses written by coding agents 
categories: [genAI, modelling, rstats]
published: true
---

Claude Code (and many other agents) has been getting so good at ecological analysis that I find I’m increasingly tempted not to directly review the code it writes. In fact, it finds more mistakes in my code than I find in its code these days.

So I need a way to check the validity of the code it writes. Here’s the strategy for this I’ve been developing. Its a work in progress.

### Specification

Start with a clear written specification for the data analysis or modelling. This should include equations for the modelling. This ensures I understand what I want the analysis to do (even if its not what I get initially).

Claude is very helpful at this stage to review it for logical errors.

### Adversarial code review

This is a no brainer. Use the agent, or ideally another provider’s agent, to review the code for errors.

### Data processing checks

Instruct Claude to check all data processing steps and fail loudly if inconsistencies are found. That’s probably sufficient these days, but if you want to be thorough you can think about what you need at each stage and tell it to check for that.

For example, make sure the final dataframe used in the model has N rows, or that the number of unique survey IDs == the number of rows in the dataframe.

There are various R packages to support this like `pointblank` and `validate`.

### Testing against simulated data with known truth

Often in ecology we are fitting generative models, that is, you can simulate data right out of the model you are fitting. So invert your specification of the model to be a specification that simulates data with a known model. Then run the simulated data through your workflow to see if it recovers the known parameters.

If you are doing probabilistic inference you can also check other common verification statistics like coverage (the 95% CIs should cover the point estimate in 95% of randomized datasets).

Create the data simulation in a separate Claude and R environment, to ensure independence. Make sure the AI memory storage options are turned off, or set to incognito mode, to ensure no leakage of information through memory files too.

There are also many data simulation functions as R packages or within R packages. For instance, many advanced modelling packages also provide a simulation function. You can use these to further reduce the chances of errors in your simulation step

### Other simulation tests

You can also do checks where you muddle the real data directly and run it through your workflow. For instance, you should get the same result if you reshuffle rows of your data-frame randomly.

If you reshuffle values in the covariate columns independently of the response, then the effects of covariate should be 0 on average. If your workflow is about model selection, then enforcing shared rank ordering of a covariate and the response you should (almost certainly) find that covariate pops up in every model selected by the AIC.

### Test multiple methods

In the simplest case, the same model fitted with different implementations should return the same results. For example compare results from `lmer` `lme` and `glmmTMB`. You can get claude to fire up sub-agents to write a script for each one independently.

In more complex cases it can still be useful to do fit different models and compare results, even in the models have slightly different meanings. This may reveal errors, but it may also reveal places where your model assumptions are not robust. For instance, do different model selection methods result in the same model?

### What’s next?

Part of the problem is that once you start using an agent it will write very complex R code. Claude Code has this obsession with making absolutely generalizable scripts. For instance, it commonly writes functions just to identify the root file path for a key data file.

The other part of its complexity is adding numerous print statements to the R scripts, so it can see intermediate results in the terminal output. I normally do these interactively so they stay out of my scripts.

All this extra code means it becomes even more tedious to review its work. Its like a double edged sword, the agent is powerful, but it makes more review work.

So its clear to me that we soon won’t bother reading the code they write. That means we need to adapt how we approach coding and data analysis, and especially ensure we have checks in place that we understand the code we are producing and understand its correct.

This list is my start at that.

Send a comment if you have other suggestions for ways to test code written by agents.
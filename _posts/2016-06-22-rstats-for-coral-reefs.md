---
layout: md_layout
category: Research Rstats
title: "R programming tools for coral reef scientists"
published: true  
---

### R programming tools for coral reef scientists

*22 Jun 2016*

I'm sitting here at the International Coral Reef Symposium in Hawaii. Looking at all the exciting graphs, data and analysis going up got me thinking: what are the key Rstats tools coral reef scientists should learn?  

Starting out with Rstats can be overwhelming because there are so many tools and packages available (but check out some of the free courses on [my page](http://www.seascapemodels.org/Rstats/index.html#page_content)). So here is a quick list of the key tools (packages and R functions) you should learn.

## 1. ggplot2  
A data visualisation tool tops the list. Data visualisation is the first step of analysis - you can quickly look for interesting patterns and check for errors. The `ggplot2` ('grammar of graphics 2') package makes dataviz quick and easy. You can rapidly slice and dice your data in different ways for viz and also overplot simple analyses, like regressions rapidly. Check out the guide [here](http://ggplot2.org/).  

## 2. lm()  
Linear models are becoming the dominant statistical tool for univariate data analysis in ecology and have largely replaced ANOVA methods. For instance, if you want to know how coral growth relates to temperature, how fish biomass relates to fishing pressure and so on you would probably use a linear model. Linear models are implemented in R with the function `lm()`.

A handy guide for analysis and interpretation of linear models has just been [published](http://onlinelibrary.wiley.com/doi/10.1111/2041-210X.12577/full) and check out the [books](http://www.springer.com/us/book/9780387874579) by the same author for guidance on who to code them up.  

A few quick examples on why `lm()` is so great.  
Just using a single continuous predictor - that is linear regression. Multiple continous predictor variables: multiple regression. If you combine categorical and continuous predictor variables you have your classic ANCOVA analysis.  
Use the `predict()` function to see what your trend lines look like.  
You can get confidence interval using the `confint()` functions. Do away with p-values they [are dated 20th century statistics](https://www.sciencenews.org/blog/context/experts-issue-warning-problems-p-values). Well ok p-values have their uses, but confidence intervals let you check how strong your effect is, as well as it's significance.  

## 3. glm()  
Once you mastered `lm()`, `glm()` (generalized linear model) is a must for ecologists. We often deal with non-normal data (ie doesn't fit a normal distribution), like presence/absence data and counts. `lm()` is inappropriate for this type of data. Way back in the 70s some clever people invented GLMs as a generalization of logistic regression. GLMs can handle many types of data.  
Check out Zuur et al.s book for a handy [guide](http://www.springer.com/us/book/9780387874579).  

## 4. lme4  
Ecological data is never simple and our data are often grouped. For instance, we often have blocks in experiments or transects within sites from field surveys. The package `lme4` lets you implement random effects in linear models. Random effects are a flexible way to account for nuisance sources of variation, which may be important but we don't have a specific hypothesis for which way the effect will go.  
Two key functions in `lme4` are `lmer()` which is the random effects version of `lm()` and `glmer()`, the random effects version of `glm()`.  Again, check out Zuur et al.s book for a handy [guide](http://www.springer.com/us/book/9780387874579).  

## 5. dplyr  
Got a large data-set? Need to merge data-sets by a common ID (e.g. site names)? Need to generate new variables from exisiting variables? Need to create data summaries? The package `dplyr` ('data pliers') is a must for all these tasks. Check out the [vignette](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwi30ujy-7zNAhUP92MKHbxJCAsQFggeMAA&url=https%3A%2F%2Fcran.rstudio.com%2Fweb%2Fpackages%2Fdplyr%2Fvignettes%2Fintroduction.html&usg=AFQjCNH7Ylg3tLyDnOEXLKyYXT0tBfmUSQ&sig2=YhONDvPs6ZxLvnxJSVoCfw).  

## 6. tidyr  
Ok, so you have entered your data (or got it from someone else), but wait a minute, the way you entered it doesn't let you use `ggplot2`, `dplyr`, `lm()`.. (if you followed my [guide](http://www.seascapemodels.org/rstats%20rspatial/2015/11/13/data-commandments.html) you shouldn't have this problem).  Do you need to reenter it?  
Nope, `tidyr` to the rescue. The package `tidyr` lets you reformat data in ways (e.g. from wide format to long format) in the way that most stats packages prefer it.  

## 7. vegan  
The package `vegan` provides good old multi-variate analysis, without the cost of Primer. Admittedly this package is slightly harder to use than Primer, but hey if you are already using R, the jump to primer is easy. Check out the [vignette](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=4&cad=rja&uact=8&ved=0ahUKEwja7OuK_bzNAhVG9GMKHUdYDnQQFgg3MAM&url=https%3A%2F%2Fcran.r-project.org%2Fweb%2Fpackages%2Fvegan%2Fvegan.pdf&usg=AFQjCNHjnMBiuiNp84VjObqMghCwxcyLxA&sig2=t_EaCR3fJpc-O0rCih9P1w&bvm=bv.125221236,d.cGc) to get started.  

That's my top 7. Good luck getting started.  

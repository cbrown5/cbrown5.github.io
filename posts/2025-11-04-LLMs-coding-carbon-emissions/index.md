---
date: '11/05/2025'
title: Keeping enthusiasm about learning R
categories: [rstats, genAI]
published: false
---

Staying enthused about learning R is a challenge. You need progress from the initial motivation driven by 'I need to learn this skill for my research career' through a phase of tedium on your way to a competent R programmer. 

Here's my story. 

## Fitting a multinomial peg into an ANOVA hole 

I first attempted to learn R while wintering at a remote field station in the Southern Ocean. I had one book, 2004 satellite internet and a lot of time to kill. 

Learning R was hard. Then you also have to learn statistics. 

I had chosen a hard statistical question to start with. My colleague asked for help analysing data. The aim was to predict which of three behaviours flocks of birds would show under different situations. I was trying to wrangle ANOVA to do this analysis, because that is the method my book described. 

I went around and around in circles. Were the behaviours factors or the response variable? If they were a response variable, how could the response have just three types of unordered outcomes? In hindsight I now see why I went in circles. The appropriate analysis would have been a multinomial model. Easy with `brms` (which didn't exist then) or `mgcv`, but GLMs were not covered in standard text books in 2004, let alone multinomial GLMs. 

I did however manage to learn how to code an ANOVA, as well as learning a bit about R code. 

Coding requires us to be frustratingly precise in ways that human languages are not. This is hard for new programmers. And the learning curve for R is reknowned for being steeper than other coding languages. 

The first step to competence is comprehending the exactness of programming. 

## Like a spoken language, but pedantic 

After my misadventure in the Southern Ocean I studied evolutionary modelling for my Honours thesis. I used Matlab, a commercial product developed by a single company. Matlab has the major benefit of its consistency. Its functions are used in consistent ways, the help files have a consistent style.

R is open-source. 'Learning R' is an experience in trying to comprehend the thinking of scores of different open-source developers. 

The `R is an ecosystem` cliche comes to mind. R is like a real ecosystem. The software ecosystem's solutions to problems are diverse. 

More often than someone has coded a solution to your problem in an R package. If only your could grasp how to use that solution the way its creator intended. 

## Data structures



Undersanding data structures was a key insight... 

Curiosity helps. 

R has been my main science tool for over 20 years now. 

As I gained more comprehension of R, stats in R became more like a puzzle. My own curiosity about what was possible kept me going. There is always something new to discover in a diverse software ecosystem. 

At times the imperitive quickly became procrastination. I've spent too many late nights trying a new spatial or Bayesian stats package, just out of curiosity. 




Twenty years on I often find it easier to code up with my own solutions to my research questions, rather than use someone else's packaged solution. Its easier to comprehend a problem if you work through it yourself. Its easier to understand your own R style than someone else's. 

Many people learn R because they have to. It is hard to work in many fields of science without some programming skills.  






Impact of genAI


Other people's innovations add

Most data problems you come up with development statistical programmers 

Always someting new to discover


There's been turn-over too. Pipes and `tidyverse` changed everything. These packages made data wrangling and plotting so much easier. 

Teaching R got easier. I could see 95% of my students checking out whenever I had to explain a cracker nested operation like `mean(log(subset(dat, grp == 'a')$x))`
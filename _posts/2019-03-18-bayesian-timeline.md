---
title: Diary of becoming a Bayesian
layout: default
category: rstats
published: TRUE
---

# Diary of becoming a Bayesian

Here's my timeline of going from frequentist stats to becoming a fully fledged Bayesian eco-statistician.

**2006** Read the *Ecological Detective* (Hilborn and Walters), the philosophy makes sense, the history of falsification is interesting but, geez, the maths looks hard.

**2008** Started PhD. Peers also interested in Bayes stats. But, Prof gets angry and tells us "ANOVA is all you will ever need". We rebel and start a study group on that James Clark book with elephants on the front cover.

Geez, the maths is even harder than I remember.  

Not comfortable with the 'subjective' aspect of Bayesian stats (AKA prior information). But its ok to use Bayesian stats for its flexibility, so long as we use 'uninformed' priors.

**2009** Read that Mick McCarthy book with the frog on the front cover. Start playing around in WinBUGS. BUGS code breaks the mystery of mixed effects models in R. MM models are just a series of equations, and much more than the obscure magic of R model formulas.

**2014** Actually published a paper on something with statistics in it (first time ever).  ([Interdependency of tropical marine ecosystems in
response to climate change]()). Used frequentist GLM. Leant heavily on advice in that Zuur, Ieno et al. book that has penguins on the front cover.  

**2017** Publish first [Bayesian eco-stats paper](). Went all out with a bespoke non-linear latent variable GLM in JAGS. Use broad 'uninformed priors', because the data should speak for themselves.

Brian Fry convinces me there is a big problem with the 'uninformed priors' used in isotope mixing models. Studies with poor data seem to unwittingly present the priors as their result.

**Winter 2017** Obsessed with the apparent simplicity and speed of the INLA rstats package for Bayesian GLMMs. Frequently taking hot baths in evening to read the latest INLA pre-print. Wife thinks I'm odd.

(Later on realize INLA is very fast, but not so simple)

**Autumn 2018** Started paper about sharks with regular frequentist GAMs. Finished paper with Bayesian GAMMs, because lead author wants random effects in a time-series model AND "confidence intervals" plotted on the graph. Too hard with GAMs, easy with Bayes.  

Publish paper on how [Bayesian isotope mixing models]() can't have uninformed priors. It is just mathematically impossible. Now convinced we should always use prior information to develop Bayesian priors.

Obsession with reading INLA in the bath vindicated by publishing in Nature.

Read about 'penalized complexity priors'. Now convinced priors for random effects should be 'informed' (or regularizing), even if we don't have prior information.

**2018/2019** Read that red and black MacElreath's book about rethinking. Agree that using informed priors for fixed effects is actually more conservative than broad priors.

In fact, realize now that no prior is truly 'uninformed', some are just broader than others. Broad priors can't be 'uninformed', because they are just are informed about a high variance.

**2019** Used INLA and Bayesian stats to do a simple linear regression. Never going back to frequentist.

Convinced postdoc to use informed priors for his model. Model works much better, results make much more sense.

**2020** Insist PhD students have to use Bayesian stats over frequentist stats too?  

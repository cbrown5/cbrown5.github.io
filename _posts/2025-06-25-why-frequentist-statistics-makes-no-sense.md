---
title: Why we are all naturally Bayesians not frequentists
layout: default
category: rstats
published: TRUE
---

# Why we are all naturally Bayesians not frequentists

I don't see why its a thing to say "I'm a Bayesian". Being a Bayesian is normal for any rational person as we will prove in a couple of sentences. Being a frequentist is what is what is strange. It would make more sense to assume we are all Bayesians, and have frequentists have to declare "I'm a frequentist". 

The statistical quantity of interest for frequentist is the likelihood, which is defined as the probability of your observations given your hypothesis. It can be written: 

`Pr(D | H)`

(Equivalently probability of data given we assume a particular model). For a Bayesian the statistical quantity is the probability of the hypothesis given the observations or:

`Pr(H | D)`

(Equivalently probability of a model given the data). 

Say we're out on a boat and we catch a glance of a human sized animal dive underwater with a flap of its tail. Was it a mermaid or a dugong? (A dugong is type of seagrass eating mammal). 

A frequentist would think in likelihoods and conclude, correctly, that both mermaid and dugong are equally likely: Both creatures, if assumed to exist, could result in a similar observation of us seeing a body and a tail diving underwater, i.e.

`Pr(seeing a tail | dugongs exist) ≈ Pr(seeing a tail | mermaid exist)` 

A rational person would guess the observed tail was a dugong. That is because a rational person is thinking in terms of probabilities. The probability we observed a mermaid is vanishingly small, because all prior evidence leads us to believe that mermaids don't exist (though I do know some less than rational people who believe in 'merfolk'). 

In logic, Bayes theorem says we can calculate the probability of the hypothesis 

`Pr(H | D) = Pr(D | H)*Pr(H) / Pr(D)` 

So for the hypothesis "it's a dugong": 

`Pr(dugong | seeing tail) = Pr(seeing tail | dugong)*Pr(dugong) / Pr(seeing tail)` 

For our two models, dugong versus mermaid, we have similar values for the likelihoods and `pr(D)`, but the 'prior probabilities', the `Pr(H)`, are very different. `Pr(dugong)` is plausible (even though is rare to see them), whereas `Pr(mermaid)` is zero, because merfolk don't exist. 

We multiply the likelihood by the prior in the Bayes equation, so the `Pr(mermaid | seeing tail)` becomes zero. 

(If you are new to Bayes theory, you might be wondering what does `Pr(D)` mean? How do we calculate the probability of the data? For the above example it doesn't matter as `Pr(seeing a tail)` is the same for both hypotheses. One of the challenges of Bayes stats in practice is calculating this `Pr(D)`. A lot of statistical computing is devoted to figuring out how to do that. In brief though `Pr(D)` can be calculated as the sum of `Pr(seeing tail | dugong)*Pr(H)` for all discrete hypotheses or the integral if our hypotheses are continuous (like parameter values)). 

Does this philosophical distinction it matter in the practice of statistics? 

The Bayesian version of an analysis, such as a GLM, will often given similar or the same predictions as the frequentist version. Yet ecology, like many other disciplines, has a problem with repeatability and p-hacking. 

Part of the problem stems from the methods we use. For large sample sizes frequentist and Bayesian results often do converge. 

But small sample sizes are common in many fields, including ecology. A small sample size study that finds an extreme and significant result is attractive to publish. This issue has been particularly problematic in [behavioural ecology](https://www.nature.com/articles/s41586-019-1903-y). These false positives come to dominate the literature. 

Appropriate use of Bayesian priors would penalize these extreme effect sizes. This is equivalent to setting a low probability on mermaid sightings above. Some have [called for stronger priors to be the default choice](https://xcelab.net/rm/)

So in every day life we think of probabilities Bayesians, not like frequentists. There are numerous Bayesian R packages now and they are increasingly easy to use. So it makes sense that we should apply the same logic to our statistical analyses as well.  

Thanks to Sober's 'Philosophy of Biology' for this example (he uses gremlins in the roof rather than mermaids) and Coralina for telling me about the book! 
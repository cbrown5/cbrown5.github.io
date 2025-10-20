---
date: '1/29/2018'
title: How do I calculate the R squared metric for a Bayesian model
categories: rstats
published: TRUE
---





A good friend I met on a field trip long ago, [Dominique Roche](https://scholar.google.com.au/citations?user=bXpyrNAAAAAJ&hl=en), recently emailed me to ask about evaluation of Bayesian models.




He has been delving into generalized linear models, using Bayesian methods, and needed to decide what criteria he should use for model simplification (the process of removing 'insignificant' covariates) and/or deciding which covariates had the strongest effect on his response of interest.




I wanted to share an abridged version of our conversation, as I think it is enlightening. Specifically we discussed whether one can (and should) calculate the R-squared metric for Bayesian models (the short answer being that the 'traditional' R-squared metric doesn't make much sense for Bayesian models, but there are alternatives).



As an aside, I have received a lot of helpful feedback on this post since first putting it up, so I am updating it as this comes in. I'm particularly grateful to [Ben Stewart-Koster](https://twitter.com/BStewartKoster) and [Aki Vehtari](https://twitter.com/avehtari) (who's work I cited in the original post) for pointing me towards some important literature I missed in the earlier post (which changed the advice below somewhat).

Model selection is a fast moving area of statistical theory, so it is worth keeping updated. Many of the methods I used a few years ago are now out-of-date.

## The email chain



**Dom:** What criteria can I use to make inferences with my Bayesian model? I've used [MCMCglmm](https://cran.r-project.org/web/packages/MCMCglmm/index.html) (an R package) previously to run multivariate models. However, in addition to doing this in our study, we want to test the effect of multiple predictors (covariates) on our response variables. I'm curious to know if you recommend one in particular (parameter estimate and 95% CI, Bayes factor, ).



**CB:**  You can test the covariates very much like you did for your correlated response model.  Your covariate model will estimate a slope very much like a linear regression. So if you want a criteria for inferences, you can just use the 95% CI on that slope estimate. If it overlaps zero then you could say that the effect of that covariate is 'insignificant'.



You can just then compare the median and 95% CI values for your covariates to see which ones have the largest effect.



Another option is to use the [WAIC](https://arxiv.org/abs/1507.04544) which some stats packages will calculate for you. It is very much like the AIC and can be used to select the most parsimonious model. i.e. your compare models with different sets of covariates and pick the one (or several) with the lowest WAIC.



Now be careful with the WAIC. You don't want to use it for comparing a large number of candidate models, such as you would if you were fitting an model with many covariates and just simplifying it one by one (thanks to Aki Vehtari for pointing this out, [here's the details for the technically minded](https://link.springer.com/article/10.1007/s11222-016-9649-y)).

Using the WAIC too liberally can lead to over-fitting and poor predictive importance - by which I mean you model may fit the data at hand very well, but contains spurious effects and therefore would perform poorly if asked to explain a new dataset.

Vehtari and colleagues provide an alternative statistic for covariate selection, but unfortunately an 'easy way' to calculate it is only available for a few [Bayesian rstats packages](https://cran.r-project.org/web/packages/projpred/index.html). If you are not using those, you will have to program it yourself or wait.

The WAIC will perform better with large sample sizes or for comparing a limited subset of candidate models. I would encourage you to think about writing each model as an alternative hypothesis, then just testing your set of alternatives. This will result in fewer overall tests than testing all possible combinations of covariates with the WAIC.

Another thing to watch out for is that your model may give funky results if the covariates are strongly correlated with each other. A good reference is the book about eco stats by [Zuur that has penguins on the front cover](http://highstat.com/index.php/mixed-effects-models-and-extensions-in-ecology-with-r). (One of my favourite reference books, I can never remember the title though).



Aki Vehtari added (via email) that strongly correlated covariates will throw out your marginal CIs (they will be too wide), effectively increasing the chances of a Type II error (you miss an effect that is real). He has [written more about this here](https://protect-au.mimecast.com/s/C49eCoVzpvf7Z94CWNeLY?domain=rawgit.com).

**Dom:** Your answer confirms what I was thinking - that reporting an estimate and 95% CI is fine for hypothesis testing, which is great.




I'm familiar with model selection and AIC but I usually also report a pseudo R2 (usually using r.squaredGLMM) to indicate how much of the variance my model explains. There is a short paper on that topic which came out recently in JAP (which is [worth reading](http://onlinelibrary.wiley.com/doi/10.1111/1365-2664.13060/full)). Do you know if there a way to compute a pseudo R2 for a multivariate Bayesian model?



**CB:** In short by asking about an R2 for a Bayesian model you are opening a can of worms.

 Bayesians prefer WAIC or LOO (leave one out cross validation) for evaluating models because they integrate across the full posterior probability. The R2 is a point estimate, it is just an evaluation of the mean prediction of the model (so doesn't account for the uncertainty in parameter estimates).



Point estimates don't sit well with the Bayesian philosophy. A Bayesian assumes all parameters are random variables. Whereas, a frequentist would use the R-squared because they are assuming there are actually fixed true values we are trying to observe.

 I do see the appeal of the R2 though, because it is absolute in the sense that 0.9 is 10% better than 0.8. WAIC is not like this.



But, a Bayesian isn't too bothered by R2 because they spend more time looking at the posterior credibility or predictive intervals. You can predict your data using the fitted model and then just see how wide the CIs or PIs are. Wide CIs would be analogous to a poor R2.

Some model specifications might have narrower CIs than others (for instance if you include more informative covariates).

After I published this post [Ben Stewart-Koster](https://twitter.com/BStewartKoster/status/958873062602031104) wrote to tell me that their is a way to calculate a Baysian R-squared and Gelman and colleagues have written about it [here if your interested to learn more](https://twitter.com/BStewartKoster/status/958873062602031104). The Bayesian R2 integrates across the modelled uncertainty, so is not a point estimate.

Another aside, if you are still using the DIC (similar to the WAIC) to evaluate Bayesian models you shouldn't be. It is a point estimate, so makes the same [philosophical fallacy that the R2](https://link.springer.com/article/10.1007/s11222-016-9649-y)) makes for a Bayesian model. It is also now understood to be quite unreliable.



**Dom:** Also, from  a quick look at the paper you sent me (the one about WAIC) and the vignette for the loo package, it seems like implementing model selection for a Bayesian model using WAIC is analogous to carrying out likelihood ratio tests to compare nested models.



How would one go about comparing models with four predictors (no interactions)? Would you compute the WAIC by hand for all possible models and retain the 'best' model(s)? I've used the dredge function in [MuMln](https://cran.r-project.org/web/packages/MuMIn/index.html) to automate the process in the past.



**CB:** The WAIC is just like the AIC, so it is a relative measure of model merit. You would jsut run all candidate models (e.g. with 4, 3, 2, 1 covariates) and compare them.



So far you will have to do this by hand, I'm not aware of anything that automates it like MuMln. Could be very time consuming, because bayes models tend to be slow to run.




Rather than just dredging for the best AIC, I prefer a hypothesis driven approach. So specify the subset of models that each addresses a specific hypotheses, then test and compare with WAIC to find which hypotheses have the greatest support.



**Dom:** RE issues of multi-collinearity - yep, I'm aware that this is something to check for. I've used vifs in the past for frequentist models. Is there something analogous for Bayesian models or does one simply look at correlations?



**CB:** Good question wrt multicollinearity. I'm not actually sure how to formally test for it, never had this probelm in any bayesian models I've run. Something to research. It will be an issue in Bayesian models just as it is in frequentist models, the only exception being that you could get around the issue with strongly informative priors, but that's another story (look at [this paper](https://projecteuclid.org/euclid.ss/1491465621) if you're interested).



## Going forward a Bayesian



Hit me up on [Twitter](https://twitter.com/bluecology)  if you want to join in on the conversation (or don't agree with something I said).



Finally, if you are thinking of going Bayesian for your next GLM, [here's a short review of ways you can do it in  R](http://www.seascapemodels.org/rstats/2017/04/14/glmm-comparison.html).


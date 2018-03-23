---
title: How do I calculate the R squared metric for a Bayesian model
layout: default
category: rstats
published: TRUE
---









As an aside, I have received a lot of helpful feedback on this post since first putting it up, so I am updating it as this comes in. I'm particularly grateful to [Ben Stewart-Koster](https://twitter.com/BStewartKoster) and [Aki Vehtari](https://twitter.com/avehtari) (who's work I cited in the original post) for pointing me towards some important literature I missed in the earlier post (which changed the advice below somewhat).

Model selection is a fast moving area of statistical theory, so it is worth keeping updated. Many of the methods I used a few years ago are now out-of-date.

## The email chain



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



**CB:** In short by asking about an R2 for a Bayesian model you are opening a can of worms.

Point estimates don't sit well with the Bayesian philosophy. A Bayesian assumes all parameters are random variables. Whereas, a frequentist would use the R-squared because they are assuming there are actually fixed true values we are trying to observe.

But, a Bayesian isn't too bothered by R2 because they spend more time looking at the posterior credibility or predictive intervals. You can predict your data using the fitted model and then just see how wide the CIs or PIs are. Wide CIs would be analogous to a poor R2. 

After I published this post [Ben Stewart-Koster](https://twitter.com/BStewartKoster/status/958873062602031104) wrote to tell me that their is a way to calculate a Baysian R-squared and Gelman and colleagues have written about it [here if your interested to learn more](https://twitter.com/BStewartKoster/status/958873062602031104). The Bayesian R2 integrates across the modelled uncertainty, so is not a point estimate.

Another aside, if you are still using the DIC (similar to the WAIC) to evaluate Bayesian models you shouldn't be. It is a point estimate, so makes the same [philosophical fallacy that the R2](https://link.springer.com/article/10.1007/s11222-016-9649-y)) makes for a Bayesian model. It is also now understood to be quite unreliable.



How would one go about comparing models with four predictors (no interactions)? Would you compute the WAIC by hand for all possible models and retain the 'best' model(s)? I've used the dredge function in [MuMln](https://cran.r-project.org/web/packages/MuMIn/index.html) to automate the process in the past.



So far you will have to do this by hand, I'm not aware of anything that automates it like MuMln. Could be very time consuming, because bayes models tend to be slow to run.







## Going forward a Bayesian



Finally, if you are thinking of going Bayesian for your next GLM, [here's a short review of ways you can do it in  R](http://www.seascapemodels.org/rstats/2017/04/14/glmm-comparison.html).
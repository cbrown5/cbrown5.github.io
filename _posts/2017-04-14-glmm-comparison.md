---
layout: md_layout
category: rstats
title: "Choosing R packages for mixed effects modelling based on the car you drive"
published: true
---

Choosing R packages for mixed effects modelling based on the car you drive
--------------------------------------------------------------------------

There are many roads you can take to fit a mixed effects model
(sometimes termed hierarchical models) in `R`. There are numerous
packages that each deploy different engines to fit mixed effects models.

In this driveability review, I look at some of the dominant packages for
mixed effects models The focus of this review is on the practicality of
each package, rather than their numerical accuracy. Information on
numerical accuracy can be found in the academic literature, see the
bibliography below. I will lookat each package's handling, speed and
adaptability for tackling different types of questions.

*Summary of the packages strengths and weaknesses. Speeds are relative
to `lme4` in a test case problem, see below for details.*

<table style="width:95%;">
<colgroup>
<col width="15%" />
<col width="12%" />
<col width="13%" />
<col width="12%" />
<col width="12%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th><code>lme4</code></th>
<th><code>rjags</code></th>
<th><code>INLA</code></th>
<th><code>RStan</code></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td> Relative speed </td>
<td>1</td>
<td>100</td>
<td>10</td>
<td>60</td>
</tr>
<tr class="even">
<td> Handling- ease of coding<sup>1</sup> </td>
<td>Straightforward</td>
<td>Hard</td>
<td>Moderate</td>
<td>Hard</td>
</tr>
<tr class="odd">
<td> User manual </td>
<td>Accessible</td>
<td>Brief and technical</td>
<td>Very technical<sup>2</sup></td>
<td>Highly accessible</td>
</tr>
<tr class="even">
<td> Online documentation </td>
<td>Extensive</td>
<td>Extensive</td>
<td>Nascent</td>
<td>Nascent</td>
</tr>
<tr class="odd">
<td> Support from developers<sup>3</sup> </td>
<td>Good</td>
<td>Good</td>
<td>Outstanding</td>
<td>Good</td>
</tr>
<tr class="even">
<td> Testing for accuracy </td>
<td>Extensive</td>
<td>Extensive for some types of models</td>
<td>Nascent</td>
<td>Nascent</td>
</tr>
<tr class="odd">
<td> Adaptability - types of models you can fit </td>
<td>Limited</td>
<td>Your imagination is the limit</td>
<td>Extensive</td>
<td>Almost as much as JAGS</td>
</tr>
<tr class="even">
<td> Best for </td>
<td>Simple problems, quick implementation</td>
<td>Customising complex models</td>
<td>Spatio-temporal models</td>
<td>Developing new types of models</td>
</tr>
<tr class="odd">
<td> How you will look driving it </td>
<td>Traditional, but elegant</td>
<td>You like to take the scenic route</td>
<td>Edgy and slightly mysterious</td>
<td>Hanging with the cool kids</td>
</tr>
</tbody>
</table>

1. but see below for some add-on packages which make life easier for
STAN and JAGS
2. = lots of equations
3. In my experience. But, heck these packages are all free and all give better user support than many
paid services!

The first is
[`lme4`](https://cran.r-project.org/web/packages/lme4/index.html),
meaning linear mixed effects models with `S4` classes. `lme4` is like an
older model sports-car - fast, respectable, well known and able to
handle common types of questions. `lme4` uses maximum likelihood methods
for estimation, so interpret its statistics as a
[frequentist](https://stats.stackexchange.com/questions/22/bayesian-and-frequentist-reasoning-in-plain-english).

The next three packages are Bayesian techniques.

The second package is
[`rjags`](https://cran.r-project.org/web/packages/rjags/index.html),
which is an interface to the ["Just Another Gibbs
Sampler"](http://mcmc-jags.sourceforge.net/) program. `rjags` is the
Land-Rover of packages for mixed effects models: well tested, able to
tackle just about any terrian, but slow and prone to breaking down
(usually a user error, rather than the package itself).

<div class = "image_caption_wide">
<img src ="/Images/cars-glmm.png" alt="" class="wide_image"/>
<p> My take on reviewing R packages for Generalised Linear Mixed Effects. Clockwise from top left: The `lme4` package is fast but a bit older, like an early noughties Ferrari; the JAGS program goes anywhere like a Range Rover, but breaks often and is slow; the Stan language is modern and efficient like a hybrid BMW and INLA is fast and modern but requires technical expertise like a Tesla. </p>
</div>

The third package is [`INLA`](http://www.r-inla.org/), standing for
"Integrated Nested Laplace Approximation". `INLA` is like an electric
sports car: it is a modern technique that is lightning fast, but there
has been limited testing to date and you better understand what is under
the hood before you attempt to drive it.

The final package is
[`RStan`](https://cran.r-project.org/web/packages/rstan/index.html),
which is the `R` interface to the [Stan modelling
language](http://mc-stan.org/). `RStan` is like like BMW's hybrid,
combining computational speed with flexibility and with exceptional
documentation and support.

Now, let's look at each packages computational speed, handling (ease of
use), driver support (documentation, existing knowledge and forums) and
flexibility.

Skip to the end for a biblography of examples and some cool packages
that build on these tools.

### A note about philosophy

The frequentist and Bayesian approaches I review here come from
[fundamentally different statistical
philosophies](https://stats.stackexchange.com/questions/22/bayesian-and-frequentist-reasoning-in-plain-english).
Here I will tackle the approaches pragmatically, looking at estimation
speed and so on, however you might exclude one or the other a-prior
based on your bent towards Bayesian or frequentist thinking.

### Speed

I simulated a simple hierarchical data-set to test each of the models.
The script is available [here](/data/glmm-comparison-script.R). The
data-set has 100 binary measurements. There is one fixed covariate
(continuous ) and one random effect with five groups. The linear
predictor was transformed to binomial probabilities using the logit
function. For the Bayesian approaches, slightly different priors were
used for each package, depending on what was available. See the script
for more details on priors.

For each package I fit the same linear model with binomial errors and a
logit link. To fit the models I used the functions `glmer()` from
`lme4`, `inla()` from `INLA`, custom code for `rjags` and the
`stan_glmer()` from the package
[`rstanarm`](https://cran.r-project.org/web/packages/rstanarm/index.html)
to fit the Stan model (you can also write your own custom code for
`RStan`, but for convenience I used the canned version of mixed effects
models).

*Computational speeds for fitting a binomial Generalised Linear Model to
100 samples with one random and one fixed effect. Relative times are
relative to `lme4`*

<table>
<thead>
<tr class="header">
<th>Measurement</th>
<th><code>lme4</code></th>
<th><code>rjags</code></th>
<th><code>INLA</code></th>
<th><code>RStan</code></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Speed (Seconds)</strong></td>
<td>0.063</td>
<td>6.2</td>
<td>0.59</td>
<td>3.8</td>
</tr>
<tr class="even">
<td><strong>Speed (relative)</strong></td>
<td>1</td>
<td>99</td>
<td>9.4</td>
<td>60</td>
</tr>
</tbody>
</table>

So `lme4` is by far the fastest, clocking in at around 6 tenths of a
second (on my 3GHz Intel i7 Macbook Pro). `INLA` comes in second, ten
times slower than `lme4`, then followed an order of magnitude later by
`RStan` and finally `rjags` came plodding along behind about 100 times
slower than `lme4`.

If you run the code I have provided you will see that all packages come
up with similar estimates for the model parameters.

### Handling - ease of use

`lme4` leads the pack when it comes to ease of use. If you have your
data sorted, then you can go from zero to fitted model in one line of
code. `INLA` is similar, however you should generally not rely on
default priors but specify your own, which requires additional code and
thinking.

Use of `RStan` and `rjags` depends on how you use them. You can write
your own model code, which can lead to quite lengthy scripts, but also
gives you greater number of choices for how you design your model.
However, there are also many packages that provide wrapper's to `RStan`
and `rjags` that will fit common types of models (like mixed effects
models). These tend to be as simple as `INLA`'s functions, remembering
that you should think carefully about [prior
choice](https://github.com/stan-dev/stan/wiki/Prior-Choice-Recommendations).

If you are going to write your own models, you will need to get good at
debugging, so there is an extra overhead there.

**Model checking** is another important consideration.

For users familiar with GLMs, `lme4` probably provides the most familiar
support for model checking. `INLA` can be more difficult to use, because
it requires the user to hand-code many model checking routines. `INLA`,
`rjags` and `RStan` also require the user to carefully check that the
fitting algorithms have performed properly.

Each of these packages use different types of algorithms, so the
statistics you will use to check algorithm performance are different.
See each package's documentation for further advice.

### Driver support - documentation and support

`lme4` and `RStan` have the highest quality user-manuals. Both are well
written and provide numerous examples that users will find helpful.

The user manual for `rjags` and JAGS is somewhat brief, but the user can
easily find many helpful examples on the web, and these packages are
covered by numerous books. So if you are willing to broaden your search
you should have no trouble finding help.

`RStan` and `INLA` are both relatively new, so fewer examples can be
found on the web. While `RStan` has an excellent manual for both the
mathsy and non-mathsy types, documentation of `INLA` can be difficult to
follow for novice users, because much of it is equations.

**Web support and chat groups** are also an important aspect of model
development. Help for all packages can be found on sites like
[Stackoverflow](http://stackoverflow.com/questions/tagged/lme4), or you
can post your own new questions there.

Personally, I have found that support for `INLA`, [through their
forum](https://groups.google.com/forum/#!forum/r-inla-discussion-group),
is exceptional. On several occaisons I have posted questions for which I
could not find documentation and have generally recieved a response from
`INLA`'s developers before the end of the working day. This is amazing,
because it is better than you would expect from many paid services.

I have not participated in forums for the other packages, so I can't add
comments here.

One final note on support is that `lme4` and JAGS are both pretty well
studied approaches to modelling and there are numerous academic papers
dealing with their biases and accuracy. `INLA` and `RStan` are
relatively new on the scene, so for new and different types of problems
you might want to run your own simulation study to check that your model
is performing as expected.

### Adaptability - ability to tackle different types of problems

Your imagination is the limit with `rjags` - take it on well driven
routes, like a mixed effects model, or off-road on new adventures with
Bayesian structural equation modelling - it can do it all.

`rjags` is followed closely by `RStan`. `RStan` has a few limitations,
but can basically do anything JAGS can do, and often faster (e.g. [this
ecological
study](http://onlinelibrary.wiley.com/doi/10.1111/2041-210X.12681/full)).
`RStan` will probably eventually replace `rjags`, but to date `rjags`
persists because of the extensive range of well documented examples
users can build on.

`INLA` comes in fourth with a diverse range of built in likelihoods and
model functions (you can even ask the developers to add more and they
might do it!). `INLA` is becoming particularly popular for modelling
spatial and temporal auto-correlation, partly due to its speed. You can
do these types of models with `RStan` and `rjags` but computations might
be impossibly slow.

`lme4` is the least flexible of packages - though there are some options
to customise it's models. The similar `nlme` package also provides a
range of tools for fitting random effects for spatial and temporal
autocorrelation.

There are however, some clever tricks you can do with `lme4` to fit a
broader range of models. For instance, you can include a random effect
where every sample is a separate group in a Poisson GLM to get a Poisson
with extra variation.

### Conclusion

That's all. I hope this blog helps you make a good choice before
investing in learning a new tool for mixed effects models. [Let me
know](https://twitter.com/bluecology?lang=en) how you go and if you
found this useful.

### Cool applications of mixed effects models in R

[rstanarm](https://cran.r-project.org/web/packages/rstanarm/vignettes/rstanarm.html) for mixed effects models coded like `glm()` but using Stan for estimation.

[glmmBUGS](https://cran.r-project.org/web/packages/glmmBUGS/index.html) for mixed effects models coded like `glm()` but using JAGS for estimation.

[A new function in the mgcv package (links to
pdf)](https://www.jstatsoft.org/article/view/v075i07/v75i07.pdf) for
auto-writing code for Bayesian Generalised Additive Models.

[A new study](http://www.r-inla.org/barrier-model) showing how you can
fit spatial models with barriers.

Fit [Bayesian Latent Variable
models](https://cran.r-project.org/web/packages/boral/index.html) for
analysing multivariate data (e.g. ecological communities).

[The GLMM in
R FAQ](http://glmm.wikidot.com/faq)

### Bibliography

Unless otherwise indicated, these resources are open access.

[Stan](http://mc-stan.org/documentation/) user manual.

[JAGS](https://www.google.com.au/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjn2ZSp9KPTAhVDTrwKHRueAbMQFggjMAA&url=http%3A%2F%2Fwww.stats.ox.ac.uk%2F~nicholls%2FMScMCMC15%2Fjags_user_manual.pdf&usg=AFQjCNH7r4e1fZFtwIh9qlUGLcuHXXXZdQ)
user manual.

[Introduction to lme4
(pdf)](https://cran.r-project.org/web/packages/lme4/vignettes/lmer.pdf).

[INLA](http://www.r-inla.org/home) project page.

[INLA](https://groups.google.com/forum/#!forum/r-inla-discussion-group)
forum.

[Mixed Effects Models and Extensions in Ecology with
R](http://www.springer.com/gp/book/9780387874579) my go-to book for
theory and code for fitting likelihood based mixed effects models (e.g.
with `lme4`). You will have to buy it.

[A good example for how to design a simulation study to test your
models](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0075957)

[Example for INLA for spatial
models](http://onlinelibrary.wiley.com/doi/10.1111/j.2041-210X.2012.00211.x/full)
in ecology.

[A review of mixed effects models in fisheries
science](https://academic.oup.com/icesjms/article/72/5/1245/758333/Mixed-effects-a-unifying-framework-for-statistical)
(good for other disciplines too).

[NIMBLE](https://r-nimble.org/) another R package for Bayesian
modelling.

[glmmADMB](http://glmmadmb.r-forge.r-project.org/) another R
package giving greater flexibility for fitting using maximum likelihood.

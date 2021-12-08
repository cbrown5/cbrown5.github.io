---
title: Rules of thumb for the design of ecological experiments
layout: default
category: rstats
published: TRUE
---

Rules of thumb for the design of ecological experiments
=======================================================

Are you planning an experiment in the lab or field, or an observational
study? Its a good idea to talk to a statistician before you start.

Students often ask me for help with statistics *after* they’ve collected
their data. However, it’s common they need help with statistics because
of issues with the experimental (or observational) design.

A stats model can never completely fix design flaws. So below are some
tips and rules of thumb, based on my experiences helping students
analyze their datasets.

For a more complete discussion of experimental design I recommend [Quinn
and Keough’s classic book: Experimental Design and Data Analysis for
Biologists](https://www.cambridge.org/highereducation/books/experimental-design-and-data-analysis-for-biologists/BAF276114278FF40A7ED1B0FE77D691A#overview).

See also [this recent
review](https://www.sciencedirect.com/science/article/pii/S0169534721002263?casa_token=yCc9bRLcIlsAAAAA:MXEQyE-MRglV4AaQfLeDleVTWoKfExOJU1eX10lqez3bUwhhlL2p3aO_SSQ0E1UGq8zjC8ak)
of four important logical principles that need to be met in design to
infer causality.

This is a working document for my students, so please write me
(<a href="mailto:chris.brown@griffith.edu.au" class="email">chris.brown@griffith.edu.au</a>)
if you have suggestions for improvements on the below.

Some definitions
----------------

Just quickly, below I’ll refer to:

‘Experiments’ as manipulative experiments in the lab or field

‘Observational studies’ as field studies that sample across gradients of
natural variation to try and identify effects on a response variable
(AKA mensurative experiments).

‘Environmental gradients’ as gradients in a covariate of interest,
e.g. rainfall or fishing pressure. These can occur naturally in the
field, or be the result of manipulation in an experiment.

‘Nuisance variables’ are sources of variation you aren’t interested in
studying, but which you have to deal with.

‘Samples’ are the units of observation.

Rules of thumb
--------------

### Plan for failure

Undoubtedly things will fail. Plants die when they’re not meant to, you
can’t visit a site because of a suspicious landholder, your volunteer
stuffs up a bunch of measurements, someone turns the power off in the
lab… There’s a long list of reasons that your design won’t turn out like
you planned.

So make sure your design is robust to the loss of some of your samples.

### Stratify your sampling across treatments of interest

Ideally you’ll have relatively equal sampling intensities across
different treatment levels, or along an environmental gradient of
interest (but see below).

In the old days having equal sample sizes for each treatment level, a
‘balanced design’ was critical for straightforward stats (e.g. with Type
I ANOVA). This rule isn’t so strict with modern GLMs and extensions.

However, it is still important to have sufficient sampling across a
gradient or levels of a treatment. You need this to be able to estimate
the treatment’s effect relative to background variation.

Its usually straightforward in laboratory experiments to have equal
sample sizes of each treatment level. In observational studies,
balancing sampling can be more challenging.

A common issue is insufficient sampling at all combinations of
environmental gradients. As an example, I’ve often worked on analyses of
how pollution and fishing pressure affect coastal fish abundance.
Unfortunately, these gradients are highly confounded: polluted sites are
nearer the coast and tend also to have higher fishing pressure. This
means it is impossible to separate the effects of pollution and fishing
pressure on fish abundance.

An improved observational design would include sites with low pollution
and high fishing pressure and vice-versa (if they exist). This would
enable us to statistically separate the effects of pollution and
fishing, as well as estimate their interaction.

### Dealing with background variation: randomize or control?

You have two broad options for dealing with background variation and
‘nuisance’ variables. You can try and control them, so they are constant
across all samples. For instance, in an experiment you may keep
temperature constant, so you can examine the effects of nutrients on
algal growth.

Controlled designs have greater power to detect changes of interest.
However, they are less general (the results of the algae experiment
above only applies at one temperature) and more susceptible to
overestimating the effect of a covariate.

An alternative option is to randomize your sampling with respect to
background sources of variation. Such a design will have reduced power
compared to a controlled design, but the effect sizes you estimate will
be more general and realistic (typically they are smaller). \#\#\#
Randomize your sampling

Random sampling is the basic assumption underlying most stats tests.

Watch out for sample selection methods that masquerade as random
sampling. Ad-hoc sampling, like throwing a quadrat around the intertidal
zone, can result in biased inferences.

For instance, in a mangrove forest you’d have to be careful to sample
both sparse and dense patches of forest. Identifying sample locations
beforehand with randomly picked GPS points is one way to address this.

Another example is citizen science data, which tends to be heavily
biased by accessibility of sites.

Stats can help overcome non-random sampling - you can control
statistically for non-random designs if you have some idea of the
drivers of sampling (like distance to cities for citsci). But you’ll
need to know the drivers well enough to model them.

### Watch for hidden psuedoreplication

Psuedo-replication means your samples aren’t truly independent. The
classic example is a design of fish in tanks. If you have 10 tanks and 5
fish in each tank, your replicates are tanks, fish in tanks are
psuedo-reps (because they share the same water).

This issue can be hidden. For instance, climate change tank experiments
often have a single water circulation system per treatment level
(e.g. controlling OA or temperature). This means all the replicate tanks
on the same system aren’t truly independent samples. Solutions are to
have one circulation system per treatment (but expensive!) or run the
experiment multiple times to get temporally independent samples.

If you have psuedo-replication its not the end of the world. Mixed
effects models (e.g. with `lme4`) are how you model that.

### Blocking designs

Once you’ve identified psuedo-replication you may want to use a blocking
design to deal with the issue.

For example, say you are applying different nutrient and temperature
treatments to see how it affects algae growth. You can only grow 10
samples of algae per week and your target is 50 samples. So you will run
the experiment over 5 weeks, doing 10 samples per week.

Ideally, you will want to run every nutrient and temperature treatment
every week, so you can separate the effect of ‘week’ from your treatment
effects.

But say you only have one incubation chamber for maintaining a constant
temperature. So each week can only be one temperature. Then you’ll want
to either: run the same temperature over multiple weeks or, run a
gradient of temperatures (see below). Within each week you will still
run every nutrient level. You will also want to randomize the order that
the temperature treatments are applied.

This will ensure you can estimate the temperature effect and how it
applies across different nutrient levels. Multiple samples across weeks
will let you remove (statistically) that nuisance variable.

### More covariates or more replicates?

**Easy answer: maximize replication over measuring ‘everything’ at each
sample.**

Initial plans I see from students, especially for field designs, often
involve measuring a lot of variables at very few samples But, such
designs end up with have low power and a lot of confounded variables,
because you end up with more covariates to test than samples to test
them.

You have a better chance of getting a useful and interesting result if
you focus on just a few major patterns. Then you can sample more sites
and get replication numbers up.

As an example, imagine you can sample 3 sites per day to do rapid
assessments of insect taxa diversity and forest structure, or take 2
days to make a detailed assessment of a single site, including document
all plant and insect species. The rapid assessment could get you to 42
sites over 3 weeks, versus only 7 sites for the detailed assessment. 42
sites is getting up towards a sample size that is useful for regression
modelling (e.g. with `glm`), whereas 7 is far from enough.

Of course the replication level you need depends on how variable the
system is, but in my (marine fish biased) experience of analyzing
ecological field experiments, ~50 independent sites is usually a
minimum.

### Replicated or Gradient design?

**Easy answer: gradient designs are better for prediction, and designing
for prediction is the future of ecology.**

But, replicated designs have more power to detect an effect.

Say we are doing an experiment measuring how fast algae grow in flasks
under different nutrient levels. We can fit 30 flasks in the lab. Here’s
three ways to assign them to nutrient levels: Gradient (every flask gets
a different nutrient level), replicated (just two nutrient levels), or
hybrid of gradient and replicated.

![](/images/2021-12-07-experiment-rules-of-thumb/unnamed-chunk-1-1.png)
What should you do?

The replicated design is more typical of ecological experiments. This
design gives you the greatest power to detect an effect of nutrients on
algae growth (meaning best chance to find p&lt;0.05 if there is an
effect).

Replicated designs may also be preferred for practical reasons, for
instance, it may be expensive or time consuming to have multiple levels
of the treatment (e.g. requiring multiple different incubators in a
warming experiment).

BUT, there’s a catch. What if your ecological response is non-linear,
then your replicated design implies a linear relationship between the
two levels, e.g. here are results of a gradient vs replicated design for
a non-linear response:

![](/images/2021-12-07-experiment-rules-of-thumb/unnamed-chunk-2-1.png)
So your ability to predict the ecological response is very poor with the
replicated design.

[This studies provides a series of analyses with simulated and real data
to compare our ability to predict with different
designs](https://onlinelibrary.wiley.com/doi/full/10.1111/ele.13134?casa_token=3RljBqHtxjoAAAAA%3A1cOl5AH_6eJ5FjId-b7KuQx9c4wjXZYcDSqd6Pf22w5ydHHYF6Jxq6nw1XmkwmddadcrgdE3SNqe).

The above graph assumes you at equal intervals along the gradient. If
you know there are regions of rapid change in your response, you could
intensify your sampling around those regions.

Hybrid designs are a compromise on prediction and power and may work
well in many cases.

[Ecology desperately needs to become more ‘predictive’ for a whole heap
of
reasons](https://onlinelibrary.wiley.com/doi/full/10.1111/oik.03726?casa_token=MniBN5c-xCgAAAAA%3AkR3tErN9v1ZUqvAdCCWWfWz7E9se0Y5xyzy1PJQOKS73Kv3IpCvDQPQWUzIMN4o1S-elUV0VOVR8),
including being able to inform ecosystem management, [predict effects of
multiple
stressors](https://royalsocietypublishing.org/doi/full/10.1098/rspb.2020.0421),
and for testing fundamental theories. So I encourage you to consider a
gradient or hybrid design.

Summary
-------

Designing experiments takes careful thought and planning. The skill of
design is finding where statistical and logical requirements meet
practical realities.

If you have advice to add, or don’t agree with any of the above, feel
free to let me know:
<a href="mailto:chris.brown@griffith.edu.au" class="email">chris.brown@griffith.edu.au</a>

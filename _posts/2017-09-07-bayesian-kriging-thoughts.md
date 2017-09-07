---
title: Some thoughts about Bayesian Kriging in INLA
layout: default
category: rstats
published: TRUE
---

# Some thoughts about Bayesian Kriging in INLA

I have been playing around with spatial modelling in the R [INLA](http://www.r-inla.org/home) package. This blog just records a few thoughts I have had about using INLA for kriging (spatial interpolation). I am keen to discuss these ideas with others.

Kriging is super useful tool for 'filling in the gaps' between sampling sites. e.g. see [this map ](http://www.seascapemodels.org/rstats/2017/02/22/spatial-statistics-photos.html). Handy if you want to make a map, or need to match up two spatial data sets that overlap in extent, but have samples at different locations.

You can do kriging the old fashioned way in R or even in ARC GIS. The advantage of using INLA though is that you can use Bayesian inference to do your kriging.

This means you can interpolate non-normal error structures (like counts or presence/absence data). You can also include other fixed covariates, like a spatial layer of temperatures. Or you can even include, other random effects. For instance, you could do spatio-temporal kriging if you had time-series at each of your sites.

For a simple tutorial on spatial modelling in INLA see [here](https://www.math.ntnu.no/inla/r-inla.org/tutorials/spde/inla-spde-howto.pdf) or my [blog series on making maps from geotagged photos](http://www.seascapemodels.org/rstats/2017/02/22/spatial-statistics-photos.html).

Sorry, there will be no code or figures with this post. I can't share the data for the example I am working on yet. Will post it in a few months if I can.

So here are some thoughts I have had while working with my latest INLA model.

## Grid scale for interpolations

The standard advice, that I read somewhere on the INLA page was that the grid size or triangulation you use should have edges that are somewhat smaller than the spatial range parameter (as explained in my [blog](http://www.seascapemodels.org/rstats/2017/02/22/spatial-statistics-photos.html)).

However, I have been finding that tweeking the edge size (e.g. making the `cutoff` parameer in `inla.mesh.2d` larger) can be useful for visualising spatial trends at different scales.

**If you make your grid size much larger than the distance between the closest sites, you get a much better picture of large scale spatial trends.**

Say you have highly clustered sampling and there is a large amount of variability within clusters that swamps large-scale trends. For instance you may be measuring stuff on coral reefs as you sail your boat around. It is likely you will hit up a bunch of sites nearby to each other, then sail off to another reef some distance away then survey another bunch of sites.

The end result will be lots of clusters of samples that have large distances between them. Coral reef data are typically highly variable, even at small spatial scales and large-scale (100s km) trends are often quite weak (though real!). Fish surveys are the worst, because fish swim around, often in schools, so often true ecological trends are well hidden under a stack load of observer error.

If you interpolate reef data with a very small grid, that matches the scale parameter, you end up with a very patchy looking map. Whereas, if you use a large grid, you get a much smoother looking map that just captures the weaker, but perhaps more important, broadscale trends.

This map will hide the considerable local scale variation, so it is worth plotting that as a separate map too.

Effectively, this is just like doing averages on a small vs large grid.

I can't  find it right now, but someone did write a guidance tutorial for setting up grids/triangulations for INLA. If you know where it is, let me know and I will post it.

## Smoothing parameter

I hadn't played around much with the `alpha` parameter in INLA's Matern model before. You change it when specifying the matern mesh before fitting your model `inla.spde2.matern(mesh, alpha = 1.9)`.

Large values (approaching 2) give smoother trend, whereas values closer to zero will show more of the bumps in a spatial field. Of course, choice of this parameter will interact with how you define your grid.

It can make a big difference to your resulting interpolation. I am not sure much advice exists on how to choose it. I would be interested to hear from others what they think.

Two ways to choose this parameter would be based on aesthetics of the resulting map (if you are just making a map), or perhaps using cross-validation or information criteria to choose the parameter.

## Playing with priors to get shrinkage to a null hypothesis

Some of the INLA developers and co recently published a [cool paper about choosing priors for hyperparameters](https://projecteuclid.org/euclid.ss/1491465621).  The hyperpriors control how much your spatial surface can vary. They are quite hard to set based on true 'prior evidence', because they are abstract parameters.

[Simpson and co](https://projecteuclid.org/euclid.ss/1491465621) give an example of the variance parameter in a single dimensional model, but the same idea applies to spatial gradients too. (I also have a blog about hyperpriors for time-series [here](http://www.seascapemodels.org/rstats/2017/06/21/bayesian-smoothing.html)).

If you make your hyperprior on spatial/temporal variance very peaked near zero with a long tail, then effectively it is like saying there is probably no spatial variance and a small chance of lots of spatial variance.

The effect in your model will be the spatial trend 'shrinks' toward a flat gradient, unless your data are strong enough to overcome the no gradient prior. This is like having a null hypothesis of no gradients.

e.g. see the last figure in my [blog here](http://www.seascapemodels.org/rstats/2017/06/21/bayesian-smoothing.html) where a stronger prior effectively fits a model to a time-series with a slope of zero (ie no temporal trend).

An even more useful way of thinking about this is that you can play around with the priors to get the desired level of smoothing in your spatial (or temporal) model.

I think this idea is pretty radical. We are shifting away from thinking that priors should be unininformative if you have no prior data (like in the bad old days of the Winbugs `gamma(0.001, 0.001)` prior for variances), and towards a philosophy where some priors can be tuned and (specifically hyperpriors for variance parameters) should be very very informative.

This is a pretty powerful idea. In effect an informative prior can encode our null hypothesis and a stronger prior will require stronger trends in the data to 'break away from' the null hypothesis. If you really want to show your data contain a powerful trend, then try to smash it with a very informative prior that peaks near zero variance.

As a hint of a paper I want to work on soon, imagine you have super variable data that have stack loads of observer error and weak ecological trends (like surveys of schooling fish on coral reefs). You want to estimate the ecological gradient under all that noise. Well you could get prior information on the extent of spatial variation attributable to true ecological variable. You could then use that prior information to inform a variance prior that helps you estimate the latent spatial field for true ecological gradient. In effect, you are removing the observer signal.

That's all for now. [Email me](http://www.seascapemodels.org/people/Chris-Brown.html) or [tweet](https://twitter.com/bluecology) me if you like this, or think I am talking rubbish.

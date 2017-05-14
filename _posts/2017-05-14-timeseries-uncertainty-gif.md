---
layout: md_layout
category: rstats
title: "Visualising uncertainty in time-series using animations"
published: true
---

Visualising uncertainty in time-series using animations
-------------------------------------------------------

I was reading an example of visualising election outcome uncertainty
using a [wobbly
needle](https://medium.com/@jofu/openvis-2017-a-recap-3e945bb9f267) and
wondered, could animating uncertainty help communicate for the kind of
work I do on population modelling?

<img src ="/Images/time_series_uncertainty_figs/images_pause.gif" alt="" class="image"/>

One challenge when plotting uncertainty intervals for population trends
is that confidence intervals don't capture the wandering nature of
population processes. The figure here shows the median of a poisson
random walk, with 90% quantiles.

In fact, each trend line will wander around, like the next image. So,
the median and intervals give a false impression that an individual
trend will experience relative stability.

<div class = "image_caption">
<img src ="/Images/time_series_uncertainty_figs/tsu_ciplot.png" alt="" class="image_float"/>
<img src ="/Images/time_series_uncertainty_figs/tspng_30.png" alt="" class="image_float"/>
<p> A graph of the median and quantiles doesn't represent the uncertainty in any single trend line very well. </p>
</div>

I decided to try and animate the uncertainty, using R.

The first step was to try and install the R package `animate`.
Unfortunately I was in a world of Unix coding pain trying to get
animation to work. In particular to get R to talk to the
[ImageMagick](https://www.imagemagick.org) program. After cutting and
pasting numerous commands from StackOverflow to my terminal I gave up.
It seems I need to update my OS before I can get any further (from
Mavericks).

In the end I found I could use ImageMagick directly from the command
line. So now what we need is a folder full of .png files that we wish to
turn into the animation. That Unix code to do that is at the end of this
blog.

First we should set up a random walk process. I decided to go for a
Poisson random walk, because it will have integer numbers, like a real
population. I wrote a little function to achieve this

    walkmod <- function(t, yinit, thetasd, rho){
      y <- numeric(t)
      y[1] <- yinit
      theta <- rnorm(t, sd = thetasd)
      for(i in 2:t){
        lambda <- (y[i-1]*rho + yinit*(1-rho))* exp(theta[i])
        y[i] <- rpois(1, lambda)
      }
      return(y)
    }

The core equation is in the `for` loop. It just says the mean abundance
at a given time is dependent on abundance at the last time-step with
correlation `rho` plus some extra variation `theta`. We then sample the
observed abundance from a poisson distribution.

Now let's use our function. We will load in the `purrr` package to help
plotting replicate runs of the random walk and the `leaflet` package
because it has some nice functions for making colour scales.

    library(purrr)
    library(leaflet)

    t <- 50
    yinit <- 10
    thetasd <- 0.01
    rho <- 0.9
    n <- 30

    y <- matrix(NA, nrow = t, ncol = n)
    tmat <- matrix(rep(1:t), nrow = t, ncol = n)

    for (i in 1:n){
        set.seed(i)
        y[,i] <- walkmod(t, yinit, thetasd, rho)
    }
    ymax <- max(y)
    medy <- apply(y, 1 , median)

We just looped over the `walkmod` function `n` times so we could
generate `n` random walks.

Now let's build a colour scale. I would like to colour the lines by the
abundance quantile they end on. So we apply `colorQuantile` to all
abundances in the last time-step to get a red to blue (`RdBu`) colour
palette for the lines:

    quants <- c(0, 0.25, 0.5, 0.75, 1)
    yquant <- quantile(y[t,], probs = quants)
    mycols <- colorQuantile("RdBu", domain = y[t,], probs = quants)

The trick to making a .gif animation is just to make a bunch of figures
and save them as .png files in the order you want them to animate (or if
you can get `animate` package to work within R you can export the .gif
directly without having to save the .pngs).

So we just loop over `walkmod` plotting our lines each time. Note I use
`walk` from the `purrr` package to redraw the background lines in grey
each time.

    thispath <- "/insert/your/path/here/"

    for (i in 1:n){
        fname <- paste(thispath, i, ".png", sep = "")
        png(filename =fname, width = 480, height = 480)
        plot(0, 0, xlim = c(0, t), ylim = c(0, ymax),
             bty = 'n', type = "n", las = 1,
             ylab = "Abundance", xlab = "Time")
        lines(1:t, medy, col = "grey90", lwd = 2)
        walk(1:i, ~lines(tmat[,.x], y[,.x], lwd = 0.7, col = grey(0.5, 0.2)))
      lines(1:t, y[,i], lwd = 2, col = mycols(y[t, i]))
        legend("topleft", legend = quants,
            lwd = 2, col = mycols(yquant),
        title = "Quantile t=100", cex = 0.8)
      dev.off()
    }

If you want to check this from R, without saving the files, then turn of
the `png()` function that saves the files and insert `Sys.sleep(0.1)` at
the end of the loop, so it will print each figure in turn but pause for
1/10 <sup>th</sup> of second each time.

We have one final figure to plot, that is the median line. We can do
this outside the `for` loop:

    fname <- paste(thispath, i+1, ".png",  sep = "")
    png(filename =fname, width = 480, height = 480)

    plot(0, 0, xlim = c(0, t), ylim = c(0, ymax),
         bty = 'n', type = "n", las = 1,
         ylab = "Abundance", xlab = "Time", main = "Median")
    walk(1:i, ~lines(tmat[,.x], y[,.x], lwd = 0.5, col = grey(0.5, 0.2)))
    lines(1:t, medy, lwd = 3, col = "purple")
    dev.off()

    cd "your/path/here"
    magick *.png images.gif
    convert images.gif -set delay 30 \( +clone -set delay 100 \) +swap +delete images_pause.gif

The first line creates the gif and the second line adds a pause of 30
1/100ths of a second after each image and a pause of 1 second at the end
of the loop.

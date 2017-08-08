---
layout: default
category: Rstats
title: "Sensitivity analysis in R the easy way"
published: false  
---

## Sensitivity analysis in R the easy way   

Is the tedious process of running sensitivity analyses on your numerical model getting you down? Have you got loops inside of loops inside of loops in an attempt to iterate your model across all parameter combinations?  

I recently discovered there is a much easier way to do sensitivity analyses, using the functions `expand.grid()` and `Vectorize()` you can run your sensitivity analyses in just two lines of code. Here's how it works.

### A simple case  


nsds <- 30
nmeans <- 50
means <- seq(-1, 1, length.out = nmeans)
sds <-  seq(0.01, 3, length.out = nsds)
probs <- c(0.025, 0.5, 0.975)

dat <- expand.grid(means = means, sds = sds)

vpnorm <- Vectorize(pnorm, vectorize.args = c('mean', 'sd'), SIMPLIFY = TRUE)

quants <- vpnorm(probs, mean = dat$means, sd = dat$sds)

dat2 <- data.frame(cbind(dat, t(quants)))



popmod <- function(Bt, r, K, Ht){
	Bt + ((r*Bt) * (1 - ((Bt/K)))) - Ht
	}


simmod <- function(tmax, B1,  K, r,fmort){
	B <- rep(NA, tmax)
	B[1] <- B1
	H <- rep(NA, tmax)
	for (t in 2:tmax){
		H[t] <- B[t-1]*fmort
		B[t] <- popmod(B[t-1], r, K, H[t])
	}
	list(B = B, H = H)
}

vsimmod <- Vectorize(simmod, vectorize.args = c('fmort', 'r'), SIMPLIFY = F)


tmax <- 100
B1 <- 1
K <- 20

nr <- 100
nF <- 50
rvec <- seq(0.01, 0.5, length.out = nr)
Fvec <- seq(0, 0.1, length.out = nF)

dat <- expand.grid(r = rvec, Fmort = Fvec)

result <- vsimmod(tmax = tmax, B1 = B1,K=K, r=dat$r, fmort=dat$Fmort)

dat$Bend <- unlist(lapply(result, function(x) x[[1]][tmax]))
dat$Hend <- unlist(lapply(result, function(x) x[[2]][tmax]))





First up we need to create some data, for testing here we go:

	n <- 100
	x1 <- rnorm(n, mean = 5, sd = 1)
	y1 <- 2*x1 + rnorm(n, mean = 0, sd = 2)
	y2 <- -5*x1 + rnorm(n, mean = 0, sd = 2)
	y3 <- rnorm(n, mean = -1, sd = 2)
	y4 <- 9*rnorm(n, mean = 0, sd = 2) + 5

We just created an x-variable and four y-variables that depend on that x-variable, with normal errors.

Let's start a plot, with 2*2 window:  

	par(mfrow = c(2,2))
	plot(x1, y1)

Now we need to identify the boundaries of the axis on each sub-plot as it is created. We can do that using the `par()` command:  

	axbounds <- par('usr')

Which gives us the bounds on the x and y axes for whatever plot is open right now.

We can then get the range of each axis like this:  

	axrange <- c(axbounds[2]-axbounds[1], axbounds[4] - axbounds[3])

Next, define our labels. We have four plots and we can use `letters` or `LETTERS` to obtain letters of the alphabet. ie:

	labels <- LETTERS[1:4]

Gives us the labels a, b, c, d. Or we could also do:

	labels <- paste0('(',letters[1:4],')')

Which gives us (a), (b), (c), (d)

Now we need to position the labels, relative to each axes range. We can do this by taking the x-axis minimum value and y-axis maximum value and then adding an offset to the axis range. Adding the offset in this way means the labels will always be placed in the same place, even if the axis scale varies. We can place the label using the `text` command.

	text(axbounds[1] -
		(axrange[1]*xoffset), axbounds[4] +(axrange[2]* yoffset),
		label[1], xpd=NA,...)

The argument `xpd=NA` is neccesary, because without it new additions to the plot outside of the plot window are invisible.

So those are the elements we need. To get it all finished, we can stitch these all together in a new function:  

### Here is the finished function for adding labels

	figlabel <- function(label ='A', xoffset = 0.1, yoffset = 0.08,...){
		axbounds <- par('usr')
		axrange <- c(axbounds[2]-axbounds[1], axbounds[4] - axbounds[3])
		text(axbounds[1] -
			(axrange[1]*xoffset), axbounds[4] +(axrange[2]* yoffset),
			label, xpd=NA,...)
		}

We use it like this:  

		par(mfrow = c(2,2))
		plot(x1, y1)
		figlabel(labels[1], font = 2)
		plot(x1, y2)
		figlabel(labels[2], font = 2)
		plot(x1, y3)
		figlabel(labels[3], font = 2)
		plot(x1, y4)
		figlabel(labels[4], font = 2)

The result is this:  

<img src ="/images/figlabels.png" alt="a figure with labels" class="wide_image"/>  

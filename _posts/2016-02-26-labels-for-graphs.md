---
layout: md_layout
categories: rstats
title: "Automate adding labels to figures in R"
published: true  
---

## How automate labels on figures in R  

	figlabel <- function(label ='A', xoffset = 0.1, yoffset = 0.08,...){
		axbounds <- par('usr')
		axrange <- c(axbounds[2]-axbounds[1], axbounds[4] - axbounds[3])
		text(axbounds[1] - (axrange[1]*xoffset), axbounds[4] +(axrange[2]* yoffset), label, xpd=NA,...)
	}




n <- 100
x1 <- rnorm(n, mean = 5, sd = 1)
y1 <- 2*x1 + rnorm(n, mean = 0, sd = 2)
y2 <- -5*x1 + rnorm(n, mean = 0, sd = 2)
y3 <- rnorm(n, mean = -1, sd = 2)
y4 <- 9*rnorm(n, mean = 0, sd = 2) + 5

labels <- paste0('(',letters[1:4],')')
labels <- LETTERS[1:4]
ftype <- 2

par(mfrow = c(2,2))
plot(x1, y1)
figlabel(labels[1], font = ftype)
plot(x1, y2)
figlabel(labels[2], font = ftype)
plot(x1, y3)
figlabel(labels[3], font = ftype)
plot(x1, y4)
figlabel(labels[4], font = ftype)





<img src ="/Images/figlabels.png" alt="a figure with labels" class="wide_image"/>  

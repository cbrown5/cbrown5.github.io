---
title: What analysis programs drive conservation science?
layout: md_layout
category: rstats
published: TRUE
---

## What analysis programs drive conservation science?

With the [International Congress for Conservation Biology](http://conbio.org/mini-sites/iccb-2017) on at the end of July I was wondering, what analysis programs are supporting conservation science? And, what programs support spatial analysis and mapping?

I ran a quick poll on my blog (you can take it [here](http://www.seascapemodels.org/rstats/2017/07/21/ICCB2017-what-analysis-program.html)) to find out. Here are the results (as of 30th July 2017). Voters are allowed to pick multiple categories.

![barplot of most popular programs](/Images/iccb-analysis-programs-barplot.jpg)

Programs with Graphical User Interfaces ("GUIs", like Excel) were less popular for analysis than programming languages, like R. This speaks to how skilled modern conservation scientists are becoming with computations and programming.

The [R program](https://cran.r-project.org/) tops the list of most popular analysis programs. Not a surprising result, given its predominance in the biological, ecological and social sciences that conservation science draws from.

It is a bit of a shame to see Python so far down the list. Python has a reputation of being much easier to learn than R. Some groups even teach it to primary school kids, such as the [Raspberry Pi foundation](https://www.raspberrypi.org/). I suspect that most conservation scientists don't have training in computer science (why would they), so you might expect greater uptake of Python.

Python still has many very handy packages for analysis, and has the advantage of being much faster to process than R for many types of programs. This can be really important for processing large data-sets, such [as the analysis we conducted on global gaps in marine species protection](https://www.nature.com/articles/srep17539). We used Python to process overlap between ~17000 species ranges and the boundaries of marine protected areas.

Somewhat surprisingly to me was that R also topped the question about GIS, though the free GUI program - QGIS - was a close second.

It is exciting to see so many of my colleagues using R for GIS and spatial analysis.

It was a a surprise to me that R was so popular, because it is not that easy to do spatial analysis and mapping in R (if you want to learn, try my [ short course](http://www.seascapemodels.org/rstats/rspatial/2015/06/22/R_Spatial_course.html)). R can be used as a fully functional GIS, but you need to install a bunch of additional packages. Further, you need to know a lot more about the theory behind geographical sciences, and the storage of spatial data, to operate R as a GIS. 

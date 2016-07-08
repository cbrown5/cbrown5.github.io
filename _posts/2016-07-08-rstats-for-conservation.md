---
layout: md_layout
category: Research Rstats
title: "R programming tools for conservation scientists"
published: true  
---

## R programming tools for conservation scientists

*8 July 2016*

This week I'm at the [**Society for Conservation Biology, Oceanea Conference**](http://brisbane2016.scboceania.org/) in Brisbane. I taught a workshop on [Conservation Programming](/Rstats/conservation_R.html) for the workshop, and that has got me thinking about the quantitative tools are most commonly used by conservation scientists. So here is my guide to the packages in **R** that will let you access the most common tools.  

A good starting place is [my post from the International Coral Reef Symposium](http://www.seascapemodels.org/research%20rstats/2016/06/22/rstats-for-coral-reefs.html) a few weeks ago. The tools described therein are really useful for most types of data-analysis.  

It is a shame, but I have seen relatively few new **R** tools presented at this conference. Jeff Hanson's [package for identifying protected areas](https://github.com/paleo13/rapr) is one exception. Given the reliance of conservation science on often sophisticated tools, and our limited budgets for science, it would be nice to see more open-access tools and sharing of tools.  

Mark Burgmann emphasised the importance of open science in his plenary. If you share your code, others can build on that and improve it.  

Here I will focus on the more specialised tools that may be used by conservation scientists.  

### 1. Networks in igraph  

Network analysis is increasingly popular in conservation science and the main package for network analysis in R is [igraph](https://cran.r-project.org/web/packages/igraph/index.html).  `igraph` is a massive package that has numerous algorithms, but to give a few examples, you could use it to:  

* Identify the shortest path between two habitat patches - this may represent connectivity corridor.    
* Calculate network 'degree'. This may be useful for instance in social network analysis to find out how many degrees of separation there are between different people.   

* Identify habitat patches that are key stepping stones for species migrations. [Here is a great example](http://onlinelibrary.wiley.com/doi/10.1111/conl.12097/abstract) of using this approach for identifying reserve sites for fish based on larval connectivity.  

I haven't worked much with network data myself, but I image once you collect the data there is a lot of data processing required to 'make the connections'. I recommend `dplyr` and `tidyr` for this processing, though I would be keen to hear what other tools people have used for processing network data.


### 2. Gridded spatial analysis in raster  

Much of conservation science uses spatial data - whether it is about selecting sites for protection,  mapping threats to ecosystems, or remote sensing of ecosystem extent. **R** has a huge number of spatial packages but probably the easiest place to start is `raster` package, which is used for woking with gridded data.  

Check out the [introductory course](http://www.seascapemodels.org/rstats/rspatial/2015/06/22/R_Spatial_course.html) on my webpage to get started.  

One nice thing about `raster` package is that the help files are really well written and organised. That is why I recommend it as the best starting point for spatial analysis in **R**.  

### 3. Spatial analysis in sp, rgdal, rgeos  
Once you have mastered gridded spatial data you may want to work with points, lines and polygons. The difference with raster data is that points, lines and polygons are recorded on a continuous spatial surface, rather than a grid. There is a huge range of applications for this kind of data, too many to list here. But a few examples I have seen in talks are mapping animal tracks (lines), mapping species occurrences (points),  mapping protected areas (polygons) and looking at overlap between species ranges (points or polygons) and protected areas.  

There are three packages you need to know to get started with spatially continuous data. They are:

* `sp` which is primarily used to describe spatial data frames. E.g. it provides data structures for associating individual points, lines and polygons with data, like animal IDs, areas or status.  

* `rgdal` which is a portal to the GDAL framework for transforming projections. `rgdal` also lets you import ARC GIS datafiles into **R** with the function `readOGR()`.  

* `rgeos` is used for geographic operations like intersecting polygons, calculating areas and so on.   
These packages take a fair bit of practice to learn, and unfortunately there is not that much help available at the introductory level. I recommend getting a good working knowledge of **R** programming before you start with them. Also try my [introductory course on spatial analysis](http://www.seascapemodels.org/rstats/rspatial/2015/06/22/R_Spatial_course.html) once you are familiar with **R**.  

### 4. Optimisation  

Many sub-fields of conservation science use optimisation to identify conservation priorities, such as what actions can be best spend our limited budget on to protect marine ecosystems.  

I actually don't think **R** is the best programming language for optimisation (the [last time I had to optimise actions for conservation I used the Julia language](http://onlinelibrary.wiley.com/doi/10.1890/ES14-00429.1/full)), however there are a huge range of tools available. The best tools will be written in another language (like C) and have an **R** portal to operate them. The reason is that **R** is relatively slow to process calculations, and optimisation often relies on numerical solvers.

**R** is, however, a good place to start learning about optimisation if you are already familiar with the language. Check out the [task view on optimisation](https://cran.r-project.org/web/views/Optimization.html) to see what tools are available.  

A good place to start is [Iadine Chades](http://www.iadine-chades.org/blog/) and colleague's [Markov decision toolbox](https://cran.r-project.org/web/packages/MDPtoolbox/index.html).  The toolbox let's you optimise what actions you would take over time to acheive some goal, say maximise the abundance of a threatened species.  

### 5. Population modelling  

Oddly enough, I haven't seen that much population modelling at this conference.  Maybe I was in the wrong sessions, or maybe there just isn't that much anymore. Spatial analysis seems to dominate these days. Population modelling is useful for projecting extinction risk and quantifying the effectiveness of alternate management strategies, among many other applications.

There are many **R** packages for population modelling, but check out [`IPMpack`](https://cran.r-project.org/web/packages/IPMpack/vignettes/IPMpack_Vignette.pdf) to get started with demographic modelling.  

### Conclusion  

The **R** program is an incredibly useful tool for conservation science. It has a huge range of applications and importantly, most **R** packages are open source - meaning anyone can download and us them or build on them to create new packages.

They were my top 5, but if you have seen other interesting tools that are of use for conservation science, [let me know](http://twitter.com/bluecology/).   

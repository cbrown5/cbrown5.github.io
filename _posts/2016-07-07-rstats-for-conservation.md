---
layout: md_layout
category: Research Rstats
title: "R programming tools for conservation scientists"
published: true  
---

## R programming tools for conservation scientists

*7 July 2016*

This week I'm at the **Society for Conservation Biology, Oceanea Conference** in Brisbane. I taught a workshop on [Conservation Programming](/Rstats/conservation_R.html) for the workshop, and that has got me thinking about the quantitative tools are most commonly used by conservation scientists. So here is my guide to the packages in **R** that will let you access the most common tools.  

A good starting place is [my post from the International Coral Reef Symposium](http://www.seascapemodels.org/research%20rstats/2016/06/22/rstats-for-coral-reefs.html) a few weeks ago. The tools described therein are really useful for most types of data-analysis.  

Here I will focus on the more specialised tools that may be used by conservation scientists.  

### 1. igraph  

Network analysis is increasingly popular in conservation science and the main package for network analysis in R is [igraph](https://cran.r-project.org/web/packages/igraph/index.html).  `igraph` is a massive package that has numerous algorithms, but to give a few examples, you could use it to:  
* Identify the shortest path between two habitat patches - this may represent connectivity corridor.    
* Calculate network 'degree'. This may be useful for instance in social network analysis to find out how many degrees of separation there are between different people.  
* Identify habitat patches that are key stepping stones for species migrations. [Here is a great example](http://onlinelibrary.wiley.com/doi/10.1111/conl.12097/abstract) of using this approach for identifying reserve sites for fish based on larval connectivity.  


### 2. raster  

Much of conservation science uses spatial data - whether it is about selecting sites for protection or mapping threats to ecosystems.  **R** has a huge number of spatial packages but probably the easiest place to start is `raster` package, which is used for woking with gridded data.  

Check out the [introductory course](http://www.seascapemodels.org/rstats/rspatial/2015/06/22/R_Spatial_course.html) on my webpage to get started.  

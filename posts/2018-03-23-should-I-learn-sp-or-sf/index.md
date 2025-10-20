---
date: '3/23/2018'
title: Should I learn sf or sp for spatial R programming
categories: rstats
published: TRUE
---



I recently received an email about some of the [short-courses](http://www.seascapemodels.org/code.html#) on my webpage. The correspondant was asked whether my [course on Maps and GIS in R](http://www.seascapemodels.org/rstats/rspatial/2015/06/22/R_Spatial_course.html) was still relevant, it being written in 2014.

The R environment is changing so fast, it is worth asking whether course material that is a few years old is still relevant.

Much of my 2014 course still remains relevant, like the aspects about spatial projections, raster package. The material about points and polygons is still relevant, but may not be soon. Finally, there are some things the course misses that I would include now, like integration with leaflet maps (which is in some of my later courses).

Here are a few major changes in the R environment for spatial analysis as I see it, and some important trends.

## Spatial data-structures and the simple features package

The `sp` package for R provides spatial data-structures (termed 'classes') and a few utility functions (like `spplot` for plotting). In the past having this package has been essential for just about any spatial analysis in R, whether it was GIS or spatial modelling.

A newish package on the block `sf` has much the same functionality as `sp`, but promises to be much more convenient and flexible. It has been around a few years (I think), but there was little information about it. The release of the book [Geocomputation with R](https://geocompr.robinlovelace.net/) and an increasing number of solutions on stackoverlow will probably see an many more people using `sf`.

`sf` works with a language independent standard for structuring spatial data termed 'simple features'. Just a few of the many nice aspects of `sf` are:

**Intuitive data structures** `sp` data, like the `SpatialPolygonsDataframe` were composed of lists inside lists and were quite hard to decompose (there was a good reason why it was coded like this, but I forget why).  `sf` objects are just data-frames that are collections of spatial objects. Each row is a spatial object (e.g. a polgyon), that may have data associated with it (e.g. its area) and a special geo variable that contains the coordinates.

**Intuitive operations** One thing that frustrated me about spatial operations (like intersection) with `sp` and `rgeos` (the package for geographic operations), was that a dataframe `sp` object changed to a different, data-less, class when the operation was performed. `sf` objects don't change class when you apply spatial operations to them (and they keep their associated data).

**Spatial indexing** which can massively speed up spatial queries, like intersecting polygons, [especially on large datasets](https://www.r-spatial.org/r/2017/06/22/spatial-index.html).

## So should I learn sf or sp now?

That's a tough question. If you have time, I would say, learn to use both. `sf` is pretty new, so a lot of packages that depend on spatial classes still rely on `sp`. So you will need to know `sp` if you want to do any integration with many other packages, including `raster` (as of March 2018).

However, in the future we should see an increasing shift toward the `sf` package and greater use of `sf` classes in other packages. I also think that `sf` is easier to learn to use than `sp`.

Currently I use a hybrid of `sf` and `sp`, which has not been too hard to get my head around. I do most spatial operations in `sf`, and convert to `sp` objects only when I have to, such as if I wanted to `rasterize` a polygon object.

## What was missing in the 2014 course?

A major trend in R packages now is integration with other platforms.

 This is exemplified by the [`leaflet` package](https://rstudio.github.io/leaflet/), which allows one to create interactive web maps via R. I think teaching some of this stuff is essential now, even in begginer courses (it is pretty easy to make these maps). In fact, I do teach it now, even in general R courses, like this one for [conservation biologists](http://www.seascapemodels.org/data/Conservation_R.html).

Creating interactive maps is a lot of fun and potentially very useful. For instance see Ross Dwyer's maps that let you explore the [distributions of sharks and rays around the world](https://rossdwyer.shinyapps.io/sharkray_mpa/) (this one may take a moment to load, as the data-sets are large).

So in the future GIS and spatial analysis in R should become more straightfoward and you should be able to smoothly integrate R's outputs with many other programs. 






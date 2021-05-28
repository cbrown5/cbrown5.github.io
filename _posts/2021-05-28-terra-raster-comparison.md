---
title: A comparison of terra and raster packages
layout: default
category: rstats
published: TRUE
---

A comparison of terra and raster packages
=========================================

The `terra` package looks designed to replace an old favourite `raster`.
It is made by a similar team. The `terra` documentation states “can do
more, is simpler to use, and it is faster.”

So should you make the switch to `terra`? I’ll answer that here.

TLDR: `terra` is simpler and faster than `raster` and will be easy for
existing `raster` users to learn. Compatibility with other packages can
be an issue, but conversion back to `raster` objects is easy. Verdict:
make the switch.

There are a few important considerations when changing packages:

1.  How long will it take me to learn the new syntax?

2.  How much help is available online?

3.  Is it faster than what I used to use?

4.  Will it be compatible with other packages I use?

I will test each in turn.

The data
--------

We’ll use [this data from one of my
courses](https://www.seascapemodels.org/data/data-wrangling-spatial-course-data.zip).

1. How long will it take to learn terra’s syntax?
-------------------------------------------------

First, let’s take a look at some basic syntax and compare it with raster

You can read in data much the same way, with the command `rast()`:

    library(terra)
    r <- rast("data-for-course/spatial-data/MeanAVHRRSST.grd")
    plot(r)

![](images/2021-05-28-terra-raster-comparison/unnamed-chunk-1-1.png)

    ext(r)

    ## SpatExtent : 82.5, 181.25, -72.25, -9.75 (xmin, xmax, ymin, ymax)

Now let’s crop and reproject it:

    #create an extent object
    ext2 <- ext(r)

    #constrain it in x direction
    ext2[1] <- 120
    ext2[2] <- 170

    r2 <- crop(r, ext2)

    r3 <- project(r2, "+proj=robin +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs +towgs84=0,0,0")

    plot(r3)

![](images/2021-05-28-terra-raster-comparison/unnamed-chunk-2-1.png)

So much of the syntax is familiar (or identical), if slightly different.
It took me about 10 minutes to translate what I know from raster to
terra syntax.

Note there are some important caveats with terra when it comes to
cluster computations and saving data see `?terra` for more information.

2. How much help is available online?
-------------------------------------

It’s early days yet. But the terra package documentation is outstanding,
as good as it was for raster. This was one reason raster became so
popular.

`?terra` provides a very helpful description, a menu of functions and at
the very end a translation of function names from raster to terra (many
are the same)

So users will be once again grateful to Robert Hijmans and the
authorship team for the effort tney put into package documentation

There are a few courses/ blogs online if you google it and some limited
posts on stackexchange sites.

No vignette with the package as yet.

So the verdict is that the documentation of the package and functions is
excellent. Currently, there is limited existing documentation of
troubleshooting errors and bugs online. So you might have to ask
yourself. But online content will grow as the package becomes more
popular.

3. Is terra faster than raster?
-------------------------------

I take the author’s word that its faster, but let’s see how much faster:

    library(microbenchmark)

    r_raster <- raster::raster("data-for-course/spatial-data/MeanAVHRRSST.grd")
    robin_proj <- "+proj=robin +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs +towgs84=0,0,0"

    tout <- microbenchmark(
    project(r, robin_proj),
    raster::projectRaster(r_raster, crs = robin_proj),
    times = 10
    )
    tout

    ## Unit: milliseconds
    ##                                               expr       min        lq
    ##                             project(r, robin_proj)  68.23819  70.89847
    ##  raster::projectRaster(r_raster, crs = robin_proj) 497.84206 511.87547
    ##       mean    median        uq        max neval
    ##   76.65799  76.37549  81.01373   87.56849    10
    ##  630.53099 529.62801 674.34082 1268.99468    10

So something like 7 times faster for the computationally demanding task
of reprojecting a raster.

4. Will terra be compatible with other packages I use?
------------------------------------------------------

The answer here obviously depends on what packages you want to use. A
key one for me is tmap for mapping. This doesn’t work with `terra`
unfortunately. So the next question, how onerous is it to convert a
`terra` raster to a `raster` raster?

    library(tmap)

    r_raster <- raster::raster(r)

    tm_shape(r_raster) +
      tm_raster()

![](images/2021-05-28-terra-raster-comparison/unnamed-chunk-4-1.png) The
multi-tool function `raster()` does the job, so I’ll take that for now.

Summary
-------

`terra` lots set to replace `raster`. It is faster and just as easy to
use as `raster`. Making the switch to `terra` isn’t as hard as it may
seem, its use will seem very familiar to `raster` users.

There are probably common errors and bugs with particular data types for
the R community to find and there isn’t help online for thoes yet. There
will be challenges in compatibility with other packages. But conversion
back to `raster` objects is easy.

There are also new features in `terra`, to handle vector data and manage
very large datasets. So plenty more to explore.

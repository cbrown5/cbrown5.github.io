---
title: Make a map of your study site with tmap
layout: default
category: rstats
published: TRUE
---


Make a map of your study site with tmap
=======================================

I'm loving the `tmap` package right now. Here's why. And we'll look at
how to make a clean map of a study site as we go.

We'll use the data from our study of [pollution and coral reefs in the
Solmon
Islands](https://conbio.onlinelibrary.wiley.com/doi/full/10.1111/cobi.13079?casa_token=Jk3ogcP8Wy4AAAAA%3AVcXbXq2EBCQB8dwQpM8o5ydOsblrsuIAxpwaO4QsuQwacDpNYJsbRi4hPmm64sqvrlmDr-zHmBPt)
([repo is here](https://github.com/cbrown5/BenthicLatent)).

It runs smoothly with sf
------------------------

sf ('Simple Features') is the new spatial data standard for R.

Let's create an sf points file. First we'll read the data from the
github repo

    sites <- read.csv(url("https://raw.githubusercontent.com/cbrown5/BenthicLatent/master/data-raw/JuvUVCSites_with_ReefTypes_16Jun2016.csv"))

Its a list of dive sites, where reef type, coral cover and some other
variables were observed.

(So grateful for Rick Hamilton for letting me make this data open
access. Just remember, there are a lot of crocodiles in the Solomon
Islands, diving in and around mangroves to collect data like this isn't
the easiest job)

Now to make an sf object:

    library(sf)

    ## Linking to GEOS 3.6.1, GDAL 2.2.3, PROJ 4.9.3

    sites <- st_as_sf(sites, coords = c("coordx", "coordy"))

Let's also get the land for context (you can download this folder from
the github repo)

    land <- st_read(dsn ="LandPoly")

Finally, the points have the same coordinate reference system as the
polygon, so add that onto the points:

    st_crs(sites) <- st_crs(land)

You build maps as layers like in ggplot
---------------------------------------

Maps are just a series of layers. So lets plot the land (using tmap)
first:

    library(tmap)

    tm_shape(land) +
      tm_polygons()

To plot a layer in `tmap` you say `tm_shape(data_file_name)` first then
add the type of layer you want to plot (like `ggplot` geoms).

Now we will also want to add on the points (dive sites) layer. We can
use `tm_dots` or `tm_symbols` for this:

    tm_shape(land) +
      tm_polygons() +
      tm_shape(sites)+
      tm_symbols(size = 0.5)

![](/images/study-site-map-tmap_files/figure-markdown_strict/unnamed-chunk-6-1.png)

Cartography is easy
-------------------

I mean the code for cartography is easy. Good cartography is hard (but a
good place to start is the book 'How to Lie with Maps').

Now let's keep adding on layers to make our map look nice. It's all
pretty self explanatory once you understand the layering concept:

    tm1 <- tm_shape(land) +
      tm_fill(col = "wheat") +
      tm_shape(sites)+
      tm_symbols(size = 0.3, col = "cover",
                 title.col = "Coral cover",
                 palette = "Reds") +
      tm_compass(type = "4star", position = c(0.01, 0.67),
                 size = 1.5) +
      #positions are between 0 & 1 and place the
      #bottom left corner
      tm_scale_bar(breaks = c(0, 10),
                   position = c(0.65, 0.01),
                   text.size = 0.6) +
      tm_layout(legend.position = c("right", "top"),
                legend.title.size = 0.8,
                bg.color = "lightblue") +
      tm_credits("Study sites from \nBrown and Hamilton 2018 \nConservation Biology. \nCoastline derived from Landsat.",
                 size = 0.7, position = c(0.01, 0.01))
    tm1

![](/images/study-site-map-tmap_files/figure-markdown_strict/unnamed-chunk-7-1.png)

You might have to play around with the position adjustments for a while
to get everything placed just right.

Finally, you can save your map to file

    tmap_save(tm1, filename = "mymap.png",
              width = 8, height = 8)

Have fun mapping. For more help see [tmap
basics](https://cran.r-project.org/web/packages/tmap/vignettes/tmap-getstarted.html)
or the book [**Geocomputation with
R**](https://geocompr.robinlovelace.net/adv-map.html) or come to our [course in Queensland February 2018](https://smp.uq.edu.au/research/centres/carm/events).

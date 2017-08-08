---
layout: default
category: rstats
title: "Extracting exif data from photos using R"
published: true
---

## Part 1: Extracting exif data from photos using R

See the other [parts in this series of blog posts](/rstats/2016/11/14/photos-to-spatialstat.html).

My camera comes with an inbuilt GPS allowing you to geo-reference photos you take. Here is a simple example for how we can use this feature to create an interactive web map in R.

The photos come from a survey I did of oysters on a rocky shoreline. I took photos of each quadrat enabling me to geolocate the quadrats as well as record what occurred within them.

First get your hands on a few packages, `exif` for extracting exif info in R, `dplyr` for data management and `leaflet` for making maps:

	library(exifr)
	library(dplyr)
	library(leaflet)

Now set your working director the a folder that holds the photos in questions. We can then get the names of all the photos straight into R's memory like this:

	files <- list.files(pattern = "*.JPG")
	dat <- exifr(files)

The `pattern` argument ensures we just grab the jpegs from the folder and nothing else.
Neat, we have our exif info as a dataframe. Now let's select just the useful columns:

	dat2 <- select(dat,
		SourceFile, DateTimeOriginal,
		GPSLongitude, GPSLatitude,
		GPSTimeStamp)

		write.csv(dat2, 'Exifdata.csv',
		row.names = F)

NB the select function comes from the `dplyr` package. You can do this with base R too, but I prefer `dplyr`.  (You can get my dataframe [here](/data/Exifdata.csv))

You can make a quick map of locations like this:

	plot(dat$GPSLongitude, dat$GPSLatitude)

### Make an interactive map

Interactive web maps are easy with the `leaflet` package.  We can plot the same points over and ESRI provided satellite image like this:

	leaflet(dat2) %>%
	addProviderTiles("Esri.WorldImagery") %>%
	addMarkers(~ GPSLongitude, ~ GPSLatitude)

And here's what it should look like:

<iframe src="/data/hornby_pic_loc.html" style = "width: 95%; height: 30em"> It no map appears here your browser doesn't support iframes. Try <a href = "/data/hornby_pic_loc.html">this link instead</a></iframe>


Next up we will look at how to match these locations to the quadrat data I collected. I will also show you how to add photos to the pop-ups at the site locations.

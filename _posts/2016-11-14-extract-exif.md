---
layout: md_layout
category: rstats
title: "Extracting exif data from photos using R"
published: false  
---

## Part 1: Extracting exif data from photos using R  

See the other [parts in this series of blog posts](/rstats/2016/11/14/photos-to-spatialstat.html).  

My camera comes with an inbuilt GPS allowing

library(exifr)
library(dplyr)
library(leaflet)

files <- list.files(pattern = "*.JPG")
dat <- exifr(files)

dat2 <- select(dat,
	SourceFile, DateTimeOriginal,
	GPSLongitude, GPSLatitude,
	GPSTimeStamp)

write.csv(dat2, 'Exifdata.csv', row.names = F)

plot(dat$GPSLongitude, dat$GPSLatitude)

#
# Make a map
#

library(leaflet)

leaflet(dat2) %>%
addProviderTiles("Esri.WorldImagery") %>%
addMarkers(~ GPSLongitude, ~ GPSLatitude)

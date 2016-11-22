---
layout: md_layout
category: rstats
title: "Create an interactive web map with geotagged photos"
published: false  
---

## Part 2: Create an interactive web map with geotagged photos

See the other [parts in this series of blog posts](/rstats/2016/11/14/photos-to-spatialstat.html).  


#
# Making a map with colours and pop-up photo
#
#
# CJ Brown 12 Nov 2016

setwd('/Users/s2973410/Databases/Hornby_oyster_survey/4&5-sept-2015')

library(readr)
library(dplyr)
library(leaflet)
library(stringr)
library(RColorBrewer)
library(exifr)

edat <- read_csv('Exifdata.csv')
odat <- read_csv('oyster_surveys.csv')

n <- nrow(odat)

#
# Fill in missing pic numbers
#
# Missing numbers are just continuation of last cell

for (i in 1:n){
	if (is.na(odat$pic_num[i])){
		odat$pic_num[i] <- odat$pic_num[i-1]+1
		}
	}
odat$pic_num

write_csv(odat, 'oysters_data.csv')
# plot(edat$GPSLongitude, edat$GPSLatitude)

#
# match dfs
#

#extract numbers from source names
edat<- edat %>% mutate(pic_num = as.numeric(str_extract(SourceFile, '\\d\\d\\d\\d')))


dat <- odat %>% left_join(edat)

isna <- which(is.na(dat$GPSLatitude))

data.frame(dat[isna,])

write_csv(dat, 'Oysters_merged.csv')

#
#content for popup
#

content <- paste(sep = "<br/>",
  "<img src='http://www.seascapemodels.org/Images/intertidal_scene.JPG' style='width:230px;height:300px;'>",
  "The intertidal zone",
  "at Hornby Island"
)

# Get location for picture pop-up
scene <- exifr('/Users/s2973410/Documents/Webpage/webpage/Images/intertidal_scene.JPG')

x1 <- scene $GPSLongitude
y1 <- scene $GPSLatitude


#
#Colours for oysters
#
brks <- c(0,1, 5, 10, 20, 70) #colour bins for legend
ncol <- length(brks)-1
oystercols <- c('grey20',brewer.pal(ncol-1, 'Purples'))
pal <- colorBin(oystercols, dat$oysters_live, bins = brks)

#
# Make a map with images
#

#Set name and datframe
mapout <- leaflet(dat) %>%
#Use satellite image as base
addProviderTiles("Esri.WorldImagery") %>%

setView(lng = x1, lat = y1, zoom = 16) %>%
#Add markers for oyster quadrats
addCircleMarkers(~ GPSLongitude, ~ GPSLatitude,
color = 'white',opacity =1, weight = 1,
 fillColor = ~pal(oysters_live),
popup = as.character(dat$oysters_live),
 fillOpacity = 0.8,
 radius = 6) %>% # add a popup for number of oysters
 #Add marker showing a picture of the survey site
addMarkers(x1, y1, popup = content,
options = markerOptions(opacity = 0.9, draggable=T)) %>%
#Add a legend
addLegend("topright", pal = pal,
values = brks,
title = "Number of live oysters <a href = 'https://en.wikipedia.org/wiki/Pacific_oyster' target = '_blank'> (Crassostrea gigas)</a>",
opacity = 1)


htmlwidgets::saveWidget(mapout, file = '~/Documents/Webpage/webpage/data/hornby_oysters_map.html', selfcontained = F, libdir = "leafletmap_files")

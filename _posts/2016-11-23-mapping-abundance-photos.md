---
layout: md_layout
category: rstats
title: "Create an interactive web map with geotagged photos"
published: true  
---

## Part 2: Create an interactive web map with geotagged photos

See the other [parts in this series of blog posts](/rstats/2016/11/14/photos-to-spatialstat.html).  

In part 1 we looked at making a simple interactive map using locations from our geotagged photos. Those photos have data associated with them (counts of oysters in quadrats) so here we will look at how you would plot that data on your map.  

We will also add a geo-referenced pop-up that includes a picture of our study site. You might be familiar with this idea from Google Earth or Flickr.  

To get you excited, here is the end result (try clicking on things!):

<iframe src="/data/hornby_oysters_map.html" style = "width: 95%; height: 30em"> It no map appears here your browser doesn't support iframes. Try <a href = "/data/hornby_oysters_map.html">this link instead</a></iframe>


### Getting started  

First up here are the packages we need:

	library(leaflet)  
	library(exifr)  

The next list of packages is optional, but I will use here to make data processing more convenient:  

	library(readr) #for the updated version of read.csv  
	library(dplyr) #for data wrangling  
	library(stringr) #for wrangling strings  

Finally to get some nice colours:

	library(RColorBrewer)  

Now load in the data. I am using `read_csv` which comes from the `readr` package. `read_csv` is a modernised version of the base R function `read.csv`. Here are the [exif data](/data/Exifdata.csv) and associated [oyster counts](/data/oysters_data.csv) if you are repeating this example.

	edat <- read_csv('Exifdata.csv')  
	odat <- read_csv('oyster_data.csv')  
	n <- nrow(odat) #number of sample sites   

### Joining the locations to the counts  

Now we need to join our counts of oysters to the locations. We can match by the picture numbers, which I recorded when I counted the oysters.  
First up we need to clean the clean the picture numbers in the exif data to remove the leading 'DSC_'. We do this using `mutate` from `dplyr` and `str_extract` from `stringr` to extract the first four digits in each picture's filename.  

	edat<- edat %>%  
	mutate(pic_num =  
		as.numeric(  
			str_extract(SourceFile, '\\d\\d\\d\\d')  
			))  

If you haven't seen `%>%` before it is a 'pipe' that puts the dataframe `edat` into the first argument of our `mutate` function. The pipe isn't essential, but I think it improves readibility. See [Wickham's book](http://r4ds.had.co.nz/pipes.html) for more guidance on pipes.  

Now we can join the oysters and pictures. `left_join` will automatically identify `pic_num` to join on, because it is the common column across both dataframes:  

	dat <- odat %>%  
	  left_join(edat)  

### Create the content for the pop-up image  

To create the pop-up you need to know a little bit of html. There is plenty of helpful guides on the web and html is pretty simple to learn. The pop-up will show an image and some text. Here we define the content:  

	content <- paste(sep = "<br/>",  
  	"<img src='http://www.seascapemodels.org/Images/intertidal_scene.JPG'   
	   style='width:230px;height:300px;'>",  
  	"The intertidal zone",  
  	"at Hornby Island"  
	)

In short we have specified a string with some html code.  `<br/>` html tag creates a new line. The `<img>` tag specifies the insertion of an image (the link gives the image's location, which is on my webpage. We have also set the width and height of the image.  Then we follow with a bit of text explaining the image.  

We will use `content` in our `leaflet` map below.  

We also need the location to place our pop-up. Because the image is gps tagged, we can extract the gps locations from the exif data. Download the image from the link given above in `content` then you can get the exif data associated with it like this:  

	scene <- exifr('intertidal_scene.JPG')  
	x1 <- scene $GPSLongitude  
	y1 <- scene $GPSLatitude  

We now have coordinates for the pop-up in our `leaflet` map.  

### Colour scale for the oyster counts  

`leaflet` has some pretty convenient functions for creating nice colour scales. Here we use `colourBin` to bin counts of oysters into different categories that we set in the vector `brks`:  

	brks <- c(0,1, 5, 10, 20, 70)  
	ncol <- length(brks)-1  
	oystercols <- c('grey20',brewer.pal(ncol-1, 'Purples'))  
	pal <- colorBin(oystercols, dat$oysters_live, bins = brks)  

The end result `pal` is a function that will generate a colour palette when some data is input to it.  

### Make a map with images  

We have prepped our data, so now the fun bit, making the map!  
This map is somewhat complicated so I will step you through it using our friend 'pipes' (the full code without text breaks is below if you want to cut and paste). Note how convenient pipes are here, we can essentially just layer up our map data in an intuitive fashion.  

	mapout <- leaflet(dat) %>%  

We name our map and set the dataframe it will use.  

	addProviderTiles("Esri.WorldImagery") %>%  

Set's the background (a satellite image)  

	setView(lng = x1, lat = y1, zoom = 16) %>%

Chooses the region to zoom into. `leaflet` will guess the zoom level from our dataframe, but we have more control if we choose the region. The default here was a higher zoom level where the tiles don't render when using Esri.WorldImagery.  

Now we add some markers, setting their colours using oyster counts:  

	addCircleMarkers(~ GPSLongitude, ~ GPSLatitude,  
		color = 'white',opacity =1, weight = 1,  
 	fillColor = ~pal(oysters_live),  
	popup = as.character(dat$oysters_live),  
 	fillOpacity = 0.8,  
 	radius = 6) %>%

This looks complex, but it is just a series of simple commands. `~ GPSLongitude` tells leaflet which column of `dat` is longitude. `color`, `opacity` and `weight` refer to the colour, opacity (solid in this case) and width of the border of the markers. `fillColor` uses our palette and applies it the `oysters_live` column of `dat`.  `popup` creates a popup when we click on a marker, which gives the number of oysters. `fillOpacity` and radius refer to the fill of the markers.  

We will also add a marker for the picture I took of the shoreline. Note that this time I use our `content` data created above to specify what goes in the popup. We also change some of the marker options with `options`. See `?markerOptions` for other options:  

	addMarkers(x1, y1, popup = content,  
		options = markerOptions(opacity = 0.9, draggable=T)) %>%   

Now let's add a legend:  

	addLegend("topright", pal = pal,  
	values = brks,   
	title = "Number of live oysters
	<a href = 'https://en.wikipedia.org/wiki/Pacific_oyster' target = '_blank'> (Crassostrea gigas)</a>",  
	opacity = 1)  

the nice thing about using `colorBin` to create our colours is we can map them directly to the legend, as we have done here with `pal = pal` (telling leaflet to use our `pal` function for the colour palette).  Note in the `title` command we have also inserted some more html, this time a `<a>` tag which just turns the species name '(Crassostrea gigas)' into a link to the Wikipedia page for the Pacific oyster.

And that's it. Run that code then type `mapout` to print your map.  
Next up we will look at how to build a [spatial model using this data](/rstats/2016/11/14/photos-to-spatialstat.html).  

### Extra task: Getting the map on your webpage  

If you want to save the map to use on your own page, you can do so with the `htmlwidgets` package, like this:  

	htmlwidgets::saveWidget(mapout, file = 'hornby_oysters_map.html', selfcontained = F, libdir = "leafletmap_files")

I recommend using `` so that the javascript files that create the map are stored in a seperate folder, rather than the javascript code being included within the html page (which makes it a very long file).  Also, if you set the `libdir` command the javascript files will be saved in the folder specified by `libdir` and all the references to the javascript on the html page (which has the map) will be to that folder (in this case: '/leafletmap_files/'). If you are putting multiple maps on your webpage, always use the same libdir and you will only need one copy of the leaflet javascript (under libdir) in your page's data files. Poke around in [github.com/cbrown5/cbrown5.github.io](https://github.com/cbrown5/cbrown5.github.io) if you want to see how this works. I keep the leaflat maps in the [data](https://github.com/cbrown5/cbrown5.github.io/tree/master/data) folder.  


### Map code as one block for cutting and pasting     

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
			title = "Number of live oysters
			<a href = 'https://en.wikipedia.org/wiki/Pacific_oyster' target = '_blank'> (Crassostrea gigas)</a>",  
			opacity = 1)  

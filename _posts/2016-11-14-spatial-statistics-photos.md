---
layout: md_layout
category: rstats
title: "Extracting exif data from photos using R"
published: false    
---

## Part 1: Extracting exif data from photos using R  

See the other [parts in this series of blog posts](/rstats/2016/11/14/photos-to-spatialstat.html).  


#
# Spatial interpolation
#
#
# CJ Brown 12 Nov 2016

setwd('/Users/s2973410/Databases/Hornby_oyster_survey/4&5-sept-2015')

library(readr)
library(INLA)
library(sp)
library(raster)
library(rgeos)

dat <- read_csv('Oysters_merged.csv')

n <- nrow(dat)

utmproj <- "+proj=utm +zone=10 +north +datum=WGS84 +units=m +no_defs +ellps=WGS84 +towgs84=0,0,0"

spdat <- dat
coordinates(spdat) <- ~ GPSLongitude + GPSLatitude
proj4string(spdat) <- "+init=epsg:4326"

spdf <- spTransform(spdat, CRS(utmproj))

plot(spdf)

#
# Create Mesh
#

pall <- gBuffer(gConvexHull(spdf), width = 50, byid = T)
max.edge.length <- 50
loc1 <- as.matrix(coordinates(spdf))

seg <- inla.sp2segment(pall)
mesh <- inla.mesh.2d(loc=loc1, boundary = seg, max.e = max.edge.length, offset=1, cutoff = 5)

plot(mesh)
plot(spdf, add = T, col = 'red')

#
# Build INLA stack
#

A.data <- inla.spde.make.A(mesh, loc1)

spdf$presabs <- ifelse(spdf$oysters_live>0, 1, 0)

stk <- inla.stack(data=list(y=spdf$presabs), A=list(A.data, 1),
                  effects=list(s=1:mesh$n, intercept=rep(1, n)),
                  remove.unused = FALSE, tag='est')

spde.model = inla.spde2.matern(mesh)

#
# Model
#

formula <- y ~ 0 + intercept + f(s, model=spde.model)

mod <- inla(formula, data=inla.stack.data(stk),
            control.predictor=list(A = inla.stack.A(stk)),
            family = 'binomial')


hyper <- inla.hyperpar(mod)
summary(hyper)

summary(mod)

#
# Model predictions
#

ypred <- exp(mod$summary.random$s$mean)/(1 + exp(mod$summary.random$s$mean))

extent <- extent(spdf)
xdims <- 100; ydims <- 200
  xlim <- c(extent[1], extent[2]); ylim = c(extent[3], extent[4]);
 proj <- inla.mesh.projector(mesh, xlim = xlim, ylim = ylim, dims=c(xdims, ydims))
 field.proj <- inla.mesh.project(proj, ypred)

 datpred <- data.frame(x = rep(proj$x, ydims), y = rep(proj$y, each = xdims), pred = as.numeric(field.proj))
coordinates(datpred) <- ~x + y

spplot(datpred)

proj4string(datpred) <- utmproj
dat3 <- spTransform(datpred, crs("+init=epsg:4326"))

r <- raster(extent(dat3), ncols = xdims, nrows= ydims, crs = crs(spdat))
icell <- cellFromXY(r, dat3)

r[icell] <- as.numeric(dat3$pred)

plot(r)

#
# Leaflet map
#

library(leaflet)


brks <- seq(0,1, by = 0.1)
ncol <- length(brks)
oystercols <- RColorBrewer::brewer.pal(min(ncol, 9), 'Reds')
pal <- colorBin(oystercols, dat$oysters_live, bins = brks)

scene <- exifr::exifr('/Users/s2973410/Documents/Webpage/webpage/Images/intertidal_scene.JPG')
x1 <- scene $GPSLongitude
y1 <- scene $GPSLatitude

leaflet() %>%
addProviderTiles("Esri.WorldImagery") %>%

setView(lng = x1, lat = y1, zoom = 16) %>%
addRasterImage(r, opacity = 0.8, color = pal) %>%
addCircleMarkers(lng = dat$GPSLongitude, lat = spdat$GPSLatitude,
radius = 4) %>%
addLegend("topright", pal = pal,
values = brks,
title = "Chance of live oysters <a href = 'https://en.wikipedia.org/wiki/Pacific_oyster' target = '_blank'> (Crassostrea gigas)</a>",
opacity = 1)

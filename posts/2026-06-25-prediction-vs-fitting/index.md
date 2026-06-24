---
title: Data for fitting models versus data for predicting from models
layout: default
categories: rstats
published: true
date: '06/25/2026'
---

Answering a question that came up from a student recently. 

Say you have 20 surveys of reef fish biomass at different locations. Then you also have gridded data with environmental covariates. The gridded data is for all reefs everywhere. 

The goal is to predict fish biomass at all reefs everywhere. [Here's an older post that walks through the steps in R with older packages](https://www.seascapemodels.org/posts/2020-02-19-spatial-gam-predictions/index.html) (you will want to update `raster` to `terra`, everything else should work). 

The statistically correct workflow would look like this: 

**1. Extract environmental covariates at your 20 reef sites**

For example, you might have sites as x-y coordinates and the gridded data as `terra` rasters. You can use the `extract` function to get the values of the environmental data at your reef sites. Let's call this new dataframe you will make `fish_data`. 

**2. Fit a model**

Fit a model predicting fish biomass at the 20 sites from the environmental covariates. for example: 

```
model1 <- gam(biomass ~ SST + depth, data = `fish_data`)
```

Your sample size for this model will be 20, ie the number of reef sites where you measured fish. 

Do all the usual steps to verify your model, model selection etc...

**3. Turn the grids into a dataframe of environmental covariates** 

There's lots of ways to do this data wrangling step. I like to use the function to get coordinates of centre points of the grids (`xyFromCell`), then convert that to a spatial points, then use `extract`, the convert back to a plain dataframe (keeping the X-Y as columns). 

Now we have a new dataframe of environmental covariates at every grid cell location. Let's call it `pred_data` for 'prediction data'. It will have as many rows as there are grids in your raster, probably 1000s. 

You might like to do a filtering step to remove grids that aren't on reefs (or your target habitat, no point predicting reef fish biomass for places that are sand or land). 

**4. Predict with your model** 

Now use your model to predict to all the grid locations, e.g. 

```
pred_data$mean <- predict(model1, newdata = pred_data)
```

Then you can convert `pred_data` back into a spatial object for mapping the predictions. 


## Common mistakes

So students sometimes get the sequence of steps wrong. For example, you could turn the grids into a dataframe, interpolate fish biomass to unmeasured grids BEFORE you fit your model. That would be statistically inappropriate as you are inflating the sample size by replicating survey data across unmeasured grids. 

Another common mistake is using locally measured covariates but then predicting to gridded covariates that were measured differently. We should use the gridded covariates, rather than locally measured covariates for our fitting and prediction. 

For instance, you may have temperature gridded measured by a satellite as well as temperature measured locally during the surveys. You want to use gridded covariates for our goal of predicting, because that is the temperature data you have everywhere. 

So now you are ready to go forth and make some cool map predictions. [Don't forget to map the uncertainty too (e.g. standard errors)](https://www.nature.com/articles/s41559-022-01778-z). 

Last word, [`tmap`](https://r-tmap.github.io/tmap/) is still my fave tool for mapping in R and it keeps getting better. 

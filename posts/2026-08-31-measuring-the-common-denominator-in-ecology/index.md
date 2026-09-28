---
title: Measuring the common denominator in ecology
layout: default
categories: [research-skills; research]
published: true
date: '08/31/2026'
---

I've been an advisor for many different conservation and ecological monitoring programs over a period of two decades now. I'm finding my advice to the empiricists often boils down to one concept:

> Don't forget to measure the denominator

Let me explain. If you remember fractions in school, you have a numerator, the number on the top, and the denominator, the number underneath. 

Ecologists get excited about measuring the numerator. Its often the fun, interesting and biological part of observation. 

Its also where we have technological innovations that people get excited about -  underwater robots with video, eDNA and big data from citizen scientists are leading examples. 

The denominator is just as important, but often harder and less interesting to measure. 

Let me give citizen science as an example. Much data is collected by citizen scientists through observations in web apps. The challenge you then have is how to compare observations from different places or times. 

You would like to know how much time our helpful citizens spent making measurements. Then if someone saw three birds in three minutes we would know that's equivalent to another survey that saw one bird in one minute. 

But its hard to get citizen scientists to measure survey effort. Its not as interesting, and often takes more training to measure the appropriate effort statistic for standardizing our counts. 

## We need the denominator for standardization

This problem of standardization is common. 

For most measurements we take a sample of the population, we don't count the whole population (a census). Then we need to standardize the measurements by dividing by some measure of observation effort (or using other more sophisticated standardizing techniques). 

This observation effort statistic could be the time surveyed, the area surveyed, or some other common denominator. Usually, we expect an increase in this denominator to lead to a proportional increase in the thing we are measuring, all else be equal. There are exceptions, it being ecology after-all. 

(Species area curves are a leading example of an exception, but even then we can make a good guess of how species richness scales with survey area and still do the correction, its just a bit more complex than division.)

Without the denominator our samples are useless, because when we make comparisons we don't know if a difference is caused by differences in the numerator (e.g. numbers, sizes) or denominator (e.g. time or area surveyed). 

This problem of not thinking about the denominator comes up time and time again in my advisory roles. I think there's a couple of reasons for that. One is that the need to standardize is not always immediately obvious when survey designs are complex. The other is that often we have collected data opportunistically, meaning the data wasn't originally intended to be a carefully standardized scientific survey. Then we are trying to make the most of the data and ask scientific questions with it. 

Once you do realize you need a denominator there can be many statistical nuances in figuring out what the appropriate measure of survey effort should be. It is often technically fiddly to measure the survey effort. 

## Presence only data 

Citizen science data is a classic example of 'presence only' data. For example, some big databases of bird observations have been compiled by enthusiastic bird watchers. But they are nor typically reporting what birds they *didn't* see, how much time they spent looking, or how much area they covered. 

We then see in these presence only records that bird species numbers can be higher closer to roads. Its not that birds like roads, its because bird watchers are seeing birds near roads. 

Platforms like e-Bird have attempted to address this shortcoming by asking their citizen scientists to estimate the denominator. This could be time and/or distance traveled during a bird watching mission. It also includes whether the observation happened on a dedicated bird watching mission, or opportunistic, like you noticed a falcon as you were driving along a country road. 

Presence only data often goes hand-in-hand with another problem that I won't explore here. That is, if contributor's bird list has no pigeons, was it because they didn't see any pigeons, or they just didn't bother to record them because they aren't interesting? 

The point is, if we don't know what the survey effort is, then we can't standardize the bird counts. Then we run a big risk of drawing false conclusions, such as if we concluded that roads are great habitat for diverse bird assemblages. 

## Figuring out the right denominator to use

It can be hard to work out what the denominator should be. 

A while back I was working with The Nature Conservancy on turtle catches in the Solomon Islands. Turtles are a traditional food and cultural resource in the Islands, but there is a growing market for turtle meat and products in the cities. This growing market puts turtle populations at risk. 

The Nature Conservancy were planning to do surveys in communities to see how many turtles are taken. We wanted to know how many turtles a given subset of communities planned to take in any given year. Then, we wanted to scale up those catches to the whole country.

So there were too key denominators we had to capture here. 

The first is about survey effort. The community members doing the surveys didn't get to see every turtle that was caught in their communities. They had days away and some of the fishers didn't work with them to reveal their catches. 

So for a given community we need to account for a couple of denominators. Days worked, how many people in the community worked with you, how many people in the community fished for turtles. 

That meant we could then standardize for days when the monitors were away, as well as turtles they may have missed. 

Without those standardizations we wouldn't be able to compare catches across communities. 

Of course, we also had to then assume that days away from surveying and people not working with the monitors were random with respect to turtle catches. If the monitors went away during the big turtle feasts, for instance, our standardized catch estimates would underestimate true catches. 

Then scaling up the catches of a few communities to a whole country presents a different denominator challenge. We first attempted to standardize by coastal population size, but the problem we then have is what proportion of the coastal population are catching turtles? We struggled to find good numbers for either quantity, because census data for the Solomon Islands has lots of gaps. 

So we choose to use reef area fished as the denominator. The monitors had recorded what reefs people fished on. We have pretty good maps of reefs and pretty good maps of community centres. So we could come up with a 'turtle per hectare of reef accessible to fishing' statistic, as well as estimate total amount of accessible reef area for all communities in the country. Basically multiplying these numbers together gives us a rough estimate of national catches. 

## Getting excited about denominators

As an ecological statistician I think denominators can be just as interesting as numerators. There are lots of gnarly stats issues to work through to choose the correct denominator. Then there's the methods side of figuring out how to measure denominators. 

I hope this post has inspired you to think more carefully about your denominators. Doing so may reveal important new insights or at least, you are less likely to make big mistakes in your conclusions. 

## References

Check out ebird, they have some fabulous apps for [exploring the citizen collected data](https://ebird.org/hotspots). If you zoom to Australia you can clearly see how hotspots of richness are near capital cities and follow roads in the outback. 

There's a lot of studies of bias in where volunteers choose to survey, here is one: [To boldly go where no volunteer has gone before: predicting volunteer activity to prioritize surveys at the landscape scale](https://onlinelibrary.wiley.com/doi/full/10.1111/j.1472-4642.2012.00947.x)

Here's our study on the turtle catch surveys: [Freedivers harvest thousands of sea turtles a year in the Solomon Islands](https://onlinelibrary.wiley.com/doi/full/10.1002/aqc.4050)
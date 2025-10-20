---
date: '9/23/2015'
categories: rstats
title: "Quickly load many files into R"
published: true  
---

## How to quickly load many files into R

I had the pleasure of attending the Earth to Ocean group's (at Simon Fraser University) 'StatsBeers' yesterday. One question that came up was how to quickly summarise data from multiple .csv files.
If you are working with multiple data files, for instance some genetics programs spit out numerous files of sequences, then you want to make sure you are consistent in your variable name. Consistency will make it easy to write programs for post-processing. Another application is processing satellite images. For instance, I recently wanted to summarise water quality measurements for Fiji and had over 100 images over the space of several years.

Here is a quick how to for summarising data from multiple files using **R**. Note that **R** is not the fastest program for these kind of operations. So if you have really big data frames, you might want to investigate using Python.  

First, you want to get all you files into one folder. Or at least, into sub-folders of one folder. Then start up **R**.

Set the working directory to the folder with our data. For instance on my mac:

    setwd('Users/chrisbrown/documents/data')

Now we can find out the names of files that live in this folder:

    fnams <- list.files()
    fnams
    nfiles <- length(fnams)

We have stored the names and also used `length()` to find out how many files there are.

Now, lets assume we want to know the mean of the `nums` column of each of the data frames. We can loop through the files, loading each in turn and taking the mean of the `nums` column. Recall that I said consistency in naming is key. If you want the mean of a different variable in every data frame, you will need to think of a way to identify the respective columns. For instance, you could try `grep()` to identify patterns in column names. Thus, life will be a lot simpler if our column always has the same name. So here is the loop:

    nums_means <- rep(NA, nfiles)
    for (ifiles in 1:nfiles){
        x <- read.csv(fnams[ifiles], header = TRUE)
        nums_means[files] <- mean(x$nums)
    }
    hist(nums_means)

A few points here. Before the loop we pre-allocate a variable `nums_means` with NAs, which will store our means. Preallocation speeds up processing. We then load each csv file in turn and ask for the mean, returning it to sequential places in `nums_means`. We finished with a histogram, to get an idea of how the means look across datafiles.

That is it. Good luck. I hope this saves you some time.

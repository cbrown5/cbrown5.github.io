---
date: '3/10/2023'
title: Organising R scripts
categories: rstats
published: TRUE
---

Here's some key points for how I organise my R projects. 

## Folder structure 

I use the folder structure from the excellent [collaboration framework Max Campbell created for my lab](https://github.com/seascape-models/seascape_collaboration). This allows us to share and backup code via github, as well connect and share large datasets on cloud repos (e.g. onedrive or dropbox). 

In short we have a project folder in which would sit your Rproj file. I always start a new project by creating an R project in RStudio. 

Within this folder you at least a scripts folder to keep R scripts and a data folder (which might be on the cloud) for sharing everything else. 

Create subdirectories in /data folder for input data, output data (e.g. .rda and .csv files), documents. This will help you keep the data organised. 

Note if using github: make sure your include /data in your gitignore, so that the folder doesn't sync to github. WIthin the data folder put everything that doesn't go on github including .rda files, images and documents (exception being .md or .Rmd files). The reason for this is that version control on these types of files consumes a lot of memory (git will save a new file copy each time you make a change, rather than just saving the change). 

## Structuring the data folder

Use subfolders within your data folder if you have a lot of data. For instance if using the aweful shapefile format keep each layer in its own folder, so you don't lose all those files. 

## readme file

Make a readme.md (markdown) file at the top directory. Github will automatically show this when people look at your repo. Use it to give an overview of the project, keep track of the latest updates, keep track of ToDos and document meta-data (e.g. what scripts are, what different data files are for). 

## Organising scripts

I like to number my scripts like: 1_data-processing.R, 2_glm-analysis.R, 3-plots.R. This helps me keep track of the order they should be run in. If you like coping and creating new versions then make an /archive folder to keep the old ones in. Or just use git. 

## How much R code to put in each script? 

I hate looking at other people's mega-scripts, or even worse, my own mega-scripts months after I first created them. So chunk your workflow into sensible steps and save the output at the end of each step. I usually have 1-3 data processing and cleaning scripts (e.g. extracting data from GIS layers, merging different data frames and then cleaning errors or inconsistencies). 

Then its easy to just jump back in where you left off, without having to run 5 minutes of data cleaning computations every time you open the project. 

It's also easier for other people, and future-you, to navigate. 

## How much commenting to do? 

I comment more now than I used to. Again, it will help other people and future-you to navigate the scripts. The downsides to commenting are it takes time and gets out of date. I find that I forget to update my comments when I update the code, so there are mis-matches. 

At the very least give a brief description of the task at the start of each script and put your name and date, so we know who created this and when. 

## Have a script just for figures

Its a good idea to have a script (or scripts) who's only task is to make the final publication quality figures. 

To do this save the final dataframes used to make figures, as well as perhaps the figure objects themselves (if using ggplot). You can save data as .csv or just save figure objects and data all together as a .rda file. 

Having a script that just loads the final clean data will save you a lot of pain down the track when the figures need small changes. You can quickly load the data and make the changes, without having to re-run analyses. 

Likewise if figures are made from the results of an analysis, save the final results before they are plotted and have a script just for the plotting. 

I usually have code for plots at the end of my analysis script, which are there for checking. The pub quality plots go in their own script. 

## Learn to use version control 

This is something I wished I invested in doing ages ago. I used to just copy scripts to make new versions, now I use version control via github desktop. There are other ways to do it (e.g. git via Rstudio) so find what works for you and do that. 

## Share your code online

Finally, I try to put everything I do on github now. This is as much for myself as for other people. I've found that over the years I often want to come back to code but its on some old hard-drive or computer. Much easier if I can just look up the repo online. 


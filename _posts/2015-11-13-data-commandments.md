---
layout: md_layout
categories: rstats rspatial
title: "Commandments for entering data to use in R"
published: true  
---

## Ten Commandments for entering data to use in R  

### (with explanations!)  

---------------  

### 1. *Thou will write a meta-data file for every data-set*  
Meta-data should include location and time information, the short-hand names of the variables matched to a description that includes their units, and a description of the levels of variables (if they are factors).  

Instead save your data as .csv (comma separated values).
It is inconvenient to read excel formats into R.
Excel can also change the 'type' of numbers in strange ways that alter your data. For instance, data that looks like dates (10/2) may get transformed into a different date format (10 - February). .xlsx formats also use more memory than .csv.

### 2. *Thou will enter data in a tidy or long format*  
'Tidy' data begins with a single row of variable names and follows with one row for each observation. For instance, if you measured multiple individuals across different times, then each row will be a measurement from one individual at one time. You will also have time and ID variables to indicate the time and individual.  
See the [`dplyr`](https://cran.rstudio.com/web/packages/dplyr/vignettes/introduction.html) and [`tidyr`](http://blog.rstudio.org/2014/07/22/introducing-tidyr/) packages if you need to tidy data.
There is one exception to this commandment: extremely large data-sets (e.g. multiple giga-bytes) will use less memory if stored in table or wide format.  

### 3. *Thou will avoid special characters and spaces in variable names and levels*
You can use letters, numbers `_` and `.` in variable names. Avoid any other symbols. For instance, instead of calling a species `Plectropomus leopardus`, name it `Plectropomus_leopardus`.  
Also don't start variable names with numbers.  

### 4. *Thou will use a consistent style for naming variables and their levels*  
For instance if using CamelCase, stick to it. Or instead separate words with `_`. Be consistent with capitalisation, for instance, R will see `Plectropomus` as different to `plectropomus`.  
A further tip is to avoid using multiple names for the same identity, like `plectropmus sp.` and `plectropmus`.

### 5. *Thou will enter numeric variables as numbers and factor variables as words*  
R will automatically detect the type of data. If all levels of a variable are numbers, it will treat them as continuous (decimal or integer) numbers. If you mix numbers and words, R will treat all as different levels of a factor.  

### 6. *Thou will use consistent naming styles across data-sets*  
Someday you may want to join data together, for instance, data collected at the same sites across different studies. Keep the site names consistent.  

### 7. *Thou will enter missing data as empty cells*  
There is a big difference between data you didn't collect and data you tried to collect but went missing. So enter empty rows/cells for missing data, so this is recorded.

### 8. *Thou will use R for data-wrangling and keep neat data wrangling scripts*  
Data-wrangling is the process of checking data for errors and formatting data so it can be used in analysis. If you do all the wrangling in R and keep the scripts, the process is totally repeatable. Then if someone wants to see how you changed the original data to check errors for instance, all the changes are recorded in a script.  
If you want to know more about data wrangling in R, check out my latest [courses](http://www.seascapemodels.org/Rstats)

### 9. ** *Thou will name multiple data-sheets in a consistent format*  
For instance, if you have collected data over different dates and want to keep them in separate spreadsheets give them names with the dates recorded in a consistent format: `data_2-Oct-2015.csv`,  `data_3-Oct-2015.csv` and so on. That way you can rapidly read the files into R and parse the file names into actual dates.  

### 10. *Thou will make your code and data freely available once you have published*  
R is an open-access resource, many people have invested much time in developing. To keep good karma, make your data and code open-access too (once you have written your publication of course and if ethics allow). Much scientific data is collected on public money, so it is quite reasonable that the public can access it!.


-------------  

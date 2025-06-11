---
title: Open repo of ecological data for use in teaching
layout: default
category: rstats
published: TRUE
---

# Open repo of ecological data for use in teaching

Just a quick announcement. I've organized and posted two ecological datasets that I find helpful for creating examples for teaching. The repo and instructions for use and attribution are on github: 

https://github.com/cbrown5/example-ecological-data

There are two sets of data posted, each with multiple flat csv files. 

One is field survey data of benthic habitats and fish. Useful for data wrangling of site survey data, multivariate community analysis and GLMs with count data

The second is experimental data of algal growth under multiple stressors. Useful for teaching missing data, plotting trends over time and analysing interacting effects with GLMs. 

All data can be downloaded directly into R like this:

```
benthic_cover_url <- "https://raw.githubusercontent.com/cbrown5/example-ecological-data/refs/heads/main/data/benthic-reefs-and-fish/benthic_cover.csv"

library(readr)
dat <- read_csv(benthic_cover_url)
write_csv(dat, "benthic_cover.csv")
```




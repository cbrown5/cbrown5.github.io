# R Course on
# 4th July 2016
# Chris Brown

# ---------- #
#  Learning how to use logicals 
# --------- #
a <- c(3, 4, 5)
ix <- a < 4

# ------------ #
# Reading in real data
# ------------ #

setwd('/Users/s2973410/Documents/Teaching/Conservation Programming SCB July 2016/R_conservation_programming_course_data')

fishdat <- read.csv('dat.csv', header = TRUE)

i <- which(fishdat$site == 'b')
fishdat$site[i] <- 'B'
fishdat$site <- droplevels(fishdat$site)
table(fishdat$site)

#
# Loading packages
#

library(ggplot2)

ggplot(fishdat, aes(x = site, y = abundance)) + 
  geom_boxplot()

ggplot(fishdat, aes(x = abundance)) + 
  geom_histogram(binwidth = 3)

ggplot(fishdat, aes(x = fishing, y = abundance)) + geom_point()

?geom_boxplot

x <- c(3, 4, 5)

ggplot(fishdat, aes(x = fishing, y = abundance, colour = abundance)) +
  geom_point(size = 5, alpha = 1) + 
  ylab('Fish abundance') +   
  xlab('Fishing pressure index') +  
  labs(colour = 'Abundance') 


#
# Data wrangling
#

library(dplyr)
library(tidyr)

filter(fishdat, abundance > 30)

grps <- group_by(fishdat, site)
grps

summarise(grps, meanFN = mean(fishing)) #just fishing pressure

summarise(grps, meanF = mean(fishing), mean_abund = mean(abundance)) 

#
# Summary by sites. 
#

datsum <- summarise(grps, meanF = mean(fishing), mean_abund = mean(abundance), sdF = sd(fishing), sdabund = sd(abundance))

ggplot(datsum, aes(x = meanF, y = mean_abund, color = site)) + 
  geom_point(size = 3) +
  ylab('Fish abundance') + 
  xlab('Fishing pressure index')  




#Filter data
filterdat <- filter(fishdat, abundance > 10)
#Now group it
groupdat <- group_by(filterdat, site)
summarise(groupdat, meanF = mean(fishing))

fishdat %>% filter(abundance>10) %>% 
  group_by(site) %>%
  summarise(meanF = mean(fishing))

#
# Joining with site data
#

sitedat <- read.csv('Sitesdat.csv', header = TRUE)
sitedat

?inner_join

datnew <- inner_join(fishdat, sitedat, by ='site')
datnew

p2 <- ggplot(datnew, 
             aes(x =distance, y = fishing, colour = site)) +
  geom_point(size = 4)

p2 + theme_bw()

#
# Plot mean fishing pressure by distance.  
#

#1. Join the datasets
dat2 <- inner_join(fishdat, sitedat, by = 'site')
#2. Group by sites
dat3 <- group_by(dat2, site)

#3. Take mean of fishing
dat4 <- summarise(dat3, 
                  meanF = mean(fishing), 
                  distance = mean(distance), 
                  sdF = sd(fishing))

#4. GGPLOT to plot distance by mean fishing. 
p3 <- ggplot(dat4, aes(x = distance, y = meanF)) +
  geom_point() + 
  geom_errorbar(aes(ymin = meanF - sdF, ymax = meanF + sdF))


p3 + stat_smooth(method = 'lm')


# Analysis 
lm(fishing ~ distance, data = datnew)

mod1 <- lm(fishing ~ distance, data = datnew)
summary(mod1)

p2 + 
  stat_smooth(method = 'lm', se = TRUE, aes(group =1))




#
# Fish conditions
#

fishcond <- read.csv('FishCondition.csv', header = TRUE)
fishcond

condtidy <- gather(fishcond, site, condition, A:J)

condtidy <- rename(condtidy, size = X)

fishc_mn <- condtidy %>% group_by(size) %>% 
  summarise(meanC = mean(condition))

fishc_mn <- condtidy %>% group_by(size) %>% 
  summarise(meanC = mean(condition, na.rm = TRUE))
fishc_mn


sites_cond_mn <- condtidy %>% group_by(site) %>% 
  summarise(meanC = mean(condition, na.rm = TRUE))
sites_cond_mn


datall <- inner_join(sitedat, sites_cond_mn, by = 'site') %>% 
  inner_join(datsum, by = 'site') 

library(leaflet)

datall$site <- factor(datall$site)

leaflet(datall) %>%
  addTiles() %>%
  addMarkers(~long, ~lat) 


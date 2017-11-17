# Run this script to update pubs list on my webpage
# CJ Brown 2017-11-17

library(scholar)
library(dplyr)

datbase <- read.csv("~/Documents/Webpage/webpage/_data/pubs.csv")

thisid <- "1qG6yFMAAAAJ"
datin <- get_publications(id = thisid)
# ikeep <- !(datin$cid %in% datbase$cid)
# dat <- datin[ikeep,]
dat <- datin

iord <- order(dat$year, decreasing = TRUE)
dats <- dat[iord,]

auths <- dats$author %>% as.character() %>%
	strsplit(split = ",")

dats$first <- grepl("Brown",lapply(auths, function(x) x[1])) %>%
	as.character() %>% tolower()

dats$url <- paste0("https://scholar.google.com.au/citations?view_op=view_citation&hl=en&user=",thisid,"&citation_for_view=",thisid,":",dats$pubid)

dats <- select(dats, -number)
ikeep <- !(dats$journal == "")
dats <- dats[ikeep,]
dats$year[is.na(dats$year)] <- "In press"
dats <- arrange(dats, desc(year))

write.csv(dats, "/Users/s2973410/Documents/Webpage/webpagev2/_data/pubs.csv", row.names = F)

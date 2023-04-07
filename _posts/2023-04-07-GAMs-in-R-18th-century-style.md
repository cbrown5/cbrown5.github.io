---
title: Making predictions from GAMs in R explained by an 18th century author 
layout: default
category: rstats
published: TRUE
---

# Making predictions from GAMs in R explained by an 18th century author 

As explained by ChatGPT with some minor edits by me. This post is an example for my post ["Tips for using chatGPT to learn R"](https://www.seascapemodels.org/rstats/2023/04/07/using-chatgpt-to-learn-R.html) 

Pray, let us first summon the mgcv package, that we may avail ourselves of its functions in our quest to fashion a GAM.
Hark! Let us summon the 'mgcv' package

```
library(mgcv)
```
Verily, let us now create a simulated 'horse' dataset

```
# define the sample size
n <- 100

# simulate age data from a normal distribution
age <- rnorm(n, mean = 10, sd = 3)

# simulate rectal temperature data from a normal distribution
temp <- rnorm(n, mean = 101, sd = 1)

# Create a function for the mean heat rate
# with a linear effect of age and a polynomial
# effect of temp. 
hr_mean <- -0.1*age + 10*temp - 0.05*(temp^2) - 430

# simulate heart rate data from a normal distribution
# using the function above as the mean heart rate
hr <- rnorm(n, mean = hr_mean, sd = 8)

# combine the simulated data into a dataframe
horse <- data.frame(age, temp, hr)
```

Withal, we shall construct a GAM model, with heart rate (hr) as the response variable,  and age and rectal temperature (temp) as the predictors, fashioned with the 's' function to impart smoothness onto these predictors

```
model <- gam(hr ~ s(age) + s(temp), data = horse)
```

Verily, let us now display the summary of the GAM model

```
summary(model)
```

Hark! Let us now appreciate the beauty of the GAM model through a visual representation

```
plot(model)
```

Behold, the GAM model has been crafted with the utmost care and precision.

But hold, we must not overlook the most crucial task - to predict the heart rate values for a new horse. Let us accomplish this mission with the aid of the predict function, and relay the news unto the equine owner!

```
new_horse <- data.frame(age = c(5, 10, 15), temp = c(99, 101, 103))
predicted_hr <- predict(model, new_horse)
```

Thus, we have fulfilled our obligations, and have relayed the good tidings of the predicted heart rate value unto the horse owner. May their new companion serve them well, and gallop with vigor and grace!
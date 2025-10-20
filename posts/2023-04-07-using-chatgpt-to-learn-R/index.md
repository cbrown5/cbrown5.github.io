---
date: '4/7/2023'
title: Tips for using chatGPT to learn R
categories: [rstats, genAI]
published: TRUE
---

[ChatGPT](https://openai.com/blog/chatgpt) can help you learn R code. Here are some tips my team and I have worked out for ways to use the model to help with learning R. 

There is also an [`askgpt`](https://www.r-bloggers.com/2023/04/introducing-askgpt-a-chat-interface-that-helps-you-to-learn-r/) package now that is meant to integrate ChatGPT directly into RStudio. However, I've been unable to get this package to work on my laptop. 

### Ask GPT to explain R code

If you can find code on the web, from collaborators or a supervisor you don't understand, then trying asking GPT to explain it to you. Here's an example:

**Prompt:** *explain this R code: m1 <- gam(y ~ s(year, by = sites), data  = my_data, family = "poisson")* 

**GPT**: *The code m1 <- gam(y ~ s(year, by = sites), data = my_data) specifies a generalized additive model (GAM) in R.*

*Here's what each part of the code means:*

*m1 <- : assigns the output of the model to the object named m1.*
*gam() : specifies that we want to fit a generalized additive model.
*y ~ s(year, by = sites) : specifies the model formula, where y is the response variable and year is the predictor variable of interest. The function s() specifies that year is a smooth function, which allows for a flexible fit to the data. The by = sites argument specifies that we want to fit separate smooth functions for each sites level, which is a way to model site-specific effects.*

*Overall, this code fits a GAM to the data in my_data, with year as a smooth predictor variable and site-specific effects modeled with by = sites.*

It gets everything right. 

This tool is helping me keep meetings with my research students at a high level. We talk about what are appropriate methods and statistical designs, and don't need to spend as much time discussing how to code those. 

### Ask GPT advice on appropriate statistical models 

You use GPT to get started on a new problem. Say you had count data but weren't sure how to analyse it or even the name of the correct method. You could ask something this:

**Prompt:** *How would I do a regression model with count data in R* 

**GPT:** *There are several ways to model count data in R, but one popular method is to use Poisson regression or Negative Binomial regression. Here's a step-by-step guide on how to fit a Poisson regression model in R:...* 

And GPT continues to explain how to write a poisson GLM in R (one appropriate way to do regression with count data). 

You can often improve GPT's answers by breaking your questions into smaller chunks. So first ask it for advice on regression of count data. Then ask for an example in R. 

### Generate simulated datasets 

To gain a more general understanding of a method it might help you to work with some simulated (made-up data). GPT can help you write code to do this as well. Following on from the example above I asked it to generate simulated data. 

**Prompt:** *How would I simulate some data to test the poisson glm?* 

**GPT:** *To simulate count data for testing a Poisson GLM, you can use the rpois() function in R, which generates random numbers from a Poisson distribution with a given mean. Here is an example of how to simulate count data with two predictor variables:* 

``` 
set.seed(123) # for reproducibility

n <- 100 # number of observations
x1 <- rnorm(n) # predictor variable 1
x2 <- rnorm(n) # predictor variable 2
lambda <- exp(0.5 + 0.8*x1 - 0.2*x2) # log-linear model with intercept 0.5 and coefficients 0.8 and -0.2

y <- rpois(n, lambda) 
```

... And then GPT continues to explain what the above code does. 


### Create customised examples 

It helps to learn R and statistics if the examples you are learning from are for a familar context. This one one reason  why there are so many R books and tutorials that overlap in the methods they explain, just in different contexts, like "R for Ecologists", "R for Medical Research", 'R for Microbiology" etc... 

You can get GPT to write you customised tutorial. That way you get the explanation in a context you know. It can be easier to learn a tangible application in a context you know, before you try to learn how to use a method more generally. 

Following the poisson regression example above, we could ask GPT to modify its explanation for a specific context: 

**Prompt:** *Rewrite the R code for simulating data using an example of what predicts the number of easter eggs the easter bunny brings* 

**GPT:** *Sure, here's an example of how to simulate count data based on a linear model that predicts the number of Easter eggs brought by the Easter bunny:...* 

Then GPT continued with basically the same code as above, where it gave `x1` and `x2` as the predictors. It also provided a warning at the end: 

*Note that this is just an example, and in reality, the number of Easter eggs brought by the Easter bunny is likely to depend on more complex factors that may not be accurately captured by a simple linear model. Additionally, the true distribution of the count data may be more complex than a Poisson distribution, and may require a more advanced simulation approach to accurately capture its properties*

I further prompted it again to explain what `x1` and `x2` could be

**Prompt:** *What would be predictors of the number of easter eggs?* 

*There are many potential predictors that could influence the number of Easter eggs brought by the Easter bunny. Here are a few possibilities:*
*Number of children in a household: It stands to reason that the number of Easter eggs brought by the Easter bunny would be higher in households with more children, since the bunny would have more individuals to provide for.
*Household income: Depending on the cultural context, the number of Easter eggs brought by the Easter bunny could be influenced by the socioeconomic status of the household. For example, in some cultures, more affluent households may be more likely to provide larger quantities of Easter eggs....*

And it continued with other plausible suggestions. 

### Making stats more fun

You can go further with the bunnies above, using any example you like to keep yourself entertained (topics that are well known on the web will work best). For instance, I prompted GPT to write an explanation of generalized additive models in the style of an 18th century author. It used the classic 'cars' dataset. So I additionally prompted it to use [horses as an example instead.](https://www.seascapemodels.org/rstats/2023/04/07/GAMs-in-R-18th-century-style.html).  

Any style that is well known on the internet should work. You can ask for a crime novel with a gripping plot twist, in the style of a particular author like J.K. Rowling or as a script from Netflix series Bridgerton. If you are really passionate about R you could even try asking GPT for an explanation in the style of 50 Shades of Grey... 

### Pitfalls and words of warning

ChatGPT is just another tool we can use for learning. It can be part of your toolbox, but should not be the sole tool you use, it has pitfalls. It can give wrong or biased answers. Generally its correct, but some responses I've prompted have errors in the R code or in statistical logic. So always check your code independently. This should include running tests or working with someone who knows the correct way. 

ChatGPT can also generate code with bugs, which could be hard for beginners to debug (especially if they are the types of bugs that don't throw errors). 

Make sure you ask it clearly framed questions. Additionally, it has a 'token' limit (tokens are parts of words), so give it lots of smaller requests rather than one huge one. 

GPT may learn from text you enter, so don't put in personal information or your best research ideas. 

Finally, I'm now seeing R blog posts that I'm sure are written by ChatGPT or similar models (you can tell by the style). I don't have a problem with this, so long as the code is checked and corrected. So when searching for tutorials online make sure they are from reputable authors who you can trust to have verified their code and corrected any mistakes in explanation. 

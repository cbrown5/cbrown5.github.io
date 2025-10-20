---
date: '9/2/2025'
title: Create reports and tutorials with generative AI from R
categories: [rstats, genAI, research-skills]
published: TRUE
---

Several AI model providers have integrated web search capabilities into their large language models. I was attempting to use these features via the R `ellmer` package. However, changes to LLMs are so frequent that `ellmer` isn't keeping up. 

I did get `ellmer` to run Perplexity's Sonar web search model, however it didn't provide me with the references, which are essential. 

If you haven't seen these AI generated reports, check out the example at the end. Its a useful way to get a quick literature summary or create bespoke R tutorials. 

Here [I'm just announcing a couple of simple R scripts that you can use to do web search powered AI reports with the Openrouter service.](https://github.com/cbrown5/web-search-ai/blob/main/README.md)

I just created two functions (with the help of copilot of course), one that makes a call to the Openrouter API to send a question to a model. The second function processes the output (which is in JSON format) to make a nice qmd, with the references hyper-linked (be sure to check the url before clicking them, who knows what the AI will turn up!). From there you can render the qmd to get a pdf/word/html report. 

The functions are easy to use. First [download or copy these functions from my github](https://github.com/cbrown5/web-search-ai/blob/main/perplexity-search-functions.R). 

Note never trust any code from someone else that sends requests to LLMs! It could potentially include harmful prompts. I recommend reading all code that is sending prompts to LLMs just to be sure you know what it does. 

## Using the code to do a search and create a report

Once you have my two functions, you will need to [set-up your Openrouter API key](https://www.seascapemodels.org/AI-assistants-for-scientific-coding/03-set-up.html#sec-apikeys) and save the key somewhere (e.g. you can use `usethis::edit_r_environ()` and save it in there like OPENROUTER_API_KEY="MY-KEY-HERE")

Here's an example of using the function: 

```
library(httr)
library(jsonlite)

source("perplexity-search-functions.R")

openrouter_api_key <- Sys.getenv("OPENROUTER_API_KEY")

user_message <- "I want to learn how to use the NIMBLE package to fit autoregressive time-series models"

system_message <- "You are a helpful AI agent who creates statistical analysis tutorials in R. 
        Rules: 
        1. Include text and examples of code in your responses. 
        2. Produce reports that are less than 10000 words."

#Send response to openrouter 
response <- call_openrouter_api(
  openrouter_api_key,
  model = "perplexity/sonar-deep-research",
  system_message = system_message,
  user_message,
  search_context_size = "medium"
  #Options "low"  "medium", "high"
)

#Save the response as a qmd
save_response_as_qmd(response, "results/AR-models-in-NIMBLE.qmd")
```

## Inputs for the LLM 

The user message is your prompt for searching. The system message sets the scope of how the report is created. Note that anything for the web search goes in the user message, not the system message [see the Perplexity guidelines for more info on prompting advice, its different than for regular LLMs](https://docs.perplexity.ai/guides/prompt-guide). 

For example, another idea for a system prompt could be: 

```
system_message <- "You are a helpful AI agent who creates summary reports of the scientific literature. 
        Rules: 
        1. Produce reports that are less than 2000 words.
        2. Include a Summary section that summarizes key research trends. "

user_message <- "What are the impacts of climate warming on fish physiology documented in the peer-reviewed academic literature"

```

`search_context_size` is meant to control how much effort it puts in, its hard to tell if that impacts results or not, see [openrouter's docs for more information.](https://openrouter.ai/docs/features/web-search). 

## Model choices

Other models to try are: 

- `perplexity/sonar` for a simpler, cheaper searches, including citations. 

- `perplexity/sonar-deep-research` For deeper, more expensive searches with citations and reasoning. 

- `openai/o4-mini` Is another option, but doesn't return citations. 

Explore the openrouter site for other web search enabled LLMs. 

## Customization

The `call_openrouter_api.R` function is a template for customizing, not a comprehensive framework for using the openrouter API. Its actually very easy to connect to LLMs from R (even though most examples online are in python or typscript). Here's a basic template:


```
library(httr)
library(jsonlite)
response <- POST(
    url = "https://openrouter.ai/api/v1/chat/completions",
    add_headers(
      "Content-Type" = "application/json",
      "Authorization" = paste("Bearer", openrouter_api_key)
    ),
    body = toJSON(list(
      model = model,
      messages = list(
        list(
          role = "system",
          content = system_message
        ),  
        list(
          role = "user",
          content = user_message
        )
      )
    ), auto_unbox = TRUE),
    encode = "raw"
  )

```

The trick then is formatting the output, which is what my other function does (focussing on perplexities models). 


## Report example 

Below is an example, I asked used the system prompt above and asked about fitting surplus production models (for fisheries science) with the NIMBLE package. Note one minor bug with my function converting qmd references to hyperlinks, it potential does R sub-scripts as well. Something to work on later. Here's the AI report: 

You can fit a **surplus production model (SPM)** with the NIMBLE package in R by writing the model in BUGS language, which NIMBLE extends, specifying your likelihood (e.g., production dynamics with catch data) and priors for the parameters, and then using NIMBLE’s MCMC capabilities to estimate the posterior distributions of parameters. Here is a stepwise approach with example code snippets:

1. **Specify the surplus production model in BUGS code**:  
   This typically models biomass \( B_t \) evolving over time according to a logistic growth or Gompertz model minus catches \( C_t \). For example, the Schaefer model can be expressed as:  
   \[   B_{t+1} = B_t + r B_t \left(1 - \frac{B_t}{K}\right) - C_t + \epsilon_t
   \]  
   where \(r\) is intrinsic growth rate, \(K\) is carrying capacity, and \(\epsilon_t\) models process noise.

```
library(nimble)

# Define the model in BUGS syntax
spm_code <- nimbleCode({
  # Priors for parameters
  r ~ dunif(0, 2)           # growth rate
  K ~ dunif(maxCatch, 10 * maxCatch)  # carrying capacity (expand as appropriate)
  sigma ~ dunif(0, 5)       # process noise SD

  B<a href="https://oliviergimenez.github.io/banana-book/intronimble.html" target="_blank">[1]</a> ~ dunif(0, K)       # initial biomass
  
  for(t in 1:(nYears - 1)) {
    mu[t] <- B[t] + r * B[t] * (1 - B[t]/K) - catch[t]
    B[t + 1] ~ dnorm(mu[t], sd = sigma)
  }
})
```

2. **Prepare the data and constants** (e.g., catch time series, number of years):

```
data <- list(catch = catch_vector)  # your observed catches
constants <- list(nYears = length(catch_vector), maxCatch = max(catch_vector))
inits <- list(r = 0.5, K = max(catch_vector)*5, sigma = 0.1, B = rep(NA, length(catch_vector)))
```

3. **Build, compile, and run the model with NIMBLE**:

```
# Create model object
spm_model <- nimbleModel(spm_code, data = data, inits = inits, constants = constants)

# Compile model
c_spm_model <- compileNimble(spm_model)

# Configure MCMC; default samplers are usually fine
mcmc_conf <- configureMCMC(spm_model)
mcmc <- buildMCMC(mcmc_conf)
c_mcmc <- compileNimble(mcmc, project = spm_model)

# Run MCMC sampling
samples <- runMCMC(c_mcmc, niter = 10000, nburnin = 2000, thin = 5)

# Check results
summary(samples)
```

This workflow follows NIMBLE’s general approach of specifying hierarchical Bayesian models in an extended BUGS language, compiling fast C++ versions of the model and samplers, and running MCMC algorithms<a href="https://oliviergimenez.github.io/banana-book/intronimble.html" target="_blank">[1]</a><a href="https://www.rdocumentation.org/packages/nimble/versions/1.3.0/topics/nimble-package" target="_blank">[2]</a><a href="https://github.com/nimble-dev/nimble" target="_blank">[4]</a><a href="https://r-nimble.org" target="_blank">[7]</a>. The key is coding the surplus production dynamics explicitly as state-transition equations with observation or process error as needed.

For clarity, here is a **minimal example with dummy catch data**:

```
library(nimble)

catch_vector <- c(100, 120, 90, 80, 110) # example catches

spm_code <- nimbleCode({
  r ~ dunif(0, 2)
  K ~ dunif(maxCatch, 10 * maxCatch)
  sigma ~ dunif(0, 5)

  B<a href="https://oliviergimenez.github.io/banana-book/intronimble.html" target="_blank">[1]</a> ~ dunif(0, K)
  for(t in 1:(nYears - 1)) {
    mu[t] <- B[t] + r * B[t] * (1 - B[t]/K) - catch[t]
    B[t+1] ~ dnorm(mu[t], sd = sigma)
  }
})

data <- list(catch = catch_vector)
constants <- list(nYears = length(catch_vector), maxCatch = max(catch_vector))
inits <- list(r = 0.5, K = max(catch_vector)*5, sigma = 0.1, B = rep(NA, length(catch_vector)))

spm_model <- nimbleModel(spm_code, data = data, inits = inits, constants = constants)
c_spm_model <- compileNimble(spm_model)

mcmc_conf <- configureMCMC(spm_model)
mcmc <- buildMCMC(mcmc_conf)
c_mcmc <- compileNimble(mcmc, project = spm_model)

samples <- runMCMC(c_mcmc, niter = 5000, nburnin = 1000, thin = 2)
print(summary(samples))
```

This example models biomass dynamics probabilistically and fits parameters \(r\), \(K\), and noise level \(\sigma\) given known catches using Bayesian inference.

If you want to implement maximum likelihood fitting instead, NIMBLE lets you compile the model and evaluate likelihoods for optimization, as demonstrated in tutorials<a href="https://oliviergimenez.github.io/banana-book/intronimble.html" target="_blank">[1]</a>.

In summary:
- **Write your surplus production model in NIMBLE’s BUGS language**, defining biomass dynamics, catch, and priors for parameters  
- **Compile and run MCMC** sampling in NIMBLE to fit the model  
- **Extract posterior samples** for growth rate, carrying capacity, biomass, and uncertainty  
- Optionally, use **likelihood-based methods** by compiling the model and defining your own optimizer function in R<a href="https://oliviergimenez.github.io/banana-book/intronimble.html" target="_blank">[1]</a><a href="https://r-nimble.org" target="_blank">[7]</a>.  

This approach leverages NIMBLE’s power for hierarchical, Bayesian time-series stock assessment models including surplus production models.

## References
1. <a href="https://oliviergimenez.github.io/banana-book/intronimble.html" target="_blank">oliviergimenez.github.io/banana-book/intronimble.html</a>
2. <a href="https://www.rdocumentation.org/packages/nimble/versions/1.3.0/topics/nimble-package" target="_blank">www.rdocumentation.org/packages/nimble/versions/1.3.0/topics/nimble-package</a>
3. <a href="https://www.youtube.com/watch?v=DE4Q82QgSBs" target="_blank">www.youtube.com/watch</a>
4. <a href="https://github.com/nimble-dev/nimble" target="_blank">github.com/nimble-dev/nimble</a>
5. <a href="https://r-nimble.org/documentation-2" target="_blank">r-nimble.org/documentation-2</a>
6. <a href="https://cran.r-project.org/web/packages/nimbleCarbon/vignettes/nimble_carbon_vignette.html" target="_blank">cran.r-project.org/web/packages/nimbleCarbon/vignettes/nimble_carbon_vignette.html</a>
7. <a href="https://r-nimble.org" target="_blank">r-nimble.org/</a>
8. <a href="https://www.rdocumentation.org/packages/nimble/versions/1.3.0" target="_blank">www.rdocumentation.org/packages/nimble/versions/1.3.0</a>


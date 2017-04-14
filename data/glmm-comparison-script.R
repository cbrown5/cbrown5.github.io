# Script to accompany the blog "Choosing R packages for mixed effects modelling based on the car you drive"
# CJ Brown 14th April 2017

library(microbenchmark)
library(ggplot2)
library(jagstools)

#
# Simulate data
#

N <- 100 #num sites
G <- 5
coef1 <- 3
int <- -2
set.seed(22)
x <- runif(N)

alpha_mu <- 0
sigma <- 1
set.seed(1)
alpha <- rnorm(G, mean = alpha_mu, sd = sigma)
grps <- rep(1:G, each = N/G)

set.seed(50)
y <- yprob <-  numeric(N)
for (n in 1:N){
  ymean <- int + (coef1*x[n]) + (alpha[grps[n]])
  yprob[n] <- 1/(1+exp(-ymean))
  y[n] <- rbinom(1, 1, yprob[n])
}

dat <- data.frame(y = y, x = x, grps =grps)

#
# Prediction data (not used in blog)
#

npred <- 100
xpred <- seq(min(x), max(x), length.out = npred)
datpred <- expand.grid(x=xpred, grps=dat$grps)
datpred$linpred <- int + (coef1 * datpred$x) + (alpha[datpred$grps])
datpred$probs <- 1/(1+exp(-datpred$linpred))

# ---------------
# Fit models
# ---------------

#
# lme4
#

library(lme4)
mb.glmer <- microbenchmark(mod.glmer <- glmer(y ~ x + (1| grps), data = dat, family = 'binomial'))

datpred$predglmer <- predict(mod.glmer, newdata = datpred, type = 'response')

#
# jags
#

library(rjags)
#using gamma and normals so results comparable to inla priors

cat("
    model {
    for (n in 1:N) {
    #Data
    logit(eta[n]) <- int + (coef1*x[n]) + alpha[grps[n]]
    y[n] ~ dbern(eta[n])
    }

    #Priors
    for (g in 1:G){
    alpha[g] ~ dnorm(0.0, alphatau)
    }

    sigma ~ dgamma(1, 0.1)
    alphatau <- pow(sigma, -2)

    int ~ dnorm(0, 0.01)
    coef1 ~ dnorm(0, 0.01)
    #int ~ dt(0, 2.5, 4) #using student-t as recommended by Gelman
    #coef1 ~ dt(0, 2.5, 4)
    }
    ",
    file = 'hierbin.bug')

load.module("glm")

runjags <- function(){
  jags <- jags.model('hierbin.bug',
                     data = list('N' = n,
                                 'y' = y,
                                 'x' =x,
                                 'G' = G,
                                 'grps' = grps
                     ),
                     n.chains = 3)

  #Burn in
  update(jags, 5000)

  #Extract samples
  niter <- 30000
  nthin <- 4
  nsamp <- round(niter/nthin)
  mcout <- coda.samples(jags, variable.names=c("coef1", "int", "sigma", "alpha"), n.iter=niter, thin = nthin)
  mcout
}

mb.jags <- microbenchmark(mcout <- runjags(), times = 1L)
mod.jags <- summary(mcout)

#
# Stanarm
#
library(rstanarm)

t_prior <- student_t(df = 4, location = 0, scale = 2.5)

mb.stanarm <- microbenchmark(mod.stanarm <- stan_glmer(y ~ x + (1|grps),
                                                       data = dat,
                                                       family = binomial(link = 'logit'),
                                                       prior = t_prior,
                                                       prior_intercept = t_prior,
                                                       chains = 3, cores = 1, seed = 10), times = 1L)


#
# INLA
#


library(INLA)

formula <- y ~ x + f(grps, model = 'iid',
                     hyper = list(theta = list(prior = "loggamma", param = c(1, 0.1))))

#can easily customise priors using table or expression.

mb.inla <- microbenchmark(
  mod.inla <- inla(formula, data = dat,
                   family = 'binomial', Ntrials = 1,
                   control.family = list(link = "logit"),
                   control.fixed = list(
                     mean = 0, prec = 0.001, mean.intercept=0, prec.intercept =0.001)
  ), times = 1L)

#
# Compare estimates
#

# True values
coef1
int1
alpha
sigma

#Estimates
summary(mod.glmer)
mod.jags
summary(mod.inla)
summary(mod.stanarm)

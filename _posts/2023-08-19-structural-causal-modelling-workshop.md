---
title: Introduction to structural causal modelling
layout: default
category: rstats
published: TRUE
---

# Introduction to structural causal modelling

A primary goal of science is to understand causes. Structural causal modelling is a framework for developing causal hypotheses to test with data. 

I taught a workshop at the Australian Marine Sciences Association conferences in 2023. I've now [provided all the course notes online for free](https://www.seascapemodels.org/structural-causal-models-tutorial/scm-tute.html).

One if the advantages of causal modelling is that the tests can be done with any test you like. 

So all of the existing statistical inference engines (like generalized linear models) that we are used to using with the R language can be used in structural causal modelling. 

The workshop shows how to develop causal hypotheses, using R to visualise your hypotheses. It then steps through some examples of develping and testing causal tests with ecological data.

The workshop covers packages `daggity` and `ggdag` for visualising causal models (directed acyclic graphs) and developing causal tests. We also look at making tests with `glm()` and how to simulate your own data to test models. Finally, we cover `visreg` for visualising model output. 



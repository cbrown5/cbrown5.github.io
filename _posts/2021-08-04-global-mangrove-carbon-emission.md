---
title: Combining local knowledge and scientific surveys to estimate declines in threatened species
layout: default
category: research
published: TRUE
---

# Combining local knowledge and scientific surveys to estimate declines in threatened species

In the study "[Community-based management fails to halt declines of bumphead parrotfish and humphead wrasse in Roviana Lagoon, Solomon Islands](https://link.springer.com/article/10.1007/s00338-019-01801-z)" we report on declines in two threatened fish species bumphead parrotfish (*Bolbometopon muricatum*) and humphead wrasse (*Cheilinus undulatus*).

Announcing here I've made the [R code for this paper freely available](https://github.com/cbrown5/bolbometopon-cheilinus-roviana). A unique feature of this analysis is that we integrated local knowledge into the analysis of the scientific survey data.

To do this, we used a Bayesian GLM, where the rate of decline was informed by both change in fish density in the scientific survey data (2000-2018) and change in the maximum catch rate that local fishers could recall for the 1980s, 2000s and 2018.

The integration of local knowledge meant we could verify the declines in catch rate with scientific survey data, and adjust for bias between fisher recall and the surveys. We could then infer the population density in the 1980s, when there were no scientific surveys.

Unfortunately, the significant magnitudes of the declines over multiple generations suggest these species meet the criteria for being 'Critically Endangered' on the IUCN Red List (at least at this local site, if not regionally).

Read more about the study in the paper:

[Hamilton RJ, Hughes A, Brown CJ, Leve T, Kama W. Community-based management fails to halt declines of bumphead parrotfish and humphead wrasse in Roviana Lagoon, Solomon Islands. Coral Reefs. 2019 Jun;38(3):455-65.](https://link.springer.com/article/10.1007/s00338-019-01801-z)

---
title: Migratory species
layout: md_layout
category: Research
published: true
---

## Networks of habitats increase the vulnerability of migratory species  to climate change

Migratory species are important components of many ecosystems and human societies. Salmon are one of the most well known migratory fish, they move between freshwaters and the ocean to feed and breed. In Australia, we have our own unique assemblage of migratory fish, many of which are highly threatened.

<div class = "image_caption">
<img src ="/Images/Australian_grayling.jpeg" alt="" class="image_float"/>
<p> The Australian Grayling. Image: Nathan Litjens</p>
</div>


For instance, the Australian Grayling has undergone large population declines and is a protected species. A primary threat is dams, which prevent it from migrating from its freshwater habitats to the sea and back again.

Migratory fish may face a double jeopardy from climate change. Not only will climate change affect their marine and freshwater habitats, but it may also decouple the connections between those habitats.  

[In a recent study](http://onlinelibrary.wiley.com/doi/10.1111/ddi.12570/full), we combined species distribution models with network analysis to ask how climate change and dams affect the future persistence of the Grayling.

We turned to the R programming language to implement our models, because it gave us the flexibility to fit models of Grayling distribution, predict change in Grayling distribution and analyse the outputs using network analysis.

Co-author Alex Bush developed an ensemble of models for Grayling freshwater habitat using the R packages [dismo](https://cran.r-project.org/web/packages/dismo/index.html) and [biomod2](https://cran.r-project.org/web/packages/biomod2/index.html).  These models considered key environmental variables for Grayling distribution along Australia's East Coast including temperature and rainfall.

Lead author Hsien-Yung Lin then developed a model for Grayling's marine distribution. Finally, he was able to create maps of connected habitats using data on Australia's dams.

Using predictions of climate change from 2015 to 2085, Lin could predict where suitable habitat for the Grayling would move to. By turning these maps of suitability into networks, he could analyse areal changes in habitat using R's [igraph](https://cran.r-project.org/web/packages/igraph/index.html) package.

The network analysis also allowed Lin to predict the effect of removing dams, thus restoring connectivity to areas of marine and freshwater habitat that may have been inaccessabile to migrating Grayling.

We found that the dams a manager would remove to bring the greatest benefits to Grayling changed under climate change.

Because Grayling habitat generally moves south in both marine and freshwaters, restoring connectivity further to the south became more important with future warming.  Removing the right dams could increase Grayling freshwater habitat by up to 30% under some climate scenarios.

The most important dams to remove also tended to move further upstream if we considered more extreme climate change scenarios. This is because Grayling distribution is expected to move further upstream to cooler habitats.

Our results suggest that the conservation of migratory species should consider movements in all their habitats and also how climate change may alter connections among habitats. Doing so can result in more effective advice to management on where to restore connections to help recover threatened species.

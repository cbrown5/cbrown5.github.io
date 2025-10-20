---
category: rstats
title: "The next advance in spatial R"
published: true
date: '25/07/2015'
---

   <h2> What will be the next big advance in spatial analysis using R? </h2>

   <p>
      The programming tools available for scientists to use for data analysis are becoming increasingly complex and sophisticated. This trend will continue, however I believe the most significant new advances will come from the development open, light and accessible packages. By 'light' I mean packages that are both easy to learn, straightforward to work with, and can run on standard desktops and laptops.
   </p>
   <p>
      The capacity for languages like R to produce incredibly sophisticated analyses outstrips most people's ability to use those tools. A few people are pushing the boundaries (e.g. see Sean Anderson and colleague's recent <a href="http://www.sciencemag.org/content/348/6234/567.abstract">global extinction risk analysis</a>), but most scientists who use will continue to use only those tools they are most familiar with (but are pushing the boundaries of human knowledge in other ways of course).
   </p>
   <p>
      Case in point: the success of <a href="https://cran.rstudio.com/web/packages/dplyr/vignettes/introduction.html">Wickham's <code>dplyr</code> package</a> for data wrangling in R. <code>dplyr</code> doesn't really do anything you can't do with R's base package, but it does make data wrangling easier, more intuitive and faster. <code>dplyr</code> is brilliant not only because it is accessible for relative begginners, but also because it saves coding time for advanced users too.
   </p>
   <p>
      More generally, other areas of science can benefit from accessible and light packages too. An example, from coral reef science. For many decades, reef scientists have been interested in how the complexity of reefs varies across environmental gradients. One way to measure complexity it to take a lead rope of say, 3 metres length, and lay it out over the contours of the reef. Then measure the rope's resulting length when viewed from above. The ratio of lengths is then a measure of the reef's complexity. More detailed measurements of reef complexity can be made by taking video footage and post-processing it to make 3D models of the reef. In fact, <a href="http://eprints.qut.edu.au/52839/">you can make precise measurements of reefs </a> using this method. But the fact is, people keep going back to the old lead rope method.
   </p>
   <p>
       The reason people continue to use the lead rope method is that ropes are reliable and calcuting complexity from your field data is easy. Compare that with the hassles of taking a 3D camera underwater, generating large amounts of video data and then having to use complex post-processing programs to get your results. The rise of cheap high-def cameras, like go-pros has solved the first issue, but the proccessing step still remains a major challenge. Several groups have developed programs for processing 3D video over the years, but they typically required computer scientists to implement these programs. The method won't be broadly used until someone develops a program that is accessible to reef scientists, light and cheap.
   </p>
   <p>
      The uptake of R's sophisticated spatial tools also faces the same challenge: many of them are accessible only to experienced programmers. This is changing of course, for instance the <code>raster</code> package comes with very accessible help files. The developers are even expanding it to include some processing options for shape files. However, the documentation for the main package for processing shapes,  <code>rgeos</code>, is quite technical. Further, <code>rgeos</code> operations often through up incomprehensible errors when you perform common tasks like polygon intersects.
   </p>
   <p>
       The potential to use R as a fully functioning GIS is only just beginning to be realised. So watch this space.
   </p>
  
</div>

</div>
</div>

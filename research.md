---
layout: default
title: Research
sitemap:
    priority: 0.7
    changefreq: 'monthly'
    lastmod: 2023-06-03
---

# Research

### We work on balancing the conservation of marine ecosystems with human uses of the oceans

<div class="container">
  <p>The future of ocean and coastal biodiversity is uncertain. This uncertainty
  threatens humanity's place on the blue planet. We urgently need to adapt
  human uses of the ocean to conserve its ecosystems and ensure it continues
  to provide us with food, energy, recreation, clean water and clean air. </p>
  <p> We are marine scientists who use quantitative tools to inform environmental
    decisions in the oceans. We do this by bringing ecological complexity to the planning tools used to
   inform decision making. We work with decision makers to provide
   quantitative advice on ocean and coastal conservation and fishery management.
   Our tools of choice are computer programming, mathematical models and statistical analysis.
    These tools allow us to work with complex datasets to find solutions for
    ocean management. </p>
   <p>We specialize in the
   <a href="http://cran.r-project.org/" target="_blank">R
     programming language</a> and teach R to others.
   Chris' teaching resources are on this site and are
    <a href="/code.html">open-access</a>. </p>

<p> Read more about our <a href="/people.html"> research team</a> or our
  research on our <a href="/bluecology_blog.html">blog</a> or check out
   our <a href="/publications/html"> publications</a>. </p>

<h3> Future research opportunities </h3>

<p>
<a href ="/research/2023/06/17/PhD-projects-available.html"
class="button-ppl bkg-1">
We are currently seeking applicants for
  PhD projects to study quantitative marine conservation science.
</a> 
</p>

<h2>  Current projects  </h2>

<div class="clearme"><p></p></div>

<ul class="list-research">
{% for projects in site.data.projects %}
{% if projects.category contains 'current'%}
<li>
<a href="{{ projects.url }}" class="box-link">
        <div class="portfolio">
          <h4> {{projects.title}} </h4>
          <p><img src="{{ projects.imgsrc }}" class="icon-image"></p>
          <p>{{projects.blurb}} </p>
          <p> Team:  {{ projects.team }} </p>
        </div>
</a></li>
{% endif %}
{% endfor %}
</ul>


<div class="clearme"></div>

<h2>  Past projects  </h2>

<ul class="list-research">
{% for projects in site.data.projects %}
{% if projects.category contains 'past'%}
<li>
<a href="{{ projects.url }}" class="box-link">
        <div class="portfolio">
          <h4> {{projects.title}} </h4>
          <p><img src="{{ projects.imgsrc }}" class="icon-image"></p>
          <p> Team:  {{ projects.team }} </p>
        </div>
</a></li>
{% endif %}
{% endfor %}
</ul>

<div class="clearme"></div>

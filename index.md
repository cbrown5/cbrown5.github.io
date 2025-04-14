---
layout: default
sitemap:
    priority: 0.7
    changefreq: 'monthly'
    lastmod: 2023-06-03
---

<div class="hero-image">
  <img src="images/mangrove-paddle2.jpg" alt="Paddling through mangroves" class="feature-image">
  <div class="hero-text">
    <h1>Seascape models lab</h1>
    <p>Marine ecosystems, conservation, fisheries and modelling</p>
  </div>
</div>

<div class="grid">
<a href="/research.html" class="card-link">
    <div class="card" style="width: 100%;">
      <h2>Research Focus</h2>
      <p>We need to find balance between human needs and ocean conservation.
We are a team of ecologists, data scientists and social scientists. 
We provide the evidence needed for sustainable ocean management. We work to bring ecological complexity to the  modelling tools that are used to inform decision-making.  </p>
    </div>
  </a>
</div>


<h2 class="text-center mb-2">Featured Projects</h2>
<div class="grid grid-3">
  <a href="/research.html#marine-conservation" class="card-link">
    <div class="card">
      <h3>Marine Conservation</h3>
      <p>Developing strategies for protecting marine ecosystems and biodiversity.</p>
    </div>
  </a>
  
  <a href="/research.html#data-science" class="card-link">
    <div class="card">
      <h3>Data Science</h3>
      <p>Using R and other tools to analyze ecological data and inform conservation decisions.</p>
    </div>
  </a>
  
  <a href="/research.html#ecosystem-modeling" class="card-link">
    <div class="card">
      <h3>Ecosystem Modeling</h3>
      <p>Creating models to understand and predict changes in marine environments.</p>
    </div>
  </a>
</div>

<div class="mt-2">
  <h2>Recent Blog Posts</h2>
  <div class="grid">
    {% for post in site.posts limit:3 %}
    <a href="{{ post.url }}" class="card-link">
      <div class="post-preview card">
        <h3>{{ post.title }}</h3>
        <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>
      </div>
    </a>
    {% endfor %}
  </div>
</div>
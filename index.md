---
layout: default
title: Marine Science & Ecology Research
subtitle: Exploring marine ecosystems, conservation, and data science
sitemap:
    priority: 0.7
    changefreq: 'monthly'
    lastmod: 2023-06-03
---

<div class="grid grid-2 mb-2">
  <div class="card">
    <h2>Research Focus</h2>
    <p>Our research focuses on marine conservation, ecosystem modeling, and sustainable management of marine resources. We use data science and ecological principles to understand and protect marine ecosystems.</p>
    <a href="/research.html" class="button-menu">Learn More</a>
  </div>
  
  <div class="card">
    <h2>Latest Publications</h2>
    {% include news.html limit=3 %}
  </div>
</div>

<h2 class="text-center mb-2">Featured Projects</h2>
<div class="grid grid-3">
  <div class="card">
    <h3>Marine Conservation</h3>
    <p>Developing strategies for protecting marine ecosystems and biodiversity.</p>
  </div>
  
  <div class="card">
    <h3>Data Science</h3>
    <p>Using R and other tools to analyze ecological data and inform conservation decisions.</p>
  </div>
  
  <div class="card">
    <h3>Ecosystem Modeling</h3>
    <p>Creating models to understand and predict changes in marine environments.</p>
  </div>
</div>

<div class="mt-2">
  <h2>Recent Blog Posts</h2>
  <div class="grid">
    {% for post in site.posts limit:3 %}
    <div class="post-preview">
      <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
      <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>
      {{ post.excerpt }}
    </div>
    {% endfor %}
  </div>
</div>
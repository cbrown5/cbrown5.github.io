---
layout: default
title: Bluecology Blog
subtitle: Thoughts on marine science, ecology, and R programming
permalink: /bluecology_blog.html
---

<div class="card mb-2">
  <h2>About This Blog</h2>
  <p>Welcome to the Bluecology Blog, where we share insights about marine science, ecological research, and data analysis. Here you'll find posts about our research findings, R programming tips, and thoughts on marine conservation.</p>
</div>

<div class="grid">
  {% for post in site.posts %}
    <a href="{{ post.url }}" class="card-link">
      <div class="post-preview card">
        <h3>{{ post.title }}</h3>
        <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>
      </div>
    </a>
  {% endfor %}
</div>

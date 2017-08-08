---
layout: default
title: News and Views
---

# Blog
Chris Brown's blog on ocean science, quantitative ecology and R programming. Find us on [Rbloggers](https://www.r-bloggers.com/).

<ul class="list_post">
    {% for post in site.posts %}
  <li><a class="button_post" href="{{ post.url }}">{{ post.title }} - <em>{{ post.date | date: "%d %b %Y" }}</em> </a></li>
  {% endfor %}
</ul>

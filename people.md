---
layout: default
title: News and Views
sitemap:
    priority: 0.7
    changefreq: 'monthly'
    lastmod: 2023-06-03
---

# People

<ul class="list-ppl">
  <li><a class="button-ppl bkg-1" href="/people/Chris-Brown.html">Chris Brown, Research Leader </a></li>
</ul>
<div class="clearme"><p></p></div>

## Staff

<ul class="list-ppl">
    {% for people in site.people %}
    {% if people.category contains 'currentstaff'%}
  <li><a class="button-ppl bkg-1" href="{{ people.url }}">{{ people.title }} </a></li>
    {% endif %}
  {% endfor %}
</ul>
<div class="clearme"></div>

## Research students

<ul class="list-ppl">
    {% for people in site.people %}
    {% if people.category contains 'currentphd'%}
  <li><a class="button-ppl bkg-1" href="{{ people.url }}">{{ people.title }} </a></li>
    {% endif %}
  {% endfor %}
</ul>
<div class="clearme"></div>

## Alumni

<ul class="list-ppl">
    {% for people in site.people %}
    {% if people.category contains 'alumnus'%}
  <li><a class="button-ppl bkg-1" href="{{ people.url }}">{{ people.title }} </a></li>
    {% endif %}
  {% endfor %}
</ul>
<div class="clearme"></div>

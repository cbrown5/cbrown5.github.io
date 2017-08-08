---
layout: default
title: News and Views
---

# People

<ul class="list-ppl">
  <li><a class="button-ppl" href="/people/chris-brown.html">Chris Brown </a></li>
</ul>
<div class="clearme"><p></p></div>

## Current members

<ul class="list-ppl">
    {% for people in site.people %}
    {% if people.category contains 'current'%}
  <li><a class="button-ppl" href="{{ people.url }}">{{ people.title }} </a></li>
    {% endif %}
  {% endfor %}
</ul>
<div class="clearme"></div>

## Alumni

<ul class="list-ppl">
    {% for people in site.people %}
    {% if people.category contains 'alumnus'%}
  <li><a class="button-ppl" href="{{ people.url }}">{{ people.title }} </a></li>
    {% endif %}
  {% endfor %}
</ul>
<div class="clearme"></div>
<hr>

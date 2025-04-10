---
layout: default
title: Our Team
subtitle: Meet the researchers and students working on marine science and conservation
---

<div class="grid grid-3">
{% for person in site.people %}
  <div class="profile-card card">
    {% if person.image %}
    <img src="{{ person.image }}" alt="{{ person.name }}">
    {% endif %}
    <h3>{{ person.name }}</h3>
    {% if person.role %}
    <p><strong>{{ person.role }}</strong></p>
    {% endif %}
    {{ person.content }}
    {% if person.email %}
    <p><a href="mailto:{{ person.email }}">{{ person.email }}</a></p>
    {% endif %}
  </div>
{% endfor %}
</div>

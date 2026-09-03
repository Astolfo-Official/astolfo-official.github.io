---
layout: page
title: Research
permalink: /research/
description: I develop theoretical and computational tools for light–matter interactions, molecular simulation, electronic structure, and AI-enhanced scientific research.
nav: true
nav_order: 1
_styles: |
  .post-header {
    display: none;
  }

  .research-page {
    --research-accent: #2f6f73;
    --research-accent-soft: rgba(47, 111, 115, 0.09);
    --research-card-shadow: 0 10px 28px rgba(17, 46, 54, 0.1);
    --research-card-shadow-hover: 0 16px 38px rgba(17, 46, 54, 0.16);
    margin-top: 0;
  }

  .research-stream {
    display: grid;
    gap: 1rem;
  }

  .research-entry {
    padding: 0.9rem;
    border: 1px solid color-mix(in srgb, var(--research-accent) 22%, var(--global-divider-color));
    border-left: 3px solid color-mix(in srgb, var(--research-accent) 72%, transparent);
    border-radius: 8px;
    background:
      linear-gradient(115deg, var(--research-accent-soft), rgba(252, 126, 175, 0.045) 52%, transparent 84%),
      var(--global-card-bg-color);
    box-shadow: var(--research-card-shadow);
    transition:
      border-color 160ms ease,
      box-shadow 160ms ease,
      transform 160ms ease;
  }

  .research-entry:hover {
    border-color: color-mix(in srgb, var(--research-accent) 42%, var(--global-divider-color));
    border-left-color: color-mix(in srgb, var(--research-accent) 72%, transparent);
    box-shadow: var(--research-card-shadow-hover);
    transform: translateY(-2px);
  }

  .research-entry__inner {
    display: grid;
    grid-template-columns: minmax(10.5rem, 13.5rem) minmax(0, 1fr);
    gap: clamp(1rem, 2.2vw, 1.35rem);
    align-items: center;
  }

  .research-entry__inner--text-only {
    grid-template-columns: 1fr;
  }

  .research-entry__media {
    position: relative;
    display: block;
    justify-self: center;
    width: min(100%, 13.5rem);
    height: clamp(8.75rem, 13vw, 9.75rem);
    overflow: hidden;
    border: 1px solid var(--global-divider-color);
    border-radius: 6px;
    background:
      linear-gradient(135deg, var(--research-accent-soft), rgba(182, 74, 107, 0.05)),
      var(--global-bg-color);
  }

  .research-entry__media,
  .research-entry__title a {
    transition:
      color 0.2s ease,
      border-color 0.2s ease,
      background-color 0.2s ease,
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .research-entry__media figure,
  .research-entry__media picture {
    display: block;
    height: 100%;
    margin: 0;
  }

  .research-entry__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .research-entry__title {
    margin: 0 0 0.65rem;
    color: var(--global-text-color);
    font-size: clamp(1.2rem, 2vw, 1.45rem);
    font-weight: 700;
    line-height: 1.24;
    letter-spacing: 0;
  }

  .research-entry__title a {
    color: inherit;
    text-decoration: none;
  }

  .research-entry__title a:hover {
    color: var(--global-theme-color);
  }

  .research-entry__description {
    margin-bottom: 0;
    color: var(--global-text-color-light);
    font-size: 0.92rem;
    line-height: 1.65;
  }

  html[data-theme="dark"] .research-page {
    --research-accent: #74c7c0;
    --research-accent-soft: rgba(116, 199, 192, 0.13);
    --research-card-shadow: 0 12px 30px rgba(0, 0, 0, 0.26);
    --research-card-shadow-hover: 0 18px 42px rgba(0, 0, 0, 0.36);
  }

  @media (max-width: 767.98px) {
    .research-page {
      margin-top: 0.5rem;
    }

    .research-entry__inner {
      grid-template-columns: 1fr;
      gap: 1.35rem;
    }

    .research-entry__media {
      width: min(100%, 18rem);
      height: 12rem;
    }

    .research-entry {
      padding: 1rem;
    }
  }
---

{% assign sorted_projects = site.projects | sort: "importance" %}

<div class="research-page">
  <header class="page-hero">
    <h1>{{ page.title }}</h1>
    <p>{{ page.description }}</p>
  </header>

{% if sorted_projects.size > 0 %}

<div class="research-stream">
{% for project in sorted_projects %}
{% if project.redirect %}
{% assign project_url = project.redirect %}
{% else %}
{% assign project_url = project.url | relative_url %}
{% endif %}
{% assign project_anchor = project.title | slugify %}
<section id="{{ project_anchor }}" class="research-entry">
<div class="research-entry__inner{% unless project.img %} research-entry__inner--text-only{% endunless %}">
{% if project.img %}
<a class="research-entry__media" href="{{ project_url }}">
{%
                  include figure.liquid
                  loading="eager"
                  path=project.img
                  sizes="(min-width: 768px) 40rem, 100vw"
                  alt=project.title
                  class="research-entry__image"
                %}
</a>
{% endif %}
<div class="research-entry__copy">
<h3 class="research-entry__title">
<a href="{{ project_url }}">{{ project.title }}</a>
</h3>
<p class="research-entry__description">{{ project.description }}</p>
</div>
</div>
</section>
{% endfor %}
</div>
{% else %}
<p>No research projects are available yet.</p>
{% endif %}

</div>

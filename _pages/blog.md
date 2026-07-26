---
layout: default
permalink: /blog/
title: Blog
nav: true
nav_order: 5
---

<div class="post blog-index">
  {% assign blog_name = site.blog_name | default: 'Blog' %}
  {% assign blog_description = site.blog_description | default: 'Notes, derivations, and technical fragments from my research notebook.' %}

  <header class="blog-index-hero">
    <h1>{{ blog_name }}</h1>
    {% if blog_description == 'Also see the structured notes in my bookshelf' %}
      <p>Also see the structured notes in my <a href="{{ '/notes/' | relative_url }}">bookshelf</a>.</p>
    {% else %}
      <p>{{ blog_description }}</p>
    {% endif %}
  </header>

  <div class="blog-tools">
    <label class="sr-only" for="blog-search">Search blog posts</label>
    <input id="blog-search" class="blog-search" type="search" placeholder="Search blog posts..." autocomplete="off">
    <ul class="blog-category-filters" aria-label="Blog category filters">
      <li><button class="blog-category-filter is-active" type="button" data-category="all">All</button></li>
      <li><button class="blog-category-filter" type="button" data-category="math">Math</button></li>
      <li><button class="blog-category-filter" type="button" data-category="physics">Physics</button></li>
      <li><button class="blog-category-filter" type="button" data-category="computation">Computation</button></li>
    </ul>
  </div>

  {% assign postlist = site.posts %}
  {% assign blog_posts_size = site.posts | size %}

  <div class="blog-stream">
    {% for post in postlist %}
      {% assign post_number = blog_posts_size | minus: forloop.index0 %}
      {% if post.external_source == blank %}
        {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
      {% else %}
        {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
      {% endif %}
      {% assign year = post.date | date: '%Y' %}
      {% assign tags = post.tags | join: '' %}
      {% assign categories = post.categories | join: '' %}

      {% if post.redirect == blank %}
        {% assign post_url = post.url | relative_url %}
        {% assign post_target = '' %}
      {% elsif post.redirect contains '://' %}
        {% assign post_url = post.redirect %}
        {% assign post_target = ' target="_blank" rel="noopener noreferrer"' %}
      {% else %}
        {% assign post_url = post.redirect | relative_url %}
        {% assign post_target = '' %}
      {% endif %}

      <article
        class="blog-card{% if post.thumbnail %} blog-card--with-image{% endif %}"
        data-categories="{{ post.categories | join: '|' | downcase | escape }}"
      >
        <div class="blog-card-copy">
          <div class="blog-card-meta">
            <span class="blog-card-number">#{{ post_number }}</span>
            <span>{{ post.date | date: '%b %-d, %Y' }}</span>
            <span>{{ read_time }} min read</span>
            {% if post.external_source %}
              <span>{{ post.external_source }}</span>
            {% endif %}
          </div>
          <h2 class="blog-card-title">
            <a href="{{ post_url }}"{{ post_target }}>{{ post.title }}</a>
          </h2>
          {% if post.description %}
            <p class="blog-card-description">{{ post.description }}</p>
          {% endif %}
          <div class="blog-card-tags">
            <a href="{{ year | prepend: '/blog/' | relative_url }}"><i class="fa-solid fa-calendar fa-sm"></i>{{ year }}</a>
            {% if tags != '' %}
              {% for tag in post.tags %}
                <a href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}"><i class="fa-solid fa-hashtag fa-sm"></i>{{ tag }}</a>
              {% endfor %}
            {% endif %}
            {% if categories != '' %}
              {% for category in post.categories %}
                <a href="{{ category | slugify | prepend: '/blog/category/' | relative_url }}"><i class="fa-solid fa-tag fa-sm"></i>{{ category }}</a>
              {% endfor %}
            {% endif %}
          </div>
        </div>
        {% if post.thumbnail %}
          <a class="blog-card-media" href="{{ post_url }}"{{ post_target }}>
            <img src="{{ post.thumbnail | relative_url }}" alt="{{ post.title }}">
          </a>
        {% endif %}
      </article>
    {% endfor %}
  </div>
  <p class="blog-empty-state" role="status">No posts match your search and category.</p>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("blog-search");
    const filters = Array.from(document.querySelectorAll(".blog-category-filter"));
    const posts = Array.from(document.querySelectorAll(".blog-stream .blog-card"));
    const emptyState = document.querySelector(".blog-empty-state");
    if (!searchInput || filters.length === 0 || posts.length === 0) return;

    let activeCategory = "all";

    const applyBlogFilters = () => {
      const query = searchInput.value.trim().toLocaleLowerCase();
      let visibleCount = 0;

      posts.forEach((post) => {
        const categories = (post.dataset.categories || "").split("|");
        const matchesCategory = activeCategory === "all" || categories.includes(activeCategory);
        const matchesSearch = query === "" || post.textContent.toLocaleLowerCase().includes(query);
        const isVisible = matchesCategory && matchesSearch;

        post.classList.toggle("is-filtered", !isVisible);
        if (isVisible) visibleCount += 1;
      });

      emptyState?.classList.toggle("is-visible", visibleCount === 0);
    };

    filters.forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.category;
        filters.forEach((filterButton) => filterButton.classList.toggle("is-active", filterButton === button));
        applyBlogFilters();
      });
    });

    searchInput.addEventListener("input", applyBlogFilters);
    applyBlogFilters();
  });
</script>

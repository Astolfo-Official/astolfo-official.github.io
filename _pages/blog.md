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
  {% assign postlist = site.posts %}
  {% assign blog_posts_size = postlist | size %}
  {% assign math_posts_size = 0 %}
  {% assign physics_posts_size = 0 %}
  {% assign computation_posts_size = 0 %}
  {% for post in postlist %}
    {% if post.categories contains 'math' %}
      {% assign math_posts_size = math_posts_size | plus: 1 %}
    {% endif %}
    {% if post.categories contains 'physics' %}
      {% assign physics_posts_size = physics_posts_size | plus: 1 %}
    {% endif %}
    {% if post.categories contains 'computation' %}
      {% assign computation_posts_size = computation_posts_size | plus: 1 %}
    {% endif %}
  {% endfor %}

  <header class="blog-index-hero">
    <h1>{{ blog_name }}</h1>
    {% if blog_description == 'Also see the structured notes in my bookshelf' %}
      <p>Also see the structured notes in my <a href="{{ '/notes/' | relative_url }}">bookshelf</a>.</p>
    {% else %}
      <p>{{ blog_description }}</p>
    {% endif %}
  </header>

  <div class="blog-workbench">
    <section class="blog-list-panel" aria-label="Blog posts">
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
            data-blog-year="{{ year }}"
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
                    <a href="{{ category | slugify | prepend: '/blog/category/' | relative_url }}"
                      ><i class="fa-solid fa-tag fa-sm"></i>{{ category }}</a
                    >
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
      <p class="blog-empty-state" role="status">No posts match your search and topic.</p>
    </section>

    <aside class="blog-insights" aria-labelledby="blog-insights-title">
      <header class="blog-insights__header">
        <p class="blog-insights__kicker">Writing archive</p>
        <h2 id="blog-insights-title">Blog snapshot</h2>
      </header>

      <div class="blog-insights__search">
        <label class="sr-only" for="blog-search">Search blog posts</label>
        <input id="blog-search" class="blog-search" type="search" placeholder="Search blog posts..." autocomplete="off">
      </div>

      <div class="blog-insights__filters">
        <p class="blog-insights__filter-label">Topic</p>
        <ul class="blog-category-filters" aria-label="Blog topic filters">
          <li><button class="blog-category-filter is-active" type="button" data-category="all" aria-pressed="true">All</button></li>
          <li><button class="blog-category-filter" type="button" data-category="math" aria-pressed="false">Math</button></li>
          <li><button class="blog-category-filter" type="button" data-category="physics" aria-pressed="false">Physics</button></li>
          <li><button class="blog-category-filter" type="button" data-category="computation" aria-pressed="false">Computation</button></li>
        </ul>
      </div>

      <dl class="blog-stats">
        <div class="blog-stat">
          <dt>All posts</dt>
          <dd>{{ blog_posts_size }}</dd>
        </div>
        <div class="blog-stat">
          <dt>Math</dt>
          <dd>{{ math_posts_size }}</dd>
        </div>
        <div class="blog-stat">
          <dt>Physics</dt>
          <dd>{{ physics_posts_size }}</dd>
        </div>
        <div class="blog-stat">
          <dt>Computation</dt>
          <dd>{{ computation_posts_size }}</dd>
        </div>
      </dl>

      <section class="blog-insights__year-section" aria-labelledby="blog-years-title">
        <div class="blog-insights__section-heading">
          <h3 id="blog-years-title">Blogs by year</h3>
          <span>{{ blog_posts_size }} total</span>
        </div>
        <ol id="blog-year-chart" class="blog-year-chart"></ol>
      </section>
    </aside>

  </div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("blog-search");
    const filters = Array.from(document.querySelectorAll(".blog-category-filter"));
    const posts = Array.from(document.querySelectorAll(".blog-stream .blog-card"));
    const emptyState = document.querySelector(".blog-empty-state");
    if (!searchInput || filters.length === 0 || posts.length === 0) return;

    let activeCategory = "all";

    const setFocusedChartYear = (focusedYear) => {
      const yearBars = Array.from(document.querySelectorAll(".blog-year-bar"));
      const hasMatchingYear = yearBars.some((bar) => bar.dataset.year === focusedYear);
      if (!hasMatchingYear) return;

      yearBars.forEach((bar) => {
        bar.classList.toggle("is-year-active", bar.dataset.year === focusedYear);
        bar.classList.toggle("is-year-muted", bar.dataset.year !== focusedYear);
      });
    };

    const clearFocusedChartYear = () => {
      document.querySelectorAll(".blog-year-bar").forEach((bar) => {
        bar.classList.remove("is-year-active", "is-year-muted");
      });
    };

    const setFocusedBlogYear = (focusedYear) => {
      posts.forEach((post) => {
        post.classList.toggle("is-year-muted", post.dataset.blogYear !== focusedYear);
      });
      setFocusedChartYear(focusedYear);
    };

    const clearFocusedBlogYear = () => {
      posts.forEach((post) => post.classList.remove("is-year-muted"));
      clearFocusedChartYear();
    };

    const createYearBar = (yearSummary, maximumPosts) => {
      const item = document.createElement("li");
      const button = document.createElement("button");
      const value = document.createElement("span");
      const track = document.createElement("span");
      const fill = document.createElement("span");
      const label = document.createElement("span");

      button.type = "button";
      button.className = "blog-year-bar";
      button.dataset.year = yearSummary.year;
      button.setAttribute("aria-label", `${yearSummary.year}: ${yearSummary.posts} blog posts`);

      value.className = "blog-year-value";
      value.textContent = yearSummary.posts;

      track.className = "blog-year-track";
      track.setAttribute("aria-hidden", "true");
      fill.className = "blog-year-fill";
      fill.style.setProperty("--blog-bar-ratio", `${maximumPosts > 0 ? (yearSummary.posts / maximumPosts) * 100 : 0}%`);
      track.append(fill);

      label.className = "blog-year-label";
      label.textContent = yearSummary.year;

      button.append(value, track, label);
      button.addEventListener("pointerenter", () => setFocusedBlogYear(yearSummary.year));
      button.addEventListener("pointerleave", clearFocusedBlogYear);
      button.addEventListener("focus", () => setFocusedBlogYear(yearSummary.year));
      button.addEventListener("blur", clearFocusedBlogYear);
      item.append(button);
      return item;
    };

    const buildYearChart = () => {
      const yearCounts = posts.reduce((counts, post) => {
        const year = post.dataset.blogYear;
        if (year) counts.set(year, (counts.get(year) || 0) + 1);
        return counts;
      }, new Map());
      const yearSummaries = Array.from(yearCounts, ([year, count]) => ({ year, posts: count })).sort(
        (left, right) => Number(left.year) - Number(right.year)
      );
      if (yearSummaries.length === 0) return;

      const maximumPosts = Math.max(...yearSummaries.map((summary) => summary.posts));
      document
        .getElementById("blog-year-chart")
        ?.replaceChildren(...yearSummaries.map((summary) => createYearBar(summary, maximumPosts)));
    };

    const bindPostYearInteractions = () => {
      posts.forEach((post) => {
        const postYear = post.dataset.blogYear;
        if (!postYear) return;

        post.addEventListener("pointerenter", () => setFocusedChartYear(postYear));
        post.addEventListener("pointerleave", clearFocusedChartYear);
        post.addEventListener("focusin", () => setFocusedChartYear(postYear));
        post.addEventListener("focusout", (event) => {
          if (!post.contains(event.relatedTarget)) clearFocusedChartYear();
        });
      });
    };

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
        filters.forEach((filterButton) => {
          const isActive = filterButton === button;
          filterButton.classList.toggle("is-active", isActive);
          filterButton.setAttribute("aria-pressed", String(isActive));
        });
        applyBlogFilters();
      });
    });

    searchInput.addEventListener("input", applyBlogFilters);
    buildYearChart();
    bindPostYearInteractions();
    applyBlogFilters();
  });
</script>

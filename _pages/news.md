---
layout: page
title: News
permalink: /news/
nav: true
nav_order: 6
description:
_styles: |
  .post-header {
    display: none;
  }

  .news-page {
    --news-accent: var(--global-theme-color);
    --news-accent-soft: rgba(252, 126, 175, 0.1);
    --news-card-shadow: 0 10px 28px rgba(17, 46, 54, 0.1);
    --news-card-shadow-hover: 0 16px 38px rgba(252, 126, 175, 0.24);
    margin-top: 0;
  }

  .news-page .news {
    margin-top: 1.35rem;
  }

  .news-page .news .table-responsive {
    overflow: visible;
  }

  .news-page .news table {
    display: block;
    margin: 0;
  }

  .news-page .news tbody {
    display: grid;
    gap: 0.75rem;
  }

  .news-page .news tr {
    display: grid;
    grid-template-columns: 10.5rem minmax(0, 1fr);
    gap: 0.75rem;
    align-items: center;
    min-height: 3.15rem;
    padding: 0.65rem 0.85rem;
    border: 1px solid color-mix(in srgb, var(--news-accent) 22%, var(--global-divider-color));
    border-left: 3px solid color-mix(in srgb, var(--news-accent) 72%, transparent);
    border-radius: 8px;
    background: linear-gradient(115deg, var(--news-accent-soft) 0%, transparent 100%), var(--global-card-bg-color);
    box-shadow: var(--news-card-shadow);
    transition:
      border-color 160ms ease,
      box-shadow 160ms ease,
      transform 160ms ease;
  }

  .news-page .news tr:hover {
    border-color: var(--news-accent);
    box-shadow: var(--news-card-shadow-hover);
    transform: translateY(-2px);
  }

  .news-page .news th,
  .news-page .news td {
    display: flex;
    align-items: center;
    padding: 0;
    border: 0;
    color: var(--global-text-color);
    font-size: 0.92rem;
    line-height: 1.5;
  }

  .news-page .news th {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 10.5rem !important;
    white-space: nowrap;
  }

  .news-page .news-number {
    display: inline-flex;
    min-width: 1.8rem;
    min-height: 1.8rem;
    align-items: center;
    justify-content: center;
    border: 1px solid color-mix(in srgb, var(--global-theme-color) 36%, var(--global-divider-color));
    border-radius: 999px;
    color: var(--news-accent);
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0;
  }

  .news-page .news-date {
    color: var(--news-accent);
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .news-page .news-title {
    color: var(--global-text-color);
    font-size: 0.95rem;
    font-weight: 700;
    line-height: 1.4;
    text-decoration: none;
  }

  .news-page .news-title:hover {
    color: var(--global-theme-color);
  }

  .news-page .news td p:last-child {
    margin-bottom: 0;
  }

  html[data-theme="dark"] .news-page {
    --news-accent-soft: rgba(252, 126, 175, 0.13);
    --news-card-shadow: 0 12px 30px rgba(0, 0, 0, 0.26);
    --news-card-shadow-hover: 0 18px 42px rgba(252, 126, 175, 0.28);
  }

  @media (max-width: 640px) {
    .news-page .news tr {
      grid-template-columns: 1fr;
      gap: 0.35rem;
      align-items: start;
    }
  }
---

<div class="news-page">
  <header class="page-hero">
    <h1>{{ page.title }}</h1>
    <p>Research milestones, software releases, publications, and occasional notes from life outside the lab.</p>
  </header>

{% include news.liquid %}

</div>

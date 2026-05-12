/**
 * components.js — Remarcable Design shared component system
 *
 * Usage in any page:
 *   <body data-active-page="projects">
 *     <div id="site-header"></div>
 *     ...
 *     <div id="site-footer"></div>
 *     <script src="components.js"></script>
 *   </body>
 *
 * Render components by calling RD.render.*() after this script loads.
 * data-active-page: home | projects | services | resources | about | testimonials | contact | privacy
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════ CSS ══ */
  const CSS = `
    :root {
      --black:  #1a1a1a;
      --mid:    #666;
      --light:  #999;
      --xlight: #ccc;
      --border: #e0ddd8;
      --bg:     #faf9f7;
      --white:  #fff;
      --gap:    24px;
      --nav-h:  72px;
      --max-w:  1440px;
      --pad-h:  48px;
      /* grows on wide screens to keep content at max (--max-w - 2*--pad-h) = 1344px */
      --pad-outer: max(var(--pad-h), calc((100vw - var(--max-w)) / 2 + var(--pad-h)));
    }

    /* ── NAV ── */
    #site-header { position: sticky; top: 0; z-index: 200; }

    .rd-nav {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 var(--pad-outer); height: var(--nav-h);
      border-bottom: 1px solid var(--border); background: var(--white);
    }
    .rd-nav-logo {
      font-size: 11px; letter-spacing: 0.18em; font-weight: 600;
      color: var(--black); text-decoration: none;
    }
    .rd-nav-links { display: flex; gap: 36px; list-style: none; }
    .rd-nav-links a {
      font-size: 13px; font-weight: 400; color: var(--black);
      text-decoration: none; transition: opacity 0.15s;
    }
    .rd-nav-links a:hover { opacity: 0.55; }
    .rd-nav-links a.active { border-bottom: 1.5px solid var(--black); padding-bottom: 2px; }
    .rd-nav-cta {
      font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
      background: var(--black); color: var(--white); padding: 12px 22px;
      text-decoration: none; transition: opacity 0.2s;
    }
    .rd-nav-cta:hover { opacity: 0.8; }

    /* ── CTA BAND ── */
    .site-cta {
      background: var(--black); padding: 120px var(--pad-outer);
      display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
    }
    .site-cta-eyebrow {
      font-size: 10px; letter-spacing: 0.22em; font-weight: 500;
      color: rgba(255,255,255,0.4); text-transform: uppercase; margin-bottom: 36px;
    }
    .site-cta-heading {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(44px, 5.5vw, 88px); font-weight: 400;
      color: var(--white); line-height: 1.05;
      letter-spacing: -0.02em; margin-bottom: 48px;
    }
    .site-cta-btn {
      display: inline-block; border: 1px solid rgba(255,255,255,0.42);
      color: var(--white); font-family: 'Inter', sans-serif;
      font-size: 11px; letter-spacing: 0.18em; font-weight: 600;
      text-transform: uppercase; padding: 20px 48px; text-decoration: none;
      transition: background 0.2s, border-color 0.2s;
    }
    .site-cta-btn:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.8); }

    /* video tile inside CTA */
    .site-cta-video { border: 1px solid rgba(255,255,255,0.1); padding: 24px; background: rgba(255,255,255,0.03); }
    .site-cta-segs { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
    .site-cta-seg {
      font-size: 9px; letter-spacing: 0.1em; font-weight: 600; text-transform: uppercase;
      color: rgba(255,255,255,0.38); border: 1px solid rgba(255,255,255,0.12);
      padding: 5px 12px; cursor: pointer; transition: all 0.15s;
    }
    .site-cta-seg.active { color: var(--white); border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.08); }
    .site-cta-thumb {
      position: relative; aspect-ratio: 16/9; overflow: hidden; cursor: pointer;
      background: rgba(255,255,255,0.05); margin-bottom: 20px;
    }
    .site-cta-thumb-ph {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%);
    }
    .site-cta-thumb-label {
      position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
      font-size: 9px; letter-spacing: 0.14em; font-weight: 600;
      color: rgba(255,255,255,0.18); text-transform: uppercase; pointer-events: none;
    }
    .site-cta-play {
      position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
      width: 52px; height: 52px; border-radius: 50%; background: var(--white);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 24px rgba(0,0,0,0.35);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .site-cta-thumb:hover .site-cta-play { transform: translate(-50%,-50%) scale(1.1); box-shadow: 0 8px 32px rgba(0,0,0,0.5); }
    .site-cta-play::after {
      content: ''; margin-left: 4px;
      border-left: 16px solid var(--black);
      border-top: 9px solid transparent; border-bottom: 9px solid transparent;
    }
    .site-cta-vid-title { font-size: 15px; font-weight: 300; color: rgba(255,255,255,0.88); line-height: 1.5; margin-bottom: 10px; }
    .site-cta-vid-meta { font-size: 11px; font-weight: 300; color: rgba(255,255,255,0.35); display: flex; align-items: center; gap: 6px; }
    .site-cta-vid-dot { opacity: 0.4; }

    /* ── FOOTER ── */
    .site-footer {
      background: var(--black);
      border-top: 1px solid rgba(255,255,255,0.07);
      padding: 80px var(--pad-outer) 52px;
    }
    .rd-footer-grid {
      display: grid; grid-template-columns: 2fr 1fr 1fr 1.6fr;
      gap: 48px; margin-bottom: 72px;
    }
    .rd-footer-logo {
      font-size: 11px; letter-spacing: 0.18em; font-weight: 600;
      color: var(--white); margin-bottom: 20px;
    }
    .rd-footer-desc {
      font-size: 13px; font-weight: 300;
      color: rgba(255,255,255,0.42); line-height: 1.75; max-width: 300px;
    }
    .rd-footer-col-label {
      font-size: 10px; letter-spacing: 0.16em; font-weight: 600;
      color: rgba(255,255,255,0.28); text-transform: uppercase; margin-bottom: 22px;
    }
    .rd-footer-links { list-style: none; display: flex; flex-direction: column; gap: 13px; }
    .rd-footer-links a {
      font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.58);
      text-decoration: none; transition: color 0.15s;
    }
    .rd-footer-links a:hover { color: var(--white); }
    .rd-footer-newsletter {
      display: flex; align-items: center;
      border-bottom: 1px solid rgba(255,255,255,0.22); padding-bottom: 2px;
    }
    .rd-footer-newsletter input {
      flex: 1; background: none; border: none; outline: none;
      font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 300;
      color: var(--white); padding: 10px 0;
    }
    .rd-footer-newsletter input::placeholder { color: rgba(255,255,255,0.22); }
    .rd-footer-newsletter button {
      background: none; border: none; font-family: 'Inter', sans-serif;
      font-size: 10px; letter-spacing: 0.16em; font-weight: 600;
      color: var(--white); cursor: pointer; padding: 10px 0 10px 16px;
      transition: opacity 0.15s;
    }
    .rd-footer-newsletter button:hover { opacity: 0.6; }
    .rd-footer-bottom {
      display: flex; justify-content: space-between; align-items: center;
      padding-top: 36px; border-top: 1px solid rgba(255,255,255,0.07);
    }
    .rd-footer-copy { font-size: 11px; color: rgba(255,255,255,0.26); font-weight: 300; }
    .rd-footer-social { display: flex; gap: 18px; }
    .rd-footer-social a {
      color: rgba(255,255,255,0.42); text-decoration: none;
      transition: color 0.15s; display: flex; align-items: center;
    }
    .rd-footer-social a:hover { color: var(--white); }
    .rd-footer-social svg {
      width: 18px; height: 18px; fill: none;
      stroke: currentColor; stroke-width: 1.5;
      stroke-linecap: round; stroke-linejoin: round;
    }

    /* ── DESIGN SYSTEM UTILITIES ── */
    .rd-eyebrow {
      font-size: 10px; letter-spacing: 0.2em; font-weight: 600;
      color: var(--light); text-transform: uppercase; margin-bottom: 14px;
    }
    .rd-section-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(34px, 4.5vw, 60px); font-weight: 400;
      letter-spacing: -0.02em; line-height: 1.05; margin-bottom: 20px;
    }
    .rd-section-title-sm {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(26px, 3vw, 40px); font-weight: 400;
      letter-spacing: -0.01em; line-height: 1.1; margin-bottom: 16px;
    }
    .rd-body {
      font-size: 15px; font-weight: 300; line-height: 1.75; color: var(--mid);
    }
    .rd-section { padding: 100px var(--pad-outer); }
    .rd-section-sm { padding: 72px var(--pad-outer); }
    .rd-section-dark { background: var(--black); color: var(--white); }
    .rd-section-stone { background: #edeae4; }
    .rd-rule { border: none; border-top: 1px solid var(--border); margin: 0; }
    .rd-more-link {
      font-size: 12px; letter-spacing: 0.1em; font-weight: 500;
      color: var(--black); text-decoration: none;
      border-bottom: 1px solid var(--black); padding-bottom: 2px;
      transition: opacity 0.2s; display: inline-block;
    }
    .rd-more-link:hover { opacity: 0.55; }
    .rd-section-header {
      display: flex; align-items: flex-end;
      justify-content: space-between; margin-bottom: 48px;
    }

    /* ── TILE CARD SYSTEM (shared across projects listing + featured) ── */
    .rd-bento {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 220px;
      gap: var(--gap);
    }
    .rd-bento-sm {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 200px;
      gap: var(--gap);
    }
    .rd-sc1 { grid-column: span 1; }
    .rd-sc2 { grid-column: span 2; }
    .rd-sc3 { grid-column: span 3; }
    .rd-sr2 { grid-row: span 2; }
    .rd-tile {
      position: relative; overflow: hidden; background: #dbd9d4;
      cursor: pointer; display: flex; flex-direction: column;
      text-decoration: none; color: inherit;
    }
    .rd-tile:hover .rd-tile-img { transform: scale(1.04); }
    .rd-tile-img {
      flex: 1;
      transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .rd-tile-ph {
      position: absolute; top: 38%; left: 50%; transform: translate(-50%,-50%);
      font-size: 9px; letter-spacing: 0.14em; font-weight: 600;
      color: rgba(255,255,255,0.35); text-transform: uppercase;
      white-space: nowrap; pointer-events: none;
    }
    .rd-tile-info {
      padding: 14px 18px 16px; background: var(--white); flex-shrink: 0;
    }
    .rd-tile.rd-sr2 .rd-tile-info { padding: 18px 22px 20px; }
    .rd-tile-cat {
      font-size: 9px; letter-spacing: 0.14em; font-weight: 600;
      color: var(--light); text-transform: uppercase; margin-bottom: 5px;
    }
    .rd-tile-title {
      font-size: 15px; font-weight: 300; letter-spacing: -0.01em;
      line-height: 1.25; margin-bottom: 4px;
    }
    .rd-tile.rd-sr2 .rd-tile-title { font-size: 19px; margin-bottom: 8px; }
    .rd-tile-desc {
      font-size: 12px; color: var(--mid); font-weight: 300;
      line-height: 1.55; margin-bottom: 8px;
    }
    .rd-tile-meta {
      font-size: 9px; letter-spacing: 0.1em; color: var(--light);
      font-weight: 500; text-transform: uppercase;
    }

    /* tone fills */
    .tone-a { background: #c8c4bd; } .tone-b { background: #d5d2cb; }
    .tone-c { background: #bfbcb5; } .tone-d { background: #cac7c0; }
    .tone-e { background: #b8b5ae; } .tone-f { background: #d8d5ce; }
    .tone-g { background: #c2bfb8; } .tone-h { background: #cfccc5; }
    .tone-i { background: #c6c3bb; } .tone-j { background: #d0cdc6; }
    .tone-k { background: #bcb9b2; } .tone-l { background: #c4c1ba; }

    /* ── VIDEO CAROUSEL COMPONENT (rd-vc-*) ── */
    .rd-vc-section {
      padding: 72px 0 80px;
      overflow: hidden;
    }
    .rd-vc-header {
      display: flex; justify-content: space-between;
      align-items: flex-end; margin-bottom: 44px;
      padding: 0 var(--pad-outer);
    }
    .rd-vc-title {
      font-family: 'DM Serif Display', serif;
      font-size: 36px; font-weight: 400; letter-spacing: -0.01em;
    }
    .rd-vc-controls { display: flex; gap: 8px; }
    .rd-vc-btn {
      width: 46px; height: 46px; border: 1px solid var(--border);
      background: transparent; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s; color: var(--black);
    }
    .rd-vc-btn:hover { background: var(--black); color: var(--white); border-color: var(--black); }
    .rd-vc-btn:disabled { opacity: 0.3; cursor: default; }
    .rd-vc-btn:disabled:hover { background: transparent; color: var(--black); border-color: var(--border); }
    .rd-vc-btn svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.5; }
    .rd-vc-track-wrap {
      overflow: visible; /* cards bleed right; section clips at viewport */
      padding-left: var(--pad-outer); /* first card aligns with content */
    }
    .rd-vc-track {
      display: flex; gap: 24px;
      transition: transform 0.52s cubic-bezier(0.25,0.46,0.45,0.94);
      will-change: transform;
    }
    .rd-vc-card { flex: 0 0 calc(33.333% - 16px); }
    .rd-vc-thumb {
      aspect-ratio: 16/9; position: relative; overflow: hidden;
      cursor: pointer; margin-bottom: 18px;
    }
    .rd-vc-fill {
      position: absolute; inset: 0;
      transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
    }
    .rd-vc-card:hover .rd-vc-fill { transform: scale(1.04); }
    .rd-vc-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.18); }
    .rd-vc-play {
      position: absolute; top: 50%; left: 50%;
      transform: translate(-50%,-50%);
      width: 54px; height: 54px; border-radius: 50%;
      border: 1.5px solid rgba(255,255,255,0.75);
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s, border-color 0.2s;
    }
    .rd-vc-card:hover .rd-vc-play { transform: translate(-50%,-50%) scale(1.08); border-color: #fff; }
    .rd-vc-play::after {
      content: ''; border-left: 14px solid rgba(255,255,255,0.88);
      border-top: 8px solid transparent; border-bottom: 8px solid transparent;
      margin-left: 4px;
    }
    .rd-vc-duration {
      position: absolute; bottom: 12px; right: 14px;
      font-size: 10px; letter-spacing: 0.06em; font-weight: 600;
      color: rgba(255,255,255,0.82);
    }
    .rd-vc-cat {
      font-size: 9px; letter-spacing: 0.14em; font-weight: 600;
      color: var(--light); text-transform: uppercase; margin-bottom: 6px;
    }
    .rd-vc-card-title { font-size: 16px; font-weight: 300; letter-spacing: -0.01em; }
    .rd-vc-dots { display: flex; gap: 6px; justify-content: center; margin-top: 40px; padding: 0 var(--pad-outer); }
    .rd-vc-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: #ccc; transition: background 0.2s; cursor: pointer;
    }
    .rd-vc-dot.active { background: var(--black); }

    /* ── TESTIMONIALS COMPONENT (rd-ts-*) ── */
    .rd-ts-section { padding: 100px var(--pad-outer); background: var(--white); }
    .rd-ts-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 48px; }
    .rd-ts-card {
      padding: 36px 32px; border: 1px solid var(--border);
      display: flex; flex-direction: column; gap: 20px;
    }
    .rd-ts-stars { font-size: 14px; letter-spacing: 3px; color: var(--black); }
    .rd-ts-quote {
      font-family: 'DM Serif Display', serif; font-style: italic;
      font-size: 18px; font-weight: 400; line-height: 1.5; color: var(--black);
      flex: 1;
    }
    .rd-ts-attr { font-size: 11px; letter-spacing: 0.1em; font-weight: 500; text-transform: uppercase; color: var(--light); }
    .rd-ts-role { font-size: 12px; font-weight: 300; color: var(--mid); margin-top: 4px; }
    .rd-ts-footer { display: flex; justify-content: flex-end; margin-top: 40px; }

    /* ── SERVICES BLOCKS (rd-sv-*) ── */
    .rd-sv-section { padding: 100px var(--pad-outer); }
    .rd-sv-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--gap); margin-top: 48px; }
    .rd-sv-block {
      background: var(--white); border: 1px solid var(--border);
      padding: 48px 40px 40px; text-decoration: none; color: inherit;
      display: flex; flex-direction: column; gap: 16px;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .rd-sv-block:hover { border-color: var(--black); box-shadow: 0 4px 32px rgba(0,0,0,0.06); }
    .rd-sv-index { font-size: 10px; letter-spacing: 0.16em; font-weight: 600; color: var(--xlight); }
    .rd-sv-name {
      font-family: 'DM Serif Display', serif; font-size: 28px;
      font-weight: 400; letter-spacing: -0.01em;
    }
    .rd-sv-desc { font-size: 13px; font-weight: 300; line-height: 1.7; color: var(--mid); flex: 1; }
    .rd-sv-pills { display: flex; gap: 6px; flex-wrap: wrap; }
    .rd-sv-pill {
      font-size: 9px; letter-spacing: 0.1em; font-weight: 600;
      padding: 3px 8px; border: 1px solid var(--border);
      text-transform: uppercase; color: var(--mid);
    }
    .rd-sv-arrow { font-size: 12px; letter-spacing: 0.1em; font-weight: 500; color: var(--black); }

    /* ── PROCESS STEPS (rd-ps-*) ── */
    .rd-ps-section { padding: 100px var(--pad-outer); background: var(--bg); }
    .rd-ps-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 48px; }
    .rd-ps-step {
      padding: 48px 40px; border-top: 1px solid var(--border);
      border-left: 1px solid var(--border);
    }
    .rd-ps-step:last-child { border-right: 1px solid var(--border); }
    .rd-ps-num {
      font-size: 48px; font-family: 'DM Serif Display', serif; font-weight: 400;
      color: var(--border); line-height: 1; margin-bottom: 28px;
    }
    .rd-ps-title {
      font-size: 22px; font-weight: 300; letter-spacing: -0.01em; margin-bottom: 16px;
    }
    .rd-ps-desc { font-size: 14px; font-weight: 300; line-height: 1.8; color: var(--mid); }

    /* ── GUARANTEES (rd-gv-*) ── */
    .rd-gv-section { padding: 80px var(--pad-outer); background: var(--white); border-top: 1px solid var(--border); }
    .rd-gv-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-top: 40px; }
    .rd-gv-item {
      padding: 36px 32px; border-left: 1px solid var(--border);
    }
    .rd-gv-item:last-child { border-right: 1px solid var(--border); }
    .rd-gv-icon { font-size: 20px; margin-bottom: 20px; }
    .rd-gv-title { font-size: 17px; font-weight: 400; letter-spacing: -0.01em; margin-bottom: 10px; }
    .rd-gv-desc { font-size: 13px; font-weight: 300; line-height: 1.7; color: var(--mid); }

    /* ── KEY ELEMENTS (rd-ke-*) ── */
    .rd-ke-section { padding: 100px var(--pad-outer); background: #edeae4; }
    .rd-ke-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 48px; }
    .rd-ke-item { padding: 36px 32px; background: var(--white); border: 1px solid var(--border); }
    .rd-ke-num {
      font-size: 10px; letter-spacing: 0.16em; font-weight: 600;
      color: var(--xlight); margin-bottom: 20px;
    }
    .rd-ke-title { font-size: 18px; font-weight: 300; letter-spacing: -0.01em; margin-bottom: 12px; }
    .rd-ke-desc { font-size: 13px; font-weight: 300; line-height: 1.7; color: var(--mid); }

    /* ── RESOURCES CARDS (rd-rc-*) ── */
    .rd-rc-section { padding: 100px var(--pad-outer); }
    .rd-rc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px; }
    .rd-rc-card {
      background: var(--white); border: 1px solid var(--border);
      text-decoration: none; color: inherit; display: flex; flex-direction: column;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .rd-rc-card:hover { border-color: var(--black); box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
    .rd-rc-thumb { height: 180px; position: relative; overflow: hidden; }
    .rd-rc-fill { position: absolute; inset: 0; transition: transform 0.5s; }
    .rd-rc-card:hover .rd-rc-fill { transform: scale(1.03); }
    .rd-rc-type-badge {
      position: absolute; top: 16px; left: 16px;
      font-size: 9px; letter-spacing: 0.12em; font-weight: 600;
      text-transform: uppercase; background: var(--white);
      padding: 4px 10px; color: var(--black);
    }
    .rd-rc-body { padding: 24px 28px 28px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
    .rd-rc-title { font-size: 16px; font-weight: 300; line-height: 1.4; letter-spacing: -0.01em; }
    .rd-rc-meta { font-size: 10px; letter-spacing: 0.1em; font-weight: 500; color: var(--light); text-transform: uppercase; margin-top: auto; }

    /* ── STATS BAR ── */
    .rd-stats-bar {
      display: grid; grid-template-columns: repeat(4, 1fr);
      border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    }
    .rd-stat {
      padding: 40px 36px; border-right: 1px solid var(--border);
    }
    .rd-stat:last-child { border-right: none; }
    .rd-stat-num {
      font-family: 'DM Serif Display', serif; font-size: 52px;
      font-weight: 400; letter-spacing: -0.02em; line-height: 1;
      margin-bottom: 8px;
    }
    .rd-stat-label { font-size: 12px; font-weight: 300; color: var(--mid); }

    /* ── RESPONSIVE ── */
    @media (max-width: 1000px) {
      .rd-ke-grid { grid-template-columns: repeat(2, 1fr); }
      .rd-gv-grid { grid-template-columns: repeat(2, 1fr); }
      .rd-gv-item:nth-child(2n) { border-right: 1px solid var(--border); }
      .rd-gv-item:nth-child(n+3) { border-top: 1px solid var(--border); }
      .rd-stats-bar { grid-template-columns: repeat(2, 1fr); }
      .rd-stat:nth-child(2n) { border-right: none; }
      .rd-stat:nth-child(n+3) { border-top: 1px solid var(--border); }
    }
    @media (max-width: 900px) {
      :root { --pad-h: 24px; }
      .rd-nav { padding: 0 24px; }
      .rd-nav-links { display: none; }
      .rd-section, .rd-section-sm { padding: 64px 24px; }
      .rd-vc-section { padding: 56px 0 64px; }
      .rd-vc-header { padding: 0 24px; }
      .rd-vc-track-wrap { padding-left: 24px; }
      .rd-vc-dots { padding: 0 24px; }
      .rd-vc-card { flex: 0 0 calc(50% - 12px); }
      .rd-ts-section, .rd-sv-section, .rd-ps-section, .rd-rc-section, .rd-ke-section, .rd-gv-section { padding: 64px 24px; }
      .rd-ts-grid, .rd-sv-grid, .rd-rc-grid { grid-template-columns: 1fr; }
      .rd-ps-steps { grid-template-columns: 1fr; }
      .rd-ps-step { border-right: 1px solid var(--border); }
      .rd-bento { grid-template-columns: repeat(2, 1fr); }
      .rd-sc3 { grid-column: span 2; }
      .rd-footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
      .site-cta { padding: 80px 24px; grid-template-columns: 1fr; gap: 48px; }
      .site-footer { padding: 60px 24px 40px; }
      .rd-section-header { flex-direction: column; align-items: flex-start; gap: 12px; }
    }
    @media (max-width: 600px) {
      .rd-bento, .rd-bento-sm { grid-template-columns: 1fr; grid-auto-rows: 260px; }
      .rd-sc2, .rd-sc3 { grid-column: span 1; }
      .rd-sr2 { grid-row: span 1; }
      .rd-ke-grid { grid-template-columns: 1fr; }
      .rd-gv-grid { grid-template-columns: 1fr; }
      .rd-gv-item:nth-child(n) { border-right: 1px solid var(--border); }
      .rd-footer-grid { grid-template-columns: 1fr; }
      .rd-footer-bottom { flex-direction: column; gap: 20px; text-align: center; }
      .rd-vc-card { flex: 0 0 85%; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.id = 'rd-components-css';
  styleEl.textContent = CSS;
  document.head.insertBefore(styleEl, document.head.firstChild);

  /* ═══════════════════════════════════════════════════════════ DATA ══ */
  window.RD = window.RD || {};

  RD.data = {
    projects: [
      { id: 'richmond-physiotherapy', title: 'Richmond Physiotherapy', category: 'Healthcare / Medical', location: 'Richmond, London', year: 2024, segment: 'healthcare', tone: 'tone-a', featured: true },
      { id: 'meridian-health-plaza', title: 'Meridian Health Plaza', category: 'Commercial / Medical', location: 'Manchester', year: 2023, segment: 'commercial', tone: 'tone-b', award: 'Shortlisted 2023', featured: true, desc: 'A multi-disciplinary health hub where structural integrity meets wellness-focused interior design.' },
      { id: 'fenwick-residences', title: 'The Fenwick Residences', category: 'Residential / Luxury', location: 'Edinburgh', year: 2025, segment: 'residential', tone: 'tone-c', award: 'Award Winner 2025', featured: true, desc: 'Twelve bespoke apartments with hand-crafted joinery and a restrained material palette of stone, oak, and aged brass.' },
      { id: 'kensington-clinic', title: 'Kensington Clinic', category: 'Healthcare / GP', location: 'Birmingham', year: 2023, segment: 'healthcare', tone: 'tone-d' },
      { id: 'albright-orthodontic', title: 'Albright Orthodontic', category: 'Healthcare / Orthodontic', location: 'Leeds', year: 2024, segment: 'healthcare', tone: 'tone-e' },
      { id: 'pacific-crest', title: 'Pacific Crest Office Campus', category: 'Commercial / Offices', location: 'Edinburgh', year: 2024, segment: 'commercial', tone: 'tone-f', desc: 'A long, low-profile commercial campus designed around natural light and collaborative flow.', award: 'Completed 2024' },
      { id: 'novus-lab', title: 'Novus Lab Annex', category: 'Research & Lab', location: 'London', year: 2024, segment: 'commercial', tone: 'tone-g' },
      { id: 'morrow-surgical', title: 'Morrow Surgical', category: 'Healthcare / Surgical', location: 'Bristol', year: 2023, segment: 'healthcare', tone: 'tone-h' },
      { id: 'harbour-point', title: 'Harbour Point Offices', category: 'Commercial / Offices', location: 'Bristol', year: 2025, segment: 'commercial', tone: 'tone-i', desc: 'A riverfront workspace that draws the outside in — raw concrete, warm timber, and floor-to-ceiling glazing.' },
      { id: 'elmwood-care', title: 'Elmwood Care Village', category: 'Healthcare / Residential', location: 'Oxford', year: 2025, segment: 'healthcare', tone: 'tone-j', desc: 'A dementia-forward care campus where wayfinding, light, and material texture serve as therapeutic tools.' },
      { id: 'sable-studio', title: 'Sable Studio', category: 'Commercial / Offices', location: 'London', year: 2024, segment: 'commercial', tone: 'tone-k' },
      { id: 'cairn-house', title: 'Cairn House', category: 'Residential', location: 'Glasgow', year: 2023, segment: 'residential', tone: 'tone-l' },
    ],

    testimonials: [
      { name: 'Dr. Pippa Rollitt', role: 'Co-Founder', company: 'Richmond Physiotherapy', quote: 'The thought-to-execution process was seamless while keeping our space open during the refurbishment. The project justified our investment — and the result has received positive feedback from our clients.', rating: 5, segment: 'healthcare' },
      { name: 'Dr. Azad Eyrumlu', role: 'Clinic Director', company: 'Belgravia Dental Studio', quote: 'Remarcable is dedicated to the client and their passion for the project is at the core of everything they do. The team went above and beyond at every stage.', rating: 5, segment: 'healthcare' },
      { name: 'Scott Bozinis', role: 'Managing Director', company: 'Vertex Group', quote: 'We are incredibly pleased to have partnered with Remarcable — we now have office space to be proud of, one that truly reflects our values and supports our teams.', rating: 5, segment: 'commercial' },
      { name: 'Dr. Seth Rankin', role: 'Founder', company: 'London Doctors Clinic', quote: 'Always on time, on budget and with minimum fuss. They continue to be our first port of call for all clinical and commercial interior work across our network.', rating: 5, segment: 'healthcare' },
      { name: 'James Holborough', role: 'Head of Workplace', company: 'Harlow Quarter', quote: 'The brief was ambitious — three floors, phased while we traded. Remarcable delivered every phase without a single disruption to our teams. Exceptional project management.', rating: 5, segment: 'commercial' },
      { name: 'Rachel Mowbray', role: 'Director', company: 'Cairn Residential', quote: 'Every material, every proportion felt intentional. Our clients remark on the atmosphere the moment they walk through the door. A remarkable team to work with.', rating: 5, segment: 'residential' },
    ],

    videos: [
      { title: 'Richmond Physiotherapy: Process', category: 'Healthcare / Medical', duration: '2:34', tone: 'tone-a' },
      { title: 'Fenwick Residences: Behind the Build', category: 'Residential / Luxury', duration: '4:10', tone: 'tone-c' },
      { title: 'Pacific Crest: Space Planning', category: 'Commercial / Offices', duration: '3:22', tone: 'tone-f' },
      { title: 'Meridian Health: Material Selections', category: 'Healthcare / Medical', duration: '1:58', tone: 'tone-b' },
      { title: 'Kensington Clinic: Before & After', category: 'Healthcare / GP', duration: '5:47', tone: 'tone-d' },
      { title: 'Albright Orthodontic: Client Story', category: 'Healthcare / Orthodontic', duration: '2:15', tone: 'tone-e' },
    ],

    processSteps: [
      { num: '01', title: 'Consultation', desc: 'Book your no-obligation consultation. Our experts ask a few questions to understand your needs, ambitions, and timeline — no pressure, no pitch.' },
      { num: '02', title: 'Site Visit', desc: 'We visit your space together and discuss requirements, priorities, and budget. This practical evaluation forms the basis of your bespoke design solution.' },
      { num: '03', title: 'Design Proposal', desc: 'We present our design analysis: scope of work, concepts, and a clear proposal. You choose from tailored packages with full cost transparency.' },
    ],

    guarantees: [
      { icon: '◷', title: 'On Time & Budget', desc: 'Our processes are clear and easy to follow so that your expectations are always met, delivery to delivery.' },
      { icon: '◎', title: 'Straightforward Process', desc: 'We work alongside you until you are completely happy with the proposed design and every detail feels right.' },
      { icon: '◈', title: '2 Years Warranty', desc: 'You are covered for 2 years after handover to give you complete peace of mind on every element.' },
      { icon: '◉', title: 'Clear Fixed Pricing', desc: 'Open and honest fee structure — no hidden costs, no surprises. You always know exactly what you are investing.' },
    ],

    keyElements: [
      { num: '01', title: 'Light & Atmosphere', desc: 'Regulates circadian rhythm, impacts mood and behaviour, creates balance, and highlights the focal points that make a space memorable.' },
      { num: '02', title: 'Nature & Plants', desc: 'Reconnects occupants with the natural world, reduces stress, increases productivity, and actively purifies the air.' },
      { num: '03', title: 'Bespoke Furniture & Branding', desc: 'Personalises the space, reflects company culture and values, maximises utility, and makes a lasting impression on every visitor.' },
      { num: '04', title: 'Colours & Mood', desc: 'Creates the right atmosphere for each space, positively impacts mood, and establishes a coherent identity that clients and teams can feel.' },
    ],

    resources: [
      { type: 'Article', title: '5 Ways to Reduce Patient Anxiety Through Interior Design', readTime: '6 min read', date: 'Apr 2026', segment: 'healthcare', tone: 'tone-a' },
      { type: 'Guide', title: 'The Complete Brief Template for Commercial Interior Projects', readTime: 'Free PDF', date: 'Mar 2026', segment: 'commercial', tone: 'tone-f' },
      { type: 'Article', title: 'The ROI of a Well-Designed Workspace', readTime: '8 min read', date: 'Feb 2026', segment: 'commercial', tone: 'tone-i' },
      { type: 'Tool', title: 'Dental Practice Cost Calculator', readTime: 'Interactive', date: null, segment: 'healthcare', tone: 'tone-b' },
      { type: 'Guide', title: 'Material Selection Guide for Healthcare Environments', readTime: 'Free PDF', date: 'Jan 2026', segment: 'healthcare', tone: 'tone-c' },
      { type: 'Article', title: 'How Lighting Design Shapes Patient Experience', readTime: '5 min read', date: 'Dec 2025', segment: 'healthcare', tone: 'tone-d' },
    ],
  };

  /* ═══════════════════════════════════════════════════════ RENDERERS ══ */
  RD.render = {};

  /* ── Video Carousel ── */
  RD.render.videoCarousel = function (container) {
    const vids = RD.data.videos;
    container.innerHTML = `
      <div class="rd-vc-section">
        <div class="rd-vc-header">
          <div>
            <div class="rd-eyebrow">In Film</div>
            <div class="rd-vc-title">Process &amp; Stories</div>
          </div>
          <div class="rd-vc-controls">
            <button class="rd-vc-btn rd-vc-prev" disabled aria-label="Previous">
              <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button class="rd-vc-btn rd-vc-next" aria-label="Next">
              <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
        <div class="rd-vc-track-wrap">
          <div class="rd-vc-track">
            ${vids.map(v => `
              <div class="rd-vc-card">
                <div class="rd-vc-thumb">
                  <div class="rd-vc-fill ${v.tone}"></div>
                  <div class="rd-vc-overlay"></div>
                  <div class="rd-vc-play"></div>
                  <span class="rd-vc-duration">${v.duration}</span>
                </div>
                <div class="rd-vc-cat">${v.category}</div>
                <div class="rd-vc-card-title">${v.title}</div>
              </div>`).join('')}
          </div>
        </div>
        <div class="rd-vc-dots"></div>
      </div>`;

    const track   = container.querySelector('.rd-vc-track');
    const prevBtn = container.querySelector('.rd-vc-prev');
    const nextBtn = container.querySelector('.rd-vc-next');
    const dotsEl  = container.querySelector('.rd-vc-dots');
    const cards   = track.querySelectorAll('.rd-vc-card');
    const w = window.innerWidth;
    const perPage = w < 540 ? 1 : w < 900 ? 2 : 3;
    const pages = Math.ceil(cards.length / perPage);
    let cur = 0;

    for (let i = 0; i < pages; i++) {
      const d = document.createElement('span');
      d.className = 'rd-vc-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(d);
    }

    function goTo(page) {
      cur = page;
      const cardW = cards[0].offsetWidth + 24;
      track.style.transform = `translateX(-${cur * perPage * cardW}px)`;
      prevBtn.disabled = cur === 0;
      nextBtn.disabled = cur >= pages - 1;
      dotsEl.querySelectorAll('.rd-vc-dot').forEach((d, i) => d.classList.toggle('active', i === cur));
    }

    prevBtn.addEventListener('click', () => goTo(Math.max(0, cur - 1)));
    nextBtn.addEventListener('click', () => goTo(Math.min(pages - 1, cur + 1)));

    // Drag-to-scroll
    let dragStartX = 0, dragging = false, moved = false;
    const DRAG_THRESHOLD = 6;

    track.addEventListener('mousedown', e => {
      dragStartX = e.clientX;
      dragging = true;
      moved = false;
      track.style.transition = 'none';
      track.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      const dx = e.clientX - dragStartX;
      if (Math.abs(dx) > DRAG_THRESHOLD) moved = true;
      if (moved) {
        const cardW = cards[0].offsetWidth + 24;
        const base = -(cur * perPage * cardW);
        track.style.transform = `translateX(${base + dx}px)`;
      }
    });

    window.addEventListener('mouseup', e => {
      if (!dragging) return;
      dragging = false;
      track.style.cursor = '';
      track.style.transition = '';
      if (moved) {
        const dx = e.clientX - dragStartX;
        if (dx < -40 && cur < pages - 1) goTo(cur + 1);
        else if (dx > 40 && cur > 0) goTo(cur - 1);
        else goTo(cur);
      }
    });

    // Prevent click-through on cards after a drag
    track.addEventListener('click', e => {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);
  };

  /* ── Featured Projects ── */
  RD.render.featuredProjects = function (container, opts) {
    opts = opts || {};
    const count   = opts.count || 4;
    const segment = opts.segment || null;
    let projs = segment
      ? RD.data.projects.filter(p => p.segment === segment)
      : RD.data.projects;
    projs = projs.slice(0, count);

    const tileHTML = projs.map((p, i) => {
      const span = i === 0 ? 'rd-sc2 rd-sr2' : 'rd-sc1';
      const desc = (i === 0 && p.desc) ? `<div class="rd-tile-desc">${p.desc}</div>` : '';
      const award = p.award ? ` &nbsp;·&nbsp; ${p.award}` : '';
      return `
        <a class="rd-tile ${span}" href="project-detail.html">
          <div class="rd-tile-img ${p.tone}"></div>
          <span class="rd-tile-ph">Image / Video</span>
          <div class="rd-tile-info">
            <div class="rd-tile-cat">${p.category}</div>
            <div class="rd-tile-title">${p.title}</div>
            ${desc}
            <div class="rd-tile-meta">${p.location}${award}</div>
          </div>
        </a>`;
    }).join('');

    container.innerHTML = `<div class="rd-bento">${tileHTML}</div>`;
  };

  /* ── Testimonials ── */
  RD.render.testimonials = function (container, opts) {
    opts = opts || {};
    const count = opts.count || 3;
    const showAll = opts.showAll || false;
    const items = RD.data.testimonials.slice(0, showAll ? RD.data.testimonials.length : count);
    const stars = '★★★★★';

    container.innerHTML = `
      <div class="rd-ts-section">
        <div class="rd-eyebrow">What Our Clients Say</div>
        <h2 class="rd-section-title">Happy Clients Say It All</h2>
        <div class="rd-ts-grid">
          ${items.map(t => `
            <div class="rd-ts-card">
              <div class="rd-ts-stars">${stars}</div>
              <p class="rd-ts-quote">"${t.quote}"</p>
              <div>
                <div class="rd-ts-attr">${t.name}</div>
                <div class="rd-ts-role">${t.role}, ${t.company}</div>
              </div>
            </div>`).join('')}
        </div>
        ${!showAll ? `<div class="rd-ts-footer"><a href="testimonials.html" class="rd-more-link">See all testimonials →</a></div>` : ''}
      </div>`;
  };

  /* ── Services Blocks ── */
  RD.render.servicesBlocks = function (container) {
    const segments = [
      { index: '01', name: 'Healthcare &amp; Dental', desc: 'Clinical environments designed to calm patients, boost staff efficiency, and help your practice stand apart — from reception through to treatment rooms.', pills: ['GP & Dental', 'Orthodontic', 'Surgical', 'Wellbeing'], href: 'services.html' },
      { index: '02', name: 'Commercial &amp; Offices', desc: 'Workspaces that attract top talent, support how people actually work, and create a lasting impression on every client who walks through the door.', pills: ['Offices', 'Mixed Use', 'Hospitality'], href: 'services.html' },
      { index: '03', name: 'Residential', desc: 'Bespoke residential interiors built around how you live — tailored material palettes, considered proportions, and spaces that remain exceptional over time.', pills: ['Private Homes', 'Apartments', 'Care'], href: 'services.html' },
    ];

    container.innerHTML = `
      <div class="rd-sv-section">
        <div class="rd-section-header">
          <div>
            <div class="rd-eyebrow">What We Do</div>
            <h2 class="rd-section-title">Our Specialisms</h2>
          </div>
          <a href="services.html" class="rd-more-link">All services →</a>
        </div>
        <div class="rd-sv-grid">
          ${segments.map(s => `
            <a class="rd-sv-block" href="${s.href}">
              <div class="rd-sv-index">${s.index} / 03</div>
              <div class="rd-sv-name">${s.name}</div>
              <p class="rd-sv-desc">${s.desc}</p>
              <div class="rd-sv-pills">${s.pills.map(p => `<span class="rd-sv-pill">${p}</span>`).join('')}</div>
              <div class="rd-sv-arrow">Explore →</div>
            </a>`).join('')}
        </div>
      </div>`;
  };

  /* ── Process Steps ── */
  RD.render.processSteps = function (container, opts) {
    opts = opts || {};
    const eyebrow = opts.eyebrow || 'How It Works';
    const title   = opts.title   || '3 Simple Steps to Starting Your Project';
    const steps   = RD.data.processSteps;

    container.innerHTML = `
      <div class="rd-ps-section">
        <div class="rd-eyebrow">${eyebrow}</div>
        <h2 class="rd-section-title">${title}</h2>
        <div class="rd-ps-steps">
          ${steps.map(s => `
            <div class="rd-ps-step">
              <div class="rd-ps-num">${s.num}</div>
              <div class="rd-ps-title">${s.title}</div>
              <p class="rd-ps-desc">${s.desc}</p>
            </div>`).join('')}
        </div>
      </div>`;
  };

  /* ── Guarantees ── */
  RD.render.guarantees = function (container) {
    container.innerHTML = `
      <div class="rd-gv-section">
        <div class="rd-eyebrow">Our Guarantee</div>
        <h2 class="rd-section-title-sm">You are always protected.</h2>
        <div class="rd-gv-grid">
          ${RD.data.guarantees.map(g => `
            <div class="rd-gv-item">
              <div class="rd-gv-icon">${g.icon}</div>
              <div class="rd-gv-title">${g.title}</div>
              <p class="rd-gv-desc">${g.desc}</p>
            </div>`).join('')}
        </div>
      </div>`;
  };

  /* ── Key Elements ── */
  RD.render.keyElements = function (container) {
    container.innerHTML = `
      <div class="rd-ke-section">
        <div class="rd-eyebrow">What Makes Us Remarcable</div>
        <h2 class="rd-section-title">4 Key Elements</h2>
        <div class="rd-ke-grid">
          ${RD.data.keyElements.map(e => `
            <div class="rd-ke-item">
              <div class="rd-ke-num">${e.num}</div>
              <div class="rd-ke-title">${e.title}</div>
              <p class="rd-ke-desc">${e.desc}</p>
            </div>`).join('')}
        </div>
      </div>`;
  };

  /* ── Resources Teaser ── */
  RD.render.resourcesTeaser = function (container, opts) {
    opts = opts || {};
    const count = opts.count || 3;
    const items = RD.data.resources.slice(0, count);

    container.innerHTML = `
      <div class="rd-rc-section">
        <div class="rd-section-header">
          <div>
            <div class="rd-eyebrow">From Our Studio</div>
            <h2 class="rd-section-title">Design. Work. Lifestyle.</h2>
          </div>
          <a href="resources.html" class="rd-more-link">View all resources →</a>
        </div>
        <div class="rd-rc-grid">
          ${items.map(r => `
            <a class="rd-rc-card" href="resources.html">
              <div class="rd-rc-thumb">
                <div class="rd-rc-fill ${r.tone}"></div>
                <span class="rd-rc-type-badge">${r.type}</span>
              </div>
              <div class="rd-rc-body">
                <div class="rd-rc-title">${r.title}</div>
                <div class="rd-rc-meta">${r.readTime}${r.date ? ' &nbsp;·&nbsp; ' + r.date : ''}</div>
              </div>
            </a>`).join('')}
        </div>
      </div>`;
  };

  /* ═══════════════════════════════════════════ NAV & FOOTER INJECT ══ */
  const NAV_HTML = `
    <nav class="rd-nav">
      <a href="index.html" class="rd-nav-logo">REMARCABLE DESIGN</a>
      <ul class="rd-nav-links">
        <li><a href="index.html"     data-page="home">Home</a></li>
        <li><a href="projects.html"  data-page="projects">Projects</a></li>
        <li><a href="services.html"  data-page="services">Services</a></li>
        <li><a href="resources.html" data-page="resources">Resources</a></li>
        <li><a href="about.html"     data-page="about">About</a></li>
      </ul>
      <a href="contact.html" class="rd-nav-cta">Book Free Consultation</a>
    </nav>`;

  const FOOTER_HTML = `
    <section class="site-cta">
      <div class="site-cta-left">
        <div class="site-cta-eyebrow">Ready to build your vision?</div>
        <h2 class="site-cta-heading">Architecture with<br>Intention.</h2>
        <a href="contact.html" class="site-cta-btn">Book Free Consultation</a>
      </div>
      <div class="site-cta-video">
        <div class="site-cta-segs">
          <div class="site-cta-seg active" data-dur="2:18" data-cat="Healthcare &amp; Dental">Healthcare &amp; Dental</div>
          <div class="site-cta-seg" data-dur="1:55" data-cat="Commercial &amp; Offices">Commercial &amp; Offices</div>
        </div>
        <div class="site-cta-thumb">
          <div class="site-cta-thumb-ph"></div>
          <span class="site-cta-thumb-label">Video Placeholder</span>
          <div class="site-cta-play"></div>
        </div>
        <div class="site-cta-vid-title">What to expect from your free consultation</div>
        <div class="site-cta-vid-meta">
          <span class="site-cta-vid-cat">Healthcare &amp; Dental</span>
          <span class="site-cta-vid-dot">·</span>
          <span>&#9201; <span class="site-cta-vid-dur">2:18</span></span>
        </div>
      </div>
    </section>
    <footer class="site-footer">
      <div class="rd-footer-grid">
        <div>
          <div class="rd-footer-logo">REMARCABLE DESIGN</div>
          <p class="rd-footer-desc">We design and build exceptional environments for forward-thinking professionals across healthcare and commercial sectors.</p>
        </div>
        <div>
          <div class="rd-footer-col-label">Explore</div>
          <ul class="rd-footer-links">
            <li><a href="projects.html">Projects</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="resources.html">Resources</a></li>
            <li><a href="about.html">About</a></li>
          </ul>
        </div>
        <div>
          <div class="rd-footer-col-label">Company</div>
          <ul class="rd-footer-links">
            <li><a href="testimonials.html">Testimonials</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="faq.html">FAQ</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="privacy.html">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <div class="rd-footer-col-label">Newsletter</div>
          <form class="rd-footer-newsletter" onsubmit="return false">
            <input type="email" placeholder="Your email address" autocomplete="email">
            <button type="submit">JOIN</button>
          </form>
          <p style="font-size:11px;color:rgba(255,255,255,0.25);font-weight:300;margin-top:20px;line-height:1.6;">192 Upper Richmond Rd<br>Putney, London SW15 2SH<br>hello@remarcable.co.uk</p>
        </div>
      </div>
      <div class="rd-footer-bottom">
        <span class="rd-footer-copy">© Remarcable Design. Company No.&nbsp;10205743. We plant a tree for every project completed.</span>
        <div class="rd-footer-social">
          <a href="#" aria-label="Instagram">
            <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="#" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>
    </footer>`;

  function inject() {
    const headerEl = document.getElementById('site-header');
    if (headerEl) {
      headerEl.innerHTML = NAV_HTML;
      const activePage = document.body.dataset.activePage;
      if (activePage) {
        const link = headerEl.querySelector(`[data-page="${activePage}"]`);
        if (link) link.classList.add('active');
      }
    }
    const footerEl = document.getElementById('site-footer');
    if (footerEl) {
      footerEl.innerHTML = FOOTER_HTML;
      // Segment chip switching in video tile
      footerEl.querySelectorAll('.site-cta-seg').forEach(seg => {
        seg.addEventListener('click', function() {
          footerEl.querySelectorAll('.site-cta-seg').forEach(s => s.classList.remove('active'));
          this.classList.add('active');
          footerEl.querySelector('.site-cta-vid-dur').textContent = this.dataset.dur;
          footerEl.querySelector('.site-cta-vid-cat').textContent = this.dataset.cat;
        });
      });
    }
  }

  function injectHandoffHighlightStyles() {
    if (document.getElementById('rd-handoff-css')) return;
    const s = document.createElement('style');
    s.id = 'rd-handoff-css';
    s.textContent =
      '.rd-handoff-target{outline:3px solid #b84343!important;outline-offset:6px!important;box-shadow:0 0 0 4px rgba(184,67,67,0.15);animation:rd-handoff-pulse 1.1s ease-in-out 3;}@keyframes rd-handoff-pulse{0%,100%{outline-color:#b84343;box-shadow:0 0 0 4px rgba(184,67,67,0.12)}50%{outline-color:#e08585;box-shadow:0 0 0 8px rgba(224,133,133,0.2)}}';
    document.head.appendChild(s);
  }

  /** Scroll + pulse outline for `#id` (hash) or `?handoff=id` (used in HANDOFF deep links). */
  function applyHandoffHighlight() {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get('handoff');
    const fromHash = window.location.hash && window.location.hash.length > 1
      ? decodeURIComponent(window.location.hash.slice(1))
      : '';
    const id = (fromQuery || fromHash || '').replace(/^#/, '');
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    window.requestAnimationFrame(function () {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('rd-handoff-target');
      window.setTimeout(function () {
        el.classList.remove('rd-handoff-target');
      }, 9000);
    });
  }

  function boot() {
    inject();
    injectHandoffHighlightStyles();
    applyHandoffHighlight();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();

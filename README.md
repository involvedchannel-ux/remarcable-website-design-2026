# Remarcable Design — wireframe prototype source

This repository is the **static HTML/CSS/JS wireframe** for the Remarcable Design site refresh. It is the **canonical interaction reference** for client review and for the eventual **Webflow** production build.

Internal IA drafts, client comms, and `design-notes/` stay in the parent **Remarcable Design** workspace on Zsolt’s machine (not duplicated here).

## Live demo (Vercel)

1. **Import** [this GitHub repo](https://github.com/involvedchannel-ux/remarcable-website-design-2026) into Vercel.
2. **Production branch:** `main`. **Root directory:** `/` (repository root). **Framework preset:** Other (static) — there is no Node build step.
3. After the first successful deployment, copy the **Production** URL from the Vercel dashboard and share it for review. Pushes to `main` trigger automatic production deploys.

The deployed URL is the **source of truth** for layout and behaviour; Figma remains a visual backup.

## Webflow handoff

- **`HANDOFF.md`** — Markdown spec (routes, motion intent, deep-linking, tokens overview). Best for reading in GitHub.
- **`/handoff`** on the live site — same routing map with **working links** and copy-pastable deep-link examples (`handoff.html`).

## Local preview

```bash
cd design-ideas
python3 -m http.server 4010
```

Open `http://localhost:4010/index.html` (or `http://localhost:4010/` if your server maps `index.html`).

## Repository layout

| Path | Role |
|------|------|
| `index.html`, `projects.html`, … | Route-level wireframe pages |
| `components.js` | Shared header, footer, CTA band, reusable sections, global CSS variables |
| `vercel.json` | Clean URLs + rewrites (`/projects` → `projects.html`, etc.) |
| `HANDOFF.md` | Webflow developer written spec |
| `handoff.html` | In-browser link map for reviewers and devs |
| `grid-v*.html`, `project-v*.html`, `_dev-hub.html` | Layout labs / variants (optional for Webflow scope) |

## Rules

- Keep one visual language; extend `components.js` instead of inventing parallel systems when a pattern repeats.
- Follow latest agreed IA for routes and labels.
- Wireframe **placeholder media** stays non-photographic until the brand pass.

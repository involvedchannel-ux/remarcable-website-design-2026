# Remarcable Design — wireframe prototype source

This folder is the **primary wireframe prototype source** and the folder pushed to GitHub.

## What is inside

- Route-level wireframe pages as static HTML (`index.html`, `projects.html`, `project-detail.html`, etc.)
- A shared UI/system script: `components.js` (header, footer, common sections, shared styles)
- Variant exploration pages (`grid-v*.html`, `project-v*.html`, hubs)
- Handoff spec: `HANDOFF.md`

## Local preview

```bash
cd design-ideas
python3 -m http.server 4010
```

Then open `http://localhost:4010/index.html`.

## Rules

- Keep edits in the same visual language and HTML/CSS/JS system.
- Prefer reusing `components.js` patterns over ad-hoc new systems.
- Use IA v4 as the route/content structure source of truth.

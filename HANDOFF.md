# Handoff — Remarcable Design wireframe prototype

> Lean spec for the Webflow developer. This mirrors the live wireframe demo behavior and route structure.

## Status

Wireframe phase in progress.

## Live demo

- URL: _to be added after deploy_

## Routes (wireframe)

| Route intent | File |
|---|---|
| Home | `index.html` |
| Projects index | `projects.html` |
| Project detail | `project-detail.html` |
| Services | `services.html` |
| Resources | `resources.html` |
| About hub | `about.html` |
| About / Our Why | `about-why.html` |
| About / How We Work | `about-how-we-work.html` |
| About / Key Elements | `about-key-elements.html` |
| About / Team | `about-team.html` |
| Testimonials | `testimonials.html` |
| Contact | `contact.html` |
| Privacy | `privacy.html` |

## Shared system

- Shared header/footer and reusable sections are injected via `components.js`.
- Global navigation state is controlled by `data-active-page` on `<body>`.

## Behaviors

- Projects and detail pages include wireframe interaction behavior in-page JS.
- Shared sections (carousel/testimonials/services/resources teaser) are rendered from `components.js`.

## Notes for Webflow build prep

- Use this wireframe prototype for route structure, page rhythm, and interaction intent.
- Figma remains visual backup reference.

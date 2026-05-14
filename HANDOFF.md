# Handoff — Remarcable Design wireframe (Webflow developer)

> Lean spec for the Webflow build. Behaviour and routes match the **live Vercel deployment** of this repo (`main` branch). Figma is visual backup only.

## Live demo (canonical)

1. Connect this GitHub repo to Vercel (production branch **`main`**, project root **`/`**).
2. Copy the **Production** URL from Vercel (shape: `https://<project>.vercel.app`).
3. Treat that URL as the **source of truth** for spacing, rhythm, and interaction intent.

## Client reference — current campaign landing

**Live baseline (to be superseded by one new reusable template in scope):** [https://designs.remarcable.co.uk/](https://designs.remarcable.co.uk/) — Remarcable’s existing Webflow campaign / lead-gen landing. Use for conversion structure and content patterns until the new template is signed off in Figma.

**In-repo link map (clickable on the deployed site):** open **`/handoff`** (serves `handoff.html`) for the same routing table with working relative links and deep-link examples.

## How deep links work

Many DOM nodes already have stable `id` attributes (mount points, galleries, sections).

- **Hash:** `https://YOUR_DEPLOY_URL/project-detail#gallery-wrap` scrolls to the element and briefly pulses an outline.
- **Query (same effect, useful when a hash is already used elsewhere):** `https://YOUR_DEPLOY_URL/project-detail?handoff=pd-hero`

Supported on every page that loads `components.js` (all primary templates).

## Routes — production URLs ↔ files

| Public URL (Vercel) | Source file | Notes |
|---------------------|---------------|-------|
| `/` | `index.html` | Home |
| `/projects` | `projects.html` | Filters, load more, bento |
| `/project-detail` | `project-detail.html` | Sample case study layout |
| `/services` | `services.html` | Segment stages, specialisms |
| `/resources` | `resources.html` | Tabs + resource grid mount |
| `/about` | `about.html` | Hub |
| `/about/why` | `about-why.html` | |
| `/about/how-we-work` | `about-how-we-work.html` | |
| `/about/key-elements` | `about-key-elements.html` | |
| `/about/team` | `about-team.html` | |
| `/testimonials` | `testimonials.html` | |
| `/contact` | `contact.html` | |
| `/faq` | `faq.html` | |
| `/privacy` | `privacy.html` | |
| `/cost-calculator` | `cost-calculator.html` | |
| `/handoff` | `handoff.html` | This map, in the browser |

**Layout labs (internal / optional in Webflow):** `_dev-hub.html`, `project-hub.html`, `grid-v*.html`, `project-v*.html` — exploration only; IA pages above are the review set.

## Shared system

- **`components.js`** injects global header, footer, CTA band, and several reusable blocks into empty `#…-mount` divs.
- Active nav: `data-active-page` on `<body>` (`home` | `projects` | `services` | `resources` | `about` | `testimonials` | `contact` | `privacy`).
- **Tokens:** CSS variables such as `--black`, `--bg`, `--pad-outer`, `--nav-h` are defined in `components.js` (injected stylesheet) and extended per page in local `<style>` blocks. Mirror the **values** in Webflow variables, not necessarily the variable names.

## Sections worth mirroring in Webflow (examples)

Use `?handoff=` or `#` with these ids in the demo:

| Area | Example deep link (path only) |
|------|-------------------------------|
| Home hero | `/?handoff=home-hero` |
| Home scroll text | `/#srtSection` |
| Featured projects mount | `/#featured-projects-mount` |
| Video carousel mount | `/#video-carousel-mount` |
| Services mount | `/#services-mount` |
| Project detail hero | `/project-detail?handoff=pd-hero` |
| Horizontal gallery | `/project-detail#gallery-wrap` |
| Before/after scrubber | `/project-detail#ba-slider` |
| Hotspot features | `/project-detail#hotspot-inner` |
| Services — specialism panels | `/services#panel-healthcare` |
| Resources grid | `/resources#res-grid-mount` |
| Privacy — analytics section | `/privacy#google-analytics` |

Add new ids in HTML when you need a stable handoff anchor; document them here in the same table.

## Motion & interaction (wireframe intent)

Document what the Webflow build should reproduce (timings approximate):

- **Home `srtSection`:** scroll-linked text crossfade driven by scroll position (`index.html` inline script).
- **Project detail gallery strip:** horizontal scroll hijack / scrub with progress bar and tile aspect patterns (`project-detail.html` + page script).
- **Before / after:** drag divider with `clip-path` on the “before” layer (`#ba-slider` + handle `#ba-handle`).
- **Hotspot column:** clicking feature rows toggles active state, dims image, shows label (`#hotspot-inner` area).
- **Services page:** stage nav and specialism tab panels swap content (`#stageNav`, `#specialismTabs`, `#panel-healthcare`, etc.).
- **Footer CTA (injected):** segment chips swap video meta copy only (no real video playback in wireframe).

Prefer **Webflow interactions** or light custom code — match **motion character** (duration, easing), not necessarily the wireframe’s exact JS structure.

## Imagery

- Wireframe uses neutral blocks and labels — **no production photography** in this repo.
- Replace blocks with final assets in Webflow; keep aspect-ratio intent where layouts depend on it.

## Webflow notes (fill in during build)

- CMS collections for projects, resources/articles, and team as agreed in IA.
- Symbols for nav, footer, CTA band, testimonial cards, service cards.
- **Forms:** wireframe uses non-submitting placeholders; connect to production form handler / CRM in Webflow.

## Known divergences from Figma

_List dated entries here as they arise._

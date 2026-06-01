# VOID — Academic Visuals Initiative

A single-page portfolio template built for academics, designers, and creatives. All content is driven by a single YAML file — no coding required to update the site.

---

## Project Structure

```
template 1/
├── index.html          # Entry point — loads styles & scripts
├── styles.css          # All CSS in one file
├── scripts.js          # All JavaScript in one file
├── data.yml            # All site content (edit this)
└── README.md
```

## How It Works

### `data.yml` — Site Content
Everything you see on the page is defined in this file. Edit the values here to update text, images, links, visibility, and section order. The structure uses YAML indentation — each section has a `type` (matches a renderer in `scripts.js`) and a `data` block with all its content.

**Visibility toggles** — every element (titles, descriptions, images, stats, form, etc.) can be individually hidden by setting its visibility flag to `false`.

**Section visibility** — set `visible: false` on a section to remove it entirely from the page.

**Nav links** — set `showInNav: true` on a section to add a smooth-scroll link in the top navigation bar.

### `index.html` — Shell
Contains only the basic HTML structure: `<nav>`, `<div id="app">`, back-to-top button, and script/style references. No hardcoded content — everything is rendered dynamically.

### `styles.css` — All Styles
Consolidated CSS in cascade order:
1. **Global** — body, nav, back-to-top button
2. **Hero** — full-screen intro with mask effect
3. **About** — two-column grid with stats
4. **Education** — timeline layout
5. **Publications** — list with hover effects
6. **Research** — card grid
7. **Contact** — form/details layout
8. **Footer** — columns and copyright

### `scripts.js` — All JavaScript
Consolidated JS in two parts:
1. **Init functions** — `initHero()`, `initAbout()`, `initEducation()`, `initPublications()`, `initResearch()`, `initContact()`, `initFooter()` — each sets up scroll-reveal observers and interactivity for its section.
2. **Renderers** — each section type has a renderer function (`hero()`, `about()`, `education()`, etc.) that generates HTML from `data.yml` data.
3. **Main app** — an async IIFE that fetches `data.yml`, parses it with js-yaml, iterates through sections, calls the appropriate renderer, appends the HTML, and initializes each section.

### `scripts.js` Renderers

| Renderer       | Data Source                      | Output                        |
|----------------|----------------------------------|-------------------------------|
| `hero()`       | `hero` section data              | Fullscreen hero + mask image  |
| `about()`      | `about` section data             | Two-column grid with stats    |
| `education()`  | `education` section data         | Timeline list                 |
| `publications()` | `publications` section data    | Linked list with meta         |
| `research()`   | `research` section data          | Card grid (optionally linked) |
| `contact()`    | `contact` section data           | Form or contact info          |
| `footer()`     | `footer` section data            | Brand, link columns, copyright|

### Visibility Toggles

Every section supports `visibility` flags in `data.yml`. Set any to `false` to hide that element:

```yaml
visibility:
  label: false       # hides the "ABOUT ME" label
  title: true        # shows the heading
  description: true  # shows the paragraph
  image: false       # hides the image
  stats: true        # shows the stats row
```

The contact section has two special toggles:
- `form` — when `false`, hides the contact form
- `contactInfo` — when `form` is `false` and `contactInfo` is `true`, displays address/phone/email instead

---

## Editing the Site

1. **Open `data.yml`** and edit any value.
2. **Refresh the page** in your browser to see changes.

No build tools, no server setup — just edit and reload. To replace images, update the `image` fields with your own URLs.

---

## Technical Notes

- **js-yaml** is loaded from CDN to parse `data.yml` in the browser.
- **IntersectionObserver** powers the scroll-reveal animations across all sections.
- The hero mask tracks the mouse position to create a circular reveal effect.
- The contact form resets on submit (no backend — add your own handler if needed).
- Right-click is disabled site-wide to prevent inspection and copying.
- Text selection is disabled site-wide (except in form fields).

---

## License

Designed by Academic Visuals Initiative — an open-source, non-profit project supporting academic visibility.

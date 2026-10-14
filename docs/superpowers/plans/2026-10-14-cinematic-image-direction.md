# Cinematic Image Direction Implementation Plan

> **For agentic workers:** Execute inline in this session with frequent validation and commits.

**Goal:** Turn the existing portfolio images and motion loops into one cohesive, cinematic, realistic visual narrative inspired by the supplied reference frame.

**Architecture:** Keep the static HTML site and existing visual assets, but add a reusable cinematic media layer. Each visual surface becomes a composed plate with a moving image layer, depth/parallax layer, controlled light sweep, grain, and responsive reduced-motion fallback. Scroll position will set a single page-level cinematic progress variable and an IntersectionObserver will start/stop local video playback so the page feels directed rather than noisy.

**Tech Stack:** HTML, CSS, vanilla JavaScript, FFmpeg-generated lightweight WebP/MP4 assets, GitHub Pages.

**Spec:** User request: make existing images lively, realistic, unified, and professionally directed like the supplied dark editorial reference image.

## Global Constraints

- Preserve the existing portfolio copy and section structure.
- Use the existing Wakanda-inspired visual language: obsidian, copper/gold, emerald, and cyan.
- Animate only transform, opacity, filter, and CSS custom properties that do not trigger layout.
- Respect `prefers-reduced-motion` and keep mobile motion restrained.
- Keep the live site deployable from `main`.

---

### Task 1: Optimize and normalize visual assets

**Files:**
- Create: `assets/optimized/*.webp`
- Modify: `index.html` image references and poster references

- [ ] Convert the four new hero/gallery PNGs to quality-84 WebP and retain originals as source masters.
- [ ] Replace production `<img>` and CSS references with the WebP derivatives.
- [ ] Verify all optimized files load locally and remain visually equivalent.
- [ ] Commit `perf: add optimized cinematic image derivatives`.

### Task 2: Add the cinematic plate system

**Files:**
- Modify: `assets/media-module.css`
- Modify: `index.html`

- [ ] Add `.cinematic-plate` wrappers/layers for hero, project-card visuals, BioCredit stage, gallery cards, and curated video cards.
- [ ] Add shared grain, copper light sweep, edge vignette, depth layer, and frame-line styling.
- [ ] Add responsive and reduced-motion fallbacks.
- [ ] Validate no layout properties are animated.
- [ ] Commit `feat: add cinematic plate treatment`.

### Task 3: Add directed motion controller

**Files:**
- Modify: `assets/media-module.js`

- [ ] Add one RAF-throttled scroll controller writing `--cinematic-scroll` and local parallax variables.
- [ ] Add pointer-driven parallax only on fine pointers and only while hovering media plates.
- [ ] Add IntersectionObserver playback control for all `.cinematic-video` elements.
- [ ] Add staged image activation and short delays to align visual entrances.
- [ ] Ensure hidden tabs pause motion and reduced-motion disables movement.
- [ ] Commit `feat: direct cinematic media motion`.

### Task 4: Integrate and publish

**Files:**
- Modify: `index.html`, `assets/media-module.css`, `assets/media-module.js`
- Test: local HTTP preview and live domain

- [ ] Run `node --check`, HTML parsing, `git diff --check`, asset response checks, and local visual smoke test.
- [ ] Merge the feature branch into `main` and push.
- [ ] Wait for GitHub Pages and verify the live homepage contains the cinematic hooks and optimized assets.
- [ ] Record changes and intentionally untouched areas in the final response.

# Interactive Media System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the single-page Victor Muoki portfolio into a richer, performance-aware interactive media experience while preserving the existing visual identity and keeping production unchanged until preview review.

**Architecture:** Keep the current single-file page intact as the baseline and layer a small, focused media system on top through `assets/media-module.css` and `assets/media-module.js`. The system uses CSS/SVG/canvas-style motion, no new runtime dependency, lazy non-critical assets, keyboard-accessible controls, and a static fallback for reduced motion or unsupported media.

**Tech Stack:** HTML, CSS, vanilla JavaScript, existing Three.js/GSAP CDN references, inline SVG, Git/Netlify Drop.

**Spec:** `/home/ubuntu/upload/pasted_content_2.txt`

## Global Constraints

- Preserve the existing dark black/white/gold design language and current copy.
- Keep the live Netlify deployment unchanged; use GitHub branch and preview workflow.
- Add `prefers-reduced-motion`, mobile fallbacks, captions/transcript hooks, and descriptive labels.
- Animate transform/opacity where possible; avoid layout-property animation and unbounded `transition: all`.
- Use original CSS/SVG visualizations or existing site assets; do not invent confidential client screenshots.
- Keep the system dependency-free and suitable for Kenyan mobile networks.

---

### Task 1: Add the media-system foundation

**Files:**
- Create: `assets/media-module.css`
- Create: `assets/media-module.js`
- Create: `assets/hero-night.svg`
- Modify: `index.html` to load the assets and add the media mount point

- [ ] Add a Nairobi-night hero poster SVG with gold window glints, grid, and ECG line.
- [ ] Add CSS tokens, media layer, 3D-style perspective stage, and animated rails.
- [ ] Add JS that mounts the hero background only after DOM readiness, respects reduced motion, and pauses nonessential animation when the document is hidden.
- [ ] Commit: `feat: add interactive media system foundation`.

### Task 2: Add BioCredit flow and feature visuals

**Files:**
- Modify: `index.html`
- Modify: `assets/media-module.css`
- Modify: `assets/media-module.js`

- [ ] Add an accessible six-step BioCredit rail: Identity, Eligibility, Loan terms, Disbursement, Repayment, Reputation.
- [ ] Add inline SVG/CSS feature objects for ECG identity, AI score, contract blocks, wallet rails, repayment signal, and reputation ring.
- [ ] Add the “Watch the 60-second BioCredit walkthrough” CTA with a lightweight modal shell and a transcript placeholder.
- [ ] Add hover/focus-safe project visual treatments for BioCredit, ZED 360, and Wozzo.
- [ ] Commit: `feat: add BioCredit flow and feature visuals`.

### Task 3: Add site-wide motion and proof layers

**Files:**
- Modify: `index.html`
- Modify: `assets/media-module.css`
- Modify: `assets/media-module.js`

- [ ] Add scroll-linked section reveal, restrained kinetic philosophy typography, and animated project-card depth.
- [ ] Add Track Record evidence fields: Role, Organization, Period, What I shipped, Outcome, Artifact.
- [ ] Add a football-skating case-study media tile using existing project imagery and neutral text.
- [ ] Commit: `feat: add site-wide motion and evidence storytelling`.

### Task 4: Accessibility, performance, and validation

**Files:**
- Modify: `assets/media-module.css`
- Modify: `assets/media-module.js`
- Modify: `README.md`

- [ ] Add reduced-motion rules that remove drift and looping effects but preserve readable state changes.
- [ ] Gate hover-only motion behind fine-pointer media queries; ensure keyboard focus is visible.
- [ ] Add `loading="lazy"` to non-critical imagery and a static hero fallback.
- [ ] Add validation notes and preview instructions to README.
- [ ] Run HTML structure checks, JavaScript syntax checks, and local HTTP smoke tests.
- [ ] Review motion against the ten non-negotiable animation standards.
- [ ] Commit: `chore: harden interactive media for accessibility and mobile`.

### Task 5: Push the feature branch

**Files:**
- Git history and remote branch only

- [ ] Verify `git diff --check`, no secrets, clean working tree, and branch name.
- [ ] Push `feature/interactive-media-system` to `origin`.
- [ ] Keep `main` unchanged until preview approval.

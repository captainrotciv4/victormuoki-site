# Victor Muoki Portfolio

Version-controlled Victor Muoki portfolio baseline reconstructed from the live Netlify Drop deployment at https://victormuoki.com/.

## Interactive media upgrade

The `feature/interactive-media-system` branch adds:

- A muted, lightweight `hero-loop.mp4` background with an original `hero-night.svg` static poster fallback.
- A Nairobi-night media layer with orbit, ECG signal, grid, and mobile-finance rail motifs.
- A six-step BioCredit journey: Identity → Eligibility → Loan terms → Disbursement → Repayment → Reputation.
- Interactive 3D-style feature visuals for BioCredit, ZED 360, and Wozzo.
- Pointer-safe project-card tilt, reveal motion, kinetic philosophy underlines, and a Track Record evidence layer.
- An accessible walkthrough modal shell with transcript-first copy, ready for the final 60-second video.
- `prefers-reduced-motion`, focus-visible states, document-visibility pausing, mobile layout fallbacks, and no new runtime dependencies.

## Local preview

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

Open `http://localhost:4173` or the active sandbox preview URL. Production is intentionally unchanged; review the feature branch preview before merging or connecting Netlify to GitHub.

## GitHub

- Repository: https://github.com/captainrotciv4/victormuoki-site
- Baseline: `main`
- Upgrade work: `feature/interactive-media-system`

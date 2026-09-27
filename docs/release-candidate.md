# Qatar Atlas — Release Candidate Gate

Release candidate status: **FINAL PRE-MERGE GATE PASSED — FROZEN PRODUCT BASELINE**

Frozen release baseline: `2bf4fb909ffd1059453bea5540f744b46eee7237`

This document separates automated release evidence from the final human visual/device check. Passing CI or receiving a READY Vercel deployment does not, by itself, approve a production merge.

## Automated gates

- [x] TypeScript
- [x] Route integrity
- [x] Project content audit
- [x] Evidence integrity audit
- [x] Source registry and freshness audit
- [x] Arabic completeness audit
- [x] Accessibility and responsive contract audit
- [x] Visual responsive contract audit
- [x] SEO / SSR audit
- [x] Production security audit
- [x] Production data-safety audit
- [x] Production build
- [x] Performance budget
- [x] Latest Preview deployment READY
- [x] No `error` / `fatal` runtime logs in the latest preview review window
- [x] Media/portrait policy documented; neutral identity panels used until display rights are confirmed

## Manual device matrix

The same release candidate must be checked on these four presentation modes.

| Mode | Target viewport | Status |
| --- | --- | --- |
| Desktop · English | 1440 × 900 | PASS — 2026-09-27 |
| Desktop · Arabic | 1440 × 900 | PASS — 2026-09-27 |
| Mobile · English | 390 × 844 | PASS — 2026-09-27 |
| Mobile · Arabic | 390 × 844 | PASS — 2026-09-27 |

## Critical route set

Each language/device pass should cover the routes below. One project detail and one leadership detail are sufficient to validate the shared detail templates, but their source/evidence blocks must be inspected.

- Home
- Leadership index
- Leadership detail
- Projects index
- Project detail
- Timeline
- Connections
- Map
- Methodology
- Sources
- 404 / unknown route
- Language switch preserving the current route
- Mobile navigation open/close behavior on mobile modes

## Visual acceptance criteria

A mode passes only if all of the following are true:

- No horizontal page overflow.
- No clipped headings, cards, badges, buttons or source URLs.
- Sticky header/toolbars do not overlap page content.
- Arabic content is visibly RTL and English visibly LTR.
- Navigation active state and language switch are correct.
- Dense cards/grids remain balanced at the tested viewport.
- Timeline markers/lines stay aligned.
- Connections controls, graph cards and evidence panel are usable.
- Map markers/labels do not cover critical controls or overflow the canvas.
- Source Registry search, filter chips, six-field metadata grid and source links remain usable.
- Neutral leadership identity panels look intentional and do not display temporary rights-review copy.
- Focusable controls remain visibly distinguishable when keyboard-tested on desktop.
- No unexpected error page, auth loop or broken internal route occurs.

## Evidence to record

For each of the four modes, record:

1. Preview deployment URL / commit.
2. Browser/device.
3. Screenshots for Home, one dense explorer (Connections or Map), and Sources.
4. Any defect found and the commit that fixes it.
5. Final PASS date.

## Device QA evidence — 2026-09-27

- Candidate product commit / frozen release baseline: `2bf4fb909ffd1059453bea5540f744b46eee7237`.
- Browser engine: Playwright Chromium 1.55.0, headless Linux.
- Technical QA: PASS on `2bf4fb909ffd1059453bea5540f744b46eee7237`.
- Release Visual QA: PASS on `2bf4fb909ffd1059453bea5540f744b46eee7237`.
- Automated browser result: PASS — 4 presentation modes × 10 critical localized routes = 40 route/device checks.
- Automated checks included: HTTP success, HTML `lang`/`dir`, horizontal overflow, main landmark, temporary media-rights copy, route-preserving language switch, Source Registry rendering, Connections rendering, mobile menu behavior, and expected 404 behavior.
- Screenshot artifact: `qatar-atlas-rc-visual-2bf4fb909ffd1059453bea5540f744b46eee7237` (Artifact ID `10937250277`; 12 screenshots: Home, Connections and Sources for each mode).
- Human visual review: PASS — the new 12 screenshots for `2bf4fb909ffd1059453bea5540f744b46eee7237` were reviewed for EN/AR parity, Desktop/Mobile presentation, hierarchy, clipping, RTL/LTR, card balance, Connections evidence layout, Source Registry readability and mobile stacking.
- Leadership, Timeline and Map presentation was cross-checked through the Home previews plus the four-mode critical-route browser QA on their dedicated routes.
- Current Vercel preview deployment: `dpl_CvzAa55tJP5875qjYk3EA9c44bRA` — READY from `develop` at `2bf4fb909ffd1059453bea5540f744b46eee7237`.
- Runtime review: no `error` / `fatal` logs found for the current preview in the reviewed window.
- Source freshness spot-check: PASS — current official leadership, national-vision, energy and digital-strategy sources were re-checked; no release-blocking freshness conflict was found.
- No release-blocking visual, runtime, source/evidence or bilingual presentation defect was observed in the re-certification evidence.

## Production rule

Do **not** mark PR #1 ready and do **not** merge `develop` into `main` while any manual device mode remains `PENDING` or `FAIL`.

After all four modes pass:
1. update every mode above to `PASS — YYYY-MM-DD`;
2. run `npm run check:rc`;
3. update PR #1 from Draft to Ready for Review;
4. merge only after one final source/runtime spot-check.

The frozen product baseline for this certification is `2bf4fb909ffd1059453bea5540f744b46eee7237`. Do **not** merge `develop` into `main` if a subsequent product-code change has been introduced without re-certification.

The documentation commit that records this certification does not alter the frozen product baseline.

Production merge requires a separate explicit release command followed by production deployment verification and post-merge smoke QA.

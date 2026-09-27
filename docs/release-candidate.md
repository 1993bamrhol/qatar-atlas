# Qatar Atlas — Release Candidate Gate

Release candidate status: **BLOCKED — MANUAL DEVICE QA PENDING**

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
- [x] No grouped Vercel runtime errors in the latest 24-hour review window
- [x] Media/portrait policy documented; neutral identity panels used until display rights are confirmed

## Manual device matrix

The same release candidate must be checked on these four presentation modes.

| Mode | Target viewport | Status |
| --- | --- | --- |
| Desktop · English | 1440 × 900 or wider | PENDING |
| Desktop · Arabic | 1440 × 900 or wider | PENDING |
| Mobile · English | ~390 × 844 | PENDING |
| Mobile · Arabic | ~390 × 844 | PENDING |

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

## Production rule

Do **not** mark PR #1 ready and do **not** merge `develop` into `main` while any manual device mode remains `PENDING` or `FAIL`.

After all four modes pass:
1. update every mode above to `PASS — YYYY-MM-DD`;
2. run `npm run check:rc`;
3. update PR #1 from Draft to Ready for Review;
4. merge only after one final source/runtime spot-check.

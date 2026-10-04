# KOVUNELI | كوفونيلي

An evidence-led connected knowledge platform focused on Qatar  
منصة معرفية مترابطة قائمة على الأدلة، تركز على قطر

## Development

`npm install`

`npm run dev`

## Product principles
- Source-backed public facts
- No unsupported personal attribution
- Bilingual Arabic/English foundation
- Precise geographic pins only after verification
- Media rights checked before public use

## Repository and branch governance

Repository visibility: **Public**.

- Working branch: `develop`
- Production branch: `main`
- `main-release-gate`: **Active**
  - Pull request required before updating `main`
  - Allowed merge method: **Merge only**
  - Required checks: `build`, `browser-qa`
  - Required checks use strict / branch-up-to-date enforcement
  - Force pushes are blocked
  - Branch deletion is blocked
- `develop-integrity`: **Active**
  - Direct pushes to `develop` remain allowed
  - Force pushes are blocked
  - Branch deletion is blocked

Production releases follow the evergreen protocol in `docs/release-candidate.md`. After a production release and post-release verification, `main` is synchronized back into `develop` with a normal lineage-preserving merge before the next development cycle.

## Production readiness

KOVUNELI is designed for a static-first deployment (for example Vercel).

Production canonical base for the KOVUNELI domain cutover:

`NEXT_PUBLIC_SITE_URL=https://kovuneli.com`

Set the explicit production base before cutover and redeploy. Canonical URLs, EN/AR alternate links, Open Graph URLs, the sitemap and the robots sitemap reference use this shared base. On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` remains the fallback when no explicit production URL is configured. If no production URL is available, KOVUNELI intentionally emits no canonical URLs rather than publishing localhost or a fabricated domain.

Technical QA / release gate:

`npm run typecheck`
`npm run test:focused`
`npm run check:routes`
`npm run check:content`
`npm run check:evidence`
`npm run check:sources`
`npm run check:ar`
`npm run check:a11y`
`npm run check:visual`
`npm run check:seo`
`npm run check:security`
`npm run check:data-safety`
`npm run check:rc`
`npm run build`
`npm run check:perf`

Release Visual QA runs the browser/device gate that reports the required `browser-qa` check.

Do not publish precise map pins unless the record is `PIN_VERIFIED`. Do not replace official-image placeholders until usage rights have been reviewed.

Preview development uses `develop`. Production remains gated on `main` and requires the explicit release protocol; passing CI or a deployment alone does not authorize production release.

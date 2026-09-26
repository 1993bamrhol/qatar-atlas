# Qatar Atlas | أطلس قطر

Interactive bilingual, source-backed digital atlas connecting leadership, institutions, national strategies, projects, places, milestones and evidence.

## Development

`npm install`

`npm run dev`

## Product principles
- Source-backed public facts
- No unsupported personal attribution
- Bilingual Arabic/English foundation
- Precise geographic pins only after verification
- Media rights checked before public use

Phase 2 foundation branch: `develop`.


## Production readiness

Qatar Atlas is designed for a static-first deployment (for example Vercel).

Recommended production environment:

`NEXT_PUBLIC_SITE_URL=https://your-production-domain.example`

When deployed on Vercel, the sitemap can also use `VERCEL_PROJECT_PRODUCTION_URL` automatically. If no production URL is available, the sitemap intentionally emits no canonical URLs rather than publishing localhost or a fabricated domain.

Release gate:

`npm run typecheck`
`npm run check:routes`
`npm run check:content`
`npm run check:evidence`
`npm run check:ar`
`npm run check:a11y`
`npm run check:visual`
`npm run check:seo`
`npm run check:security`
`npm run check:data-safety`
`npm run build`
`npm run check:perf`

Do not publish precise map pins unless the record is `PIN_VERIFIED`. Do not replace official-image placeholders until usage rights have been reviewed.


Preview deployment branch: `develop`. Production remains gated on `main` until final launch approval.

Preview deployment refresh: 2026-09-26T20:45:00.000Z

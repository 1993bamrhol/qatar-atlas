# Qatar Atlas — UX/UI Status v1

Baseline: `develop@3a6b2b4c6c44e3ba61962ac0e3b4489ec2f01a85`
Audit scope: Home, Leadership index/detail, Projects index/detail, Timeline, Connections, Map, Methodology, Sources, 404, header/navigation/language switch, desktop/mobile, EN/AR.

## Executive status

The current product already has a coherent institutional foundation: burgundy-led palette, warm neutral surfaces, constrained content width, repeated evidence/status treatments, responsive breakpoints, logical RTL properties in critical layouts, keyboard focus states, skip link, localized routes, and neutral leadership identity panels.

The main release-polish gaps are not a redesign problem. They are presentation-contract issues: the UI currently exposes relationship types that are not present in approved data, the map visually positions non-pin-verified records like point markers, and the typography system still relies on Arial with limited Arabic-specific hierarchy. Dense evidence pages are functional but visually too uniform.

Figma comparison status: **PARTIAL**. Code-side design system and production UI were audited. The connected Figma account is available, but the current tooling does not expose a discoverable file list or file key for “Qatar Atlas — Design System & MVP”; no Figma parity claim is made without a verifiable file key/node URL.

## Current design system

- Color: burgundy `#8A1538`, deep burgundy `#4A071C`, warm white `#F8F6F2`, ink `#171717`, muted neutral and soft rose borders.
- Spacing tokens: 4/8/12/16/24/32/48/64/96 px equivalents.
- Radius tokens: 8/16/24/pill.
- Content width: 1232px max with 48px desktop / 32px mobile gutters.
- Core patterns: page hero, evidence badge, relationship badge, soft section, identity panel, dense explorer toolbar, source card, source metadata grid.
- Responsive breakpoints concentrate at 1000/900/800/700/600/560/500/480px.
- RTL hardening uses logical properties for timeline lines, profile borders, evidence lists, map labels, and key-fact borders.

Consistency: **GOOD FOUNDATION / NEEDS PRODUCTION POLISH**. Tokens exist but typography and dense-page hierarchy are not yet first-class tokens, and some feature-specific patterns still read as prototype UI.

## Severity findings

### BLOCKER

None found in the audited code baseline.

### HIGH

1. **Relationship taxonomy mismatch** — Home and Connections surface `INSTITUTIONAL` and `TEMPORAL` even though the approved connection dataset currently contains only `DIRECT`. This creates a presentation/data-contract mismatch.
2. **Map precision ambiguity** — all current map records are `AREA_VERIFIED` with `publicPin:false`, but the explorer renders them as positioned point markers using schematic canvas coordinates. The disclaimer is correct, but the visual affordance can still be read as a precise pin.
3. **Typography parity / production identity** — global typography is still `Arial, sans-serif`; Arabic falls back to `Arial, "Noto Sans Arabic", sans-serif` without a dedicated Arabic hierarchy. This is functional but visibly weaker than the intended premium institutional standard.

### MEDIUM

- Source Registry cards are traceable and complete, but six metadata cells + role chips + audit notes + linked records create a flat hierarchy and high mobile scanning cost.
- Connections is functionally a searchable/filterable evidence index rendered as a card grid, while naming and ARIA copy still imply a graph/prototype.
- Repeated large display sizes and tight negative letter spacing are optimized for Latin; Arabic overrides remove tracking but not all scale/line-height differences.
- Dense toolbars rely primarily on sticky positioning and chips; mobile usability is acceptable but visually crowded.
- Leadership identity panels are safe and coherent but monogram scale can dominate name/role hierarchy on detail pages.
- 404 is bilingual and functional but intentionally generic rather than locale-routed.

### POLISH

- Consolidate display/body/type scales into explicit CSS variables.
- Add clearer surface/elevation hierarchy to evidence and source blocks.
- Refine hover states for cards/links without increasing ornament.
- Reduce repeated all-caps micro-label density in Arabic.
- Harmonize card padding and title rhythm across Projects, Leadership, Sources, Map, and Connections.

## EN / AR

Functional parity is strong: localized routing, RTL/LTR, route-preserving language switch, localized labels, logical CSS properties, and Arabic data layers are present.

Visual parity is weaker than content parity because the typography system is Latin-first. Arabic needs more generous line-height, less oversized display type, and a stronger Arabic-first system font stack. No content rewrite is required for this sprint.

## Desktop / Mobile

Desktop composition is structurally strong. Main issues are density on Sources/Connections/Map and oversized display typography on some detail/hero views.

Mobile contract is already hardened: menu toggle, 44px targets, stacked grids, sticky toolbar offsets, overflow-safe filters, map/connection single-column fallbacks, and source grids collapse to one column. Remaining work is density and hierarchy polish rather than basic responsiveness.

## Dense pages

**Sources:** strongest evidence feature, but visually reads like a registry table translated into cards. Needs stronger metadata grouping and mobile prioritization.

**Connections:** high information value, but relationship filters must reflect actual approved data; “prototype” language should be removed.

**Map:** evidence model is explicit, but point-marker rendering must be restricted to `PIN_VERIFIED` records.

## Figma parity

Current status: **PARTIAL / NOT VERIFIED END-TO-END**.

Code-side patterns suggest an existing design system rather than ad-hoc page-by-page styling. No separate design system should be created. Once the Figma file key is available, compare:
- typography scale and Arabic text styles,
- page hero spacing,
- identity panels,
- evidence/source cards,
- dense explorer toolbars,
- mobile navigation,
- surface/radius/border tokens.

Intentional divergence should be documented where production constraints require safer evidence or geographic presentation.

## Prototype-like elements

- Relationship filters/legend advertising unused types.
- Positioned map markers for non-pin-verified records.
- “prototype” in Connections ARIA naming.
- Arial-first typography.
- Some flat metadata-heavy cards with limited grouping.

## First production-polish batch

Only the top three HIGH findings should be changed before broader polish:
1. derive relationship UI from approved relationship data;
2. render map point markers only for `PIN_VERIFIED` records;
3. upgrade global/Arabic typography hierarchy without changing content.

After the batch: run Visual + Accessibility + Browser/Device QA and stop before POLISH if any gate fails.

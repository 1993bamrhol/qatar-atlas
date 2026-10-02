# Qatar Atlas — UX/UI Status v1

Status: **V1 CURRENT / RELEASE-CANDIDATE READY**

Scope: Home, Leadership index/detail, Projects index/detail, Timeline, Connections, Map, Methodology, Sources, 404, header/navigation/language switch, desktop/mobile, EN/AR.

## Executive status

Qatar Atlas V1 has a coherent institutional presentation system and the former release-polish HIGH findings are closed. The production UI uses the established burgundy-led palette, warm neutral surfaces, evidence/status treatments, responsive navigation, verified RTL/LTR handling, bilingual metadata, neutral leadership identity panels, safe map presentation, and evidence-backed relationship surfaces.

No UX/UI blocker is recorded for V1.

## Closed HIGH findings

The three HIGH findings from the earlier production-polish audit are now **CLOSED**:

1. **Relationship taxonomy mismatch — CLOSED.** Connections relationship filters are derived from approved relationship data rather than advertising unused relationship types. The current approved graph remains evidence-backed and does not fabricate `INSTITUTIONAL` or `TEMPORAL` edges.
2. **Map precision ambiguity — CLOSED.** Precise markers render only when a record is `PIN_VERIFIED` and `publicPin` is enabled. Area-verified records remain area context and are not presented as exact public coordinates.
3. **Typography parity / production identity — CLOSED.** The UI uses a system-first Latin stack plus a dedicated Arabic stack and Arabic-specific line-height, tracking and display-size rules. EN/AR presentation remains subject to Release Visual QA.

## Current V1 design system

- Color: burgundy `#8A1538`, deep burgundy `#4A071C`, warm white `#F8F6F2`, ink `#171717`, muted neutral and soft rose borders.
- Spacing tokens: 4/8/12/16/24/32/48/64/96 px equivalents.
- Radius tokens: 8/16/24/pill.
- Content width: 1232px max with responsive gutters.
- Typography: system-first Latin stack and dedicated Arabic fallback stack.
- Core patterns: page hero, evidence badge, relationship badge, soft section, neutral identity panel, dense explorer toolbar, source card, source metadata grid.
- Responsive behavior: desktop/mobile breakpoints, 44px mobile targets, stacked dense grids and overflow-safe controls.
- RTL hardening: localized `lang/dir`, logical properties, Arabic-specific typography rules and route-preserving language switching.

## EN / AR

V1 requires functional and visual parity across English and Arabic:

- localized routing and metadata;
- `ltr` for English and `rtl` for Arabic;
- route-preserving locale switching;
- localized evidence, verification and relationship labels;
- Arabic data layers for leadership, projects, timeline, connections, map and source registry;
- Arabic-specific typography and spacing treatment where Latin defaults would reduce readability.

Release Visual QA remains the acceptance gate for visible parity.

## Desktop / Mobile

V1 is designed and tested across four presentation modes:

- Desktop · English
- Desktop · Arabic
- Mobile · English
- Mobile · Arabic

The browser/device gate covers the critical localized routes, overflow, navigation, language switching, expected 404 behavior and release screenshots.

## Evidence and dense pages

**Sources:** Source Registry exposes publisher, evidence roles, linked records, access-audit state and record-level evidence metadata without treating source publication date as record review date.

**Connections:** Relationship controls reflect approved data. Relationship semantics remain `DIRECT / INSTITUTIONAL / TEMPORAL`, but the UI only surfaces relationship types present in the approved graph.

**Map:** Area context and precise coordinates are distinct. No precise public marker is rendered unless the record satisfies the explicit pin-verification gate.

**Leadership:** Neutral typographic identity panels remain the V1 presentation until image display rights are independently established.

## Figma parity

**POST-V1 / institutional showcase follow-up.**

End-to-end Figma parity is not a V1 release blocker. V1 acceptance is based on the implemented design system plus Technical QA and Release Visual QA. A later institutional-showcase pass may compare the production system with an authoritative Figma file when a verifiable file key/node source is available.

That follow-up may review typography scale, Arabic styles, hero spacing, identity panels, evidence/source cards, dense explorer toolbars, mobile navigation and design tokens. It must not weaken evidence, geographic or media-rights safeguards.

## V1 release posture

For V1, UX/UI closure requires:

- no unresolved release-blocking visual defect;
- EN/AR parity across required routes;
- Desktop/Mobile browser/device QA PASS;
- no relationship type presented as an approved edge unless present in approved data;
- no precise public map pin without `PIN_VERIFIED`;
- no unlicensed or rights-unclear leadership imagery;
- no presentation that converts a `TARGET` into an achieved outcome.

Broader showcase polish, expanded imagery, additional relationship classes, new precise pins and Figma showcase parity are **POST-V1** unless separately approved with their required evidence.

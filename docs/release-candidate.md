# Qatar Atlas — Evergreen Release Protocol

This document defines the durable release-governance contract for Qatar Atlas. It is intentionally release-agnostic: it does not record a current PR number, tested commit SHA, deployment ID, artifact ID, or dated PASS snapshot.

Passing CI alone does **not** authorize a Production release. A Vercel deployment reaching `READY` alone does **not** authorize a Production release. Release authority comes from the complete gated lifecycle below and an explicit release command.

## Branch governance

- `develop` is the working branch. Direct pushes are permitted under `develop-integrity`, while branch deletion and non-fast-forward / force-push history changes are blocked.
- `main` is the production branch. `main-release-gate` requires a pull request, allows the **Merge** method only, requires `build` and `browser-qa`, and enforces strict / branch-up-to-date status checks.
- Deletion and non-fast-forward / force-push updates are blocked on `main`.
- Release governance must not be bypassed by changing the tested candidate after certification.

## Release lifecycle

The required lifecycle is:

`develop`
→ Technical QA + Release Visual QA
→ **Pre-Merge Certification**
→ Release PR to `main`
→ required `build` + `browser-qa`
→ branch must be up to date
→ **Final Pre-Merge Gate**
→ explicit **Release Merge Protocol**
→ Merge-only into `main`
→ Production deployment verification
→ **Post-Merge Smoke QA**
→ **Post-Release Control**
→ **`main → develop` lineage synchronization**
→ Technical QA + Release Visual QA on the sync commit
→ next development cycle

Each stage must refer to the same release candidate unless a later gate explicitly re-certifies a changed candidate.

## Candidate identity and SHA drift

The **tested SHA** must match the **approved SHA** used by the release gate.

Any **SHA drift** after testing or certification invalidates the affected approval. The appropriate Technical QA, Release Visual QA, source/runtime review, Pre-Merge Certification, or Final Pre-Merge Gate must be repeated for the new SHA before release can continue.

A release PR must not be treated as approved merely because it is mergeable. Required checks, branch-up-to-date status, release certification, and the explicit release command must all remain valid for the approved SHA.

## Automated Technical QA

The Technical QA contract includes:

- `npm run typecheck`
- `npm run test:focused`
- `npm run check:routes`
- `npm run check:content`
- `npm run check:evidence`
- `npm run check:sources`
- `npm run check:ar`
- `npm run check:a11y`
- `npm run check:visual`
- `npm run check:seo`
- `npm run check:security`
- `npm run check:data-safety`
- `npm run check:rc`
- `npm run build`
- `npm run check:perf`

The release candidate checker validates this durable policy document; it must not depend on a historical PR, SHA, deployment, artifact, or dated release result.

## Four presentation modes — EN + AR / Desktop + Mobile

Release Visual QA and final visual review use the same four presentation modes for every candidate:

| Mode | Target viewport | Policy |
| --- | --- | --- |
| Desktop · English | 1440 × 900 | Required |
| Desktop · Arabic | 1440 × 900 | Required |
| Mobile · English | 390 × 844 | Required |
| Mobile · Arabic | 390 × 844 | Required |

The candidate reviewed in these modes must be the tested / approved candidate for the release. Evidence for a specific release belongs in its QA or release record, not in this evergreen policy.

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

A presentation mode passes only if all of the following are true:

- No horizontal page overflow.
- No clipped headings, cards, badges, buttons or source URLs.
- Sticky header/toolbars do not overlap page content.
- Arabic content is visibly RTL and English visibly LTR.
- Navigation active state and language switch are correct.
- Dense cards/grids remain balanced at the tested viewport.
- Timeline markers/lines stay aligned.
- Connections controls, graph cards and evidence panel are usable.
- Map markers/labels do not cover critical controls or overflow the canvas.
- Source Registry search, filter chips, metadata grid and source links remain usable.
- Neutral leadership identity panels look intentional and do not display temporary rights-review copy.
- Focusable controls remain visibly distinguishable when keyboard-tested on desktop.
- No unexpected error page, auth loop or broken internal route occurs.

## Release evidence policy

Per-release evidence should record, outside this evergreen policy:

1. candidate / approved SHA;
2. relevant Technical QA and Release Visual QA runs;
3. preview or production deployment identity when applicable;
4. browser/device evidence and screenshots;
5. defects and the SHA that fixes them;
6. source/runtime review where required;
7. final gate decisions.

Historical release evidence must not be presented in this file as the current release state.

## Production rule

Production release requires all applicable gates to pass for the approved SHA and requires an explicit **Release Merge Protocol** command.

The following are not sufficient on their own:

- CI success;
- a mergeable PR;
- Vercel `READY`;
- a successful preview deployment;
- a prior release's certification.

When a blocker is found, stop the release at the relevant gate. Do **not** perform an automatic rollback, fix, redeploy, merge, or candidate substitution unless a separate explicit instruction authorizes that action.

After Merge-only into `main`, verify the production deployment and complete **Post-Merge Smoke QA** followed by **Post-Release Control** before declaring the release stable.

## Post-release lineage synchronization

After Production release verification and Post-Release Control, perform **`main → develop` lineage synchronization** before the next development cycle when `develop` does not already contain the current production lineage.

Synchronization must use a **normal merge** from `main` into `develop` and preserve repository history:

- **no force push**
- **no reset**
- **no history rewrite**
- no rebase-based history rewriting
- no manual file changes solely to manufacture lineage

For a lineage-only synchronization where the branch trees were already identical, the file diff must remain zero after the merge. Confirm that `main` is an ancestor of the resulting `develop` commit.

The synchronization is not complete until Technical QA and Release Visual QA pass on the sync commit. Only then should the next development cycle begin.

# TODO

## Contact Page Polish
- [ ] Stray star from the moon/stars graphic spills below the red-striped header into the cream section — needs a smaller downward nudge, or clip the star cluster to the header band
- [ ] "Find me around" pink paper label now overlaps "[Social introduction placeholder]" text below it (clips the closing bracket) — needs more vertical spacing or nudge the label up slightly

## About Page - Positioning (resolved)
- [x] Polaroid/logo position — rebuilt from the authoritative Figma frame (node 1:3) using literal px values and a top-left-pivot rotation conversion for the Decorative Ephemera Cluster
- [x] Green paper texture behind polaroid — present
- [x] Blue torn-corner paper near footer — present (nudged left from Figma's literal wrapper position to clear the "Let's Work Together" text column, which the local asset export was clipping — see comment in css/about.css above `.ab3-deco--blue-corner`)
- [x] Logo rendering as two disconnected pieces — fixed by matching Figma's own `object-fit: cover` export technique instead of a custom crop-percentage trick

## About Page - Remaining Polish
- [ ] Pink strip (pink_strip_1.png, .ab3-bg-pink-strip) covers too large an area and is too saturated compared to Figma reference. Likely a CSS sizing/position fix, not an asset problem.
- [ ] "ABOUT" title heading doesn't match the Figma reference correctly, needs a closer look at font/styling/positioning against node 1:57 ("Hero / Journal Title Block").
- [ ] A background paper texture is missing somewhere on the page (likely "about me paper 1", node 1:5, a large rotated texture element on the right side of the frame in Figma).
- [ ] "Selected Credits & Resume" heading is missing its underline (should have a red horizontal line beneath it, matching node 1:45 "Line 3" in Figma).
- [ ] 6 duplicate/unreferenced asset files were uploaded during troubleshooting, worth confirming they were actually cleaned up.

## Nav Typography — Cross-page inconsistency (needs a decision)
- [ ] Journal Landing's nav (css/journal.css `.jv2-nav__tab`) and the new Journal Post nav (css/journal-post.css `.jp-nav__tab`) intentionally use `var(--font-display)` (Perandory Semi-Condensed) + `var(--color-near-black)` instead of Figma's raw per-tab export (Crimson Text SemiBold, #000) — documented in journal.css as a deliberate override to stay inside the approved 4-typeface system (CLAUDE.md design hierarchy). Listen's nav (css/listen.css `.listen-nav__tab`, merged in separately) instead uses the literal Figma font (`'Crimson Text', Georgia, serif`), which isn't one of CLAUDE.md's approved typefaces. These three nav implementations should agree on one typeface — worth an explicit call from Sarah on whether Crimson Text is a newly-approved exception for nav labels specifically, or whether Listen's nav should be brought in line with Perandory Semi-Condensed like Journal's.

## Journal Post — Title Block underline needs the real asset
- [ ] `.jp-title-block__rule` (css/journal-post.css) is a flat `var(--color-crimson)` bar standing in for Figma node 3:160 ("Line 4"), a real textured hand-drawn crimson brush-stroke SVG/PNG (643×12px at the reference frame). Couldn't be downloaded in-session — this sandbox's egress policy blocks `www.figma.com` asset URLs, and both `get_design_context`/`download_assets` only hand back a Figma-hosted URL to fetch. Geometry (position/width) is exact; only the visual texture is missing. Swap: export "Line 4" from Figma as PNG/SVG, drop it in `assets/images/journal/`, then replace the `background-color` rule with a `background-image` at the same box.

## Journal Post — Minor seam below the fixed-height stage
- [ ] Between the bottom of `.jp-stage` (y=1024 of the 1492×1024 frame) and where `.jp-decor__bg-lower` (2:78) starts (y=1214 — Figma's own coordinate for it), there's a ~190px band with no paper texture, just `.jp-body-region`'s plain `var(--color-cream)` fallback. Only visible once body copy is long enough to reach that far (the current lorem-ipsum placeholder barely reaches it). Subtle, not a hard seam (screenshotted and it reads fine), but Figma's own design doesn't actually cover this gap either since it falls entirely outside the 1024-tall frame this build works from — worth a look once real, longer essay content exists to see if it's worth closing (e.g. extending yellow-paper or 2:78 slightly).

## Listen Page — Follow-ups
- [ ] Only "Dreamy" has real mood content (playlist, description, Sarah's Picks). The other 8 mood circles are clickable and functional but show placeholder "not yet curated" copy, pending final mood taxonomy/content decisions.
- [ ] 1950sMusicAD decorative element was simplified from Figma's literal edge-bleed treatment to a smaller fully-on-page circular photo, due to a rendering limitation in this environment. Revisit only if the literal bleed effect matters enough to be worth another pass.
- [ ] Consider switching the background paper texture from a stretched single image to a small seamless tileable texture with `background-repeat`, would scale to any page length without needing a large export each time. Not urgent, current version works fine.

# TODO

## Contact Page Polish
- [ ] Stray star from the moon/stars graphic spills below the red-striped header into the cream section — needs a smaller downward nudge, or clip the star cluster to the header band
- [ ] "Find me around" pink paper label now overlaps "[Social introduction placeholder]" text below it (clips the closing bracket) — needs more vertical spacing or nudge the label up slightly

## About Page - Positioning (resolved)
- [x] Polaroid/logo position — rebuilt from the authoritative Figma frame (node 1:3) using literal px values and a top-left-pivot rotation conversion for the Decorative Ephemera Cluster
- [x] Green paper texture behind polaroid — present
- [x] Blue torn-corner paper near footer — present (nudged left from Figma's literal wrapper position to clear the "Let's Work Together" text column, which the local asset export was clipping — see comment in css/about.css above `.ab3-deco--blue-corner`)
- [x] Logo rendering as two disconnected pieces — fixed by matching Figma's own `object-fit: cover` export technique instead of a custom crop-percentage trick

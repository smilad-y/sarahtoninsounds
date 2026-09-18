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

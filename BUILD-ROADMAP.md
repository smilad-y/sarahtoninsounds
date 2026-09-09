# Sarahtonin Sounds — Build & Migration Roadmap
**Version:** v2

## Launch Scope
**Home · About · Listen · Journal · Contact**

Guestbook is Phase 2 and must not block launch.

## Phase 0 — Legacy Audit / Preservation
### Must have
Before rebuilding or deleting anything in the existing repo:
- inspect current GitHub structure;
- identify legacy HTML/CSS/JS;
- inspect Netlify CMS / Git Gateway setup;
- inventory all JSON/content files;
- preserve the ~10,047-song music library;
- preserve essay/content files;
- identify any reusable assets;
- make a safe backup/branch before destructive migration work.

### Output
A short migration inventory:
- keep
- migrate
- rewrite
- archive
- remove later

Do not begin by wiping the legacy repo.

## Phase 1 — Repository + Current Foundations
### Must have
- Decide whether to evolve the existing repo or create a clean new structure within it.
- Establish multi-page HTML/CSS/JS architecture.
- Global CSS variables/tokens for current colors, typography, spacing, borders, and reusable tactile treatments.
- Add licensed/approved font loading strategy.
- Global navigation.
- Responsive breakpoints based on content behavior.
- Accessibility baseline: semantic landmarks, keyboard focus, reduced motion, contrast.
- Media optimization conventions.
- Netlify deployment baseline.

### CMS decision
Evaluate whether the old Netlify CMS still serves a real need.

Do **not** retain it merely because it already exists.
Do **not** remove it before preserving content.

Possible outcomes:
- keep and update;
- simplify;
- replace;
- remove after migration.

## Phase 2 — Home
### Must have
- Single viewport/no scroll.
- Optimized looping "video option 1" background.
- Poster/fallback image.
- Exact gold wordmark asset centered.
- Top navigation.
- "discover music!" upper-left note.
- "made by: Sarah Milad" lower-right note.
- Mobile composition.
- Reduced-motion behavior.
- Contrast/readability testing over actual footage.

### Polish
- Minor video brightness/contrast adjustment only after browser review.
- Very restrained doodle/star accents if they genuinely improve composition.

## Phase 3 — About
### Must have
- Oversized primary halftone/cutout portrait.
- Approved About copy.
- "my taste is all over the place." emphasis section.
- Secondary candid treatment where composition supports it.
- Responsive editorial rhythm.

### Do not add
- Old full dark bio card.
- Professional credits list unless Sarah reactivates it.

## Phase 4 — Listen Playlist Data Setup
**Note:** This phase no longer involves the legacy song library. The legacy library (Section 4 of `ASSET-MANIFEST.md`) is archive/reference only — it is not migrated, remapped, or otherwise pulled into the live Listen experience. No mood-mapping work is needed or wanted.

### Must have
- Define the curated-playlist metadata schema: mood/category, display name, short descriptor, artwork/icon, Spotify playlist URL or ID, optional track/display metadata for the turntable/player.
- Decide where this data lives (a new location, separate from legacy `music-picks/`).
- Build the schema so mood/category is config-driven, not hardcoded — the taxonomy must be able to change without rewriting the page (see `PROJECT-SPEC.md` §7).
- Populate initial entries only from Sarah's actual curated Spotify playlists, as they exist.
- Migrate in the two existing genuinely-curated legacy picks (Turnstile; the orphaned Zappa "Watermelon in Easter Hay" entry) into this new structure, since they contain real written curation.
- Decide and document the Spotify integration method for playback/tracklist display (embed vs. Web API vs. Web Playback SDK) before building Phase 5 UI on top of it.

### Goal
Give the new Listen experience a small, hand-maintained, taxonomy-agnostic data layer sourced entirely from Sarah's manually curated Spotify playlists — independent of the legacy library.

## Phase 5 — Listen UI Foundation
### Must have
- "Pick Your Mood" selector.
- Colored circular record-label-style controls.
- Horizontal swipe treatment on mobile.
- Selection state.
- Turntable/player section.
- Tracklist.
- Persistent Now Playing mini player.
- Keyboard/touch interaction.
- Reduced-motion alternative.

### Dependency
Final labels/descriptors and some artwork depend on continued sorting/remapping of real songs. Build the system so the taxonomy can change without rewriting the page.

## Phase 6 — Listen Content + Crash Courses
### Must have
- Populate active mood playlists from Sarah's manually curated Spotify playlists (not legacy library data).
- Finalize descriptors only after taxonomy stabilizes.
- Add Crash Courses as a clearly separate section.
- Confirm playback/data integration approach.

### Nice to have
- Small tactile transitions/microinteractions that do not compromise performance or accessibility.

## Phase 7 — Journal
### Must have
- Inspect/migrate any useful legacy essay JSON.
- Journal landing page.
- Reverse chronological content.
- All / Essays / Monthly Favs filters.
- Reusable article card/content model.
- Individual article template with strong long-form readability.
- Populate real essay/Monthly Favs content as available.

### Nice to have
- Selective editorial collage treatments per piece.
- Architecture ready for later content types, without exposing empty filters.

## Phase 8 — Contact
### Must have
- Concise contact copy.
- Accessible contact form.
- Relevant social/music links.
- Working Netlify-compatible form handling or another deliberately chosen simple endpoint.
- Success/error states.

## Phase 9 — Launch QA
### Must have
- Cross-browser desktop/mobile checks.
- Keyboard-only pass.
- Screen-reader/semantic spot checks.
- Reduced-motion pass.
- Contrast pass.
- Image alt/decorative semantics review.
- Media-size/performance review.
- Broken-link/form testing.
- Metadata, title, description, favicon/share image.
- Netlify production deployment.
- Confirm no Guestbook links/routes accidentally appear in launch nav.
- Confirm legacy purple/petal/marquee UI did not leak into current design unintentionally.

## Phase 10 — Post-launch Polish
### Nice to have
- 404 personality/microcopy.
- Refined hover/motion details.
- Additional Journal treatments.
- Additional Crash Courses.
- Performance tuning based on real deployment.
- Small copy trims based on actual layouts.

## Phase 2 Product Feature — Guestbook
Only revisit after launch if visitor behavior supports it.

Preserve:
- communal scrapbook concept
- messages/song recommendations/current-listening prompt
- preset note styles
- tactile ephemera visual system

Before implementation, decide:
- storage/backend
- moderation workflow
- spam protection
- privacy expectations
- whether engagement justifies the feature

## Current Open Decisions
These are intentionally not finalized and should not be guessed:
- final mood count and final public-facing mood names
- remaining mood icons/descriptors
- Spotify integration method for playback/tracklist display (embed vs. Web API vs. Web Playback SDK)
- exact playlist playback/data integration
- curated-playlist metadata file location/structure
- whether legacy Netlify CMS is kept, changed, or retired
- final Crash Course topics
- final Journal production content
- final contact/social URLs
- final webfont licensing/hosting details
- Guestbook backend/moderation implementation, if Phase 2 is activated

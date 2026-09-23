# Sarahtonin Sounds — Build & Migration Roadmap
**Version:** v3 · September 23, 2026

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
- preserve the 8,653-song legacy music library (archive only, never a Listen data source);
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

### CMS decision (resolved)
**Decap CMS + Eleventy.**
- Keep the hand-built HTML/CSS/JS design; Eleventy templates wrap it.
- First collection: Journal.
- Add About in the same pass if it fits; otherwise fast-follow.
- Contact and Listen editability later.
- Preserve legacy CMS config/content before replacing anything.

## Phase 2 — Home (done)
Illustrated collage Home is approved and implemented: separate desktop (1440×900) and mobile (393×852) compositions, torn-paper tab nav, accessible mobile MENU button, "made by: Sarah Milad" credit.

### Still open
- "discover music!" note: undecided. Not a launch blocker.

## Phase 3 — About
### Must have
- Oversized primary halftone/cutout portrait.
- Approved About copy.
- “my taste is all over the place.” emphasis section.
- Secondary candid treatment where composition supports it.
- Responsive editorial rhythm.

### Do not add
- Old full dark bio card.
- Professional credits list unless Sarah reactivates it.

## Phase 4 — Listen Data / Config
The legacy song library is archive-only. There is no migration or remapping phase.

### Must have
- One config file (or CMS collection) for moods: name, color, icon, descriptor, Spotify URL, Apple Music URL, Sarah's Picks.
- Page renders entirely from config, so moods can be added, renamed, or removed without code changes.
- Placeholder entries allowed while real playlists are being built.

## Phase 5 — Listen UI Foundation
### Must have
- “Pick Your Mood” selector with the 18 moods (PROJECT-SPEC §7).
- Colored circular record-label-style controls.
- Live embed with Spotify / Apple Music toggle.
- Sarah's Picks list.
- Horizontal swipe treatment on mobile.
- Selection state.
- Turntable/player section.
- Tracklist.
- Persistent Now Playing mini player.
- Keyboard/touch interaction.
- Reduced-motion alternative.

### Decide before building
- **Now Playing approach.** Apple Music's embed exposes almost no playback control without MusicKit; Spotify's IFrame API exposes some. Options need Sarah's call.

### Dependency
Two mood names, several icons, four colors, and all descriptors are still undecided. Build so these drop in via config.

## Phase 6 — Listen Content + Crash Courses
### Must have
- Populate mood playlists with Sarah's real Spotify + Apple Music URLs.
- Sarah writes descriptors.
- Finish remaining mood icons.
- Add Crash Courses as a clearly separate section.

### Nice to have
- Small tactile transitions/microinteractions that do not compromise performance or accessibility.

## Phase 7 — Journal
### Must have
- Legacy essays are PRESERVE only; migrate a specific essay only with Sarah's explicit approval.
- Journal collection in Decap CMS + Eleventy (retires the manual `essays/index.json` step).
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
- Confirm Netlify's production branch; merge or repoint from `claude/add-claude-md-file-3fgnk0`.
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
- Hopeful vs. At Peace; Playful vs. Cheeky
- which of Energized / Hype gets the disco ball icon
- remaining mood icons and descriptors
- colors for Euphoric, Hopeful/At Peace, Unleashed, Hypnotic; hex values for all colors
- mood display order
- Now Playing approach given embed limitations
- whether all 18 moods (and Crash Courses) must be live at launch, or can roll out as playlists are ready
- "discover music!" note on Home
- final Crash Course topics
- final Journal production content
- final contact/social URLs
- final webfont licensing/hosting details
- Guestbook backend/moderation implementation, if Phase 2 is activated

# Sarahtonin Sounds — Build & Migration Roadmap
**Version:** v5 · September 24, 2026

## Launch Scope
**Home · About · Listen · Journal · Contact**

**Launched (September 2026).** `main` is live; see PROJECT-SPEC.md §1 for the post-launch workflow.

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
- Contact editability later.
- ~~Listen editability.~~ **Done (September 2026):** each mood's descriptor, blurb, description, and Sarah's Picks are edited in the CMS ("Listen Moods"), stored in `content/listen/mood-words.json`. Colors, art, live flags, playlist URLs, and order stay in `moods.json`, outside the CMS.
- Preserve legacy CMS config/content before replacing anything.

## Phase 2 — Home (done)
Illustrated collage Home is approved and implemented: separate desktop (1440×900) and mobile (393×852) compositions, torn-paper tab nav, accessible mobile MENU button, "made by: Sarah Milad" credit. Desktop fit-scales the 1440×900 composition so it is never cropped; wider windows fill the side space with Sarah's Extended Bleed strips (see PROJECT-SPEC.md §6).

### Still open
- "discover music!" note: undecided. Not a launch blocker.

## Phase 3 — About
### Must have
- Green polaroid as the main photo (PROJECT-SPEC.md §9).
- Approved About copy: one bio shared by desktop and mobile, no separate taste heading.
- Selected Credits & Resume, linking the resume PDF.
- Responsive editorial rhythm.

### Do not add
- Old full dark bio card.

## Phase 4 — Listen Data / Config
The legacy song library is archive-only. There is no migration or remapping phase.

### Must have
- One config file (or CMS collection) for moods: name, color, icon, descriptor, Spotify URL, Apple Music URL, Sarah's Picks.
- Page renders entirely from config, so moods can be added, renamed, or removed without code changes.
- Placeholder entries allowed while real playlists are being built.

## Phase 5 — Listen UI Foundation
### Must have
- “Pick Your Mood” selector with the 19 moods (PROJECT-SPEC §7).
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
- ~~**Now Playing approach.**~~ Decided: "now spinning" bar (PROJECT-SPEC §7 Now Playing).

### Dependency
Two mood names, the icons (deferred past launch), six colors, and the non-launch moods' descriptors are still undecided. Build so these drop in via config.

## Phase 6 — Listen Content
### Must have
- Populate mood playlists with Sarah's real Spotify + Apple Music URLs.
- Sarah writes descriptors.
- ~~Finish remaining mood icons.~~ **Deferred past launch (Sarah, September 2026):** launch labels are color circles with number, name, and descriptor only. Icons are added later, all at once (Phase 10).
- ~~Add Crash Courses as a clearly separate section.~~ **Moved to post-launch (Sarah, September 2026).** See Phase 10.
- Launch with 6-8 live moods Sarah is confident in. Moods not yet live are hidden from the selector (not shown as locked), with a short handwritten note near the selector saying more are coming. Adding a mood later = flip its live flag in moods.json.
  - **Decided (Sarah, September 2026): 8 launch moods, in display order:** Chill, Hazy, Tender, Sensual, Euphoric, Electric, Unleashed, Defiant. Set live in `content/listen/moods.json`, with each one's Spotify link checked against the playlist it opens, and final descriptor, blurb, description, and Sarah's Picks in place. Apple Music links (Sarah, September 2026) are now in place for every live mood, Vibes included. Hype has one too but isn't live.
  - **Added after launch (Sarah, September 2026): Vibes**, a 19th mood, live in second place. Live order: Chill, Vibes, Hazy, Tender, Sensual, Euphoric, Electric, Unleashed, Defiant.
  - **Decided (Sarah, September 2026): launch is Spotify-only.** Apple Music is added later, mood by mood (now done for every live mood, September 2026). The Spotify / Apple Music toggle in the now spinning bar is hidden for any mood without an Apple Music URL in `moods.json` and appears on its own once one is added; no code change needed.

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
- Monthly Favs posts follow spec §8 "Monthly Favs post content" (built, September 2026, Spotify only; the Spotify / Apple Music toggle is not built yet).

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
**Done (September 2026).**

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
- Merge `claude/add-claude-md-file-3fgnk0` into `main` (Netlify's production branch, confirmed).
- Netlify production deployment.
- CMS login at launch: set `backend.branch` in `admin/config.yml` to `main`; optionally set `site_domain` to `sarahtoninsounds.com` once the domain is attached. The GitHub OAuth App callback (`https://api.netlify.com/auth/done`) does not change.
- Confirm no Guestbook links/routes accidentally appear in launch nav.
- Confirm legacy purple/petal/marquee UI did not leak into current design unintentionally. (The Home ticker is a deliberate revision, not a leak: PROJECT-SPEC.md §6.)

## Phase 10 — Post-launch Polish
### Nice to have
- 404 personality/microcopy.
- Refined hover/motion details.
- Additional Journal treatments.
- ~~Crash Courses section, as a clearly separate section of Listen.~~ **Built (September 2026):** CMS collection, course pages, index, and Listen shelf. Switched off until Sarah adds a live course; the courses themselves are Sarah's.
- Once the first Crash Course is live, check on the live site: the course page's Spotify (and Apple Music, if set) embed plays and switching between them stops the other, and the card art loads through Netlify's image resizing (`/.netlify/images`).
- Once the first Crash Course is live, Sarah decides whether Listen's page description should mention Crash Courses, and whether the Crash Courses index gets its own description (neither exists now; no copy was invented).
- Real-embed check for the now spinning bar on the live site (see the now spinning bar section of TODO.md).
- ~~Apple Music links per mood.~~ **Done (Sarah, September 2026):** in place for every live mood; Hype has one too but isn't live. The other non-live moods get theirs when they go live.
- Performance tuning based on real deployment.
- Small copy trims based on actual layouts.
- Mood icons on the selector labels, added all at once for every live mood (deferred from launch; PROJECT-SPEC §7 Mood selector).

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
- which of Electric (formerly Energized) / Hype gets the disco ball icon
- remaining mood icons (not needed for launch; added all at once after launch), and descriptors for non-launch moods
- colors for Hopeful/At Peace, Hypnotic, Cute, Audacious, Lost, Playful / Cheeky (gave berry to Vibes), and Hype; final hex values for all colors (current ones are provisional, sampled from the circle art)
- "discover music!" note on Home
- final Crash Course topics
- final Journal production content
- placement of the optional Monthly Favs reflection blurb (tentatively at the top)
- Monthly Favs parked blocks: watched / read / learned; TV / Ad / Film tag on the needle drop
- final contact/social URLs
- font licensing: confirm the Perandory Semi-Condensed license covers commercial web use, and whether Amoresa needs any license at all given the logo only ships as an image. (IM Fell English is SIL Open Font License, so self-hosting it is settled.)
- Guestbook backend/moderation implementation, if Phase 2 is activated

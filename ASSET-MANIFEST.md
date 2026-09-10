# Sarahtonin Sounds — Asset & Data Manifest
**Version:** v2

## 0. Content Philosophy — Fresh Start by Default
The new site starts fresh on content (see `PROJECT-SPEC.md` §2 for the full statement). Two statuses apply throughout this manifest:
- **PRESERVE** — default for all legacy content/data. Kept safely in the legacy/archive location; not used on the current site.
- **MIGRATE** — only for a specific item Sarah has explicitly approved. Quality or reusability alone never qualifies something for migration.

Unless a manifest entry below is explicitly marked as approved/current, treat it as PRESERVE only.

## 1. Signature / Must Preserve
### Sarahtonin Sounds gold wordmark
**Status:** Existing asset; use exact supplied version.  
**Use:** Home hero and other approved brand placements.  
**Rule:** Never redraw/retype/reconstruct it. Calligraphic S = Amoresa; remainder = Perandory Semicondensed.

### Home background video
**Status:** Direction approved.  
**Asset:** Sarah's edited **"video option 1" vinyl/turntable footage**.  
**Use:** Full-screen looping Home background.  
**Build note:** Evaluate brightness/contrast in-browser before making further grading changes. Prepare web-optimized formats/poster image as needed.

## 2. Photography
### Primary About portrait
**Status:** Direction approved; candidate files now supplied, exact pick not yet decided.
**Description:** Black-and-white cutout/halftone portrait; arms up / hand near face.  
**Use:** Oversized About editorial hero.
**Available candidates:** `assets/images/about/selfie-bw.png` and 8 more portrait/selfie photos in `assets/images/shared/portraits/` (see that folder's inventory in the asset-integration chat report). Which specific photo fulfills this role is not decided — do not assume a mapping.

### Secondary About candid
**Status:** Direction approved; candidate files now supplied, exact pick not yet decided.
**Description:** Restaurant-table photo of Sarah.  
**Treatment:** Orange/gold halftone version is appropriate.  
**Use:** Smaller snapshot/collage moment, not primary portrait.
**Available candidates:** `assets/images/shared/portraits/me-at-dinner.png` looks like a plausible match by filename, but this is not a confirmed assignment — decide explicitly rather than assuming.

## 3. Listen Assets
### Turntable / record-player graphic
**Status:** Signature component; asset now supplied at `assets/images/listen/record-player.png`.
**Use:** Selected mood/player interaction.  
**Rule:** Full vinyl appears after selection; mood selector itself remains colored record-label-style buttons.

### Mood label artwork
Need/maintain one illustrated circular label per active mood. Preserve original collage colors/textures.

**Status:** 13 colored circle images now supplied in `assets/images/listen/` (berry, black, dark-blue, dark-green, lavendar, light-blue, light-green, orange, peach, pink, purple, red, yellow). Which color maps to which of the 12 working moods is **not decided** — do not assume a mapping; that's a future visual-pass decision. `assets/images/listen/paper.png` (a paper texture) was also supplied, use not yet assigned.

Confirmed icon directions:
- Dreamy / Daydream — cloud
- Chill — sun
- Audacious — sunglasses
- Tender / Romantic — heart
- Energized / Hype — disco ball
- Melancholy — broken heart
- Burdened — scribble
- Defiant — fist
- Nostalgic — camera
- Sultry / Sensual — lips

Other working moods still require finalized icon/label treatment as taxonomy stabilizes.

## 4. Legacy Music Library — Archive / Reference Only (Not Production Source)
**Update (decision):** A verified repository count of **8,653 songs** exists across the legacy `music-picks/<mood>.json` files (not the earlier ~10,047 estimate — that figure is unconfirmed and the gap should not be invented or reconstructed).

This library is **archive/source data only**. It is explicitly **not** the data source for the live Listen experience.

### Known legacy organization
Songs were tagged/split across an older eight-mood system (only 7 of the 8 have files; `defiant.json` does not exist):
- chill
- moody
- nostalgic
- euphoric
- tender
- defiant *(referenced by legacy UI, no corresponding data file)*
- cinematic
- electric

Files:
- `music-picks/chill.json`, `cinematic.json`, `electric.json`, `euphoric.json`, `moody.json`, `nostalgic.json`, `tender.json`
- `music-picks/index.json` (single curated entry) and `music-picks/watermelon-in-easter-hay.md` (orphaned curated entry) — see Section 6.

### Preservation rules
- Preserve the raw source data and its original legacy mood tags exactly as-is; do not overwrite, retag, or remap them.
- Do not migrate, remap, or import this library into the new Listen taxonomy or playlists.
- Do not use it to generate, seed, or backfill any live playlist.
- No mood-mapping/remapping tooling is needed for this library — that work is explicitly out of scope.
- Keep it available for future reference only, in case Sarah wants to draw on it later. Until then it has no production role.

## 5. Legacy CMS / Content Assets
The old repo may include:
- `admin/config.yml`
- `settings/general.json`
- `settings/banner.json`
- `settings/sidebar.json`
- `settings/about.json`
- `settings/supervision.json`
- `settings/links.json`
- `settings/wheel.json`
- `essays/` JSON files

**PRESERVE only by default.** These stay safely in the legacy/archive location. None of this content moves onto the current site automatically, however usable or well-written it is — it migrates only if Sarah explicitly approves a specific item.

**Important:** The old Netlify CMS setup is not automatically approved for the rebuilt site. Preserve its content by default; retain, replace, or simplify the CMS itself only after evaluating the current editing needs — independent of whether any of its content is ever migrated.

## 6. Playlist / Track Data
**Source of truth: Sarah's manually curated Spotify playlists.** The legacy library (Section 4) is not a data source for this — do not pull from it, migrate it, or use it to seed or fill in playlists.

Expect a relatively small, hand-maintained set of curated playlists. Each entry needs metadata such as:
- mood/category (key into the current working taxonomy — see `PROJECT-SPEC.md` §7; not fixed/hardcoded)
- display name
- short descriptor
- artwork/icon
- Spotify playlist URL or ID
- optional track/display metadata as needed for the turntable/player experience

The two legacy curated single-song picks — the Turnstile entry in `music-picks/index.json` and the orphaned Zappa "Watermelon in Easter Hay" entry in `music-picks/watermelon-in-easter-hay.md` — are **PRESERVE only**. Sarah does not recognize them as current content; they stay archived and do not migrate into this structure unless she explicitly approves them.

Do not invent final playlist descriptions before mood taxonomy is stable.

## 7. Crash Courses
**Status:** Requires real curated course topics and supporting artwork.  
Keep separate from mood playlists.

## 8. Journal Assets
- Real essay titles, dates, excerpts, and article copy — from content Sarah explicitly finalizes for the current site.
- Monthly Favorites content and associated artwork/images.
- Legacy `essays/` JSON files (including the existing "My 12 Song Submission" essay) are **PRESERVE only** by default; none of it migrates into the current Journal unless Sarah explicitly approves a specific piece.
- Optional halftone/editorial imagery per article where meaningful.
- Mockup placeholder titles/images are not final unless Sarah explicitly adopts them.

## 9. Contact Assets
- Final social/music profile links.
- Contact form endpoint/configuration for deployment.
- Any small decorative elements should come from the established visual library.

## 10. Visual Texture Library
Useful reusable assets (vocabulary, not a checklist — every page does not need every treatment):
- warm paper / cream texture
- kraft paper texture
- torn-paper edges
- photocopy/riso textures
- tape strips
- restrained star doodles
- wobbly hand-drawn frames
- Polaroid/photo scraps
- halftone treatments

**Now supplied**, none yet assigned to specific layouts:
- `assets/images/shared/doodles/` — 15 general doodles (records, stars, sun/moon, cassette).
- `assets/images/shared/scrapbook-images/` — 15 decorative elements (flowers, sparkles, hearts, constellations).
- `assets/images/shared/tape/` — 3 tape-strip textures (beige, green, pink).
- `assets/images/home/`, `assets/images/journal/` — page-specific picks (paper/tape/star textures) already pulled from the shared pools above; see the asset-integration chat report for the full inventory.

Treat these as raw material for the next visual pass — nothing here has been placed on any page yet.

## 11. Fonts / Licensing
- **Perandory Semi-Condensed** — licensed webfont, now locally hosted at `assets/fonts/Perandory-SemiCondensed.woff2` and wired to `--font-display` via `@font-face` in `css/tokens.css`. A second file, `Perandory-Condensed.woff2`, was also supplied but is unused/unassigned (Semi-Condensed is the approved style per §5).
- IM Fell English Regular + Italic — loaded via Google Fonts.
- Sue Ellen Francisco — loaded via Google Fonts (Home annotations only).
- Amoresa for logo S — not yet supplied/licensed; never used to reconstruct the wordmark itself.
- Luxurious Script only as fallback for logo S if needed — not yet supplied.

Before production deployment, verify webfont licensing/hosting rights for any non-open font. Never redistribute font files in handoff documents.

## 12. Legacy Visual Assets
Old purple-gradient, petal, cursor, marquee, and related visuals may exist. Preserve them if they have archival value, but **do not treat them as part of the current visual system** unless Sarah explicitly brings one back.

## 13. Still To Resolve
- Home poster/fallback image (video itself is resolved — see §1).
- Final active mood count/names/descriptors.
- Which of the 13 supplied Listen circle-label images (§3) maps to which working mood.
- Which supplied About portrait photo (§2) fulfills the primary/secondary roles.
- How the newly supplied home/journal/shared image pools (§10) get placed into actual page layouts — nothing is assigned yet.
- Curated-playlist metadata file structure/location (proposed as a new location separate from legacy `music-picks/`).
- Spotify integration method for playback/tracklist display (embed player vs. Web API vs. Web Playback SDK) — has real tradeoffs (auth, backend needs, Premium requirements) and needs a decision, not a default.
- Exact playlist playback/data integration.
- Whether any part of legacy Netlify CMS remains useful.
- Crash Course topics/art.
- Journal production content/art.
- Final contact/social URLs and form handling.
- Favicon/social-share image set.
- Whether `assets/fonts/Perandory-Condensed.woff2` (the non-Semi-Condensed style) ever gets a use.

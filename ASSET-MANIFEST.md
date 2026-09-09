# Sarahtonin Sounds — Asset & Data Manifest
**Version:** v2

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
**Status:** Approved.  
**Description:** Black-and-white cutout/halftone portrait; arms up / hand near face.  
**Use:** Oversized About editorial hero.

### Secondary About candid
**Status:** Approved as secondary.  
**Description:** Restaurant-table photo of Sarah.  
**Treatment:** Orange/gold halftone version is appropriate.  
**Use:** Smaller snapshot/collage moment, not primary portrait.

## 3. Listen Assets
### Turntable / record-player graphic
**Status:** Signature component; approved source asset exists in project history.  
**Use:** Selected mood/player interaction.  
**Rule:** Full vinyl appears after selection; mood selector itself remains colored record-label-style buttons.

### Mood label artwork
Need/maintain one illustrated circular label per active mood. Preserve original collage colors/textures.

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

These may contain valuable real copy/content. Inspect them before replacing old architecture.

**Important:** The old Netlify CMS setup is not automatically approved for the rebuilt site. Reuse content first; retain or replace the CMS only after evaluating the current editing needs.

## 6. Playlist / Track Data
**Source of truth: Sarah's manually curated Spotify playlists.** The legacy library (Section 4) is not a data source for this — do not pull from it, migrate it, or use it to seed or fill in playlists.

Expect a relatively small, hand-maintained set of curated playlists. Each entry needs metadata such as:
- mood/category (key into the current working taxonomy — see `PROJECT-SPEC.md` §7; not fixed/hardcoded)
- display name
- short descriptor
- artwork/icon
- Spotify playlist URL or ID
- optional track/display metadata as needed for the turntable/player experience

The two curated single-song picks worth preserving into whatever this structure becomes:
- The Turnstile entry in `music-picks/index.json`
- The orphaned Zappa "Watermelon in Easter Hay" entry in `music-picks/watermelon-in-easter-hay.md`

Do not invent final playlist descriptions before mood taxonomy is stable.

## 7. Crash Courses
**Status:** Requires real curated course topics and supporting artwork.  
Keep separate from mood playlists.

## 8. Journal Assets
- Real essay titles, dates, excerpts, and article copy.
- Monthly Favorites content and associated artwork/images.
- Legacy `essays/` JSON files may contain reusable editorial content.
- Optional halftone/editorial imagery per article where meaningful.
- Mockup placeholder titles/images are not final unless Sarah explicitly adopts them.

## 9. Contact Assets
- Final social/music profile links.
- Contact form endpoint/configuration for deployment.
- Any small decorative elements should come from the established visual library.

## 10. Visual Texture Library
Useful reusable assets:
- warm paper / cream texture
- kraft paper texture
- torn-paper edges
- photocopy/riso textures
- tape strips
- restrained star doodles
- wobbly hand-drawn frames
- Polaroid/photo scraps
- halftone treatments

**Rule:** These are a vocabulary, not a checklist. Every page does not need every treatment.

## 11. Fonts / Licensing
- Perandory Semi-Condensed
- IM Fell English Regular + Italic
- Sue Ellen Francisco
- Amoresa for logo S, subject to suitable license
- Luxurious Script only as fallback for logo S if needed

Before production deployment, verify webfont licensing/hosting rights for any non-open font. Never redistribute font files in handoff documents.

## 12. Legacy Visual Assets
Old purple-gradient, petal, cursor, marquee, and related visuals may exist. Preserve them if they have archival value, but **do not treat them as part of the current visual system** unless Sarah explicitly brings one back.

## 13. Still To Resolve
- Exact production filenames and `/assets/` directory organization.
- Optimized Home video exports/poster.
- Final active mood count/names/descriptors.
- Icons for active moods not covered above.
- Curated-playlist metadata file structure/location (proposed as a new location separate from legacy `music-picks/`).
- Spotify integration method for playback/tracklist display (embed player vs. Web API vs. Web Playback SDK) — has real tradeoffs (auth, backend needs, Premium requirements) and needs a decision, not a default.
- Exact playlist playback/data integration.
- Whether any part of legacy Netlify CMS remains useful.
- Crash Course topics/art.
- Journal production content/art.
- Final contact/social URLs and form handling.
- Favicon/social-share image set.

# Sarahtonin Sounds — Asset & Data Manifest
**Version:** v4 · September 24, 2026

## 1. Signature / Must Preserve
### Sarahtonin Sounds gold wordmark
**Status:** Existing asset; use exact supplied version.  
**Use:** Home hero and other approved brand placements.  
**Rule:** Never redraw/retype/reconstruct it. Calligraphic S = Amoresa; remainder = Perandory Semicondensed.

### Home collage artwork
**Status:** Approved and implemented.  
**Asset:** Sarah's individually exported artwork layers for the illustrated Home collage (reclining Sarah on striped carpet, leopard, record crate, moon/stars, tan cloud, pink-paper accent, torn-paper "SARAHTONIN SOUNDS" title card, scalloped pink nav cloud, yellow sunburst spiral, navy scalloped band).  
**Shared torn-paper tab asset:** used as the background for each desktop nav link, with the label layered on top in Perandory Semi-Condensed.  
**Rule:** The torn-paper title card is separate Sarah-supplied artwork, not the gold wordmark.  
**Note:** Desktop (1440×900) and mobile (393×852) are separately art-directed from Figma. Moon/stars, tan cloud, and pink-paper accent are desktop-only.

### Home collage — desktop bleed strips
**Status:** Approved and in production use (desktop only).
**Source:** Sarah's Figma "Desktop Home — Extended Bleed" frame (1840×900, node 69-2, file `Home-final`) — the left (x 0–200) and right (x 1640–1840) strips around the centered 1440×900 composition. Background artwork only: no leopard, squiggle, or carpet fragments (those are the collage layers' own overflow).
**In use:** `assets/images/home-v2/home-bleed-left.webp`, `home-bleed-right.webp` — WebP (quality 82), 400×1800 (2× export). Loaded as CSS backgrounds inside the desktop media query only, so mobile never downloads them.
**Masters:** `assets/images/home-v2/home-bleed-left.png`, `home-bleed-right.png` — Sarah's 2× PNG exports, PRESERVE; not referenced by the page. Re-export from Figma and re-convert to WebP if the strips change.

### Legacy Home background video (retired)
**Status:** PRESERVE only. The full-screen video Home direction is retired.  
**Location:** `assets/video/home-loop.mp4` and `assets/images/home/`, untouched and unused by the live site.

## 2. Photography
### About photo
**Status:** In use.  
**Description:** Green-background polaroid of Sarah ("Me! Sarah Milad!").  
**Location:** `assets/images/about/`. Both desktop and mobile use the desktop export (`About Me-Desktop-Final Assets/sarah green background polaroid  1.png`); the mobile export crops the tape and flower flat along its top edge and is no longer referenced (kept, not deleted).

### Black-and-white cutout/halftone portrait; restaurant-table candid
**Status:** No longer used on About (PROJECT-SPEC.md §9). Files kept, not deleted.

### Resume
**Status:** In use.  
**Location:** `assets/docs/sarah-milad-resume.pdf`, linked from both About Resume links (opens in a new tab).

## 3. Listen Assets
### Turntable / record-player graphic
**Status:** Signature component; approved source asset exists in project history.  
**Use:** Selected mood/player interaction.  
**Rule:** Full vinyl appears after selection; mood selector itself remains colored record-label-style buttons.

### Mood label artwork
**In use:** each color has a full art set in `assets/images/listen/`: circle (320px WebP; full-size originals in `archive/listen-circle-originals/`), colored vinyl, pre-composited record, and tape. Each mood's set is listed in `content/listen/moods.json`; a live mood always uses one color's complete set, never mixed.

**Icons: deferred past launch (Sarah, September 2026).** Launch labels are the color circles with number, mood name, and descriptor only. Icons are added later, all at once for every live mood (BUILD-ROADMAP Phase 10). When they are made, preserve the original collage colors/textures.

Confirmed icon directions (for that later pass):
- Hazy: cloud
- Chill: sun
- Audacious: sunglasses
- Tender: heart
- Melancholy: broken heart
- Burdened: scribble
- Defiant: fist
- Nostalgic: camera
- Sensual: lips
- Disco ball: confirmed for the old combined "Energized / Hype" mood; now that Electric (formerly Energized) and Hype are separate moods, which one gets it is undecided

Still need icon directions:
- Euphoric
- Hopeful / At Peace
- Lost
- Playful / Cheeky
- Unleashed
- Cute
- Hypnotic
- whichever of Electric / Hype does not get the disco ball

## 4. Legacy Music Library (archive only)
A Spotify-derived music library of **8,653 verified songs** (not the earlier ~10,047 estimate) exists in the previous implementation, tagged by the older eight-mood system:
chill · moody · nostalgic · euphoric · tender · defiant · cinematic · electric

Files may include `music-picks/<mood>.json` and related legacy JSON/config.

**Decision:** PRESERVE only.
- Keep the library and its original mood tags exactly as-is.
- Do not migrate, remap, or retag it into the current taxonomy.
- Do not use it to generate or fill playlists.
- It is not a data source for the Listen page. Keep it purely for future reference.

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

All legacy content is PRESERVE by default. Nothing migrates to the current site without Sarah's explicit, item-specific approval (see PROJECT-SPEC §2).

**CMS decision:** the rebuilt site uses **Decap CMS + Eleventy** (see PROJECT-SPEC §1). The old Netlify CMS config is reference only.

## 6. Playlist / Track Data
Populate only from Sarah's manually curated playlists, embedded live. Not from legacy song data. **Launch is Spotify-only;** the Spotify / Apple Music toggle appears for a mood once it has an Apple Music URL.

Per mood, collect (stored in `content/listen/moods.json`):
- Spotify playlist URL (in place for all 18 moods, each checked against the playlist it opens)
- Apple Music playlist URL (added after launch)
- Sarah's Picks (small manual highlights list)
- descriptor, blurb, and description (final for the 8 launch moods)

Do not invent playlist descriptions. Sarah writes them.

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

**Shared mobile chrome (in use):** `assets/images/shared/mobile/paper.webp` (warm paper, 9 KB, flattened from About's mobile paper texture onto `--color-paper` #f1e0c6) and `stripe-band.webp` (red stripe, 1200px wide, ~160 KB, from About's desktop stripe texture). Every page's mobile layout uses them via `--m-paper` / `--m-band` in `css/layout.css`. The multi-MB source PNGs are unchanged.

## 11. Fonts / Licensing
- Perandory Semi-Condensed (self-hosted, `assets/fonts/Perandory-SemiCondensed.woff2`). **Open:** confirm its license covers commercial web use.
- IM Fell English Regular + Italic (self-hosted, `assets/fonts/IMFellEnglish-*.woff2`). SIL Open Font License, so self-hosting is settled.
- Sue Ellen Francisco (self-hosted, `assets/fonts/SueEllenFrancisco.woff2`). SIL Open Font License.
- Amoresa for the logo S. **Open:** whether it needs any license at all, given the wordmark only ships as an image (`assets/images/wordmark-gold.svg`) and the font is never loaded on the site.
- Luxurious Script only as fallback for the logo S if needed.

Never redistribute font files in handoff documents.

## 12. Legacy Visual Assets
Old purple-gradient, petal, cursor, marquee, and related visuals may exist. Preserve them if they have archival value, but **do not treat them as part of the current visual system** unless Sarah explicitly brings one back.

## 13. Still To Resolve
- Exact production filenames and `/assets/` directory organization.
- Hopeful vs. At Peace; Playful vs. Cheeky.
- Descriptors, blurbs, descriptions, and Sarah's Picks for the 10 non-launch moods.
- Mood icons (deferred past launch; see §3).
- Colors for Hopeful/At Peace, Hypnotic, Cute, Audacious, Lost, and Hype; final hex values for all 18 colors (current ones are provisional).
- Apple Music URLs per mood (after launch).
- Perandory Semi-Condensed commercial web license; whether Amoresa needs a license (§11).
- Crash Course topics/art.
- Journal production content/art.
- Final contact/social URLs and form handling.
- Favicon/social-share image set.

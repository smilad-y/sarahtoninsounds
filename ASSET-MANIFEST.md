# Sarahtonin Sounds — Asset & Data Manifest
**Version:** v3 · September 23, 2026

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

### Legacy Home background video (retired)
**Status:** PRESERVE only. The full-screen video Home direction is retired.  
**Location:** `assets/video/home-loop.mp4` and `assets/images/home/`, untouched and unused by the live site.

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
Need/maintain one illustrated circular label per mood (18 total, see PROJECT-SPEC §7). Preserve original collage colors/textures.

Confirmed icon directions:
- Dreamy: cloud
- Chill: sun
- Audacious: sunglasses
- Tender: heart
- Melancholy: broken heart
- Burdened: scribble
- Defiant: fist
- Nostalgic: camera
- Sultry: lips
- Disco ball: confirmed for the old combined "Energized / Hype" mood; now that they are separate moods, which one gets it is undecided

Still need icons:
- Euphoric
- Hopeful / At Peace
- Lost
- Playful / Cheeky
- Unleashed
- Cute
- Hypnotic
- whichever of Energized / Hype does not get the disco ball

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
Populate only from Sarah's manually curated playlists, embedded live with a Spotify / Apple Music toggle. Not from legacy song data.

Per mood, collect:
- Spotify playlist URL
- Apple Music playlist URL
- Sarah's Picks (small manual highlights list)
- short descriptor

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

## 11. Fonts / Licensing
- Perandory Semi-Condensed
- IM Fell English Regular + Italic
- Sue Ellen Francisco
- Amoresa for logo S, subject to suitable license (if the wordmark only ships as an image, a webfont license may not be needed; confirm)
- Luxurious Script only as fallback for logo S if needed

Before production deployment, verify webfont licensing/hosting rights for any non-open font. Never redistribute font files in handoff documents.

## 12. Legacy Visual Assets
Old purple-gradient, petal, cursor, marquee, and related visuals may exist. Preserve them if they have archival value, but **do not treat them as part of the current visual system** unless Sarah explicitly brings one back.

## 13. Still To Resolve
- Exact production filenames and `/assets/` directory organization.
- Hopeful vs. At Peace; Playful vs. Cheeky.
- Mood descriptors.
- Icons for the moods listed in §3.
- Colors for Euphoric, Hopeful/At Peace, Unleashed, Hypnotic; hex values for all 17 colors.
- Spotify + Apple Music URLs per mood.
- Now Playing approach given embed limitations.
- Crash Course topics/art.
- Journal production content/art.
- Final contact/social URLs and form handling.
- Favicon/social-share image set.

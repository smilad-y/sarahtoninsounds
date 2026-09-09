# Sarahtonin Sounds — Master Project Spec
**Handoff version:** September 9, 2026 — v2  
**Purpose:** Current source of truth for continuing the Sarahtonin Sounds website in Claude / Claude Code.

## 1. Project
Sarahtonin Sounds is Sarah Milad's personal + professional music-curation website. It showcases Sarah's taste and work through curated playlists, music discovery, essays, Monthly Favorites, and eventually community interaction.

The current site should feel personal, editorial, tactile, music-obsessed, and specific to Sarah — not like a generic portfolio, streaming app, or template-driven brand site.

### Launch navigation
**Home · About · Listen · Journal · Contact**

**Guestbook is Phase 2 / on hold.** Preserve the concept, but do not include it in launch navigation or MVP implementation.

### Technical direction
- Plain HTML, CSS, and JavaScript.
- GitHub is the source of truth for code.
- Deploy through Netlify.
- Keep the code understandable, maintainable, responsive, accessible, and performant.
- Do not introduce a framework unless there is a concrete requirement that plain HTML/CSS/JS cannot reasonably meet.

## 2. Legacy Site / Existing Implementation
There is an older Sarahtonin Sounds implementation that predates the current design direction.

### Known legacy architecture
- Static HTML hosted on Netlify.
- Netlify CMS / Git Gateway.
- GitHub as source of truth.
- `index.html` contained the entire older site.
- Legacy CMS/config/content files included:
  - `admin/config.yml`
  - `settings/general.json`
  - `settings/banner.json`
  - `settings/sidebar.json`
  - `settings/about.json`
  - `settings/supervision.json`
  - `settings/links.json`
  - `settings/wheel.json`
  - `music-picks/<mood>.json`
  - `essays/` JSON files

### Known legacy mood system
The older implementation used eight fixed moods:
**chill · moody · nostalgic · euphoric · tender · defiant · cinematic · electric**

This taxonomy is **superseded**. Do not use it as the current mood system without deliberately remapping real song data.

### Known legacy visual system
The older site used:
- dark purple gradient background (`#1a0a2e`)
- Playfair Display
- Caveat
- IM Fell English
- gold/pink accents
- animated cursor
- falling petals
- marquee ticker

These are **legacy design decisions, not current requirements**. Do not reintroduce them automatically.

### Legacy data — archive/reference only, not a Listen data source
A Spotify-derived music library of **8,653 verified songs** (not the earlier ~10,047 estimate) exists in the prior implementation, tagged/split by the older mood system.

**Decision:** This library is preserved as archive/source data only. It is **not** used to populate, seed, or remap the live Listen experience:
- preserve the library and its original legacy mood tags exactly as-is, untouched;
- do not migrate, remap, or retag it into the current taxonomy;
- do not use it to generate or fill in playlists;
- keep it available purely for future reference if Sarah wants to draw on it later.

The live Listen experience is instead sourced from Sarah's manually curated Spotify playlists — see §7.

### Migration rule
Treat the legacy site as a **source of reusable content, data, implementation ideas, and assets — not as the current product specification**.

Before deleting or replacing legacy code/data:
1. inspect it;
2. identify reusable content/data;
3. preserve anything valuable;
4. migrate intentionally into the current structure.

## 3. Core Design Principle
**Clean structure + weird/tactile decoration.**

Layouts must remain understandable and usable. Personality comes from imagery, color, collage, texture, handwritten notes, ephemera, and small interactions.

A useful conceptual balance is roughly **70% clean structure / 30% visual weirdness**, adjusted by page. Empty warm-paper space is intentional. Never add decoration merely because an area feels empty.

Not every page should be equally busy:
- Home: cinematic and minimal.
- Listen: most interactive/playful.
- Journal: calmer and editorial.
- About: editorial profile + scrapbook.
- Contact: concise and restrained.
- Guestbook, if revived: communal scrapbook.

## 4. Visual World
Vintage music culture + indie print design + personal scrapbook + riso/photocopied ephemera.

Visual vocabulary may include:
- warm cream / paper / kraft surfaces
- near-black poster elements
- gold/yellow and crimson accents
- torn paper
- halftone photography
- imperfect/wobbly frames
- scattered stars
- tape
- Polaroid/photo scraps
- photocopied/riso texture
- handwritten marginalia
- selective collage

The result should feel tactile, personal, whimsical, and music-obsessed — not cluttered.

### Palette
Core:
- warm cream/paper (established Journal background direction: `#ded7c1`)
- near-black
- Sarahtonin gold/yellow
- crimson

Selective secondary accents:
- dusty pink
- powder blue
- olive
- lavender

Do not use all secondary colors simultaneously just because they exist in the palette.

## 5. Typography
- **Perandory Semi-Condensed** — primary display/editorial heading direction.
- **IM Fell English Regular** — primary body/long-form editorial direction.
- **IM Fell English Italic** — editorial italics, pull quotes, and appropriate asides.
- **Sue Ellen Francisco** — casual handwritten annotation font. Only for short marginalia/notes; never for body copy, essential instructions, major UI, or the logo.
- **Sarahtonin Sounds logo S:** Amoresa is preferred, subject to appropriate licensing.
- **Logo remainder:** Perandory Semicondensed.
- **Luxurious Script:** fallback only for the logo S if Amoresa licensing does not permit intended use.

Do not redesign or reconstruct the Sarahtonin Sounds wordmark. Use Sarah's established gold logo asset.

## 6. Home
### Status
Concept, composition, and behavior are finalized.

### Purpose
A single-viewport, no-scroll cinematic cover for the site.

### Approved direction
- Full-screen looping background video.
- Current video direction: Sarah's edited **"video option 1" vinyl/turntable footage**.
- Its warm amber/gold highlights, deep shadows, and vintage mood fit the site.
- Do not keep color-grading the video in isolation. Judge it in the actual browser composition first; minor brightness/contrast changes can happen during polish.
- Center Sarah's exact established gold Sarahtonin Sounds wordmark.
- Navigation across the top.
- Small handwritten **"discover music!"** note toward the upper-left.
- Small handwritten **"made by: Sarah Milad"** credit toward the lower-right.
- Doodle/star accents should be extremely restrained.

### Explicit removals
- No descriptive tagline.
- Remove **"Music, Prescribed With Taste."**
- Do not use a torn-paper/tape treatment behind the "made by: Sarah Milad" credit.
- Do not turn Home into a scrolling content page with teasers.

## 7. Listen
### Role
The main interactive music-curation experience and signature functional page.

### Data source
**Sarah's manually curated Spotify playlists are the sole source of truth for the live Listen experience.** The legacy 8,653-track library is archive-only (see §2) and does not feed this page — no migration, remapping, or auto-population from it.

Expect a relatively small, hand-maintained set of curated playlists. Each needs metadata such as:
- mood/category
- display name
- short descriptor
- artwork/icon
- Spotify playlist URL or ID
- optional track/display metadata as needed for the turntable/player experience

This metadata layer must be config-driven, not hardcoded, so the mood taxonomy (§ below) can keep evolving without rewriting the page. Crash Courses are a separate curated playlist/content system — do not fold them into mood playlist data.

### Desktop flow
1. Pick Your Mood
2. Selected mood turntable/player/tracklist
3. Crash Courses
4. Persistent Now Playing mini player

### Mood selector
- Colored circular **record-label-style buttons**.
- Each includes collage icon, number, mood name, and tiny descriptor.
- Preserve the original colors/textures of collage icons rather than recoloring everything black.
- On mobile, keep these as colored illustrated labels in a horizontal swipe row.
- **Do not turn mobile mood buttons into black vinyl records.**
- Full vinyl appears only after a mood is selected.

### Current working mood system
The current working system has 12 moods, but **12 is not a sacred number**. Add, merge, or remove moods only when sorting real songs provides evidence.

Current working territories:
- Chill
- Dreamy / Float Away
- Euphoric
- Energized / Hype
- Defiant
- Audacious
- Sultry / Sensual
- Tender / Romantic
- Melancholy
- Burdened
- Nostalgic
- Focus

Names are still working labels until the taxonomy stabilizes.

Possible territories to watch, **not approved as moods**:
- Reflective / Introspective
- Playful / Mischievous
- Cathartic / Volatile / Rage

**Wanderlust and Exploratory are not mood playlists.** Ignore any mockup that invented those categories.

### Confirmed icon directions
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

### Turntable
The turntable is a signature interaction, not decorative filler. A selected mood should resolve into the full record/turntable experience.

### Crash Courses
Separate from mood playlists. Curated introductions to genres, artists, scenes, or sounds. Do not collapse Crash Courses into the mood taxonomy.

### Now Playing
Persistent mini-player/Now Playing area across the Listen experience.

### Copy/decorative rules
- Playlist descriptions and microcopy should wait until mood sorting/taxonomy is sufficiently stable.
- Do not add generic filler phrases.
- Handwriting/annotations should communicate real information or a genuine Sarah note.
- Preserve cream-paper negative space.

## 8. Journal
### Role
Editorial home for essays and Monthly Favorites.

### Direction
An indie music magazine / personal zine inside the larger Sarahtonin world. This should be one of the calmer pages. Long-form readability beats decoration.

### Landing page
- Large **JOURNAL** editorial heading.
- Small casual handwritten-style line beneath it.
- Reverse chronological content.
- Filters: **All / Essays / Monthly Favs**.
- Architecture should leave room for future formats such as reviews/interviews without adding them prematurely.

### Article pages
- More breathing room than the landing page.
- Avoid busy margins.
- IM Fell English direction for readable long-form copy.
- Perandory Semi-Condensed direction for major editorial headings.
- Handwritten notes, tape, stars, torn edges, halftones, and scribbles are accents, not required decoration.
- Placeholder phrases/images from mockups are not finalized content.

## 9. About
### Status
Foundational design and current copy direction are approved.

### Direction
Editorial profile meets scrapbook — not a conventional portfolio bio.

### Primary visual
Sarah's black-and-white cutout/halftone portrait (arms up / hand near face), used oversized as an editorial hero and potentially overlapping large typography.

### Secondary visual
Restaurant-table candid. The orange/gold halftone treatment can be a smaller snapshot/alternate graphic, not the primary portrait.

### Layout rhythm
Bold hero → readable bio/story → playful taste section → readable continuation → professional context → personal sign-off.

### Design constraint
Do **not** use the previously considered full dark poster-style bio card. Let the cream paper breathe; reserve dark/crimson/gold blocks for emphasis.

### Current copy decisions
- Main heading: **"About Me"**
- Opening: **"Hi! I'm Sarah, the girl behind Sarahtonin Sounds."**
- Preserve the personal origin story and conversational voice.
- Approved taste heading: **"my taste is all over the place."**
- Do not use the older "my taste is a mess in the best way."
- Professional credits list is removed/held off for now.
- About copy is considered finalized for now; only minor layout-driven trimming should happen later if necessary.

## 10. Contact
### Direction
Simple, professional/general contact page that still belongs visually to Sarahtonin Sounds.

### Requirements
- Concise copy; do not pad the page.
- Simple contact form.
- Relevant social/music links.
- Use the established design system with restraint.
- Do not add generic contact-page features merely because other websites have them.

## 11. Guestbook — Phase 2
### Status
**Not launch/MVP. On hold, not scrapped.**

Revisit only after launch if actual visitor engagement suggests a community/song-recommendation feature would be useful.

### Preserved concept
A communal scrapbook where visitors can leave messages, song recommendations, and what they are listening to.

Approved visual concept:
- warm paper base
- mismatched physical ephemera for messages: scraps, index cards, receipt-like paper, sticky notes, Polaroid backs, etc.
- roughly 5–7 preset note styles rather than unlimited customization
- possible treatments: cream, crimson, dusty pink, powder blue, kraft, etc.
- submissions should create most of the page's personality; keep the surrounding structure controlled

Do not quietly re-add Guestbook to launch scope.

## 12. Content & Voice
### Workflow
Do not force all copy to be completed before layouts/builds exist. Write into the established designs and return to page-specific copy when needed.

### Voice
Personal, music-obsessed, clever, warm, conversational, and a little weird/playful without sounding try-hard or like manufactured "brand voice."

Decorative handwritten copy can be more playful than functional/interface copy.

### Current copy status
- Home: effectively finalized.
- About: finalized for now.
- Listen playlist descriptions: wait for mood taxonomy.
- Journal: polish when real essays/Monthly Favs are populated.
- Contact: concise.
- 404/playful microcopy: finishing-detail work later.

## 13. Accessibility, Responsiveness, Performance
These are first-class requirements, not final polish.
- Preserve readable contrast over video and textured backgrounds.
- Essential instructions must never rely on handwritten typography.
- Keyboard interaction and visible focus states for interactive controls.
- Semantic HTML.
- Useful alt text for meaningful images; decorative collage elements should not create screen-reader noise.
- Respect reduced-motion preferences, especially Home video and animated turntable interactions.
- Mobile Listen interactions must remain understandable and touch-friendly.
- Optimize background video and imagery rather than shipping oversized assets.
- Avoid decoration that obscures content or interaction targets.

## 14. Decision Rules for Future Work
When proposing or implementing anything:
1. Preserve finalized decisions unless there is a strong reason to revisit them.
2. If a new idea conflicts with an established decision, explicitly surface the conflict and compare the directions rather than silently replacing the old one.
3. Separate **must-have** from **nice-to-have**.
4. Do not add generic website features simply because they are common.
5. Favor personality, usability, responsive behavior, accessibility, performance, and maintainability.
6. Use real content and Sarah-specific annotations rather than generic decorative copy.
7. Do not redesign the wordmark.
8. Do not introduce a framework without a concrete justification.
9. Treat legacy implementation details as migration inputs, not current requirements.
10. Preserve legacy content/data before replacing old architecture.

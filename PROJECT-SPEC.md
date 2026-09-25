# Sarahtonin Sounds — Master Project Spec
**Handoff version:** September 24, 2026 · v5 (post-launch)  
**Purpose:** Current source of truth for continuing the Sarahtonin Sounds website in Claude / Claude Code.

## 1. Project
Sarahtonin Sounds is Sarah Milad's personal + professional music-curation website. It showcases Sarah's taste and work through curated playlists, music discovery, essays, Monthly Favorites, and eventually community interaction.

The current site should feel personal, editorial, tactile, music-obsessed, and specific to Sarah — not like a generic portfolio, streaming app, or template-driven brand site.

### Launch navigation
**Home · About · Listen · Journal · Contact**

**Guestbook is Phase 2 / on hold.** Preserve the concept, but do not include it in launch navigation or MVP implementation.

### Site-wide footer and logo
- Every page except Home has a "© [year] Sarahtonin Sounds" footer. The year is set at build time.
- On every page except Home, the logo links to Home.

### Technical direction
- Plain HTML, CSS, and JavaScript.
- GitHub is the source of truth for code.
- Deploy through Netlify.
- Keep the code understandable, maintainable, responsive, accessible, and performant.
- Do not introduce a framework unless there is a concrete requirement that plain HTML/CSS/JS cannot reasonably meet.

### Content editing (decided)
**Decap CMS + Eleventy.** Sarah needs to edit site content without touching code, Journal essays first and ideally About, Contact, and Listen later. That is the concrete requirement that justifies adding a build step.
- Keep the existing hand-built HTML/CSS/JS design. Eleventy templates wrap it; it is not a redesign or a platform switch.
- Start with a **Journal-only** content collection.
- Fold About into the same pass if it can be done alongside the rest of the setup; otherwise it is a fast-follow.
- Not WordPress, not another platform.
- This replaces the old manual step of adding each essay slug to `essays/index.json`.

### Repository (post-launch workflow)
- `main` is the live site. Netlify publishes it automatically on every change.
- CMS saves go straight to `main`, so they publish right away.
- All Claude Code work happens on `claude/add-claude-md-file-3fgnk0` (Sarah plans to rename it later). Update it from `main` before every task.
- Changes reach `main` only through a pull request, reviewed on its Netlify Deploy Preview first.
- One Claude Code session works on the repo at a time.
- Never delete `legacy-main-archive`.
- The `work-in-progress` branch is stale and holds the legacy single-page mood-wheel site. Do not push current work there.

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
- marquee ticker (brought back on purpose as the Home ticker, see §6)

These are **legacy design decisions, not current requirements**. Do not reintroduce them automatically.

### Legacy data — archive/reference only, not a Listen data source
A Spotify-derived music library of **8,653 verified songs** (not the earlier ~10,047 estimate) exists in the prior implementation, tagged/split by the older mood system.

**Decision:** This library is preserved as archive/source data only. It is **not** used to populate, seed, or remap the live Listen experience:
- preserve the library and its original legacy mood tags exactly as-is, untouched;
- do not migrate, remap, or retag it into the current taxonomy;
- do not use it to generate or fill in playlists;
- keep it available purely for future reference if Sarah wants to draw on it later.

The live Listen experience is instead sourced from Sarah's manually curated Spotify playlists — see §7.

### Content philosophy: fresh start by default
**The new site starts fresh on content.** It is built from `PROJECT-SPEC.md` / `ASSET-MANIFEST.md` / `BUILD-ROADMAP.md`, assets Sarah provides, the Spotify playlists Sarah is currently curating, and copy that has been explicitly finalized in this process. The legacy site is not a content source by default — it is a reference for architecture/implementation ideas only, not the current product specification.

Two distinct statuses apply to every piece of legacy code/data/content:
- **PRESERVE** — the default status for all legacy material (essays, song picks, copy, links, playlist content, CMS fields, implementation code, and any other editorial material). It stays safely in the legacy/archive location so nothing is lost. Preservation alone does not put it on the current site.
- **MIGRATE** — reserved for a specific legacy item Sarah has explicitly approved for the current site. Being usable, well-written, or otherwise good is not sufficient justification on its own; approval must be explicit and item-specific.

This applies even to previously-flagged high-quality content: for example, the Turnstile and Zappa "Watermelon in Easter Hay" picks are PRESERVE-only (archived) — Sarah does not recognize them as current content, so they do not migrate unless and until she explicitly approves them.

Before deleting or replacing legacy code/data:
1. inspect it;
2. preserve it (archive location, untouched);
3. do not migrate it unless Sarah has explicitly approved that specific item;
4. if migration is approved, bring it in deliberately into the current structure.

## 3. Core Design Principle
**Clean structure + weird/tactile decoration.**

Layouts must remain understandable and usable. Personality comes from imagery, color, collage, texture, handwritten notes, ephemera, and small interactions.

A useful conceptual balance is roughly **70% clean structure / 30% visual weirdness**, adjusted by page. Empty warm-paper space is intentional. Never add decoration merely because an area feels empty.

Not every page should be equally busy:
- Home: minimal, no-scroll illustrated collage cover.
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
**Approved and implemented.** The illustrated-collage direction below (built against Sarah's own Figma geometry) is the current source of truth and **supersedes the earlier full-screen-video Home direction entirely** — that video-hero concept (background loop, "discover music!" note, "made by: Sarah Milad" credit) is retired, not merely on hold. The legacy video asset and its supporting images are preserved (untouched, unused) at `assets/video/home-loop.mp4` and `assets/images/home/` per the PRESERVE-by-default policy; nothing there feeds the live Home page. (The "made by: Sarah Milad" credit has since been reinstated as a small, separate piece of the collage direction — see "Approved direction" below; the background loop and the "discover music!" note remain retired/undecided.)

### Purpose
A single-viewport, no-scroll cover for the site: an illustrated collage (Sarah reclining on a striped carpet, headphones on, leopard and record crate in the foreground, moon/stars, a torn-paper title card, a scalloped pink nav cloud, a yellow sunburst spiral, a navy scalloped band) built from Sarah's individually exported artwork layers.

### Approved direction
- Desktop and mobile are **separately art-directed layouts**, each reconstructed from an authoritative Figma reference frame — desktop at **1440×900**, mobile at **393×852** — not one scaled into the other. Every layer's position/size is a percentage of its own reference frame, computed directly from Figma's px values, so the composition scales to any real viewport without letterboxing (desktop) or feeling like a shrunk desktop scene (mobile).
- **Desktop scaling: fit, never crop.** The 1440×900 composition is scaled uniformly by whichever viewport dimension is more limiting, so the whole frame — nav tabs through leopard and record crate — is always fully visible on any desktop window, including short laptop windows. Nav tab and credit type scale with the frame, not the viewport.
- **Desktop side bleed.** On windows wider than 16:10, the side space is filled by Sarah's 200px left/right bleed strips from the Figma "Desktop Home — Extended Bleed" frame (1840×900, node 69-2; the 1440×900 composition sits centered in it, unchanged). The strips scale with the frame, sit behind the girl/carpet, crate and leopard, and overlap the frame's edges slightly (3px left, 2px right) to hide hairline edge columns. The leopard and red squiggle may extend past the 1440 frame edge into the bleed so they render whole; nothing extends past the 1840 bleed frame.
- **Known edge cases (accepted):** windows wider than ~2.04:1 (1840:900, e.g. 21:9 ultrawide) show the plain background fill color beyond the bleed strips; desktop windows narrower than 16:10 show it above and below the composition, since the bleed only extends sideways. A faint tone step where the tan/cream shapes cross the left bleed seam is accepted as-is.
- Desktop navigation is five real `<a>` links styled as individual torn-paper tabs, positioned across the upper-right yellow/pink area, each using the shared tab asset (see ASSET-MANIFEST.md §1) as its background with the label layered on top in Perandory Semi-Condensed — the same site-wide display face used for nav on every other page (§5), not a Home-specific font.
- Mobile uses a real accessible `<button>` MENU trigger, styled with that same Perandory Semi-Condensed treatment, that reveals the nav list — `aria-expanded`/`aria-controls`, Escape-to-close, outside-click-to-close, and focus return to the button on close are all required behavior, not polish.
- A small "made by: Sarah Milad" credit sits lower-right of the composition, in Sue Ellen Francisco per §5's marginalia-only rule (never essential UI, never the logo). Approved and built as a deliberate, minor revision — not a return to the retired video-hero credit treatment.
- Moon/stars, the tan cloud, and the small pink-paper accent are desktop-only; mobile deliberately omits them rather than approximating.
- **Ticker (deliberate revision, Sarah, September 2026).** A thin, full-width navy strip runs across the top of Home on desktop and mobile, with cream Perandory Semi-Condensed text. Its phrases and its on/off toggle are edited in the CMS ("Home (current site)"). It has a pause button, and with reduced motion it is a still line. The collage is fit-scaled into the space below it, so no layer is covered or cropped; when the ticker is off, the collage returns to its full size. This replaces the retired legacy marquee on purpose: it is not a leak of the old site.
- The torn-paper "SARAHTONIN SOUNDS" title card links to Listen.
- Sarah's exact established gold Sarahtonin Sounds wordmark remains untouched elsewhere on the site per §5; the large torn-paper "SARAHTONIN SOUNDS" title card on Home is a separate piece of Sarah-supplied artwork, not the wordmark itself.

### Explicit removals
- No descriptive tagline.
- Remove **"Music, Prescribed With Taste."**
- No "discover music!" note — **not yet decided**; belonged to the retired video-hero direction and has not been separately approved for the collage direction. Do not add it without explicit sign-off.
- Do not turn Home into a scrolling content page with teasers.

## 7. Listen
### Role
The main interactive music-curation experience and signature functional page.

### Data source
**Sarah's manually curated playlists are the sole source of truth for the live Listen experience.** The legacy 8,653-track library is archive-only (see §2) and does not feed this page: no migration, remapping, or auto-population from it.

**Playback (decided):** each mood's playlist uses a **live embed with a Spotify / Apple Music toggle**, not a static track list. Adding or removing songs on the actual playlists updates the site automatically.

**Sarah's Picks (decided):** a small hand-picked highlights list per mood, maintained manually on top of the live embed.

Expect a relatively small, hand-maintained set of curated playlists. Each needs metadata such as:
- mood/category
- display name
- short descriptor
- label color (see mood color mapping below)
- artwork/icon
- Spotify playlist URL or ID
- Apple Music playlist URL or ID
- Sarah's Picks list
- optional display metadata as needed for the turntable/player experience

**Where it lives (September 2026):** the descriptor, blurb, description, and Sarah's Picks are edited in the CMS ("Listen Moods") and stored in `content/listen/mood-words.json`. Everything else (names, colors, art, live flags, playlist URLs, order) stays in `content/listen/moods.json`, which is not in the CMS, so it can't be changed by accident. The page matches the two files by mood id.

This metadata layer must be config-driven, not hardcoded, so the mood taxonomy (§ below) can keep evolving without rewriting the page. Crash Courses are a separate curated playlist/content system — do not fold them into mood playlist data.

### Desktop flow
1. Pick Your Mood
2. Selected mood turntable/player/tracklist
3. Crash Courses (shown only when a course is live)
4. Persistent Now Playing mini player

### Mood selector
- Colored circular **record-label-style buttons**.
- Each includes collage icon, number, mood name, and tiny descriptor.
- **Launch (decided, Sarah, September 2026): icons are deferred past launch.** Launch labels are the color circles with number, mood name, and descriptor only. Icons are added later, all at once for every live mood, not one by one. The icon column in the mood list below records the intended icon for that later pass.
- Preserve the original colors/textures of collage icons rather than recoloring everything black.
- On mobile, keep these as colored illustrated labels in a horizontal swipe row.
- **Do not turn mobile mood buttons into black vinyl records.**
- Full vinyl appears only after a mood is selected.
- A mood can set an optional `titleColor` in `moods.json` for its name on the turntable banner. Hazy, Defiant, and Vibes use white.

### Mood list (final, supersedes the earlier 12-mood working list)
19 moods (18 colors):

| # | Mood | Label color | Icon |
|---|------|-------------|------|
| 1 | Chill | light blue | sun |
| 2 | Hazy | purple | cloud |
| 3 | Euphoric | orange | *undecided* |
| 4 | Electric | yellow | *undecided* (disco ball?) *(see note)* |
| 5 | Defiant | black | fist |
| 6 | Audacious | *undecided* | sunglasses |
| 7 | Sensual | red | lips |
| 8 | Tender | pink | heart |
| 9 | Melancholy | lavender | broken heart |
| 10 | Burdened | dark blue | scribble |
| 11 | Nostalgic | peach | camera |
| 12 | Hopeful / At Peace | *undecided* | *undecided* |
| 13 | Lost | *undecided* | *undecided* |
| 14 | Playful / Cheeky | *undecided* | *undecided* |
| 15 | Unleashed | dark green | *undecided* |
| 16 | Cute | *undecided* | *undecided* |
| 17 | Hypnotic | *undecided* | *undecided* |
| 18 | Hype | *undecided* | *undecided* *(see note)* |
| 19 | Vibes | berry | *undecided* |

Row numbers are for reference only. The launch display order is below; the order of moods added later is not decided.

**Live moods (Sarah, September 2026):** 9 moods are live (`"live": true` in `content/listen/moods.json`), shown in this order: **Chill, Vibes, Hazy, Tender, Sensual, Euphoric, Electric, Unleashed, Defiant.** The 8 launch moods were the same list without Vibes. The other 10 are hidden until Sarah flips them.

Notes:
- **Hopeful / At Peace** and **Playful / Cheeky**: Sarah will keep one word from each pair. Both are placeholders until she picks.
- **Renamed (Sarah, September 2026):** Sultry is now **Sensual**, Energized is now **Electric**, Dreamy is now **Hazy**. Hazy keeps the cloud icon.
- **Color reassignments (Sarah, September 2026):** the launch moods took pink (from Cute), purple (from Hype), orange (from Audacious), and light blue (from Dreamy, now Chill). Defiant is black (briefly brown, then changed back), and Unleashed is dark green, using the dark green art it already had. Cute, Hype, Audacious, and Lost have no color; their existing art is kept in the config unchanged. Brown is not used by any launch mood.
- **Added (Sarah, September 2026):** Vibes, a 19th mood, took berry from Playful / Cheeky. With 19 moods and 18 colors, one mood will eventually need new art in a new color. Playful / Cheeky keeps its existing art in the config unchanged, like Cute, Hype, and Audacious.
- **Unassigned colors:** fuschia, light green, brown, forest green, gold, silver. Cute, Audacious, Lost, Hopeful/At Peace, Playful / Cheeky, Hype, and Hypnotic have no color yet. Do not assign these without Sarah.
- **Disco ball:** originally confirmed for the combined "Energized / Hype" mood. Energized (now Electric) and Hype are separate moods, so which one keeps the disco ball is undecided. Electric is the likely candidate, not confirmed. Euphoric's icon is also undecided.
- **Focus** from the earlier working list is not in the final 19.
- Earlier combined names (Dreamy / Float Away, Tender / Romantic, Sultry / Sensual) became single words (Dreamy, Tender, Sultry), then Dreamy and Sultry were renamed Hazy and Sensual (see above).
- The mood data is config-driven, so the list can still change without rewriting the page.

**Wanderlust and Exploratory are not mood playlists.** Ignore any mockup that invented those categories.

### Full mood-circle color set
18 colors: yellow, red, pink, orange, light green, lavender, dark blue, black, brown, berry, dark green, purple, peach, forest green, gold, fuschia, silver, light blue. Exact hex values are not recorded here yet (provisional values sampled from the circle art live in `content/listen/moods.json`).

### Turntable
The turntable is a signature interaction, not decorative filler. A selected mood should resolve into the full record/turntable experience.

### Crash Courses
**Built after launch (September 2026), switched off until Sarah adds a live course.** Courses are managed in the CMS ("Crash Courses"). Each has a title, square card art with an art description, an optional hook, an optional intro, a Spotify playlist URL, an optional Apple Music URL, an optional "Start here" track list, a Live switch, and an Order number.
- Only courses with Live on appear anywhere on the site. With none live, Listen shows no Crash Courses section at all.
- Listen shows a shelf of up to 4 live courses below the turntable (a swipe row on mobile). The shelf has no embeds; the now spinning bar stays the only player on Listen.
- Each live course has its own page at `/listen/crash-courses/<slug>/` with its own playlist embed, and `/listen/crash-courses/` lists all live courses.

Separate from mood playlists. Curated introductions to genres, artists, scenes, or sounds. Do not collapse Crash Courses into the mood taxonomy.

### Now Playing
**Decided (Sarah, September 2026): a "now spinning" bar.**
- A bar pinned to the bottom of the Listen page shows the selected mood's label art, name, and color, and holds the live Spotify / Apple Music embed with the toggle.
- The embed stays **visible**, sized so the current song's title and artist show. No hidden or unbranded embed.
- Playback keeps going while scrolling the Listen page (e.g. down to Crash Courses). It does not need to persist across other pages.
- Apple Music's embed has no control API (without MusicKit), so with Apple Music selected the turntable play button is hidden and playback happens only in the embed. With Spotify, the turntable also works as play/pause.

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

### Monthly Favs posts
**Decided (Sarah, September 2026).** Every post has:
- A **month + year header** (the month the favorites are from, its own CMS field, separate from the publish date).
- **Three numbered highlights**, each with title, artist, art, and a short note:
  - **01 Favorite song**
  - **02 Favorite album**
  - **03 Favorite needle drop**: a song Sarah heard in a TV show, ad, or movie, with where she heard it.
- **The month's playlist**: a full Spotify embed plus a short **"Start here"** list of a few tracks, set up like the Crash Course pages.

Optional, shown only when filled:
- A short **reflection** blurb at the top (placement tentative).
- **Photos** with optional captions. These are the post's optional Hero and Polaroid photo blocks, the same ones essays have.

Parked (not built): watched / read / learned blocks; a TV / Ad / Film tag on the needle drop.

### Article pages
- More breathing room than the landing page.
- Avoid busy margins.
- IM Fell English direction for readable long-form copy.
- Perandory Semi-Condensed direction for major editorial headings.
- Handwritten notes, tape, stars, torn edges, halftones, and scribbles are accents, not required decoration.
- Placeholder phrases/images from mockups are not finalized content.

## 9. About
### Status
Foundational design and current copy direction are approved. The built About page (Figma-based) is the source of truth for the decisions below; they supersede the earlier portrait/heading/credits direction.

### Direction
Editorial profile meets scrapbook — not a conventional portfolio bio.

### Primary visual
The green-background polaroid of Sarah ("Me! Sarah Milad!"), on desktop and mobile.

The black-and-white cutout/halftone portrait and the restaurant-table candid are **no longer used on About**. Their files are kept (not deleted) in case they are wanted elsewhere later.

### Layout rhythm
Bold hero → readable bio/story → professional context (credits + resume) → personal sign-off.

### Design constraint
Do **not** use the previously considered full dark poster-style bio card. Let the cream paper breathe; reserve dark/crimson/gold blocks for emphasis.

### Current copy decisions
- Main heading: **"About"** with the sub-line **"me…more or less"**.
- Opening: **"Hi! I'm Sarah, the girl behind Sarahtonin Sounds."**
- Preserve the personal origin story and conversational voice.
- One bio, shared by desktop and mobile (the desktop bio).
- No separate taste heading: "My taste in a nutshell" and "my taste is all over the place." are both removed; the taste paragraphs stay as part of the bio.
- Do not use the older "my taste is a mess in the best way."
- Selected Credits & Resume stays on the page. Resume links open `assets/docs/sarah-milad-resume.pdf` in a new tab.
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
- Preserve readable contrast over illustrated and textured backgrounds.
- Essential instructions must never rely on handwritten typography.
- Keyboard interaction and visible focus states for interactive controls.
- Semantic HTML.
- Useful alt text for meaningful images; decorative collage elements should not create screen-reader noise.
- Respect reduced-motion preferences, especially animated turntable interactions.
- Mobile Listen interactions must remain understandable and touch-friendly.
- Optimize imagery (including the Home collage layers) rather than shipping oversized assets.
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
9. Treat legacy implementation details as reference/preservation inputs, not automatic migration candidates or current requirements.
10. Preserve legacy content/data by default; migrate a specific item into the current site only when Sarah has explicitly approved it — usability or quality alone is not approval.

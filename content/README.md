# Content / Data

This folder is the current site's content/data layer — deliberately
separate from the legacy `settings/`, `essays/`, and `music-picks/`
folders at the repo root, which remain PRESERVE-only legacy data
(`PROJECT-SPEC.md` §2, `CLAUDE.md`).

Per the fresh-start-by-default rule, content only lands here once Sarah
has explicitly finalized/approved it for the current site — it is never
copied over from legacy just because it's usable or well-written.

CMS-managed via Decap CMS (`admin/config.yml`), built with Eleventy
(`.eleventy.js`). Eleventy loads `about.json`, `journal/monthly-
favorites.json`, and `journal/featured.json` as global template data
directly (not via Eleventy's `dir.data` convention — that would exclude
this folder from normal template discovery, which `journal/essays/`
needs). `journal/essays/*.md` is a real Eleventy collection (tag
`journalEssay`): each file generates its own `/journal/<slug>/` page
through the `layouts/journal-post.njk` layout.

Populated so far:

- `about.json` — About page copy (Phase 3), desktop/mobile kept as
  separate fields wherever the two breakpoints genuinely diverge today,
  not unified.
- `journal/essays/*.md` — Journal essays (Phase 7), one file per entry,
  front matter + Markdown body.
- `journal/monthly-favorites.json` — Monthly Favorites (Phase 7).
  Deliberately still a single JSON file with a `list` widget, not a real
  Eleventy collection or folder collection — that restructuring is
  explicitly out of scope for this round (see the conversation record);
  revisit once Essays-as-a-collection is proven out.
- `journal/featured.json` — ordered, explicitly-curated Featured Journal
  selection (replaces automatic newest-entry behavior).

- `listen/moods.json` — Listen mood config (Phase 4/5): the 19 moods
  from `PROJECT-SPEC.md` §7 with id, name, live flag, color, icon, art,
  and Spotify and Apple Music URLs, in display order. Not in the CMS.
  Undecided values are `UNDECIDED`, missing links `PLACEHOLDER`; the
  notes at the top of the file explain the rest. Passthrough-copied
  (not template data) and fetched at runtime by `js/listen.js`.
- `listen/mood-words.json`: each mood's descriptor, blurb, description,
  and Sarah's Picks, edited in the CMS ("Listen Moods"). Also
  passthrough-copied and fetched by `js/listen.js`. Split from
  `moods.json` because Decap rewrites any object with more than eight
  keys in a scrambled key order; keep every object here at eight keys or
  fewer.

  **How the two files match up:** by `id` only (e.g. `chill`). The page
  takes everything from `moods.json` and fills in the four word fields
  from the `mood-words.json` entry with the same `id`. The `name` in
  `mood-words.json` is only the label in the CMS list; the site never
  shows it. What each change needs:
  - Flip a mood live: `moods.json` only. Every mood already has an
    entry in `mood-words.json`.
  - Rename a mood: change `name` in `moods.json` (that's what the site
    shows), and in `mood-words.json` too so the CMS list matches (the
    CMS can't edit it; do it in the file). Leave `id` alone.
  - Change an `id`: change it in both files at once. If they don't
    match, the page shows that mood with no descriptor, blurb,
    description, or picks, and gives no error.
  - Add a new mood: add it to both files with the same `id`. The CMS
    can't add moods. Remove one: take it out of `moods.json`; a leftover
    entry in `mood-words.json` is ignored.
  - Reorder moods: `moods.json` only. Keep `mood-words.json` in the same
    order so the CMS list matches the site.
- `listen/crash-courses/*.md` — Crash Courses (BUILD-ROADMAP.md Phase 10), one
  file per course from the CMS, a real Eleventy collection (tag
  `crashCourse`). Only entries with `live: true` get a page
  (`crash-courses.11tydata.js`) or show on the shelf and index.
  Separate from `moods.json`, and never published as raw files.
- `contact.json` — finalized contact copy/links (Phase 8)

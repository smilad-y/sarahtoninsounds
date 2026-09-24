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

- `listen/moods.json` — Listen mood config (Phase 4/5): the 18 moods
  from `PROJECT-SPEC.md` §7 with name, color, icon, descriptor, art,
  Spotify and Apple Music URLs, and Sarah's Picks. Undecided values are
  `UNDECIDED`, missing links `PLACEHOLDER`; the notes at the top of the
  file explain the rest. Passthrough-copied (not template data) and
  fetched at runtime by `js/listen.js`.
- `listen/crash-courses.json` — Crash Courses content (not created yet; Crash Courses roll out after launch, BUILD-ROADMAP.md Phase 10)
- `contact.json` — finalized contact copy/links (Phase 8)

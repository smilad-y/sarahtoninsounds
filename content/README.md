# Content / Data

This folder is the current site's content/data layer — deliberately
separate from the legacy `settings/`, `essays/`, and `music-picks/`
folders at the repo root, which remain PRESERVE-only legacy data
(`PROJECT-SPEC.md` §2, `CLAUDE.md`).

Nothing is populated here yet. Per the fresh-start-by-default rule,
content only lands here once Sarah has explicitly finalized/approved it
for the current site — it is never copied over from legacy just because
it's usable or well-written.

Expected future structure (each schema gets defined in the phase that
actually builds it, not before):

- `about.json` or similar — About page copy, once fully finalized (Phase 3)
- `listen/playlists.json` — curated Spotify playlist metadata (Phase 4;
  schema outlined in `ASSET-MANIFEST.md` §6 / `PROJECT-SPEC.md` §7)
- `listen/crash-courses.json` — Crash Courses content (Phase 6)
- `journal/` — essay + Monthly Favorites content (Phase 7)
- `contact.json` — finalized contact copy/links (Phase 8)

Whether this ends up CMS-managed (Netlify CMS, Decap, or otherwise) or
hand-edited JSON is an open decision (`BUILD-ROADMAP.md` — CMS decision /
Current Open Decisions). This folder's existence doesn't presuppose
either answer.

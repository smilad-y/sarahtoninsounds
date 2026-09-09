# Legacy site (pre-rebuild)

`index.html` in this folder is a **convenient reference copy** of the
original legacy homepage — it is **not** a self-contained archival
snapshot. It was moved here, content unchanged, only because the new
site's Home page now occupies the root `index.html` path, which is a
genuine filename conflict (Netlify serves whatever is at `index.html`
for the `/` route).

This file depends on the root-level `admin/`, `essays/`, `music-picks/`,
and `settings/` folders for its data (root-absolute fetches to
`/settings/...`, `/essays/...`, `/music-picks/...`). Those folders are
untouched today, so it still works and looks like the original site for
now — but because it relies on paths outside itself, it may stop
representing or working like the original legacy site if those
directories are later migrated, changed, or removed.

**`archive/legacy-site-pre-rebuild` is the authoritative, intact
pre-rebuild snapshot** — a complete, independent copy of the legacy
implementation as it stood before this rebuild, unaffected by anything
that happens on this branch, including future changes to the root-level
legacy data folders. Treat that branch, not this file, as the reliable
historical record.

Per the fresh-start-by-default content rule (`PROJECT-SPEC.md` §2,
`CLAUDE.md`), nothing from the legacy implementation — this reference
copy included — feeds the new site unless Sarah explicitly approves a
specific item.

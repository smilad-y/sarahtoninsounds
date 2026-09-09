# Legacy site (pre-rebuild)

`index.html` in this folder is the original legacy homepage. It was moved
here — content unchanged — only because the new site's Home page now
occupies the root `index.html` path, which is a genuine filename conflict
(Netlify serves whatever is at `index.html` for the `/` route). See the
Phase 1 build summary for the full explanation.

This file still fetches its data from the root-level `admin/`, `essays/`,
`music-picks/`, and `settings/` folders exactly as before — those folders
have **not** been moved and remain untouched at the repo root. The move
only relocated this one HTML file.

A complete, independent snapshot of the legacy implementation as it stood
before this rebuild also lives on the `archive/legacy-site-pre-rebuild`
git branch, unaffected by anything that happens on this branch going
forward.

Per the fresh-start-by-default content rule (`PROJECT-SPEC.md` §2,
`CLAUDE.md`), nothing here feeds the current site unless Sarah explicitly
approves a specific item.

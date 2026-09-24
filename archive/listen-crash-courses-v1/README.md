# Listen: "An Introduction To..." section (Crash Courses v1)

The first Crash Courses section on Listen, from the Figma file (node
15:9). It was hidden with `hidden` before launch and replaced by the
Crash Courses system (CMS collection, course pages, and the Listen
shelf) in September 2026. Kept untouched here:

- `listen-intro.html`: the section's markup exactly as it was in
  `listen.html`, including the `hidden` attribute and its comments.
- `listen-intro.css`: its rules exactly as they were in `css/listen.css`
  (desktop 1440px-reference positioning plus the mobile overrides).
- `sarahtonin_sounds-listen_intro_arabic_collage_1.png`: the Arabic
  Music collage.

The copy is Sarah's, from Figma: the heading "An Introduction To...",
the subheading "A deeper dive into genres, artists, scenes, and sounds",
the "(more to come)" note, and the Arabic Music card: "A starting point
for exploring voices from across the Arab world—from Oum Kulthum and
Fairuz to contemporary favorites, with a few familiar samples hiding
along the way." Its Explore button linked to `#` (no course page existed
yet).

The markup's other images (`paper_layer3_1.png`, `paper_layer2_1.png`,
`Tape-Red_3.png`) and the collage itself are still in
`assets/images/listen/`, because `legacy/listen-hidden-spotify-player/`
also uses them.

Preserved, not migrated: none of this is on the site. The Arabic Music
card would come back only as a Crash Course entry, if Sarah makes one.
This folder isn't published (see `.eleventyignore`).

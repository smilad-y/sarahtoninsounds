# Carousel generator

Makes 1080x1350 Instagram carousel slides for a Listen mood. Colors and
art come from `content/listen/moods.json`; fonts come from `assets/fonts`.

## Run it

One-time setup (Pillow draws the slides; fonttools and brotli turn the
site's woff2 fonts into TTFs Pillow can read):

```bash
pip install pillow fonttools brotli
```

Then, from anywhere in the repo:

```bash
python3 tools/social/make_carousel.py tools/social/example-chill.json
```

Slides land in `tools/social/out/<name>/`. Converted fonts are cached in
`tools/social/.font-cache/`. Both folders are git-ignored.

## Writing a post

Copy `example-chill.json` and edit it:

- `name`: output folder and file prefix
- `mood`: a mood `id` from `moods.json` (the mood needs its color and art set)
- `songs`: one slide each, with `title`, `artist`, and `text`
- optional: `cover_line` (defaults to the mood's descriptor), `close_title`,
  `close_line`, `handle`

This folder is not part of the website; `.eleventyignore` keeps it out of the build.

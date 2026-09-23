# Listen — hidden 1px Spotify player (archived)

Verbatim copies of `listen.html`, `js/listen.js`, and `css/listen.css`
as of commit `237b7d6`, taken just before the Listen page switched to
the visible "now spinning" bar (Sarah's decision, September 2026).

What was retired:

- `listen.css` — `.spotify-embed-shell` squeezed the Spotify embed into
  a 1×1px, near-transparent, non-interactive box over the turntable, so
  visitors never saw Spotify's player or the current track.
- `listen.js` — `createSpotifyController()` mounted the embed in that
  box and the turntable's `.tt-playback-toggle` drove it remotely.
- `listen.html` — `#spotify-embed-shell` / `#spotify-embed-container`
  markup, plus the 18 hand-written mood buttons (keyed by color names)
  that the config-driven selector replaced.

Why: the current track must stay visible and the player branded; a
hidden or unbranded embed is not allowed on the current site.

These are reference copies only. They still point at root-absolute
`/js/listen.js` and `/css/listen.css`, so opening this `listen.html`
loads the *current* scripts, not these. Nothing here is wired into the
live site. Git history at `237b7d6` is the authoritative record.

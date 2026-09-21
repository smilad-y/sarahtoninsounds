# Fonts

IM Fell English (Regular + Italic) is loaded from Google Fonts in every
page's `<head>` — it's openly licensed (SIL Open Font License), so no
local files are needed for it.

Sue Ellen Francisco is also openly licensed (SIL Open Font License),
but is locally hosted here as `SueEllenFrancisco.woff2` — same pattern
as Perandory below — rather than loaded from Google Fonts. It was
loaded via Google Fonts originally, but that stylesheet request was
silently failing in at least one environment (a proxy/cert issue),
which made `--font-marginalia` render as a plain fallback cursive
font instead of real handwriting; self-hosting removes that failure
mode entirely. It's used across Home, About, Contact, Journal, and
Listen for handwritten marginalia/annotation-style text (never for
navigation, body copy, major headings, or the wordmark) — not just
Home's annotations.

Perandory Semi-Condensed is a licensed webfont, locally hosted here as
`Perandory-SemiCondensed.woff2` and wired to the `--font-display` token
via `@font-face` in `css/tokens.css`. It's used site-wide for major
display/editorial headings and nav.

A second file, `Perandory-Condensed.woff2`, was also supplied. It is
**not** wired up — PROJECT-SPEC.md §5 specifies the Semi-Condensed style
for the display treatment, so the Condensed file is available/unassigned
for now, pending a decision if it's ever needed elsewhere.

The following are **not** loaded anywhere in the site yet and need
licensed font files plus confirmed hosting rights before use
(`ASSET-MANIFEST.md` §11) — do not add `@font-face` rules for these until
licensing is confirmed:

- Amoresa (logo S)
- Luxurious Script (logo S fallback)

Neither is used to reconstruct the wordmark itself — the supplied gold
SVG (`assets/images/wordmark-gold.svg`) is the only wordmark asset.

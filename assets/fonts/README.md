# Fonts

IM Fell English (Regular + Italic) is loaded from Google Fonts in every
page's `<head>` — it's openly licensed (SIL Open Font License), so no
local files are needed for it.

The following are **not** loaded anywhere in the site yet and need
licensed font files plus confirmed hosting rights before use
(`ASSET-MANIFEST.md` §11) — do not add `@font-face` rules for these until
licensing is confirmed:

- Perandory Semi-Condensed
- Sue Ellen Francisco
- Amoresa (logo S)
- Luxurious Script (logo S fallback)

Once licensed files are supplied, place them here and wire up
`@font-face` (in `css/tokens.css` or a new `css/fonts.css`) rather than
relying on the generic fallback stacks currently defined in
`css/tokens.css`.

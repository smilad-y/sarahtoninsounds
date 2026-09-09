# CLAUDE.md — Working Instructions for Sarahtonin Sounds

Read `PROJECT-SPEC.md` before making design, content, architecture, or implementation decisions. Treat it as the current source of truth.

## Core role
You are continuing an already-developed Sarahtonin Sounds project. Your job is to implement and refine the current approved direction, while safely migrating any useful content/data from an older site implementation.

## Critical distinction: CURRENT vs LEGACY
There is an older Sarahtonin Sounds site/codebase. It may contain valuable music data, essays, CMS content, and implementation logic.

**Do not confuse legacy architecture/design with current requirements.**

Legacy examples that are NOT current requirements:
- one-page `index.html` site
- eight fixed moods: chill, moody, nostalgic, euphoric, tender, defiant, cinematic, electric
- dark purple gradient visual system
- Playfair Display / Caveat
- falling petals
- animated cursor
- marquee ticker

The current project uses a different site structure, visual system, typography, and working mood taxonomy.

Before removing legacy code/data:
1. inspect it;
2. identify reusable content/data;
3. preserve anything valuable;
4. migrate deliberately.

A Spotify-derived library of about **10,047 songs** may exist in the legacy project. Treat this as potentially important source data. Do not discard it and do not assume its old mood tags map cleanly to the new mood system.

## Non-negotiables
- Preserve Sarah's established Sarahtonin Sounds gold wordmark. Never redesign, reconstruct, or substitute it.
- Launch navigation is: Home · About · Listen · Journal · Contact.
- Guestbook is Phase 2/on hold. Do not add it to launch scope unless Sarah explicitly reactivates it.
- Use plain HTML, CSS, and JavaScript unless a concrete technical requirement makes a framework necessary.
- Maintain “clean structure + weird/tactile decoration.”
- Intentional cream/paper negative space is part of the design. Do not fill empty areas automatically.
- Do not add generic filler copy, fake testimonials, invented playlists, invented mood categories, or decorative phrases that do not sound like Sarah.
- Wanderlust and Exploratory are not mood playlists.
- Do not revive the removed Home tagline “Music, Prescribed With Taste.”
- Do not turn the Home page into a scrolling marketing page.
- Do not use casual handwriting for body text, essential instructions, major UI, or the logo.
- Do not quietly replace finalized choices when suggesting an alternative.

## Design hierarchy
Use:
- Perandory Semi-Condensed for major display/editorial headings.
- IM Fell English for readable body/long-form editorial copy.
- Sue Ellen Francisco only for short annotations/marginalia.
- Amoresa for the logo's calligraphic S only if appropriately licensed; Luxurious Script is fallback only.
- Warm cream/paper + near-black + gold/yellow + crimson as the core palette.
- Dusty pink, powder blue, olive, and lavender selectively.

## Page personalities
- Home = cinematic, minimal, no-scroll cover.
- Listen = signature interactive experience; most playful.
- Journal = calm indie magazine/zine; readability first.
- About = editorial profile + scrapbook.
- Contact = concise and restrained.
- Guestbook = future communal scrapbook, not MVP.

## Coding standards
- Prefer semantic HTML and straightforward CSS architecture.
- Keep JavaScript modular and understandable.
- Avoid unnecessary dependencies.
- Build responsive behavior intentionally rather than shrinking desktop layouts.
- Make keyboard navigation and visible focus states work.
- Respect `prefers-reduced-motion`.
- Optimize media for web delivery.
- Treat performance and accessibility as build requirements.
- Keep comments useful and sparse.
- Do not over-engineer.

## Migration behavior
If the existing GitHub repo contains the legacy site:
- audit before rewriting;
- preserve reusable JSON/content;
- identify CMS dependencies;
- identify which content can migrate cleanly;
- document any destructive change before making it;
- prefer incremental migration over wiping data blindly.

The old Netlify CMS setup is not automatically part of the new architecture. Keep, replace, or simplify it only after evaluating whether it still serves the current site.

## Collaboration behavior
When Sarah proposes something that conflicts with the spec:
1. identify the existing decision it conflicts with;
2. explain the tradeoff briefly;
3. offer the new direction as a conscious revision, not an automatic replacement;
4. wait for Sarah to choose before changing the source of truth.

When planning work, distinguish:
- **Must have for launch**
- **Nice to have / polish**
- **Phase 2**

When information is genuinely undecided, mark it as undecided rather than inventing an answer.

## Source-of-truth files
- `PROJECT-SPEC.md` — approved product/design/content decisions.
- `ASSET-MANIFEST.md` — required, known, and legacy assets/data.
- `BUILD-ROADMAP.md` — implementation order and launch scope.

If implementation reveals a genuine conflict or constraint, surface it before rewriting an approved design decision.

# Called it brand: Ledger

The brand record for Called it. The landing page and SEO steps read it. Picked 2026-10-27 from three directions (see `docs/decisions.md`). The mock is `docs/plans/brand/a-ledger.html` (https://hlamhisk5r7e.postplan.dev).

## Idea

An editorial journal: paper, ink, and one red grading pencil. Calm and literate, like a notebook you keep for years.

## Mark

`brand/mark.svg`, 64 by 64. A black check in a paper tile, circled in red pencil. The tile and check hold at 16 px. Do not redraw it at small sizes. Use the SVG.

## Palette

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| Background (paper) | `#F6F1E7` | `#16140F` | page |
| Panel | `#FFFDF8` | `#1F1C16` | cards, inputs |
| Ink | `#1D1B16` | `#EFE9DC` | text, primary buttons, selected states |
| Muted ink | `#5B564C` | `#A69E8E` | secondary text |
| Rule | `#E3DCCD` | `#343026` | borders |
| Pencil red | `#C8402B` | `#E2664F` | the mark's circle and "Wrong" only |
| Right green | `#2F7A55` | `#6DBB91` | "Right" only |

Red never marks an action. Primary buttons are ink.

## Type

- Display: Newsreader 600, tracking -0.02em. Use it for the wordmark, headings, and card titles.
- Body and numbers: Inter 400, 500, and 600, with tabular figures for numbers.
- `brand/fonts/` holds static TTFs for asset rendering, with their OFL licenses. The app serves both fonts itself through the Fontsource packages, so no request goes to Google.

## Voice

Plain, patient, a little dry. Talks like a good editor. Short sentences, no hype, no exclamation marks. Numbers stay honest. Say "calls", "graded", "right", and "wrong". Avoid "predictions" and "accuracy score".

## Taglines

- Primary: "Write down the call. Grade it later."
- Support: "A decision journal that shows how often your confidence is right."

## Files

- `brand/brand.json`: name, tagline, description, hostname, colors, and fonts. `src/lib/site.ts` reads it.
- `pnpm brand:assets` runs `scripts/brand-assets.ts` and writes `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`, and `og.png`. The outputs are committed. The build never runs the script.

## Not done yet

- Clerk's sign-in modal uses the light tokens in both themes.
- `scripts/brand-assets.ts` splits the OG tagline at the sentence end or comma nearest the middle. It does not check line width. After changing the tagline, look at `public/og.png` before committing.

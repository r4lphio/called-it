# Readiness report

Called it went from an empty folder to a public product at https://called-it.labs.quantalchemy.io on 2026-10-27, through the `product-readiness` skill with the request "make it sellable". The plan is `docs/plans/product-readiness/index.html` (https://n1jlf0nqiz6q.postplan.dev).

## Checklist

| Step | Skill | Result | PR |
| --- | --- | --- | --- |
| App | build | Journal, three lists, grading, calibration chart, dev seed | #1 |
| 0 | product-readiness plan | Six skills, in dependency order | #2 |
| 1 | domain-provisioning | https://called-it.labs.quantalchemy.io, TLS by Let's Encrypt | #3 |
| 2 | brand-creation | "Ledger": mark, palette, type, favicons, OG card. See `brand/BRAND.md` | #4 |
| 3 | waitlist-gate | Waitlist sign-up on dev, then production. `/waitlist` page | #5 |
| 4 | landing-page | "The number" landing, terms and privacy drafts, analytics script | #6 |
| 5 | seo-aeo-geo | Per-route heads, JSON-LD, FAQ, robots, sitemap, llms, ai.txt, 11 claim receipts | #7 |
| 6 | production-provisioning | Clerk production instance, Convex prod, Vercel Production, signed-in round trip proven | #8 |

## What is live

- **Hostname:** https://called-it.labs.quantalchemy.io. It serves the production build with valid TLS.
- **Brand:** Ledger. The favicon, icons, manifest, and `/og.png` are live.
- **Waitlist:** the Clerk production instance is in `waitlist` mode. New people request access at `/waitlist`. Existing accounts sign in from the modal. Google sign-in is off until the owner adds production Google credentials.
- **Landing:** server-rendered for crawlers, with two doors, terms, and privacy.
- **SEO audit score:** 28/28 on `/`, and 27/27 on `/waitlist`, `/terms`, and `/privacy`. Before step 5 it was 13/26 live, and 5/25 on the dev server before any step. All 11 claim quotes are on the live pages (`pnpm check:claims`).
- **Production:**
  - The Clerk production instance `ins_3LIxbCOl2lHdObIX0UIfmrOLPJf` has verified DNS, SSL, and mail records in the deSEC zone.
  - Convex prod is `exciting-coyote-510`. Production builds deploy its functions (`vercel.json`).
  - Vercel Production holds the production Clerk keys, the Convex prod URLs, and a deploy key.
  - At 20:57:39 a temporary check user signed in on the production Clerk instance. Clerk issued a `convex` JWT for it, and Convex prod returned that user's empty journal. The same query without a token was refused. The check user was then deleted. Production holds no users and no calls, so nothing was seeded.

## Still manual

- **Legal review** of `/terms` and `/privacy`. Both are drafts.
- **Vercel Web Analytics:** turn it on for the `called-it` project in the dashboard. Vercel has no API for it. The script is in the page and is harmless until then.
- **Owner's production account:** production is in waitlist mode, so Ralph joins through `/waitlist`, or through an invitation from the Clerk dashboard. The dev test user does not exist in production.
- **Google sign-in in production** needs Ralph's own Google OAuth client. It is off until then.
- **Git auto-deploy:** give Vercel's GitHub app access to `r4lphio/called-it`. Until then, deploys run with `vercel deploy --prod`.

## Skipped, and why

- **Quant Alchemy cross-links** (`seo-aeo-geo` sibling routers and the QA switchboard): the brief makes Called it an r4lph.io product and says not to add it to any Quant Alchemy site.
- **The r4lph.io site:** not changed in this run, as the brief asks.
- **Email sender** (`production-provisioning` step 3): the app sends no email. Clerk sends its own, from the verified `clkmail.called-it` records.
- **Brand skill in qa-skills:** the brand record is `brand/BRAND.md` in this repository, because this run touches no other project.
- **The `clerk deploy` wizard:** it needs a terminal. The Platform API call it makes created the production instance instead.

## Follow-ups

- Link Called it from r4lph.io, and list it in an r4lph.io `ai.txt` router if that site gets one.
- Move the Convex project from the Quant Alchemy team to an r4lph.io team if one is created.

## Next decision for the owner

Open the doors: approve the first waitlist entries in the Clerk dashboard, or invite people directly. Do the legal review before the link goes on r4lph.io.

## Totals

| Measure | Value |
| --- | --- |
| Elapsed time | 16:50:04 to the last merge. Through PR #7 (20:43:05): 3 h 53 min 01 s. The figure that includes the PR #8 merge is reported in the thread when it merges. |
| Pull requests | 8 (#1 to #8) |
| Picks | 14 decision entries: 8 merges (Ralph), 3 choices by Ralph or the orchestrating agent (hostname, who picks, Clerk DNS records), and 3 picks by the agent (plan, brand, landing) |
| `seo-aeo-geo` audit score | 28/28 on the live hostname |

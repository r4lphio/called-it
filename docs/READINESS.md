# Readiness checklist

The running checklist for "make it sellable". The plan is `docs/plans/product-readiness/index.html` (https://n1jlf0nqiz6q.postplan.dev).

| Step | Skill | Status | PR |
| --- | --- | --- | --- |
| 0 | product-readiness plan | done | #2 |
| 1 | domain-provisioning | done: https://called-it.labs.quantalchemy.io | #3 |
| 2 | brand-creation | done: "Ledger", see `brand/BRAND.md` | #4 |
| 3 | waitlist-gate | done: dev instance in waitlist mode, `/waitlist` live | #5 |
| 4 | landing-page | done: "The number", terms and privacy drafts | #6 |
| 5 | seo-aeo-geo | done: live audit 28/28 | #7 |
| 6 | production-provisioning | next | |

SEO audit on the dev server before any step: 5 of 25 checks pass. Live after step 5: 28 of 28 on `/`, and 27 of 27 on `/waitlist`, `/terms`, and `/privacy`.

Follow-ups for the owner:

- Turn on Web Analytics for the `called-it` Vercel project. The API has no switch for it.
- Legal review of `/terms` and `/privacy`.
- Link Called it from r4lph.io, and list it in an r4lph.io `ai.txt` router if that site gets one.

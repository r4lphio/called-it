# Hostname

Current: https://called-it.labs.quantalchemy.io (attached 2026-10-27, CNAME in the deSEC zone `labs.quantalchemy.io`)

| Setting | Where | Value | Who updates it |
| --- | --- | --- | --- |
| DNS record | deSEC zone `labs.quantalchemy.io` | `called-it CNAME cname.vercel-dns.com.` | skill (API) |
| Domain | Vercel project `called-it` (quant-alchemy team) | `called-it.labs.quantalchemy.io` | skill (`vercel domains add <host> called-it`) |
| TLS | Vercel | Let's Encrypt certificate, issued on attach | Vercel |
| Clerk allowed origin | Clerk dev instance | none needed, dev accepts any origin | none |
| Clerk production domain | Clerk production instance | `called-it.labs.quantalchemy.io` | skill (Platform API, `POST /v1/platform/applications/{id}/instances`) |
| Clerk DNS records | deSEC zone `labs.quantalchemy.io` | `clerk.called-it`, `accounts.called-it`, `clkmail.called-it`, `clk._domainkey.called-it`, `clk2._domainkey.called-it` (CNAMEs to Clerk) | skill (API) |
| Clerk issuer for Convex | Convex prod `exciting-coyote-510` env `CLERK_JWT_ISSUER_DOMAIN` | https://clerk.called-it.labs.quantalchemy.io | skill (`convex env set --prod`) |
| Site URL | `brand/brand.json` `url`, read by `src/lib/site.ts` | `called-it.labs.quantalchemy.io` | skill (edit, then `pnpm brand:assets`) |
| OG card text | `public/og.png`, generated from `brand/brand.json` | shows the hostname | skill (`pnpm brand:assets`) |
| Crawler and assistant files | `public/robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `ai.txt`, `claim-receipts.json` | absolute URLs on `called-it.labs.quantalchemy.io` | skill (edit each, then `pnpm check:claims`) |

Canonical links, `og:url`, and `twitter:url` come from `src/lib/seo.ts`, which reads the site URL. Production Clerk keys live only in Vercel Production. Preview and local development use the Clerk dev instance.

Deploys run with `vercel deploy --prod` from this repository. Production builds run `convex deploy` first (see `vercel.json`), so deploy production only from an up-to-date `main`. Vercel's GitHub app has no access to this private repository, so pushes do not deploy.

To move: `vercel domains add <new-host> called-it`, then update every row above with the new value.

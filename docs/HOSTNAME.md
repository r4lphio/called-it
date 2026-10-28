# Hostname

Current: https://called-it.labs.quantalchemy.io (attached 2026-10-27, CNAME in the deSEC zone `labs.quantalchemy.io`)

| Setting | Where | Value | Who updates it |
| --- | --- | --- | --- |
| DNS record | deSEC zone `labs.quantalchemy.io` | `called-it CNAME cname.vercel-dns.com.` | skill (API) |
| Domain | Vercel project `called-it` (quant-alchemy team) | `called-it.labs.quantalchemy.io` | skill (`vercel domains add <host> called-it`) |
| TLS | Vercel | Let's Encrypt certificate, issued on attach | Vercel |
| Clerk allowed origin | Clerk dev instance | none needed, dev accepts any origin | none |
| Clerk allowed origin | Clerk production instance (step 6) | https://called-it.labs.quantalchemy.io | skill (Platform API) |
| Site URL | `brand/brand.json` `url`, read by `src/lib/site.ts` | `called-it.labs.quantalchemy.io` | skill (edit, then `pnpm brand:assets`) |
| OG card text | `public/og.png`, generated from `brand/brand.json` | shows the hostname | skill (`pnpm brand:assets`) |

Later steps add more hostname-dependent files: `robots.txt`, `sitemap.xml`, `llms.txt`, and the Clerk production domain records. List each here when it lands.

Deploys run with `vercel deploy --prod` from this repository. Vercel's GitHub app has no access to this private repository, so pushes do not deploy.

To move: `vercel domains add <new-host> called-it`, then update every row above with the new value.

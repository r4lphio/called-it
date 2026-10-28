# Called it

A decision journal for builders. Log a call with a confidence and a due date. Grade it when the date comes. A calibration chart shows how often you were right at each confidence level.

## Stack

TanStack Start, Convex, Clerk, Tailwind, shadcn/ui on Base UI, Vite, pnpm, TypeScript, and zod.

## Run it on localhost

1. Run `pnpm install`.
2. Put the Clerk dev keys in `.env.local` as `VITE_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`. `pnpm dev:convex` adds the Convex values the first time it runs.
3. On the Convex dev deployment, set `CLERK_JWT_ISSUER_DOMAIN` to the Clerk issuer URL. The Clerk instance needs a JWT template named `convex`.
4. Run `pnpm dev:all`. The app opens on http://localhost:3000.

## Production

- Live at https://called-it.labs.quantalchemy.io. `docs/HOSTNAME.md` lists every setting that carries the hostname.
- Clerk production instance with waitlist sign-up. Convex prod deployment `exciting-coyote-510`.
- Deploy with `vercel deploy --prod`. On Vercel, a production build runs `convex deploy --cmd 'pnpm build'` (see `vercel.json`), so the Convex functions ship with the app. Locally, `pnpm build` builds the UI only.
- Production never seeds data: `ALLOW_DEV_SEED` is not set there.

## Sample data

The dev seed adds 20 sample calls for one Clerk user: 17 graded, 1 due, and 2 open. It runs only on a deployment that sets `ALLOW_DEV_SEED=1`. Production never sets it.

```sh
pnpm exec convex env set ALLOW_DEV_SEED 1
pnpm seed '{"userId":"user_..."}'
```

Use the Clerk user ID of the account you sign in with. The Clerk dashboard shows it on the user page.

## Checks

```sh
pnpm typecheck
pnpm test
pnpm build
```

## Records

- `docs/run-log.md` lists each step of the build, its PR, and its merge time.
- `docs/decisions.md` lists each choice the owner made, with the options shown.

# Run log

Times are local (MDT), 2026-10-27. One row per step. Rows marked "Failure" record something that failed during a step and how it was fixed. For those rows, the time is when the fix landed, read from file timestamps.

| Step | Start | PR | Merged | Notes |
| --- | --- | --- | --- | --- |
| App build | 16:50:04 | #1 | 18:11:10 | Repository created with a README on `main` at 16:51:37. |
| Failure: pnpm install | 16:51:51 | | | pnpm blocked the esbuild build script. Fix: allow esbuild in `pnpm-workspace.yaml`. |
| Failure: shadcn imports | 16:52:56 | | | Generated components imported `cn` from a package. Fix: import it from `~/lib/utils`. |
| Failure: Convex project setup | 16:56:10 | | | `convex dev` cannot ask for a team without a terminal. Fix: pass `--team quant-alchemy`. |
| Failure: first Convex push | 16:56:24 | | | `CLERK_JWT_ISSUER_DOMAIN` was not set. Fix: set it from the Clerk dev instance. |
| Failure: Convex typecheck | 17:02:06 | | | Convex functions had no Node types for `process.env`. Fix: add `convex/tsconfig.json`. |
| Failure: Clerk login callback | 18:13:43 | | | The owner's browser could not reach the CLI on `127.0.0.1`. Fix: the owner pasted the callback URL and the agent sent it to the CLI with curl. |
| product-readiness plan | 18:14:12 | #2 | 18:44:12 | Plan: https://n1jlf0nqiz6q.postplan.dev |
| domain-provisioning | 18:44:43 | #3 | 18:52:26 | Live at https://called-it.labs.quantalchemy.io at 18:46:13. |
| Failure: Vercel Git connect | 18:44:50 | | | Vercel's GitHub app cannot see the new private repository. Fix: deploy with `vercel deploy --prod`. |
| Failure: Vercel domain add | 18:45:52 | | | CLI 59 needs the project name as a second argument, unlike the skill's note for 50.x. Fix: `vercel domains add <host> called-it`. |
| brand-creation | 18:52:50 | #4 | 19:15:29 | Picked A "Ledger". Assets live at https://called-it.labs.quantalchemy.io/og.png. |
| Failure: font download hung | 18:54:53 | | | The font download loop did not exit after writing the files. Fix: checked the three TTF headers and moved on. |
| Failure: theme-color dropped | 19:05:27 | | | TanStack keeps one meta per name, so the light theme-color vanished. Fix: render both tags in the document head. |
| waitlist-gate | 19:15:54 | #5 | 19:24:54 | Clerk dev instance set to `waitlist` at 19:16:00. `/waitlist` live. |
| landing-page | 19:25:09 | pending | pending | Picked B "The number". Landing, terms, and privacy live at 19:30:08. |
| Failure: Vercel Web Analytics | about 19:29 | | | No API turns on Web Analytics. Fix: none in this run. The script ships, and turning it on is a follow-up. |

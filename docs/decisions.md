# Decision log

One entry each time the run stops for the owner. Times are local (MDT), 2026-10-27. Each entry is written before the question is asked. The pick and its time are added after the answer.

## 17:07:51 Merge the app PR
- Step: app build
- Question: Merge PR #1 (https://github.com/r4lphio/called-it/pull/1)?
- Options: A merge, B ask for changes
- Pick: A, at 18:11:10

## 17:50:51 Hostname
- Step: product-readiness intake
- Question: Which hostname, `called-it.r4lph.io` (works today on Vercel DNS) or `called-it.labs.quantalchemy.io` (the skill default)?
- Options: A `called-it.r4lph.io`, B `called-it.labs.quantalchemy.io`
- Pick: B, at 17:50:51
- Why: "let's stick to the .labs.quantalchemy.io DNS that the skill uses by default so we're not doing anything different."
- Note: Written after the answer. The question came up in chat, so this entry broke the write-before-asking rule.

## 18:07:39 Who picks, and Clerk login
- Step: product-readiness intake
- Question: Who makes the taste picks and production go-aheads, and will the owner approve the Clerk CLI login?
- Options: A owner picks brand and landing, B agent picks them
- Pick: B, received just before 18:07:39. The owner approved the Clerk login, and the callback reached the CLI at 18:13:43.
- Why: "since this is just a test or rather a run through of the skill it's less important that I make any decisions here so you can go ahead and just pick any decision necessary for the input when running the product provisioning skill." "I shouldn't be needed for anything technical." "for this example you can pick the brand direction and The landing Page direction. So that would just leave me to do PR merges."
- Effect: The agent picks the brand and landing directions and approves its own plan. Production steps for this app run without separate stops. The owner merges each PR.
- Note: Written after the answer, which broke the write-before-asking rule.

## 18:15:34 Product-readiness plan
- Step: product-readiness
- Question: Run the plan as published?
- Options: A run all six skills in order (https://n1jlf0nqiz6q.postplan.dev)
- Pick: A, by the agent at 18:15:34, as the owner asked
- Why: The owner asked the agent to make the intake picks (see 18:07:39). The plan was published at 18:15:34 and revised after review, before this PR opened.

## 18:18:36 Merge the plan PR
- Step: product-readiness
- Question: Merge PR #2 (https://github.com/r4lphio/called-it/pull/2)?
- Options: A merge, B ask for changes
- Pick: A, at 18:44:12

## 18:47:25 Merge the domain PR
- Step: domain-provisioning
- Question: Merge PR #3 (https://github.com/r4lphio/called-it/pull/3)?
- Options: A merge, B ask for changes
- Pick: A, at 18:52:26
- By: orchestrating agent, for Ralph (Ralph merged the PR himself)

## 18:54:53 Brand direction
- Step: brand-creation
- Question: Which brand direction?
- Options: A "Ledger" (https://hlamhisk5r7e.postplan.dev), B "Diagonal" (https://eie1krrcawan.postplan.dev), C "Stamp" (https://9azyh082jney.postplan.dev)
- Pick: A, at 18:54:53
- By: the agent, as Ralph agreed
- Why: The check in a red grading circle still reads at 16 px. It names the core action, grading a call. The paper-and-ink tone fits a journal kept for years. B's dot disappears at 16 px, and the mark reads as a slider. C's speech bubble looks like a chat app.
- Change from the mock: red stays the grading pencil and the "Wrong" color only. Buttons and the selected confidence use ink, because the red button read as a warning.

## 19:06:27 Merge the brand PR
- Step: brand-creation
- Question: Merge PR #4 (https://github.com/r4lphio/called-it/pull/4)?
- Options: A merge, B ask for changes
- Pick: A, at 19:15:29
- By: orchestrating agent, for Ralph (Ralph merged the PR himself)

## 19:17:49 Merge the waitlist PR
- Step: waitlist-gate
- Question: Merge PR #5 (https://github.com/r4lphio/called-it/pull/5)?
- Options: A merge, B ask for changes
- Pick: A, at 19:24:54
- By: orchestrating agent, for Ralph (Ralph merged the PR himself)

## 19:26:42 Landing direction
- Step: landing-page
- Question: Which landing direction?
- Options: A "Product first" (https://xalf41ckwyn2.postplan.dev), B "The number" (https://2o33baj9qx74.postplan.dev), C "The story" (https://u5445csfdz5p.postplan.dev)
- Pick: B, at 19:26:42
- By: the agent, as Ralph agreed
- Why: "At 90 percent sure, you were right 6 in 10" explains calibration before any reading, and calibration is the product. A shows the app but not why it matters. C makes the point only after two paragraphs.
- Change from the mock: eyebrows and step numbers use muted ink. The brand keeps red for the pencil and for misses, so the red "30 points below" gap stays.

## 19:36:39 Merge the landing PR
- Step: landing-page
- Question: Merge PR #6 (https://github.com/r4lphio/called-it/pull/6)?
- Options: A merge, B ask for changes
- Pick: pending

import { ConvexError, v } from "convex/values";
import { internalMutation } from "./_generated/server";
import type { Confidence, Outcome } from "./model";

const DAY = 24 * 60 * 60 * 1000;

type Sample = { statement: string; confidence: Confidence; dueInDays: number; outcome?: Outcome; note?: string };

// 17 graded, 1 due, 2 open. 99% has one graded call, so the chart hides it.
const SAMPLES: Sample[] = [
  { statement: "The landing page gets 50 sign-ups in its first week", confidence: 60, dueInDays: -40, outcome: "wrong", note: "Got 31." },
  { statement: "The new prompt cuts failed runs by half", confidence: 70, dueInDays: -38, outcome: "right" },
  { statement: "Switching to pnpm cuts CI install time under a minute", confidence: 80, dueInDays: -36, outcome: "right" },
  { statement: "The pricing page test lifts paid conversion", confidence: 50, dueInDays: -35, outcome: "wrong" },
  { statement: "We ship the onboarding rewrite before the 15th", confidence: 70, dueInDays: -33, outcome: "wrong", note: "Slipped four days." },
  { statement: "The Postgres upgrade causes no downtime", confidence: 90, dueInDays: -31, outcome: "right" },
  { statement: "Dark mode becomes the top requested feature", confidence: 50, dueInDays: -30, outcome: "right" },
  { statement: "The cold email batch gets a 10% reply rate", confidence: 60, dueInDays: -28, outcome: "right" },
  { statement: "Moving the CTA above the fold lifts clicks", confidence: 80, dueInDays: -26, outcome: "wrong" },
  { statement: "The beta cohort keeps 40% weekly retention", confidence: 70, dueInDays: -24, outcome: "right" },
  { statement: "The new cache drops p95 latency under 200 ms", confidence: 90, dueInDays: -22, outcome: "right" },
  { statement: "The launch post reaches the Hacker News front page", confidence: 50, dueInDays: -20, outcome: "right", note: "Number 7 for two hours." },
  { statement: "The refactor removes the flaky checkout test", confidence: 80, dueInDays: -18, outcome: "right" },
  { statement: "The annual plan takes a third of new subscriptions", confidence: 60, dueInDays: -16, outcome: "right" },
  { statement: "The domain transfer finishes inside 48 hours", confidence: 99, dueInDays: -14, outcome: "right" },
  { statement: "The support macro cuts first reply time by a third", confidence: 70, dueInDays: -12, outcome: "right" },
  { statement: "The SDK release has no breaking change reports", confidence: 90, dueInDays: -10, outcome: "right" },
  { statement: "The webinar gets 100 live attendees", confidence: 60, dueInDays: -2 },
  { statement: "The referral program brings 20 new teams this month", confidence: 70, dueInDays: 12 },
  { statement: "The mobile layout fix cuts bounce rate on phones", confidence: 80, dueInDays: 25 },
];

/**
 * Loads 20 sample calls for one Clerk user so the chart has data on
 * localhost. Refuses unless the deployment sets ALLOW_DEV_SEED=1, which only
 * the dev deployment does. Run with `pnpm seed '{"userId":"user_..."}'`.
 */
export const sampleCalls = internalMutation({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    if (process.env.ALLOW_DEV_SEED !== "1") throw new ConvexError("Seeding is off on this deployment.");
    const now = Date.now();
    for (const sample of SAMPLES) {
      const dueAt = now + sample.dueInDays * DAY;
      await ctx.db.insert("calls", {
        userId,
        statement: sample.statement,
        confidence: sample.confidence,
        dueAt,
        ...(sample.outcome && { outcome: sample.outcome, note: sample.note, gradedAt: dueAt + DAY / 2 }),
      });
    }
    return SAMPLES.length;
  },
});

import { ConvexError, v } from "convex/values";
import type { z } from "zod";
import { mutation, query, type QueryCtx } from "./_generated/server";
import { confidenceValidator, noteSchema, outcomeValidator, statementSchema } from "./model";

/** The Clerk user id of the caller. Throws when nobody is signed in. */
async function requireUserId(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new ConvexError("Sign in first.");
  return identity.subject;
}

/** Turns a zod failure into a message the form can show as is. */
function parse<T>(schema: z.ZodType<T>, value: unknown): T {
  const result = schema.safeParse(value);
  if (!result.success) throw new ConvexError(result.error.issues[0]?.message ?? "Invalid input.");
  return result.data;
}

/**
 * Every call of the signed-in person. Ungraded calls come soonest due first.
 * Graded calls come newest grade first. The client splits ungraded calls into
 * open and due, because a query result must not depend on the clock.
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireUserId(ctx);
    const ungraded = await ctx.db
      .query("calls")
      .withIndex("by_user_outcome_due", (q) => q.eq("userId", userId).eq("outcome", undefined))
      .collect();
    const graded = [
      ...(await ctx.db
        .query("calls")
        .withIndex("by_user_outcome_due", (q) => q.eq("userId", userId).eq("outcome", "right"))
        .collect()),
      ...(await ctx.db
        .query("calls")
        .withIndex("by_user_outcome_due", (q) => q.eq("userId", userId).eq("outcome", "wrong"))
        .collect()),
    ].sort((a, b) => (b.gradedAt ?? 0) - (a.gradedAt ?? 0));
    return { ungraded, graded };
  },
});

export const create = mutation({
  args: { statement: v.string(), confidence: confidenceValidator, dueAt: v.number() },
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const statement = parse(statementSchema, args.statement);
    if (!Number.isFinite(args.dueAt)) throw new ConvexError("Pick a due date.");
    return await ctx.db.insert("calls", { userId, statement, confidence: args.confidence, dueAt: args.dueAt });
  },
});

/** Grades a due call once. The note is optional and one line. */
export const grade = mutation({
  args: { id: v.id("calls"), outcome: outcomeValidator, note: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const call = await ctx.db.get(args.id);
    if (!call || call.userId !== userId) throw new ConvexError("Call not found.");
    if (call.outcome) throw new ConvexError("This call is already graded.");
    const now = Date.now();
    if (call.dueAt > now) throw new ConvexError("This call is not due yet.");
    const note = parse(noteSchema, args.note ?? "");
    await ctx.db.patch(args.id, { outcome: args.outcome, note: note || undefined, gradedAt: now });
  },
});

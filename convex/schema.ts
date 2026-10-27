import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { confidenceValidator, outcomeValidator } from "./model";

export default defineSchema({
  // One row per call. `outcome` stays unset until the owner grades it.
  calls: defineTable({
    userId: v.string(),
    statement: v.string(),
    confidence: confidenceValidator,
    dueAt: v.number(),
    outcome: v.optional(outcomeValidator),
    note: v.optional(v.string()),
    gradedAt: v.optional(v.number()),
  }).index("by_user_outcome_due", ["userId", "outcome", "dueAt"]),
});

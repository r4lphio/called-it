import { v, type Infer } from "convex/values";
import { z } from "zod";

/** The confidence levels a call can carry, in percent. */
export const CONFIDENCE_LEVELS = [50, 60, 70, 80, 90, 99] as const;
export type Confidence = (typeof CONFIDENCE_LEVELS)[number];

export const confidenceValidator = v.union(...CONFIDENCE_LEVELS.map((level) => v.literal(level)));
export const outcomeValidator = v.union(v.literal("right"), v.literal("wrong"));
export type Outcome = Infer<typeof outcomeValidator>;

/** Days until a new call is due when the person does not pick a date. */
export const DEFAULT_DUE_DAYS = 30;

/** A level shows on the chart only after this many graded calls. */
export const MIN_GRADED_PER_LEVEL = 3;

/** Form and server rules for the text a person types. */
export const statementSchema = z.string().trim().min(3, "Write the call in a few words.").max(280, "Keep it under 280 characters.");
export const noteSchema = z
  .string()
  .trim()
  .max(140, "Keep the note to one line.")
  .refine((note) => !/[\r\n]/.test(note), "Keep the note to one line.");

export type LevelResult = {
  confidence: Confidence;
  graded: number;
  right: number;
  /** Share of graded calls that were right, from 0 to 1. Null until the level has MIN_GRADED_PER_LEVEL graded calls. */
  hitRate: number | null;
};

/** Graded and right counts for every confidence level, lowest level first. */
export function calibration(graded: ReadonlyArray<{ confidence: Confidence; outcome?: Outcome }>): LevelResult[] {
  return CONFIDENCE_LEVELS.map((confidence) => {
    const atLevel = graded.filter((call) => call.confidence === confidence && call.outcome);
    const right = atLevel.filter((call) => call.outcome === "right").length;
    const hitRate = atLevel.length >= MIN_GRADED_PER_LEVEL ? right / atLevel.length : null;
    return { confidence, graded: atLevel.length, right, hitRate };
  });
}

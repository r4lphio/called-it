import { convexTest } from "convex-test";
import { describe, expect, it } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");
const DAY = 24 * 60 * 60 * 1000;

function setup() {
  const t = convexTest(schema, modules);
  return { t, ann: t.withIdentity({ subject: "user_ann" }), bob: t.withIdentity({ subject: "user_bob" }) };
}

describe("grade", () => {
  it("grades a due call once, with a trimmed note", async () => {
    const { ann } = setup();
    const id = await ann.mutation(api.calls.create, { statement: "Ships Friday", confidence: 80, dueAt: Date.now() - DAY });
    await ann.mutation(api.calls.grade, { id, outcome: "right", note: "  Shipped Thursday.  " });
    const { graded, ungraded } = await ann.query(api.calls.list, {});
    expect(ungraded).toHaveLength(0);
    expect(graded[0]).toMatchObject({ outcome: "right", note: "Shipped Thursday." });
    await expect(ann.mutation(api.calls.grade, { id, outcome: "wrong" })).rejects.toThrow("already graded");
  });

  it("refuses a call that is not due yet", async () => {
    const { ann } = setup();
    const id = await ann.mutation(api.calls.create, { statement: "Ships Friday", confidence: 80, dueAt: Date.now() + DAY });
    await expect(ann.mutation(api.calls.grade, { id, outcome: "right" })).rejects.toThrow("not due yet");
  });

  it("refuses another person's call", async () => {
    const { ann, bob } = setup();
    const id = await ann.mutation(api.calls.create, { statement: "Ships Friday", confidence: 80, dueAt: Date.now() - DAY });
    await expect(bob.mutation(api.calls.grade, { id, outcome: "right" })).rejects.toThrow("not found");
    expect((await bob.query(api.calls.list, {})).ungraded).toHaveLength(0);
  });

  it("refuses a note with a line break", async () => {
    const { ann } = setup();
    const id = await ann.mutation(api.calls.create, { statement: "Ships Friday", confidence: 80, dueAt: Date.now() - DAY });
    await expect(ann.mutation(api.calls.grade, { id, outcome: "right", note: "one\ntwo" })).rejects.toThrow("one line");
  });
});

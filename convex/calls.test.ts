import { convexTest } from "convex-test";
import { describe, expect, it } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");
const DAY = 24 * 60 * 60 * 1000;

function setup() {
  const t = convexTest(schema, modules);
  // `create` refuses past due dates, so due calls are written directly.
  const insertDue = (userId: string) =>
    t.run((ctx) => ctx.db.insert("calls", { userId, statement: "Ships Friday", confidence: 80, dueAt: Date.now() - DAY }));
  return { ann: t.withIdentity({ subject: "user_ann" }), bob: t.withIdentity({ subject: "user_bob" }), insertDue };
}

describe("create", () => {
  it("refuses a due date that has passed", async () => {
    const { ann } = setup();
    await expect(ann.mutation(api.calls.create, { statement: "Ships Friday", confidence: 80, dueAt: Date.now() - 1 })).rejects.toThrow(
      "after today",
    );
  });
});

describe("grade", () => {
  it("grades a due call once, with a trimmed note", async () => {
    const { ann, insertDue } = setup();
    const id = await insertDue("user_ann");
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
    const { bob, insertDue } = setup();
    const id = await insertDue("user_ann");
    await expect(bob.mutation(api.calls.grade, { id, outcome: "right" })).rejects.toThrow("not found");
    expect((await bob.query(api.calls.list, {})).ungraded).toHaveLength(0);
  });

  it("refuses a note with a line break", async () => {
    const { ann, insertDue } = setup();
    const id = await insertDue("user_ann");
    await expect(ann.mutation(api.calls.grade, { id, outcome: "right", note: "one\ntwo" })).rejects.toThrow("one line");
  });
});

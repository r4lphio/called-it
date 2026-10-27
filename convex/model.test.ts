import { describe, expect, it } from "vitest";
import { calibration, type Confidence, type Outcome } from "./model";

const calls = (confidence: Confidence, outcomes: Outcome[]) => outcomes.map((outcome) => ({ confidence, outcome }));

describe("calibration", () => {
  it("hides a level until it has 3 graded calls", () => {
    const levels = calibration([...calls(80, ["right", "wrong"]), ...calls(90, ["right", "right", "wrong"])]);
    expect(levels.find((level) => level.confidence === 80)).toEqual({ confidence: 80, graded: 2, right: 1, hitRate: null });
    expect(levels.find((level) => level.confidence === 90)?.hitRate).toBeCloseTo(2 / 3);
  });

  it("ignores ungraded calls", () => {
    const levels = calibration([...calls(70, ["right", "right", "right"]), { confidence: 70 }]);
    expect(levels.find((level) => level.confidence === 70)).toMatchObject({ graded: 3, hitRate: 1 });
  });
});

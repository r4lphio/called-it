import { useState } from "react";
import { CONFIDENCE_LEVELS, MIN_GRADED_PER_LEVEL, type Confidence, type LevelResult } from "../../convex/model";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

const WIDTH = 600;
const HEIGHT = 340;
const MARGIN = { top: 20, right: 24, bottom: 48, left: 52 };
const X_MIN = 45;
const X_MAX = 100;
const PLOT_W = WIDTH - MARGIN.left - MARGIN.right;
const PLOT_H = HEIGHT - MARGIN.top - MARGIN.bottom;

const x = (percent: number) => MARGIN.left + ((percent - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
const y = (percent: number) => MARGIN.top + (1 - percent / 100) * PLOT_H;

/**
 * Plots the share of calls that were right (y) against the confidence they
 * were logged at (x). Points on the dashed diagonal are well calibrated.
 * Levels without a hit rate stay off the plot but show in the table.
 */
export function CalibrationChart({ levels }: { levels: LevelResult[] }) {
  const [active, setActive] = useState<Confidence | null>(null);
  const points = levels.flatMap((level) => (level.hitRate === null ? [] : [{ ...level, hitRate: level.hitRate }]));
  const activePoint = points.find((point) => point.confidence === active);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calibration</CardTitle>
        <CardDescription>
          How often you were right at each confidence level. A level shows after {MIN_GRADED_PER_LEVEL} graded calls.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="relative">
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label="Calibration chart. The table below lists the same values.">
            {[0, 25, 50, 75, 100].map((tick) => (
              <g key={tick}>
                <line x1={MARGIN.left} x2={WIDTH - MARGIN.right} y1={y(tick)} y2={y(tick)} className="stroke-border" strokeWidth={1} />
                <text x={MARGIN.left - 10} y={y(tick)} dy="0.32em" textAnchor="end" className="fill-muted-foreground text-[12px] tabular-nums">
                  {tick}%
                </text>
              </g>
            ))}
            {CONFIDENCE_LEVELS.map((level) => (
              <text key={level} x={x(level)} y={HEIGHT - MARGIN.bottom + 20} textAnchor="middle" className="fill-muted-foreground text-[12px] tabular-nums">
                {level}%
              </text>
            ))}
            <text x={MARGIN.left + PLOT_W / 2} y={HEIGHT - 6} textAnchor="middle" className="fill-muted-foreground text-[12px]">
              Expected (your confidence)
            </text>
            <text transform={`translate(14 ${MARGIN.top + PLOT_H / 2}) rotate(-90)`} textAnchor="middle" className="fill-muted-foreground text-[12px]">
              Actually right
            </text>
            <line x1={x(50)} y1={y(50)} x2={x(100)} y2={y(100)} className="stroke-muted-foreground" strokeWidth={1.5} strokeDasharray="4 4" />
            {points.map((point) => {
              const cx = x(point.confidence);
              const cy = y(point.hitRate * 100);
              // The count sits under the point, or above it when the point is on the floor.
              const labelY = point.hitRate < 0.12 ? cy - 14 : cy + 22;
              return (
                <g
                  key={point.confidence}
                  tabIndex={0}
                  role="button"
                  aria-label={`${point.confidence}% confidence: right ${Math.round(point.hitRate * 100)}% of ${point.graded} calls`}
                  onMouseEnter={() => setActive(point.confidence)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(point.confidence)}
                  onBlur={() => setActive(null)}
                  className="outline-none"
                >
                  <circle cx={cx} cy={cy} r={16} fill="transparent" />
                  <circle cx={cx} cy={cy} r={active === point.confidence ? 7 : 5} className="fill-foreground stroke-card" strokeWidth={2} />
                  <text x={cx} y={labelY} textAnchor="middle" className="fill-muted-foreground text-[11px] tabular-nums">
                    n={point.graded}
                  </text>
                </g>
              );
            })}
          </svg>
          {activePoint && (
            <div
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md"
              style={{
                left: `${(x(activePoint.confidence) / WIDTH) * 100}%`,
                top: `calc(${(y(activePoint.hitRate * 100) / HEIGHT) * 100}% - 12px)`,
              }}
            >
              <div className="font-medium">{activePoint.confidence}% confident</div>
              <div className="tabular-nums text-muted-foreground">
                Right {activePoint.right} of {activePoint.graded} ({Math.round(activePoint.hitRate * 100)}%)
              </div>
            </div>
          )}
          {points.length === 0 && (
            <p className="absolute inset-0 grid place-items-center px-8 text-center text-sm text-muted-foreground">
              Grade {MIN_GRADED_PER_LEVEL} calls at one confidence level to see your first point.
            </p>
          )}
        </div>
        <details className="text-sm">
          <summary className="cursor-pointer text-muted-foreground">Show as a table</summary>
          <table className="mt-3 w-full text-left tabular-nums">
            <thead className="text-muted-foreground">
              <tr>
                <th className="py-1 font-normal">Confidence</th>
                <th className="py-1 font-normal">Graded</th>
                <th className="py-1 font-normal">Right</th>
              </tr>
            </thead>
            <tbody>
              {levels.map((level) => (
                <tr key={level.confidence} className="border-t">
                  <td className="py-1">{level.confidence}%</td>
                  <td className="py-1">{level.graded}</td>
                  <td className="py-1">
                    {level.hitRate === null
                      ? `Needs ${MIN_GRADED_PER_LEVEL - level.graded} more`
                      : `${Math.round(level.hitRate * 100)}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </CardContent>
    </Card>
  );
}

import { SignInButton } from "@clerk/tanstack-react-start";
import { Link } from "@tanstack/react-router";
import type { LevelResult } from "../../convex/model";
import { CalibrationPlot } from "~/components/CalibrationChart";
import { PublicPage } from "~/components/SiteChrome";
import { Button, buttonVariants } from "~/components/ui/button";

/**
 * The signed-out front door, direction B "The number" (docs/plans/landing).
 * Every figure here is fixed sample data, never a real account.
 */
const SAMPLE_LEVELS: LevelResult[] = [
  { confidence: 50, graded: 3, right: 2, hitRate: 2 / 3 },
  { confidence: 60, graded: 4, right: 3, hitRate: 3 / 4 },
  { confidence: 70, graded: 8, right: 6, hitRate: 6 / 8 },
  { confidence: 80, graded: 6, right: 4, hitRate: 4 / 6 },
  { confidence: 90, graded: 10, right: 6, hitRate: 6 / 10 },
  { confidence: 99, graded: 1, right: 1, hitRate: null },
];

/** The landing's large buttons: taller than the app's `lg`, as in the mock. */
const HERO_BUTTON = "h-11 px-5 text-base";

const STEPS = [
  { title: "Log the call", body: "Write what you expect, pick 50 to 99 percent, and set a due date. Thirty days by default." },
  { title: "Grade it on the day", body: "When the date comes, mark it right or wrong and add one line about what happened." },
  {
    title: "See your calibration",
    body: "One point per confidence level: how often you were right against how often you expected to be.",
  },
];

export function Landing() {
  return (
    <PublicPage>
      <section className="grid items-center gap-10 py-10 md:grid-cols-2 md:py-16">
        <div>
          <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">A decision journal for builders</p>
          <h1 className="mt-3 font-display text-5xl leading-[1.04] font-semibold tracking-tight md:text-6xl">
            Write down the call. Grade it later.
          </h1>
          <p className="mt-5 max-w-prose text-lg text-muted-foreground">
            Most builders never check their own calls. Called it keeps the score, so you learn what your 90 percent really means.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/waitlist" className={buttonVariants({ size: "lg", className: HERO_BUTTON })}>
              Request access
            </Link>
            <SignInButton mode="modal">
              <Button size="lg" variant="outline" className={HERO_BUTTON}>
                Sign in
              </Button>
            </SignInButton>
          </div>
        </div>
        <figure className="rounded-2xl border bg-card p-6 sm:p-7">
          <p className="text-sm text-muted-foreground">At 90 percent sure, you were right</p>
          <p className="mt-1 font-display text-7xl leading-none font-semibold sm:text-8xl">
            6 <span className="text-4xl text-muted-foreground">in 10</span>
          </p>
          <p className="mt-2 mb-3 text-sm font-semibold text-pencil">30 points below what you expected</p>
          <CalibrationPlot
            levels={SAMPLE_LEVELS}
            highlight={90}
            label="Sample calibration chart. At 90 percent confidence the point sits at 60 percent right, 30 points under the diagonal."
          />
          <figcaption className="mt-1 text-xs text-muted-foreground">Sample numbers, not a real account.</figcaption>
        </figure>
      </section>

      <section aria-labelledby="how" className="py-10">
        <h2 id="how" className="sr-only">
          How it works
        </h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-2xl border bg-card p-6">
              <span className="text-sm font-semibold text-muted-foreground tabular-nums">0{index + 1}</span>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-1.5 text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6 rounded-2xl border bg-card px-6 py-12 text-center">
        <h2 className="font-display text-4xl font-semibold tracking-tight">Start keeping score.</h2>
        <p className="mt-2 text-muted-foreground">Called it opens to a few people at a time.</p>
        <Link to="/waitlist" className={buttonVariants({ size: "lg", className: `mt-6 ${HERO_BUTTON}` })}>
          Request access
        </Link>
      </section>
    </PublicPage>
  );
}

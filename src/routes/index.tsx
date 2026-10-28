import { SignInButton, UserButton } from "@clerk/tanstack-react-start";
import { Link, createFileRoute } from "@tanstack/react-router";
import { AuthLoading, Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { calibration } from "../../convex/model";
import { CalibrationChart } from "~/components/CalibrationChart";
import { CallForm } from "~/components/CallForm";
import { CallLists } from "~/components/CallLists";
import { Logo } from "~/components/Logo";
import { Button, buttonVariants } from "~/components/ui/button";
import { useNow } from "~/lib/dates";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="mx-auto grid max-w-3xl gap-6 px-4 py-6 sm:py-10">
      <header className="flex items-center justify-between">
        <h1>
          <Logo />
        </h1>
        <Authenticated>
          <UserButton />
        </Authenticated>
      </header>
      <AuthLoading>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </AuthLoading>
      <Unauthenticated>
        <SignedOut />
      </Unauthenticated>
      <Authenticated>
        <Journal />
      </Authenticated>
    </div>
  );
}

function SignedOut() {
  return (
    <section className="grid gap-4 py-16 text-center">
      <h2 className="font-display text-4xl font-semibold tracking-tight">Write down the call. Grade it later.</h2>
      <p className="mx-auto max-w-prose text-muted-foreground">
        Log a call with a confidence and a due date. Grade it when the date comes. See how well your confidence matches your results.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/waitlist" className={buttonVariants({ size: "lg" })}>
          Request access
        </Link>
        <SignInButton mode="modal">
          <Button size="lg" variant="outline">
            Sign in
          </Button>
        </SignInButton>
      </div>
    </section>
  );
}

function Journal() {
  const calls = useQuery(api.calls.list);
  const now = useNow();
  if (!calls) return <p className="text-sm text-muted-foreground">Loading your calls...</p>;

  return (
    <>
      <CallForm />
      <CallLists ungraded={calls.ungraded} graded={calls.graded} now={now} />
      <CalibrationChart levels={calibration(calls.graded)} />
    </>
  );
}

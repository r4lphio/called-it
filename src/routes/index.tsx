import { UserButton, useAuth } from "@clerk/tanstack-react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { AuthLoading, Authenticated, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { calibration } from "../../convex/model";
import { CalibrationChart } from "~/components/CalibrationChart";
import { CallForm } from "~/components/CallForm";
import { CallLists } from "~/components/CallLists";
import { Landing } from "~/components/Landing";
import { Logo } from "~/components/Logo";
import { useNow } from "~/lib/dates";

/** Whether the request carries a Clerk session, so the server renders the right page. */
const getSignedIn = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await auth();
  return userId !== null;
});

export const Route = createFileRoute("/")({
  beforeLoad: async () => ({ signedInOnServer: await getSignedIn() }),
  component: Home,
});

/**
 * Strangers get the landing page, rendered on the server for crawlers.
 * Once Clerk loads in the browser, its live state wins, so signing in from
 * the modal swaps to the journal without a reload.
 */
function Home() {
  const { signedInOnServer } = Route.useRouteContext();
  const { isLoaded, isSignedIn } = useAuth();
  const signedIn = isLoaded ? isSignedIn : signedInOnServer;
  return signedIn ? <AppShell /> : <Landing />;
}

function AppShell() {
  return (
    <div className="mx-auto grid max-w-3xl gap-6 px-4 py-6 sm:py-10">
      <header className="flex items-center justify-between">
        <h1>
          <Logo />
        </h1>
        <UserButton />
      </header>
      <AuthLoading>
        <p className="text-sm text-muted-foreground">Loading your calls...</p>
      </AuthLoading>
      <Authenticated>
        <Journal />
      </Authenticated>
    </div>
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

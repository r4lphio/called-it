import { UserButton, useAuth } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { AuthLoading, Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { calibration } from "../../convex/model";
import { CalibrationChart } from "~/components/CalibrationChart";
import { CallForm } from "~/components/CallForm";
import { CallLists } from "~/components/CallLists";
import { Landing } from "~/components/Landing";
import { Logo } from "~/components/Logo";
import { SiteFooter } from "~/components/SiteChrome";
import { useNow } from "~/lib/dates";
import { FAQ } from "~/lib/faq";
import { pageHead } from "~/lib/seo";
import { SITE_NAME } from "~/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead({ title: SITE_NAME, path: "/" }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

/**
 * Strangers get the landing page, signed-in people get the journal. Clerk's
 * middleware hands its auth state to ClerkProvider during server rendering,
 * so useAuth() is already settled on the server and crawlers get the landing.
 */
function Home() {
  const { isSignedIn } = useAuth();
  return isSignedIn ? <AppShell /> : <Landing />;
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
      {/* Clerk says signed in but Convex refused the token. Say so instead of showing nothing. */}
      <Unauthenticated>
        <p role="alert" className="text-sm text-muted-foreground">
          Your journal could not load. Sign out from the menu above and sign in again.
        </p>
      </Unauthenticated>
      <SiteFooter />
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

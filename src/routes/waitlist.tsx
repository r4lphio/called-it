import { Waitlist } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "~/lib/seo";
import { PublicPage } from "~/components/SiteChrome";

export const Route = createFileRoute("/waitlist")({
  head: () =>
    pageHead({
      title: "Request access",
      description: "Join the Called it waitlist. Called it opens to a few people at a time, and invitations go out by email.",
      path: "/waitlist",
    }),
  component: WaitlistPage,
});

/** Clerk's waitlist form. New people land here while sign-up is closed. */
function WaitlistPage() {
  return (
    <PublicPage>
      <section className="grid justify-items-center gap-6 py-10 text-center">
        <div className="grid gap-3">
          <h1 className="font-display text-4xl font-semibold tracking-tight">Request access</h1>
          <p className="mx-auto max-w-prose text-muted-foreground">
            Called it opens to a few people at a time. Leave your email and we will send an invitation when there is room.
          </p>
        </div>
        <Waitlist signInUrl="/" />
      </section>
    </PublicPage>
  );
}

import { Waitlist } from "@clerk/tanstack-react-start";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Logo } from "~/components/Logo";

export const Route = createFileRoute("/waitlist")({
  head: () => ({ meta: [{ title: "Request access · Called it" }] }),
  component: WaitlistPage,
});

/** Clerk's waitlist form. New people land here while sign-up is closed. */
function WaitlistPage() {
  return (
    <div className="mx-auto grid max-w-3xl gap-10 px-4 py-6 sm:py-10">
      <header>
        <Link to="/" aria-label="Called it home">
          <Logo />
        </Link>
      </header>
      <section className="grid justify-items-center gap-6 text-center">
        <div className="grid gap-3">
          <h1 className="font-display text-4xl font-semibold tracking-tight">Request access</h1>
          <p className="mx-auto max-w-prose text-muted-foreground">
            Called it opens to a few people at a time. Leave your email and we will send an invitation when there is room.
          </p>
        </div>
        <Waitlist signInUrl="/" />
      </section>
    </div>
  );
}

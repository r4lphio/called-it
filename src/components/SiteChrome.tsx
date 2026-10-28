import { SignInButton, useAuth } from "@clerk/tanstack-react-start";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Logo } from "~/components/Logo";
import { Button, buttonVariants } from "~/components/ui/button";

/** The public pages' top bar: the logo and the two doors, or a way back to the journal. */
export function SiteNav() {
  const { isSignedIn } = useAuth();
  return (
    <nav className="flex items-center justify-between gap-4 py-5">
      <Link to="/" aria-label="Called it home">
        <Logo />
      </Link>
      {isSignedIn ? (
        <Link to="/" className={buttonVariants()}>
          Open journal
        </Link>
      ) : (
        <div className="flex items-center gap-2">
          <SignInButton mode="modal">
            <Button variant="outline">Sign in</Button>
          </SignInButton>
          <Link to="/waitlist" className={buttonVariants({ className: "max-sm:hidden" })}>
            Request access
          </Link>
        </div>
      )}
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 flex flex-wrap justify-between gap-4 border-t py-8 text-sm text-muted-foreground">
      <span>© 2026 Called it, an r4lph.io product</span>
      <span className="flex gap-5">
        <Link to="/terms" className="hover:text-foreground">
          Terms
        </Link>
        <Link to="/privacy" className="hover:text-foreground">
          Privacy
        </Link>
      </span>
    </footer>
  );
}

/** Nav, content, and footer for every signed-out page. */
export function PublicPage({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

/** Terms and privacy: one readable column with a draft notice. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <PublicPage>
      <article className="mx-auto max-w-prose py-10 [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_li]:mt-1 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
        <h1 className="font-display text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">Last updated {updated}. Draft, pending legal review.</p>
        {children}
      </article>
    </PublicPage>
  );
}

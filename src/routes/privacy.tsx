import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "~/lib/seo";
import { LegalPage } from "~/components/SiteChrome";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy",
      description: "What Called it collects, which providers handle it, and what never leaves your account.",
      path: "/privacy",
    }),
  component: Privacy,
});

// Draft in plain language from what the product does. Owner's legal review pending.
function Privacy() {
  return (
    <LegalPage title="Privacy" updated="October 27, 2026">
      <p>This page says what Called it collects, who handles it, and what never leaves.</p>
      <h2>What we collect</h2>
      <ul>
        <li>
          Your account: email address and name, for sign-in. Clerk handles sign-in and the waitlist, and may run a Cloudflare
          bot check on those forms.
        </li>
        <li>Your journal: each call, its confidence, due date, grade, and note. Convex stores it.</li>
        <li>
          Visits: page views counted by Vercel Web Analytics. It uses no cookies and does not identify you across sites. Vercel
          also hosts the site, including its fonts, so no font request goes to Google.
        </li>
      </ul>
      <h2>What never leaves</h2>
      <ul>
        <li>We do not sell your data or use it for ads.</li>
        <li>Your calls are visible to you only. No other user can read them.</li>
        <li>We do not send your journal to AI models or other third parties.</li>
      </ul>
      <h2>Email</h2>
      <p>Clerk sends sign-in codes, the waitlist confirmation, and your invitation. We send no newsletters.</p>
      <h2>Keeping and deleting</h2>
      <p>
        We keep your journal while your account is open. To delete your account and journal, ask the operator through{" "}
        <a href="https://r4lph.io" className="underline">
          r4lph.io
        </a>
        .
      </p>
      <h2>Changes</h2>
      <p>We will update this page when our practice changes and show the date at the top.</p>
    </LegalPage>
  );
}

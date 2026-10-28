import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "~/components/SiteChrome";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms · Called it" }] }),
  component: Terms,
});

// Draft in plain language from what the product does. Owner's legal review pending.
function Terms() {
  return (
    <LegalPage title="Terms" updated="October 27, 2026">
      <p>These terms cover your use of Called it, a decision journal run by r4lph.io. By using it, you agree to them.</p>
      <h2>Access</h2>
      <p>
        Called it opens by invitation. You can ask for access on the waitlist. We may decline a request or close an account that
        breaks these terms.
      </p>
      <h2>Your content</h2>
      <p>
        You own the calls, grades, and notes you write. You give us permission to store and show them to you, which is what the
        service does. We do not publish them or share them with other users.
      </p>
      <h2>Acceptable use</h2>
      <ul>
        <li>Do not use Called it to store anything unlawful or anything you have no right to store.</li>
        <li>Do not try to reach other people's data, overload the service, or get around its limits.</li>
      </ul>
      <h2>No advice</h2>
      <p>
        Called it records your own calls and shows how they turned out. It does not give financial, legal, or other professional
        advice, and its charts are not predictions.
      </p>
      <h2>The service as is</h2>
      <p>
        Called it is an early product. It may change, pause, or stop. We provide it as is, without warranties, and to the extent
        the law allows we are not liable for indirect losses from using it.
      </p>
      <h2>Changes</h2>
      <p>We will update this page when the terms change and show the date at the top.</p>
      <h2>Contact</h2>
      <p>
        Questions go to the operator through <a href="https://r4lph.io" className="underline">r4lph.io</a>.
      </p>
    </LegalPage>
  );
}

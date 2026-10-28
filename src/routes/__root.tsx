/// <reference types="vite/client" />
import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start";
import { Analytics } from "@vercel/analytics/react";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext, useRouteContext } from "@tanstack/react-router";
import type { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { ComponentProps, ReactNode } from "react";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL, THEME_COLOR, THEME_COLOR_DARK } from "~/lib/site";
import appCss from "../styles.css?url";

/** Clerk's sign-in modal and user menu in the Ledger tokens (light theme). */
const clerkAppearance = {
  variables: {
    colorBackground: "#fffdf8",
    colorInput: "#fffdf8",
    colorForeground: "#1d1b16",
    colorMutedForeground: "#5b564c",
    colorInputForeground: "#1d1b16",
    colorPrimary: "#1d1b16",
    colorDanger: "#c8402b",
    colorSuccess: "#2f7a55",
    borderRadius: "0.75rem",
    fontFamily: '"Inter Variable", system-ui, sans-serif',
  },
} satisfies ComponentProps<typeof ClerkProvider>["appearance"];

export const Route = createRootRouteWithContext<{ convexClient: ConvexReactClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_NAME },
      { name: "description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: `${SITE_NAME}: ${SITE_TAGLINE}` },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/og.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${SITE_NAME}: ${SITE_TAGLINE}` },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: `${SITE_URL}/og.png` },
    ],
    links: [
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "stylesheet", href: appCss },
    ],
    // Who makes Called it and what it is, for search and answer engines.
    // Only facts the pages state: no ratings, prices, or counts.
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", "@id": "https://r4lph.io/#org", name: "r4lph.io", url: "https://r4lph.io" },
            {
              "@type": "SoftwareApplication",
              "@id": `${SITE_URL}/#app`,
              name: SITE_NAME,
              url: SITE_URL,
              description: SITE_DESCRIPTION,
              applicationCategory: "ProductivityApplication",
              operatingSystem: "Web",
              image: `${SITE_URL}/og.png`,
              publisher: { "@id": "https://r4lph.io/#org" },
              // Waitlist only for now, so the offer is a pre-order with no price.
              offers: { "@type": "Offer", availability: "https://schema.org/PreOrder", url: `${SITE_URL}/waitlist` },
            },
            { "@type": "WebSite", "@id": `${SITE_URL}/#site`, name: SITE_NAME, url: SITE_URL, publisher: { "@id": "https://r4lph.io/#org" } },
          ],
        }),
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  const { convexClient } = useRouteContext({ from: Route.id });
  return (
    <ClerkProvider appearance={clerkAppearance} waitlistUrl="/waitlist">
      <ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
        <RootDocument>
          <Outlet />
        </RootDocument>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Here, not in head(): TanStack keeps one meta per name, and these two differ by media. */}
        <meta name="theme-color" content={THEME_COLOR} media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content={THEME_COLOR_DARK} media="(prefers-color-scheme: dark)" />
      </head>
      <body>
        {children}
        <Analytics />
        <Scripts />
      </body>
    </html>
  );
}

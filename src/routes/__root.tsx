/// <reference types="vite/client" />
import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext, useRouteContext } from "@tanstack/react-router";
import type { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { ReactNode } from "react";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL, THEME_COLOR } from "~/lib/site";
import appCss from "../styles.css?url";

/** Clerk's sign-in modal and user menu in the Ledger tokens (light theme). */
const clerkAppearance = {
  variables: {
    colorBackground: "#fffdf8",
    colorInputBackground: "#fffdf8",
    colorText: "#1d1b16",
    colorTextSecondary: "#5b564c",
    colorInputText: "#1d1b16",
    colorPrimary: "#1d1b16",
    colorDanger: "#c8402b",
    colorSuccess: "#2f7a55",
    borderRadius: "0.75rem",
    fontFamily: '"Inter", system-ui, sans-serif',
  },
};

export const Route = createRootRouteWithContext<{ convexClient: ConvexReactClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_NAME },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "theme-color", content: THEME_COLOR },
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
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Newsreader:opsz,wght@6..72,600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  const { convexClient } = useRouteContext({ from: Route.id });
  return (
    <ClerkProvider appearance={clerkAppearance}>
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
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

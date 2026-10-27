/// <reference types="vite/client" />
import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext, useRouteContext } from "@tanstack/react-router";
import type { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { ReactNode } from "react";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{ convexClient: ConvexReactClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Called it" },
      { name: "description", content: "A decision journal for builders. Log a call, grade it, and see how well calibrated you are." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  const { convexClient } = useRouteContext({ from: Route.id });
  return (
    <ClerkProvider>
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

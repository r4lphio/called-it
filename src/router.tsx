import { createRouter } from "@tanstack/react-router";
import { ConvexReactClient } from "convex/react";
import { routeTree } from "./routeTree.gen";

/** Builds the router for the server and the browser, with one Convex client. */
export function getRouter() {
  const convexUrl = import.meta.env.VITE_CONVEX_URL;
  if (!convexUrl) throw new Error("VITE_CONVEX_URL is not set");
  const convexClient = new ConvexReactClient(convexUrl, { unsavedChangesWarning: false });

  return createRouter({
    routeTree,
    context: { convexClient },
    defaultPreload: "intent",
    scrollRestoration: true,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

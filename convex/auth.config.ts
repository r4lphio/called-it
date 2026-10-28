import type { AuthConfig } from "convex/server";

/**
 * Points Convex at the Clerk instance that issues our JWTs. The issuer domain
 * is set on the Convex deployment. The applicationID must match the name of
 * the Clerk JWT template ("convex").
 */
export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!,
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;

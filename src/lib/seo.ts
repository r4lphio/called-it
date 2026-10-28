import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "~/lib/site";

/**
 * Per-route head: title, description, canonical, and the Open Graph and
 * Twitter copies of each. Child routes win over the root's defaults because
 * TanStack keeps the first meta per name, and child routes come first.
 */
export function pageHead({
  title,
  description = SITE_DESCRIPTION,
  path,
  noindex = false,
}: {
  title: string;
  description?: string;
  path: `/${string}`;
  noindex?: boolean;
}) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const fullTitle = title === SITE_NAME ? title : `${title} · ${SITE_NAME}`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:url", content: url },
      ...(noindex ? [{ name: "robots", content: "noindex" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

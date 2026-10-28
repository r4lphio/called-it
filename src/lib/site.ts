import brand from "../../brand/brand.json";

/** Site-wide names and URLs. The hostname lives in brand/brand.json and docs/HOSTNAME.md. */
export const SITE_NAME = brand.name;
export const SITE_TAGLINE = brand.tagline;
export const SITE_DESCRIPTION = brand.description;
export const SITE_URL = `https://${brand.url}`;
export const THEME_COLOR = brand.themeColor;
/** The dark paper from src/styles.css, for the browser bar in dark mode. */
export const THEME_COLOR_DARK = brand.themeColorDark;

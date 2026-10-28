// Checks that every quote in public/claim-receipts.json appears word for word
// on its page. Run with `pnpm check:claims [origin]`; the origin defaults to the
// live site, and http://localhost:3000 checks the dev server instead.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

type Receipts = { site: string; claims: Array<{ id: string; evidence: Array<{ publicUrl: string; quote: string }> }> };

const receipts: Receipts = JSON.parse(readFileSync(resolve(import.meta.dirname, "../public/claim-receipts.json"), "utf8"));
const origin = process.argv[2] ?? receipts.site;

/** Page text with tags removed, entities decoded, and whitespace collapsed. */
function pageText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
}

const pages = new Map<string, string>();
let failed = 0;
for (const claim of receipts.claims) {
  for (const { publicUrl, quote } of claim.evidence) {
    const url = publicUrl.replace(receipts.site, origin);
    if (!pages.has(url)) pages.set(url, pageText(await (await fetch(url)).text()));
    const found = pages.get(url)!.includes(quote);
    if (!found) failed++;
    console.log(`${found ? "PASS" : "FAIL"} ${claim.id}: ${url}`);
  }
}
console.log(`${receipts.claims.length - failed}/${receipts.claims.length} quotes found`);
process.exit(failed ? 1 : 0);

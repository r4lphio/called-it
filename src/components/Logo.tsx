/** The Called it mark and wordmark, as used in the app bar. */
export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img src="/favicon.svg" alt="" width={26} height={26} className="size-[26px]" />
      <span className="font-display text-2xl leading-none font-semibold tracking-tight">Called it</span>
    </span>
  );
}

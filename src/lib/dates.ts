import { useEffect, useState } from "react";

const DAY = 24 * 60 * 60 * 1000;

/** `YYYY-MM-DD` for a local date, as a date input expects. */
export function toDateInput(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Local midnight of a `YYYY-MM-DD` value. A call becomes due at this time. */
export function fromDateInput(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year ?? NaN, (month ?? NaN) - 1, day ?? NaN).getTime();
}

export function daysFromToday(days: number) {
  const today = new Date();
  return toDateInput(new Date(today.getFullYear(), today.getMonth(), today.getDate() + days));
}

export function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/** "in 3 days", "today", "2 days ago", counted in whole local days. */
export function relativeDays(ms: number, now: number) {
  const startOf = (t: number) => new Date(new Date(t).toDateString()).getTime();
  const days = Math.round((startOf(ms) - startOf(now)) / DAY);
  if (days === 0) return "today";
  if (days === 1) return "tomorrow";
  if (days === -1) return "yesterday";
  return days > 0 ? `in ${days} days` : `${-days} days ago`;
}

/** The current time, refreshed each minute so open calls move to due on time. */
export function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

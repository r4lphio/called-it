import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";
import { noteSchema, type Outcome } from "../../convex/model";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { formatDate, relativeDays } from "~/lib/dates";

type Call = Doc<"calls">;

/**
 * The three lists: open (not due yet), due for grading, and graded.
 * `ungraded` comes sorted by due date, so both splits keep that order.
 */
export function CallLists({ ungraded, graded, now }: { ungraded: Call[]; graded: Call[]; now: number }) {
  const due = ungraded.filter((call) => call.dueAt <= now);
  const open = ungraded.filter((call) => call.dueAt > now);
  const [tab, setTab] = useState(due.length > 0 ? "due" : "open");

  return (
    <Tabs value={tab} onValueChange={(value) => setTab(String(value))}>
      <TabsList>
        <TabsTrigger value="open">Open {open.length}</TabsTrigger>
        <TabsTrigger value="due">Due {due.length}</TabsTrigger>
        <TabsTrigger value="graded">Graded {graded.length}</TabsTrigger>
      </TabsList>
      <TabsContent value="open">
        <CallList calls={open} empty="No open calls. Log one above.">
          {(call) => <span className="text-sm text-muted-foreground">Due {relativeDays(call.dueAt, now)}</span>}
        </CallList>
      </TabsContent>
      <TabsContent value="due">
        <CallList calls={due} empty="Nothing to grade. Calls show here on their due date.">
          {(call) => <GradeForm call={call} now={now} />}
        </CallList>
      </TabsContent>
      <TabsContent value="graded">
        <CallList calls={graded} empty="No graded calls yet.">
          {(call) => <GradedResult call={call} />}
        </CallList>
      </TabsContent>
    </Tabs>
  );
}

function CallList({ calls, empty, children }: { calls: Call[]; empty: string; children: (call: Call) => React.ReactNode }) {
  if (calls.length === 0) return <p className="py-8 text-center text-sm text-muted-foreground">{empty}</p>;
  return (
    <ul className="divide-y rounded-xl border bg-card">
      {calls.map((call) => (
        <li key={call._id} className="grid gap-3 p-4">
          <div className="flex items-start justify-between gap-4">
            <p className="font-medium">{call.statement}</p>
            <Badge variant="outline" className="shrink-0 tabular-nums">
              {call.confidence}%
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-sm text-muted-foreground">{formatDate(call.dueAt)}</span>
            {children(call)}
          </div>
        </li>
      ))}
    </ul>
  );
}

function GradeForm({ call, now }: { call: Call; now: number }) {
  const grade = useMutation(api.calls.grade);
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function submit(outcome: Outcome) {
    const parsed = noteSchema.safeParse(note);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the note.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await grade({ id: call._id, outcome, note: parsed.data || undefined });
    } catch (err) {
      setError(err instanceof ConvexError ? String(err.data) : "Could not save the grade. Try again.");
      setSaving(false);
    }
  }

  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Due {relativeDays(call.dueAt, now)}</span>
      <Input
        aria-label={`Note for "${call.statement}"`}
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Optional note"
        maxLength={140}
        className="min-w-48 flex-1"
      />
      <Button variant="outline" disabled={saving} onClick={() => submit("right")}>
        <Check className="text-hit" /> Right
      </Button>
      <Button variant="outline" disabled={saving} onClick={() => submit("wrong")}>
        <X className="text-miss" /> Wrong
      </Button>
      {error && (
        <p role="alert" className="w-full text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function GradedResult({ call }: { call: Call }) {
  const right = call.outcome === "right";
  return (
    <>
      <span className="inline-flex items-center gap-1 text-sm font-medium">
        {right ? <Check className="size-4 text-hit" /> : <X className="size-4 text-miss" />}
        {right ? "Right" : "Wrong"}
      </span>
      {call.note && <span className="text-sm text-muted-foreground">{call.note}</span>}
    </>
  );
}

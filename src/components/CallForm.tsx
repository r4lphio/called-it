import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { api } from "../../convex/_generated/api";
import { CONFIDENCE_LEVELS, DEFAULT_DUE_DAYS, statementSchema, type Confidence } from "../../convex/model";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { daysFromToday, fromDateInput } from "~/lib/dates";

const formSchema = z.object({
  statement: statementSchema,
  due: z
    .string()
    .min(1, "Pick a due date.")
    .refine((value) => value >= daysFromToday(1), "Pick a date after today."),
});

/** Logs a new call: the statement, a confidence, and a due date. */
export function CallForm() {
  const create = useMutation(api.calls.create);
  const [statement, setStatement] = useState("");
  const [confidence, setConfidence] = useState<Confidence>(70);
  const [due, setDue] = useState(() => daysFromToday(DEFAULT_DUE_DAYS));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = formSchema.safeParse({ statement, due });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the form.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await create({ statement: parsed.data.statement, confidence, dueAt: fromDateInput(parsed.data.due) });
      setStatement("");
      setDue(daysFromToday(DEFAULT_DUE_DAYS));
    } catch (err) {
      setError(err instanceof ConvexError ? String(err.data) : "Could not save the call. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log a call</CardTitle>
        <CardDescription>Write something you can grade right or wrong on the due date.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-5" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="statement">The call</Label>
            <Input
              id="statement"
              value={statement}
              onChange={(event) => setStatement(event.target.value)}
              placeholder="This landing page gets 50 sign-ups in a week"
              maxLength={280}
              autoComplete="off"
            />
          </div>
          <div className="grid gap-2">
            <Label id="confidence-label">Confidence</Label>
            <ToggleGroup
              aria-labelledby="confidence-label"
              variant="outline"
              value={[String(confidence)]}
              onValueChange={(values) => {
                const next = CONFIDENCE_LEVELS.find((level) => String(level) === values[0]);
                if (next) setConfidence(next);
              }}
              className="flex-wrap"
            >
              {CONFIDENCE_LEVELS.map((level) => (
                <ToggleGroupItem key={level} value={String(level)} className="tabular-nums">
                  {level}%
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="grid gap-2 sm:max-w-56">
            <Label htmlFor="due">Due date</Label>
            <Input id="due" type="date" value={due} min={daysFromToday(1)} onChange={(event) => setDue(event.target.value)} />
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <div>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Log call"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

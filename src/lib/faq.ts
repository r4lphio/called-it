/** Questions a stranger asks before joining. Rendered on the landing page and as FAQPage JSON-LD. */
export const FAQ = [
  {
    question: "What is Called it?",
    answer:
      "Called it is a decision journal for builders. You log a call with a confidence and a due date, grade it right or wrong when the date comes, and see how often you were right at each confidence level.",
  },
  {
    question: "What counts as a call?",
    answer:
      "Any claim you can grade right or wrong on a date. For example: this landing page gets 50 sign-ups in a week, or the new prompt cuts failed runs by half.",
  },
  {
    question: "What does the calibration chart show?",
    answer:
      "One point per confidence level: the share of calls you got right against the share you expected. A level appears after 3 graded calls.",
  },
  {
    question: "How do I get access?",
    answer: "Called it opens to a few people at a time. Request access on the waitlist, and an invitation comes by email when there is room.",
  },
  {
    question: "Who can see my calls?",
    answer: "Only you. Your calls are private to your account, and Called it does not sell your data or use it for ads.",
  },
] as const;

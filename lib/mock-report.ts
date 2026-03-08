import { IntakeInput, ReadinessReport } from "@/lib/types";

export function createMockReport(input: IntakeInput): ReadinessReport {
  const missingItems = input.role === "seller"
    ? [
        "Property details and recent upgrades summary",
        "Disclosure packet checklist",
        "Target timeline for photos, listing prep, and market launch"
      ]
    : [
        "Proof of funds or pre-approval",
        "Preferred neighborhoods and non-negotiables",
        "Decision timeline and showing availability"
      ];

  return {
    readinessScore: 72,
    summary: `${input.fullName} appears directionally ready to move forward, but the current process would benefit from a clearer checklist, a missing-document plan, and an explicit escalation path for licensed or legal questions.`,
    nextSteps: [
      "Finalize a simple transaction checklist with dates.",
      "Collect the top missing items before the next milestone.",
      "Use AI-generated follow-ups to reduce manual coordination.",
      "Escalate negotiation, pricing, and legal questions to a licensed professional."
    ],
    missingItems,
    humanEscalations: [
      "Pricing strategy",
      "Contract interpretation",
      "Negotiation decisions",
      `Any ${input.state}-specific compliance question`
    ]
  };
}

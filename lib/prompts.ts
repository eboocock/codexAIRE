import { IntakeInput } from "@/lib/types";

export function readinessPrompt(input: IntakeInput) {
  return `
You are helping create a first-pass real estate transaction readiness report.

User role: ${input.role}
Name: ${input.fullName}
Email: ${input.email}
Address/market: ${input.address}
State: ${input.state}
Timeline: ${input.timeline}
Goals: ${input.goals}
Pain points: ${input.painPoints}

Rules:
- Be practical and concise.
- Do not give legal advice.
- Do not give pricing advice.
- Include clear next steps.
- Include issues that should be escalated to a licensed professional.
`;
}

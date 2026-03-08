import OpenAI from "openai";
import { createMockReport } from "@/lib/mock-report";
import { readinessPrompt } from "@/lib/prompts";
import { IntakeInput, ReadinessReport } from "@/lib/types";

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

export async function createReadinessReport(input: IntakeInput): Promise<ReadinessReport> {
  const client = getClient();
  if (!client) {
    return createMockReport(input);
  }

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-5-mini",
    input: readinessPrompt(input),
    text: {
      format: {
        type: "json_schema",
        name: "readiness_report",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            readinessScore: { type: "number" },
            summary: { type: "string" },
            nextSteps: { type: "array", items: { type: "string" } },
            missingItems: { type: "array", items: { type: "string" } },
            humanEscalations: { type: "array", items: { type: "string" } }
          },
          required: ["readinessScore", "summary", "nextSteps", "missingItems", "humanEscalations"]
        }
      }
    }
  });

  const text = response.output_text;
  return JSON.parse(text) as ReadinessReport;
}

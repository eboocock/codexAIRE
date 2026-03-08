import { NextResponse } from "next/server";
import { z } from "zod";
import { runMcpTool } from "@/lib/mcp/client";

const schema = z.object({
  audience: z.string(),
  dealStage: z.string(),
  missingItems: z.array(z.string()),
  tone: z.string().default("clear")
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const result = await runMcpTool("draft_transaction_followup", body);
    return NextResponse.json({ result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

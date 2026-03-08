import { NextResponse } from "next/server";
import { z } from "zod";
import { runMcpTool } from "@/lib/mcp/client";

const schema = z.object({
  audience: z.string(),
  missingItems: z.array(z.string()),
  deadline: z.string()
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const result = await runMcpTool("create_document_chase_plan", body);
    return NextResponse.json({ result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

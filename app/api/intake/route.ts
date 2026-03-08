import { NextResponse } from "next/server";
import { intakeSchema } from "@/lib/validation";
import { createReadinessReport } from "@/lib/openai";
import { createRepository } from "@/lib/repository";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = intakeSchema.parse(body);
    const report = await createReadinessReport(parsed);

    const repository = createRepository();
    await repository.saveReport({
      email: parsed.email,
      role: parsed.role,
      fullName: parsed.fullName,
      address: parsed.address,
      state: parsed.state,
      report
    });

    return NextResponse.json({ report });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

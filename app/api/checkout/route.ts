import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe } from "@/lib/stripe";

const schema = z.object({ plan: z.enum(["fsbo", "agent"]) });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { plan } = schema.parse(body);
    const stripe = getStripe();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    if (!stripe) {
      return NextResponse.json({ url: `${appUrl}/success?demo=1` });
    }

    const priceId = plan === "fsbo" ? process.env.STRIPE_FSBO_PRICE_ID : process.env.STRIPE_AGENT_PRICE_ID;
    if (!priceId) {
      return NextResponse.json({ error: `Missing Stripe price id for ${plan}.` }, { status: 400 });
    }

    const mode = plan === "agent" ? "subscription" : "payment";

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing?canceled=1`,
      metadata: { plan }
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

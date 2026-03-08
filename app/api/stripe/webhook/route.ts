import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createRepository } from "@/lib/repository";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json({ received: true, skipped: true });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  try {
    const body = await request.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    const repository = createRepository();

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await repository.upsertSubscription({
        customerEmail: session.customer_details?.email || session.customer_email || "unknown@example.com",
        status: "active",
        stripeCustomerId: typeof session.customer === "string" ? session.customer : undefined,
        stripeSubscriptionId: typeof session.subscription === "string" ? session.subscription : undefined,
        plan: session.metadata?.plan || "fsbo"
      });
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      await repository.deactivateSubscription(typeof subscription.customer === "string" ? subscription.customer : "");
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook verification failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

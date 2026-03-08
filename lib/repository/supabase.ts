import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import { ReadinessReport, SubscriptionRecord } from "@/lib/types";

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

export class SupabaseRepository {
  async saveReport(input: { email: string; role: string; fullName: string; address: string; state: string; report: ReadinessReport }) {
    const supabase = adminClient();
    const { error } = await supabase.from("readiness_reports").insert({
      id: crypto.randomUUID(),
      email: input.email,
      role: input.role,
      full_name: input.fullName,
      address: input.address,
      state: input.state,
      report: input.report
    });
    if (error) throw new Error(error.message);
  }

  async listDeals(userId: string) {
    const supabase = adminClient();
    const { data, error } = await supabase
      .from("deals")
      .select("id,user_id,name,stage,address")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data || []).map((item) => ({
      id: item.id,
      userId: item.user_id,
      name: item.name,
      stage: item.stage,
      address: item.address
    }));
  }

  async upsertSubscription(input: SubscriptionRecord) {
    const supabase = adminClient();
    const { error } = await supabase.from("subscriptions").upsert(
      {
        customer_email: input.customerEmail,
        status: input.status,
        stripe_customer_id: input.stripeCustomerId || null,
        stripe_subscription_id: input.stripeSubscriptionId || null,
        plan: input.plan
      },
      { onConflict: "customer_email" }
    );
    if (error) throw new Error(error.message);
  }

  async deactivateSubscription(stripeCustomerId: string) {
    const supabase = adminClient();
    const { error } = await supabase
      .from("subscriptions")
      .update({ status: "canceled" })
      .eq("stripe_customer_id", stripeCustomerId);
    if (error) throw new Error(error.message);
  }
}

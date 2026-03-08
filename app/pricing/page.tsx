import Link from "next/link";
import { CheckoutButtons } from "@/components/checkout-buttons";

export default function PricingPage() {
  return (
    <main className="container">
      <div style={{ marginBottom: 20 }}>
        <span className="badge">Monetization</span>
        <h1>Simple launch pricing</h1>
        <p className="muted">Start with a free report, then convert into a one-time setup or a recurring workspace.</p>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h2>FSBO Starter</h2>
          <p className="muted">For sellers who want document guidance, a checklist, and AI-assisted follow-up help.</p>
          <p className="kpi">$149</p>
          <ul className="list muted">
            <li>Readiness report</li>
            <li>Document chase plan</li>
            <li>Follow-up drafts</li>
            <li>Deal checklist workspace</li>
          </ul>
          <div style={{ marginTop: 16 }}>
            <CheckoutButtons plan="fsbo" />
          </div>
        </div>

        <div className="card">
          <h2>Agent Workspace</h2>
          <p className="muted">For solo agents and small teams who need AI support across active deals.</p>
          <p className="kpi">$99/mo</p>
          <ul className="list muted">
            <li>Everything in FSBO Starter</li>
            <li>Multi-deal dashboard</li>
            <li>Stripe subscription support</li>
            <li>Supabase-backed records</li>
          </ul>
          <div style={{ marginTop: 16 }}>
            <CheckoutButtons plan="agent" />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <h3>Not ready to pay yet?</h3>
        <p className="muted">Use the free report first and upgrade later.</p>
        <Link className="btn btn-outline" href="/intake">Start free report</Link>
      </div>
    </main>
  );
}

import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="container">
      <div className="card">
        <h1>Payment received</h1>
        <p className="muted">
          Stripe redirected here after a successful test checkout. The webhook route is where your
          app should confirm payment and update subscription status.
        </p>
        <div className="success" style={{ marginTop: 16 }}>
          For launch, keep this page simple and let the webhook do the real account update work.
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btn btn-primary" href="/dashboard">Go to dashboard</Link>
          <Link className="btn btn-outline" href="/">Back home</Link>
        </div>
      </div>
    </main>
  );
}

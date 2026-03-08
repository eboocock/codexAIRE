import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero">
        <span className="badge">Launch wedge: AI Transaction Concierge</span>
        <h1>Reduce the paperwork and status chasing that slow down real estate deals.</h1>
        <p>
          AIRE helps sellers, buyers, and small real estate teams create readiness reports,
          chase missing documents, draft transaction follow-ups, and keep deals moving without
          turning every touchpoint into manual work.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
          <Link className="btn btn-primary" href="/intake">Start free readiness report</Link>
          <Link className="btn btn-outline" href="/pricing">View paid plans</Link>
        </div>
      </section>

      <section className="grid grid-3" style={{ marginTop: 20 }}>
        <div className="card">
          <p className="kpi">1</p>
          <h3>Free entry point</h3>
          <p className="muted">A seller, buyer, or agent answers a few questions and gets an actionable AI report.</p>
        </div>
        <div className="card">
          <p className="kpi">2</p>
          <h3>Paid concierge</h3>
          <p className="muted">Charge for transaction setup, document chase support, and guided status coordination.</p>
        </div>
        <div className="card">
          <p className="kpi">3</p>
          <h3>Recurring subscription</h3>
          <p className="muted">Convert solo agents and small teams into monthly workspace subscribers.</p>
        </div>
      </section>

      <section className="grid grid-2" style={{ marginTop: 24 }}>
        <div className="card">
          <h2 className="section-title">What AI handles</h2>
          <ul className="list muted">
            <li>Readiness reports</li>
            <li>Missing item lists</li>
            <li>Document chase plans</li>
            <li>Status summaries</li>
            <li>Follow-up drafts</li>
            <li>Deal checklist suggestions</li>
          </ul>
        </div>
        <div className="card">
          <h2 className="section-title">What still needs a human</h2>
          <ul className="list muted">
            <li>Legal interpretation</li>
            <li>Pricing strategy</li>
            <li>Negotiation advice</li>
            <li>Licensed representation</li>
            <li>State-specific exceptions</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

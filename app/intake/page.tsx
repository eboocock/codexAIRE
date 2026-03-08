import { IntakeForm } from "@/components/intake-form";

export default function IntakePage() {
  return (
    <main className="container">
      <div style={{ marginBottom: 20 }}>
        <span className="badge">Free lead magnet</span>
        <h1>Readiness report</h1>
        <p className="muted">
          This is the fastest path to demand generation. The report helps the user, reveals the gaps,
          and creates a natural upgrade path into paid concierge support.
        </p>
      </div>
      <IntakeForm />
    </main>
  );
}

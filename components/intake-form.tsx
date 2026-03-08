"use client";

import { useState } from "react";
import { IntakeResponse } from "@/lib/types";

const initialForm = {
  role: "seller",
  fullName: "",
  email: "",
  address: "",
  timeline: "Within 60 days",
  goals: "Sell smoothly with minimal delays.",
  painPoints: "I do not know what paperwork I need and I want clear next steps.",
  state: "WA"
};

export function IntakeForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IntakeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to create report.");
      }
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-2">
      <form className="card" onSubmit={onSubmit}>
        <h2 className="section-title">Free readiness report</h2>
        <p className="muted">Answer a few questions and AIRE will create a first-pass plan.</p>

        <div style={{ marginTop: 12 }}>
          <label className="label">I am a...</label>
          <select
            className="select"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
            <option value="agent">Agent</option>
          </select>
        </div>

        <div style={{ marginTop: 12 }}>
          <label className="label">Full name</label>
          <input className="input" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
        </div>

        <div style={{ marginTop: 12 }}>
          <label className="label">Email</label>
          <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>

        <div style={{ marginTop: 12 }}>
          <label className="label">Address or market area</label>
          <input className="input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
        </div>

        <div style={{ marginTop: 12 }}>
          <label className="label">State</label>
          <input className="input" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} required />
        </div>

        <div style={{ marginTop: 12 }}>
          <label className="label">Timeline</label>
          <input className="input" value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} required />
        </div>

        <div style={{ marginTop: 12 }}>
          <label className="label">Goals</label>
          <textarea className="textarea" value={form.goals} onChange={(e) => setForm({ ...form, goals: e.target.value })} required />
        </div>

        <div style={{ marginTop: 12 }}>
          <label className="label">Pain points</label>
          <textarea className="textarea" value={form.painPoints} onChange={(e) => setForm({ ...form, painPoints: e.target.value })} required />
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <button className="btn btn-primary" disabled={loading} type="submit">
            {loading ? "Creating report..." : "Generate report"}
          </button>
          <span className="muted">Works in demo mode even without API keys.</span>
        </div>

        {error ? <p style={{ color: "#b91c1c", marginTop: 12 }}>{error}</p> : null}
      </form>

      <div className="card">
        <h2 className="section-title">Report output</h2>
        {!result ? (
          <p className="muted">Your readiness report will appear here after you submit the form.</p>
        ) : (
          <div className="grid">
            <div>
              <span className="badge">Readiness score: {result.report.readinessScore}/100</span>
            </div>
            <div>
              <h3>Summary</h3>
              <p className="muted">{result.report.summary}</p>
            </div>
            <div>
              <h3>Top next steps</h3>
              <ul className="list muted">
                {result.report.nextSteps.map((step, index) => <li key={index}>{step}</li>)}
              </ul>
            </div>
            <div>
              <h3>Missing items</h3>
              <ul className="list muted">
                {result.report.missingItems.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h3>Escalate to a human</h3>
              <ul className="list muted">
                {result.report.humanEscalations.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

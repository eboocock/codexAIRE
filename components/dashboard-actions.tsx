"use client";

import { useState } from "react";

type ToolResult = {
  title: string;
  body: string;
  bullets?: string[];
};

export function DashboardActions() {
  const [followup, setFollowup] = useState<ToolResult | null>(null);
  const [docPlan, setDocPlan] = useState<ToolResult | null>(null);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function callTool(url: string, payload: unknown, key: string, setter: (value: ToolResult) => void) {
    setLoadingKey(key);
    setError(null);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Tool failed");
      setter(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoadingKey(null);
    }
  }

  return (
    <div className="grid grid-2">
      <div className="card">
        <h2 className="section-title">Draft a transaction follow-up</h2>
        <p className="muted">Creates a ready-to-send update email for a buyer, seller, or agent.</p>
        <button
          className="btn btn-secondary"
          onClick={() =>
            callTool(
              "/api/mcp/followup",
              {
                audience: "seller",
                dealStage: "Inspection pending",
                missingItems: ["Signed addendum", "Repair invoice"],
                tone: "calm and clear"
              },
              "followup",
              setFollowup
            )
          }
          disabled={loadingKey === "followup"}
        >
          {loadingKey === "followup" ? "Drafting..." : "Generate follow-up"}
        </button>
        {followup ? (
          <div style={{ marginTop: 16 }}>
            <h3>{followup.title}</h3>
            <pre className="muted">{followup.body}</pre>
          </div>
        ) : null}
      </div>

      <div className="card">
        <h2 className="section-title">Generate a document chase plan</h2>
        <p className="muted">Builds a lightweight plan to collect missing paperwork without endless back-and-forth.</p>
        <button
          className="btn btn-secondary"
          onClick={() =>
            callTool(
              "/api/mcp/document-chase",
              {
                audience: "buyer",
                missingItems: ["Lender pre-approval", "Signed buyer representation agreement", "Proof of funds"],
                deadline: "Within 3 days"
              },
              "doc-plan",
              setDocPlan
            )
          }
          disabled={loadingKey === "doc-plan"}
        >
          {loadingKey === "doc-plan" ? "Planning..." : "Generate plan"}
        </button>
        {docPlan ? (
          <div style={{ marginTop: 16 }}>
            <h3>{docPlan.title}</h3>
            <pre className="muted">{docPlan.body}</pre>
            {docPlan.bullets?.length ? (
              <ul className="list muted">
                {docPlan.bullets.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>
      {error ? <p style={{ color: "#b91c1c" }}>{error}</p> : null}
    </div>
  );
}

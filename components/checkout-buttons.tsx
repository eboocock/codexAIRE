"use client";

import { useState } from "react";

type Plan = "fsbo" | "agent";

export function CheckoutButtons({ plan }: { plan: Plan }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to create checkout session.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={startCheckout} disabled={loading}>
        {loading ? "Preparing checkout..." : "Continue"}
      </button>
      {error ? <p style={{ color: "#b91c1c", marginTop: 12 }}>{error}</p> : null}
    </div>
  );
}

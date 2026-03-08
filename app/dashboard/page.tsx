import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { createRepository } from "@/lib/repository";
import { DashboardActions } from "@/components/dashboard-actions";
import { signOut } from "@/app/login/actions";

export default async function DashboardPage() {
  const supabase = await createServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    redirect("/login");
  }

  const repository = createRepository();
  const deals = await repository.listDeals(user?.id || "demo-user");

  return (
    <main className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
        <div>
          <span className="badge">Workspace</span>
          <h1>Dashboard</h1>
          <p className="muted">Use this page to manage deals and generate AI-assisted follow-up outputs.</p>
        </div>
        {user ? (
          <form action={signOut}>
            <button className="btn btn-outline" type="submit">Sign out</button>
          </form>
        ) : null}
      </div>

      {!user ? (
        <div className="notice" style={{ margin: "16px 0" }}>
          You are viewing demo mode. Add Supabase keys and sign in to store real user data.
        </div>
      ) : null}

      <div className="grid grid-2" style={{ marginTop: 16 }}>
        <div className="card">
          <h2 className="section-title">Active deals</h2>
          {deals.length === 0 ? (
            <p className="muted">No deals yet. Submit the intake form or seed a deal record in Supabase.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Stage</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {deals.map((deal) => (
                  <tr key={deal.id}>
                    <td>{deal.name}</td>
                    <td>{deal.stage}</td>
                    <td>{deal.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="card">
          <h2 className="section-title">How this becomes valuable</h2>
          <ul className="list muted">
            <li>Capture a lead with the readiness report.</li>
            <li>Upsell into a paid setup or monthly workspace.</li>
            <li>Use AI to keep deals moving with less admin work.</li>
            <li>Escalate only high-judgment work to a human.</li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <DashboardActions />
      </div>
    </main>
  );
}

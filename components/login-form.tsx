"use client";

import { useActionState } from "react";
import { requestMagicLink } from "@/app/login/actions";

const initialState = { error: "", success: "" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(async (_prev: typeof initialState, formData: FormData) => {
    const result = await requestMagicLink(formData);
    return {
      error: result?.error || "",
      success: result?.success || ""
    };
  }, initialState);

  return (
    <form action={formAction}>
      <div style={{ marginTop: 16 }}>
        <label className="label">Email</label>
        <input className="input" type="email" name="email" required placeholder="you@example.com" />
      </div>
      <div style={{ marginTop: 16 }}>
        <button className="btn btn-primary" type="submit" disabled={pending}>
          {pending ? "Sending link..." : "Send magic link"}
        </button>
      </div>
      {state.success ? <div className="success" style={{ marginTop: 16 }}>{state.success}</div> : null}
      {state.error ? <div className="notice" style={{ marginTop: 16 }}>{state.error}</div> : null}
    </form>
  );
}

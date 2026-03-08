"use server";

import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";

export async function requestMagicLink(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  if (!email) {
    return { error: "Email is required." };
  }

  const supabase = await createServerClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const redirectTo = `${appUrl}${process.env.AUTH_REDIRECT_PATH || "/auth/callback"}`;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo }
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Magic link sent. Check your email." };
}

export async function signOut() {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

import { cookies } from "next/headers";
import { createServerClient as createClient } from "@supabase/ssr";

export async function createServerClient() {
  const cookieStore = await cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return {
      auth: {
        getUser: async () => ({ data: { user: null } }),
        signInWithOtp: async () => ({ error: new Error("Supabase is not configured.") }),
        signOut: async () => ({ error: null }),
        exchangeCodeForSession: async () => ({ error: null })
      }
    } as any;
  }

  return createClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      }
    }
  });
}

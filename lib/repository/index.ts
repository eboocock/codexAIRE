import { FileRepository } from "@/lib/repository/local";
import { SupabaseRepository } from "@/lib/repository/supabase";

export function createRepository() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return new SupabaseRepository();
  }
  return new FileRepository();
}

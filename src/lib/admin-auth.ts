import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

/** Every server-side admin operation verifies the current Supabase user and allowlisted email. */
export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const isAllowed =
    !error &&
    Boolean(user?.email) &&
    Boolean(adminEmail) &&
    user!.email!.trim().toLowerCase() === adminEmail;

  if (!isAllowed) {
    redirect("/admin/login");
  }

  return { supabase, user: user! };
}

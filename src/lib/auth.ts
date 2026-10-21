import { cache } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

// cache() = getUser() cuma dipanggil sekali per request,
// walaupun layout dan page sama-sama memintanya.
export const getSession = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
});

// Dipanggil di awal setiap halaman admin DAN setiap Server Action.
// Middleware = lapis 1, ini = lapis 2, RLS Supabase = lapis 3.
export async function requireUser() {
  const { supabase, user } = await getSession();
  if (!user) redirect("/admin/login");
  return { supabase, user };
}

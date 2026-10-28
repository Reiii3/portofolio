"use server";

import { createSupabaseServerClient } from "@/lib/supabase-server";

export type ContactState = {
  status?: "success" | "error";
  error?: string;
  values?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: kolom ini disembunyikan, hanya bot yang mengisinya
  if (String(formData.get("website") ?? "")) return { status: "success" };

  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };
  const fail = (error: string): ContactState => ({ status: "error", error, values });

  if (!values.name) return fail("Nama wajib diisi.");
  if (!EMAIL_RE.test(values.email)) return fail("Email tidak valid.");
  if (values.message.length < 5) return fail("Pesan terlalu pendek.");
  if (values.name.length > 100 || values.email.length > 200 || values.message.length > 2000) {
    return fail("Isi pesan terlalu panjang.");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("messages").insert(values);
  if (error) return fail("Pesan gagal dikirim, coba lagi nanti.");

  return { status: "success" };
}

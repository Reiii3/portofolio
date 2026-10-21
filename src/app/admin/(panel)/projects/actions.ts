"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { readProjectForm } from "@/lib/projects";
import type { FormState } from "@/lib/form-state";

function refresh() {
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

const toList = (params: string) => `/admin/projects?${params}`;

export async function createProject(_prev: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireUser();

  const parsed = readProjectForm(formData);
  if (!parsed.ok) return parsed.state;

  const { error } = await supabase.from("projects").insert(parsed.data);
  if (error) {
    return {
      error: `Gagal menyimpan: ${error.message}. Cek policy INSERT di Supabase.`,
      values: parsed.values,
    };
  }

  refresh();
  redirect(toList("status=created"));
}

export async function updateProject(
  id: number,
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const { supabase } = await requireUser();

  const parsed = readProjectForm(formData);
  if (!parsed.ok) return parsed.state;

  // .select() supaya kelihatan kalau RLS menolak diam-diam (0 baris berubah)
  const { data, error } = await supabase
    .from("projects")
    .update(parsed.data)
    .eq("id", id)
    .select("id");

  if (error || !data?.length) {
    return {
      error: error
        ? `Gagal menyimpan: ${error.message}`
        : "Tidak ada data yang berubah. Cek policy UPDATE di Supabase.",
    };
  }

  refresh();
  redirect(toList("status=updated"));
}

export async function deleteProject(id: number) {
  const { supabase } = await requireUser();

  const { data, error } = await supabase.from("projects").delete().eq("id", id).select("id");

  if (error || !data?.length) {
    const message = error
      ? `Gagal menghapus: ${error.message}`
      : "Tidak ada data yang terhapus. Cek policy DELETE di Supabase.";
    redirect(toList(`error=${encodeURIComponent(message)}`));
  }

  refresh();
  redirect(toList("status=deleted"));
}

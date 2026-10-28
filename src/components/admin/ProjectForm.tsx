"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { MdError } from "react-icons/md";
import type { FormState } from "@/lib/form-state";
import type { ProjectRow } from "@/lib/projects";
import { TextArea, TextField } from "./fields";
import ImageUpload from "./ImageUpload";
import SubmitButton from "./SubmitButton";
import { button } from "./m3";

export default function ProjectForm({
  action,
  project,
  submitLabel,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  project?: ProjectRow;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, {} as FormState);
  const [uploading, setUploading] = useState(false);

  // Setelah error, nilai yang sudah diketik dipertahankan
  const v = (key: keyof ProjectRow | "tech", fallback = "") => {
    const typed = state.values?.[key];
    if (typed !== undefined) return typed;
    if (!project) return fallback;
    const raw = project[key as keyof ProjectRow];
    return Array.isArray(raw) ? raw.join(", ") : String(raw ?? fallback);
  };

  return (
    <form action={formAction} className="grid gap-8 rounded-[28px] bg-surface-container p-6 md:p-8">
      {state.error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl bg-error-container p-4 text-sm text-on-error-container"
        >
          <MdError className="mt-0.5 size-5 shrink-0" />
          {state.error}
        </div>
      )}

      <section className="grid gap-5">
        <h2 className="text-lg font-medium text-on-surface">Informasi utama</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <TextField id="name" name="name" label="Nama proyek" defaultValue={v("name")} required />
          <TextField
            id="category"
            name="category"
            label="Kategori"
            defaultValue={v("category")}
            helper="Pisahkan dengan koma, misalnya: WEB, TOOLS"
          />
        </div>
        <TextArea
          id="description"
          name="description"
          label="Deskripsi"
          defaultValue={v("description")}
        />
        <TextField
          id="tech"
          name="tech"
          label="Teknologi"
          defaultValue={v("tech")}
          helper="Pisahkan dengan koma, misalnya: React, Tailwind CSS, Firebase"
        />
      </section>

      <section className="grid gap-5">
        <h2 className="text-lg font-medium text-on-surface">Gambar dan tautan</h2>
        <ImageUpload name="image" defaultValue={v("image")} onUploadingChange={setUploading} />
        <div className="grid gap-5 md:grid-cols-2">
          <TextField
            id="demo_link"
            name="demo_link"
            type="url"
            label="Live demo"
            defaultValue={v("demo_link")}
          />
          <TextField
            id="githubLink"
            name="githubLink"
            type="url"
            label="Repository"
            defaultValue={v("githubLink")}
          />
        </div>
        <TextField
          id="link"
          name="link"
          type="url"
          label="Tautan lain (Magisk Module)"
          defaultValue={v("link")}
        />
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link href="/admin/projects" className={button("text", "lg")}>
          Batal
        </Link>
        <SubmitButton disabled={uploading}>{submitLabel}</SubmitButton>
      </div>
    </form>
  );
}

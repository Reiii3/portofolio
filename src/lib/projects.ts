import type { FormState } from "@/lib/form-state";

// Nama kolom mengikuti tabel `projects` di Supabase (githubLink memang camelCase)
export interface ProjectRow {
  id: number;
  name: string;
  category: string[] | null;
  description: string | null;
  image: string | null;
  tech: string[] | null;
  demo_link: string | null;
  githubLink: string | null;
  link: string | null;
}

export type ProjectInput = Omit<ProjectRow, "id">;

const FIELDS = [
  "name",
  "category",
  "description",
  "image",
  "tech",
  "demo_link",
  "githubLink",
  "link",
] as const;

const LINK_LABELS: Record<string, string> = {
  demo_link: "Live demo",
  githubLink: "Repository",
  link: "Tautan lain",
};

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function parseTech(raw: string): string[] {
  return [
    ...new Set(
      raw
        .split(/[,\n]/)
        .map((t) => t.trim())
        .filter(Boolean)
    ),
  ];
}

type Parsed =
  | { ok: true; data: ProjectInput; values: Record<string, string> }
  | { ok: false; state: FormState };

export function readProjectForm(fd: FormData): Parsed {
  const values: Record<string, string> = Object.fromEntries(
    FIELDS.map((key) => [key, String(fd.get(key) ?? "").trim()])
  );
  const fail = (error: string): Parsed => ({ ok: false, state: { error, values } });

  if (!values.name) return fail("Nama proyek wajib diisi.");

  // Tautan disimpan dan dirender sebagai href di halaman publik,
  // jadi hanya http(s) yang boleh (blok javascript: dan sejenisnya).
  for (const key of Object.keys(LINK_LABELS)) {
    if (values[key] && !isHttpUrl(values[key])) {
      return fail(`${LINK_LABELS[key]} harus berupa URL yang diawali http:// atau https://`);
    }
  }

  if (
    values.image &&
    !(values.image.startsWith("/") && !values.image.startsWith("//")) &&
    !isHttpUrl(values.image)
  ) {
    return fail("Gambar harus berupa path seperti /img/foto.webp atau URL https.");
  }

  return {
    ok: true,
    values,
    data: {
      name: values.name,
      category: parseTech(values.category).map((c) => c.toUpperCase()),
      description: values.description || null,
      image: values.image || null,
      tech: parseTech(values.tech),
      demo_link: values.demo_link || null,
      githubLink: values.githubLink || null,
      link: values.link || null,
    },
  };
}

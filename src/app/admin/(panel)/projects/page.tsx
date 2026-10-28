import Link from "next/link";
import { MdAdd, MdDelete, MdEdit, MdSearch, MdWork } from "react-icons/md";
import PageHeader from "@/components/admin/PageHeader";
import Snackbar from "@/components/admin/Snackbar";
import { button, iconButton } from "@/components/admin/m3";
import { requireUser } from "@/lib/auth";
import type { ProjectRow } from "@/lib/projects";

export const metadata = { title: "Proyek" };

const STATUS_MESSAGES: Record<string, string> = {
  created: "Proyek ditambahkan",
  updated: "Perubahan disimpan",
  deleted: "Proyek dihapus",
};

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; error?: string }>;
}) {
  const { q = "", status, error } = await searchParams;
  const { supabase, user } = await requireUser();

  const { data, error: dbError } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });

  const all = (data ?? []) as ProjectRow[];
  const needle = q.trim().toLowerCase();
  const projects = needle
    ? all.filter((p) =>
        [p.name, ...(p.category ?? []), ...(p.tech ?? [])].some((x) => x?.toLowerCase().includes(needle))
      )
    : all;

  const categoryCount = new Set(all.flatMap((p) => p.category ?? [])).size;
  const displayName = user.email?.split("@")[0] ?? "admin";
  const snack = error ?? (status ? STATUS_MESSAGES[status] : undefined) ?? dbError?.message;

  return (
    <>
      <PageHeader title={`Halo, ${displayName}`} subtitle={user.email ?? undefined} />

      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="rounded-[28px] bg-primary-container p-5 text-on-primary-container">
          <p className="text-sm">Total proyek</p>
          <p className="font-gfbold text-5xl">{all.length}</p>
        </div>
        <div className="rounded-[28px] bg-tertiary-container p-5 text-on-tertiary-container">
          <p className="text-sm">Kategori</p>
          <p className="font-gfbold text-5xl">{categoryCount}</p>
        </div>
      </div>

      <form action="/admin/projects" className="mb-6">
        <div className="flex h-14 items-center gap-3 rounded-full bg-surface-container-high px-5 focus-within:bg-surface-container-highest">
          <MdSearch className="size-6 shrink-0 text-on-surface-variant" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Cari nama, kategori, atau teknologi"
            aria-label="Cari proyek"
            className="h-full min-w-0 flex-1 bg-transparent text-on-surface placeholder:text-on-surface-variant"
          />
          {q && (
            <Link href="/admin/projects" className={button("text")}>
              Hapus
            </Link>
          )}
        </div>
      </form>

      {projects.length === 0 ? (
        <div className="grid place-items-center gap-3 rounded-[28px] bg-surface-container px-6 py-16 text-center">
          <div className="grid size-16 place-items-center rounded-[22px] bg-secondary-container text-on-secondary-container">
            <MdWork className="size-8" />
          </div>
          <h2 className="font-gfbold text-2xl">
            {needle ? "Tidak ada hasil" : "Belum ada proyek"}
          </h2>
          <p className="max-w-xs text-sm text-on-surface-variant">
            {needle
              ? `Tidak ada proyek yang cocok dengan “${q}”.`
              : "Tambahkan proyek pertamamu supaya muncul di portofolio."}
          </p>
          {!needle && (
            <Link href="/admin/projects/new" className={`${button("filled")} mt-2`}>
              Tambah proyek
            </Link>
          )}
        </div>
      ) : (
        <ul className="grid gap-3 xl:grid-cols-2">
          {projects.map((p) => (
            <li
              key={p.id}
              className="flex items-center gap-4 rounded-[28px] bg-surface-container p-4"
            >
              <div className="size-20 shrink-0 overflow-hidden rounded-2xl bg-surface-container-highest">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt="" className="size-full object-cover" />
                ) : (
                  <div className="grid size-full place-items-center text-on-surface-variant">
                    <MdWork className="size-8" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-medium text-on-surface">{p.name}</h2>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {(p.category ?? []).map((c) => (
                    <span
                      key={c}
                      className="rounded-lg bg-secondary-container px-2.5 py-1 text-xs text-on-secondary-container"
                    >
                      {c}
                    </span>
                  ))}
                  {(p.tech ?? []).slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-outline-variant px-2.5 py-1 text-xs text-on-surface-variant"
                    >
                      {t}
                    </span>
                  ))}
                  {(p.tech?.length ?? 0) > 2 && (
                    <span className="px-1 py-1 text-xs text-on-surface-variant">
                      +{(p.tech?.length ?? 0) - 2}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 gap-1">
                <Link
                  href={`/admin/projects/${p.id}/edit`}
                  aria-label={`Edit ${p.name}`}
                  className={iconButton("tonal")}
                >
                  <MdEdit className="size-5" />
                </Link>
                <Link
                  href={`/admin/projects/${p.id}/delete`}
                  aria-label={`Hapus ${p.name}`}
                  className={iconButton("danger")}
                >
                  <MdDelete className="size-5" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/admin/projects/new"
        className="state-layer fixed bottom-24 right-4 z-30 inline-flex h-14 items-center gap-3 rounded-2xl bg-primary-container px-5 font-medium text-on-primary-container shadow-lg transition-[border-radius] duration-300 ease-emphasized active:rounded-xl md:bottom-8 md:right-8"
      >
        <MdAdd className="size-6" />
        Tambah proyek
      </Link>

      {snack && <Snackbar key={snack} message={snack} />}
    </>
  );
}

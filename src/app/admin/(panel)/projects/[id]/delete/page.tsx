import Link from "next/link";
import { redirect } from "next/navigation";
import { MdDelete } from "react-icons/md";
import SubmitButton from "@/components/admin/SubmitButton";
import { button } from "@/components/admin/m3";
import { requireUser } from "@/lib/auth";
import { deleteProject } from "../../actions";

export const metadata = { title: "Hapus proyek" };

export default async function DeleteProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projectId = Number(id);
  const { supabase } = await requireUser();

  if (!Number.isInteger(projectId)) redirect("/admin/projects");

  const { data: project } = await supabase
    .from("projects")
    .select("id, name")
    .eq("id", projectId)
    .single();
  if (!project) redirect("/admin/projects?error=Proyek+tidak+ditemukan");

  return (
    <div className="grid min-h-[60dvh] place-items-center">
      <div
        role="alertdialog"
        aria-labelledby="delete-title"
        className="w-full max-w-sm rounded-[28px] bg-surface-container-high p-6"
      >
        <MdDelete className="mx-auto mb-4 size-8 text-error" />
        <h1 id="delete-title" className="mb-4 text-center font-gfbold text-2xl text-on-surface">
          Hapus proyek ini?
        </h1>
        <p className="text-sm text-on-surface-variant">
          <span className="font-medium text-on-surface">{project.name}</span> akan dihapus dari
          portofolio dan tidak bisa dikembalikan.
        </p>
        <form action={deleteProject.bind(null, project.id)} className="mt-8 flex justify-end gap-2">
          <Link href="/admin/projects" className={button("text")}>
            Batal
          </Link>
          <SubmitButton variant="dangerText" size="md" pendingLabel="Menghapus…">
            Hapus
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}

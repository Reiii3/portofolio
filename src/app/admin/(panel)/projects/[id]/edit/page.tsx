import { redirect } from "next/navigation";
import PageHeader from "@/components/admin/PageHeader";
import ProjectForm from "@/components/admin/ProjectForm";
import { requireUser } from "@/lib/auth";
import type { ProjectRow } from "@/lib/projects";
import { updateProject } from "../../actions";

export const metadata = { title: "Edit proyek" };

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projectId = Number(id);
  const { supabase } = await requireUser();

  if (!Number.isInteger(projectId)) redirect("/admin/projects");

  const { data } = await supabase.from("projects").select("*").eq("id", projectId).single();
  if (!data) redirect("/admin/projects?error=Proyek+tidak+ditemukan");
  const project = data as ProjectRow;

  return (
    <>
      <PageHeader title="Edit proyek" subtitle={project.name} backHref="/admin/projects" />
      <ProjectForm
        action={updateProject.bind(null, project.id)}
        project={project}
        submitLabel="Simpan perubahan"
      />
    </>
  );
}

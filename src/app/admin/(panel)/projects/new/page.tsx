import PageHeader from "@/components/admin/PageHeader";
import ProjectForm from "@/components/admin/ProjectForm";
import { requireUser } from "@/lib/auth";
import { createProject } from "../actions";

export const metadata = { title: "Tambah proyek" };

export default async function NewProjectPage() {
  await requireUser();

  return (
    <>
      <PageHeader
        title="Tambah proyek"
        subtitle="Proyek baru langsung muncul di portofolio setelah disimpan."
        backHref="/admin/projects"
      />
      <ProjectForm action={createProject} submitLabel="Simpan proyek" />
    </>
  );
}

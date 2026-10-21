import type { Metadata } from "next";
import Link from "next/link";
import { MdLock } from "react-icons/md";
import LoginForm from "@/components/admin/LoginForm";
import { button } from "@/components/admin/m3";

export const metadata: Metadata = {
  title: "Masuk admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-dvh flex-1 place-items-center bg-surface p-4">
      <div className="w-full max-w-md rounded-[28px] bg-surface-container p-8 md:p-10">
        <div className="mb-6 grid size-16 place-items-center rounded-[22px] bg-primary-container text-on-primary-container">
          <MdLock className="size-8" />
        </div>
        <h1 className="font-gfbold text-3xl text-on-surface">Masuk admin</h1>
        <p className="mb-8 mt-2 text-on-surface-variant">
          Kelola proyek di portofolio kamu. Hanya akun admin yang bisa masuk.
        </p>

        <LoginForm />

        <div className="mt-6 flex justify-center">
          <Link href="/" className={button("text")}>
            Kembali ke situs
          </Link>
        </div>
      </div>
    </main>
  );
}

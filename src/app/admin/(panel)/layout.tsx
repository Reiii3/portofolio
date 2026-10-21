import type { Metadata } from "next";
import AdminNav from "@/components/admin/AdminNav";
import AccountMenu from "@/components/admin/AccountMenu";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireUser();
  const email = user.email ?? "admin";

  return (
    <div className="flex-1 bg-surface text-on-surface md:flex">
      {/* Navigation rail: tablet & desktop */}
      <aside className="sticky top-0 hidden h-dvh w-24 shrink-0 flex-col items-center gap-10 py-8 md:flex">
        <div className="grid size-12 place-items-center rounded-2xl bg-primary-container font-gfbold text-xl text-on-primary-container">
          J
        </div>
        <nav aria-label="Navigasi admin">
          <AdminNav variant="rail" />
        </nav>
        <div className="mt-auto">
          <AccountMenu email={email} placement="side" />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {/* Top app bar: HP */}
        <div className="sticky top-0 z-30 flex h-16 items-center justify-between bg-surface/90 px-4 backdrop-blur md:hidden">
          <span className="font-gfbold text-xl">
            Jaa<span className="text-primary">.dev</span>
          </span>
          <AccountMenu email={email} />
        </div>

        <main className="mx-auto w-full max-w-5xl px-4 pb-36 pt-4 md:px-10 md:pb-16 md:pt-10">
          {children}
        </main>
      </div>

      {/* Navigation bar: HP */}
      <nav
        aria-label="Navigasi admin"
        className="fixed inset-x-0 bottom-0 z-40 bg-surface-container pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <AdminNav variant="bar" />
      </nav>
    </div>
  );
}

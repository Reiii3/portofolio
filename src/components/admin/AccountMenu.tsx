"use client";

import { useState } from "react";
import { MdLogout } from "react-icons/md";
import { logout } from "@/app/admin/actions";
import { button } from "./m3";

export default function AccountMenu({
  email,
  placement = "below",
}: {
  email: string;
  placement?: "below" | "side";
}) {
  const [open, setOpen] = useState(false);
  const initial = (email[0] ?? "A").toUpperCase();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Menu akun"
        className="state-layer grid size-10 place-items-center rounded-full bg-tertiary-container font-medium text-on-tertiary-container"
      >
        {initial}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div
            role="menu"
            className={`absolute z-50 w-64 animate-snack rounded-[28px] bg-surface-container-high p-4 shadow-xl ${
              placement === "below" ? "right-0 top-12" : "bottom-0 left-14"
            }`}
          >
            <p className="text-xs text-on-surface-variant">Masuk sebagai</p>
            <p className="mb-4 truncate text-sm font-medium text-on-surface">{email}</p>
            <form action={logout}>
              <button type="submit" className={`${button("tonal")} w-full`}>
                <MdLogout className="size-5" />
                Keluar
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

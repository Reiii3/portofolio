"use client";

import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

export default function Snackbar({ message }: { message: string }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-24 z-50 mx-auto flex max-w-md animate-snack items-center gap-3 rounded-xl bg-inverse-surface py-3 pl-4 pr-2 text-sm text-inverse-on-surface shadow-lg md:bottom-8 md:left-28 md:mx-0"
    >
      <span className="flex-1">{message}</span>
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Tutup pesan"
        className="state-layer inline-flex size-10 items-center justify-center rounded-full text-inverse-primary"
      >
        <MdClose className="size-5" />
      </button>
    </div>
  );
}

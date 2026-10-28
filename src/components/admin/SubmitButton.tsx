"use client";

import { useFormStatus } from "react-dom";
import { button, type ButtonSize, type ButtonVariant } from "./m3";

export default function SubmitButton({
  children,
  pendingLabel = "Menyimpan…",
  variant = "filled",
  size = "lg",
  disabled = false,
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending || disabled} aria-busy={pending} className={button(variant, size)}>
      {pending && (
        <span className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {pending ? pendingLabel : children}
    </button>
  );
}

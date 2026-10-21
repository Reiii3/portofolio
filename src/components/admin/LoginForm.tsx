"use client";

import { useActionState, useState } from "react";
import { MdError, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { login } from "@/app/admin/actions";
import type { FormState } from "@/lib/form-state";
import { TextField } from "./fields";
import SubmitButton from "./SubmitButton";
import { iconButton } from "./m3";

export default function LoginForm() {
  const [state, formAction] = useActionState(login, {} as FormState);
  const [show, setShow] = useState(false);

  return (
    <form action={formAction} className="grid gap-5">
      {state.error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl bg-error-container p-4 text-sm text-on-error-container"
        >
          <MdError className="mt-0.5 size-5 shrink-0" />
          {state.error}
        </div>
      )}

      <TextField
        id="email"
        name="email"
        type="email"
        label="Email"
        autoComplete="username"
        defaultValue={state.values?.email}
        required
      />

      <TextField
        id="password"
        name="password"
        type={show ? "text" : "password"}
        label="Kata sandi"
        autoComplete="current-password"
        required
        trailing={
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            className={iconButton()}
          >
            {show ? <MdVisibilityOff className="size-6" /> : <MdVisibility className="size-6" />}
          </button>
        }
      />

      <SubmitButton pendingLabel="Memeriksa…">Masuk</SubmitButton>
    </form>
  );
}

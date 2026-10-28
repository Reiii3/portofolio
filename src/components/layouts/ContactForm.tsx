"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslation } from "react-i18next";
import { MdCheckCircle, MdError, MdSend } from "react-icons/md";
import { sendMessage, type ContactState } from "@/app/contact-actions";

const control =
  "peer w-full rounded-xl border border-outline bg-transparent px-4 text-base text-on-surface " +
  "placeholder-transparent transition-colors hover:border-on-surface focus:border-primary focus:ring-1 focus:ring-primary";
const label =
  "pointer-events-none absolute left-3 top-4 z-10 bg-surface-container-high px-1 text-base " +
  "text-on-surface-variant transition-all duration-200 " +
  "peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary " +
  "peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs";

function SendButton({ children, pending: pendingLabel }: { children: React.ReactNode; pending: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-medium text-on-primary transition-all hover:-translate-y-0.5 hover:shadow-md disabled:pointer-events-none disabled:opacity-50"
    >
      {pending ? (
        <span className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <MdSend className="size-5" />
      )}
      {pending ? pendingLabel : children}
    </button>
  );
}

export default function ContactForm() {
  const { t } = useTranslation();
  const [state, formAction] = useActionState(sendMessage, {} as ContactState);
  const ok = state.status === "success";

  return (
    <form action={formAction} key={ok ? "sent" : "form"} className="grid gap-5">
      {ok && (
        <div role="status" className="flex items-start gap-3 rounded-2xl bg-secondary-container p-4 text-sm text-on-secondary-container">
          <MdCheckCircle className="mt-0.5 size-5 shrink-0" />
          {t("contact.form.success")}
        </div>
      )}
      {state.status === "error" && (
        <div role="alert" className="flex items-start gap-3 rounded-2xl bg-error-container p-4 text-sm text-on-error-container">
          <MdError className="mt-0.5 size-5 shrink-0" />
          {state.error}
        </div>
      )}

      {/* Honeypot anti-spam */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="relative">
        <input id="c-name" name="name" required maxLength={100} placeholder=" " autoComplete="name"
          defaultValue={state.values?.name} className={`${control} h-14`} />
        <label htmlFor="c-name" className={label}>{t("contact.form.name")} *</label>
      </div>
      <div className="relative">
        <input id="c-email" name="email" type="email" required maxLength={200} placeholder=" " autoComplete="email"
          defaultValue={state.values?.email} className={`${control} h-14`} />
        <label htmlFor="c-email" className={label}>{t("contact.form.email")} *</label>
      </div>
      <div className="relative">
        <textarea id="c-message" name="message" required minLength={5} maxLength={2000} rows={4} placeholder=" "
          defaultValue={state.values?.message} className={`${control} min-h-28 resize-y py-4`} />
        <label htmlFor="c-message" className={label}>{t("contact.form.message")} *</label>
      </div>

      <SendButton pending={t("contact.form.sending")}>{t("contact.form.send")}</SendButton>
    </form>
  );
}

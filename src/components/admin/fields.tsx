// Outlined text field Material 3 dengan label yang naik saat fokus / terisi.
// Label ditaruh SETELAH input supaya bisa pakai `peer`.
// Background label harus sama dengan background container (bg-surface-container).

interface FieldProps {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  helper?: string;
  list?: string;
  autoComplete?: string;
  trailing?: React.ReactNode;
}

const control =
  "peer w-full rounded-xl border border-outline bg-transparent px-4 text-base text-on-surface " +
  "placeholder-transparent transition-colors hover:border-on-surface " +
  "focus:border-primary focus:ring-1 focus:ring-primary";

const label =
  "pointer-events-none absolute left-3 top-4 z-10 bg-surface-container px-1 text-base " +
  "text-on-surface-variant transition-all duration-200 ease-emphasized " +
  "peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary " +
  "peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs";

function Helper({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={`${id}-helper`} className="mt-1 px-4 text-xs text-on-surface-variant">
      {text}
    </p>
  );
}

export function TextField({
  id,
  name,
  label: text,
  defaultValue,
  type = "text",
  required,
  helper,
  list,
  autoComplete,
  trailing,
}: FieldProps) {
  return (
    <div>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          list={list}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          placeholder=" "
          aria-describedby={helper ? `${id}-helper` : undefined}
          className={`${control} h-14 ${trailing ? "pr-12" : ""}`}
        />
        <label htmlFor={id} className={label}>
          {text}
          {required ? " *" : ""}
        </label>
        {trailing && <div className="absolute right-1 top-2 z-20">{trailing}</div>}
      </div>
      <Helper id={id} text={helper} />
    </div>
  );
}

export function TextArea({
  id,
  name,
  label: text,
  defaultValue,
  helper,
  rows = 4,
}: Omit<FieldProps, "type" | "list" | "trailing"> & { rows?: number }) {
  return (
    <div>
      <div className="relative">
        <textarea
          id={id}
          name={name}
          rows={rows}
          defaultValue={defaultValue}
          placeholder=" "
          aria-describedby={helper ? `${id}-helper` : undefined}
          className={`${control} min-h-28 resize-y py-4`}
        />
        <label htmlFor={id} className={label}>
          {text}
        </label>
      </div>
      <Helper id={id} text={helper} />
    </div>
  );
}

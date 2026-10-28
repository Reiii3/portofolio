"use client";

import { useRef, useState } from "react";
import { MdAddPhotoAlternate, MdDelete, MdError } from "react-icons/md";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { button } from "./m3";

const BUCKET = "project-images";
const MAX_BYTES = 2 * 1024 * 1024;
const TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

// Upload langsung dari browser ke Supabase Storage (pakai sesi login admin),
// lalu URL publiknya disimpan di input hidden `image` yang ikut terkirim bareng form.
export default function ImageUpload({
  name,
  defaultValue,
  onUploadingChange,
}: {
  name: string;
  defaultValue?: string | null;
  onUploadingChange?: (uploading: boolean) => void;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const ext = TYPES[file.type];
    if (!ext) return setError("Format harus PNG, JPG, WebP, GIF, atau AVIF.");
    if (file.size > MAX_BYTES) return setError("Ukuran gambar maksimal 2 MB.");

    setError(null);
    setUploading(true);
    onUploadingChange?.(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { contentType: file.type, cacheControl: "31536000" });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      setValue(data.publicUrl);
    } catch (err) {
      setError(
        `Gagal upload: ${err instanceof Error ? err.message : "coba lagi"}. Cek bucket dan policy storage di Supabase.`
      );
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
    }
  }

  return (
    <div className="grid gap-3">
      <span className="px-1 text-sm text-on-surface-variant">Gambar proyek</span>

      <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-2xl border border-dashed border-outline bg-surface-container-high">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="Pratinjau gambar proyek" className="size-full object-cover" />
        ) : (
          <div className="grid size-full place-items-center text-on-surface-variant">
            <MdAddPhotoAlternate className="size-10" />
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 grid place-items-center bg-black/40">
            <span className="size-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className={button("tonal")}
        >
          <MdAddPhotoAlternate className="size-5" />
          {value ? "Ganti gambar" : "Pilih gambar"}
        </button>
        {value && (
          <button
            type="button"
            disabled={uploading}
            onClick={() => setValue("")}
            className={button("dangerText")}
          >
            <MdDelete className="size-5" />
            Hapus
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={Object.keys(TYPES).join(",")}
        onChange={onPick}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
      />
      <input type="hidden" name={name} value={value} />

      <p className="px-1 text-xs text-on-surface-variant">PNG, JPG, WebP, GIF, atau AVIF. Maksimal 2 MB.</p>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl bg-error-container p-3 text-sm text-on-error-container"
        >
          <MdError className="mt-0.5 size-5 shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}

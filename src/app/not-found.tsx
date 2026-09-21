import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-board p-8 trace-grid">
      {/* Header Info Status */}
      <div className="w-full max-w-sm flex items-center justify-between font-mono text-xs text-muted">
        <span>ERR_404 // NOT_FOUND</span>
        <span className="text-copper">SYS_CRASH</span>
      </div>

      {/* Main Content (404 Error Message) */}
      <div className="flex flex-col items-center text-center">
        {/* Error Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-error/30 bg-error-container/20 px-4 py-1.5 font-mono text-xs text-error">
          <span className="h-2 w-2 rounded-full bg-error animate-pulse" />
          404: PAGE_NOT_EXIST
        </div>

        <h1 className="font-mono text-6xl font-bold tracking-tight text-paper sm:text-7xl">
          404
        </h1>

        <p className="mt-4 max-w-md text-sm text-muted">
          Halaman atau entitas sistem yang kamu cari tidak ditemukan atau telah dipindahkan.
        </p>

        {/* Action Button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-sm bg-copper px-6 py-3 font-mono text-sm font-medium text-on-primary transition-colors hover:bg-copper-light"
          >
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* Footer info */}
      <div className="font-mono text-[10px] text-muted tracking-widest uppercase">
        Android System Tooling &amp; Web
      </div>
    </div>
  );
}
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-board p-8 trace-grid">
      {/* Header Info */}
      <div className="w-full max-w-sm flex items-center justify-between font-mono text-xs text-muted">
        <span>SYS_BOOT // V16</span>
        <span className="animate-pulse">LOADING...</span>
      </div>

      {/* Main Content (Pulsing Logo & Spinner) */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 animate-ping rounded-full bg-copper/20 absolute" />
          <div className="h-12 w-12 rounded-full border-2 border-copper bg-copper-dim flex items-center justify-center shadow-[0_0_20px_rgba(208,188,255,0.3)]">
            <span className="font-mono text-xs font-bold text-copper-light">
              R3
            </span>
          </div>
        </div>

        <div className="text-center">
          <h2 className="font-mono text-lg font-medium tracking-wider text-paper">
            RIZA MAULANA
          </h2>
          <p className="mt-1 font-mono text-xs text-muted">
            Initializing system environment...
          </p>
        </div>

        {/* Indikator Loading Material You (Indeterminate Bar) */}
        <div className="h-1.5 w-64 overflow-hidden rounded-full bg-board-panel border border-board-line relative">
          <div className="h-full bg-copper shadow-[0_0_10px_#D0BCFF] animate-pulse w-full" />
        </div>
      </div>

      {/* Footer */}
      <div className="font-mono text-[10px] text-muted tracking-widest uppercase">
        Android System Tooling & Web
      </div>
    </div>
  );
}
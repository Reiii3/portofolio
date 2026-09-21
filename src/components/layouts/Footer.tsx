export default function Footer() {
  return (
    <footer className="border-t border-board-line/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 font-mono text-xs text-muted md:flex-row md:items-center md:justify-between md:px-10">
        <span>© {new Date().getFullYear()} Riza Maulana</span>
        <span>Kelas 11 · Rekayasa Perangkat Lunak 1</span>
      </div>
    </footer>
  );
}

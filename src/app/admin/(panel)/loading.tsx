// Linear progress indicator M3 (indeterminate) di atas halaman
export default function AdminLoading() {
  return (
    <div
      role="progressbar"
      aria-label="Memuat"
      className="fixed inset-x-0 top-0 z-50 h-1 overflow-hidden bg-primary-container"
    >
      <div className="h-full w-full animate-indeterminate rounded-full bg-primary" />
    </div>
  );
}

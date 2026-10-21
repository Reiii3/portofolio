// Helper class Tailwind untuk tombol bergaya Material 3 (Expressive).
// Tombol berubah dari pill jadi lebih kotak saat ditekan, seperti di Android 16.
export type ButtonVariant = "filled" | "tonal" | "outlined" | "text" | "danger" | "dangerText";
export type ButtonSize = "md" | "lg";

const base =
  "state-layer inline-flex select-none items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[border-radius,background-color,transform] duration-300 ease-emphasized " +
  "active:rounded-xl disabled:pointer-events-none disabled:opacity-40";

const variants: Record<ButtonVariant, string> = {
  filled: "bg-primary text-on-primary",
  tonal: "bg-secondary-container text-on-secondary-container",
  outlined: "border border-outline text-primary",
  text: "text-primary",
  danger: "bg-error text-on-error",
  dangerText: "text-error",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-10 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export function button(variant: ButtonVariant = "filled", size: ButtonSize = "md") {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}

export function iconButton(tone: "standard" | "tonal" | "danger" = "standard") {
  const tones = {
    standard: "text-on-surface-variant",
    tonal: "bg-secondary-container text-on-secondary-container",
    danger: "text-error",
  };
  return (
    "state-layer inline-flex size-10 items-center justify-center rounded-full " +
    "transition-[border-radius] duration-300 ease-emphasized active:rounded-xl " +
    tones[tone]
  );
}

const stack = [
  "Python",
  "JavaScript",
  "TypeScript",
  "Kotlin",
  "Java",
  "Bash",
  "Tailwind CSS",
  "React",
  "Jetpack Compose",
  "Git",
  "Github",
  "Vite",
  "Next.js",
  "KernelSU",
  "Android",
  "Firebase"
];

export default function StackMarquee() {
  const items = [...stack, ...stack];

  return (
    <div className="overflow-hidden border-b border-board-line/70 bg-board-panel py-5">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-4 whitespace-nowrap font-mono text-sm text-muted"
          >
            {item}
            <span className="ml-4 text-copper-dim">\\</span>
          </span>
        ))}
      </div>
    </div>
  );
}

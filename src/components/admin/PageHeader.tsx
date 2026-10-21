import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { iconButton } from "./m3";

export default function PageHeader({
  title,
  subtitle,
  backHref,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
}) {
  return (
    <header className="mb-6 md:mb-8">
      {backHref && (
        <Link href={backHref} aria-label="Kembali" className={`${iconButton()} -ml-2 mb-2`}>
          <MdArrowBack className="size-6" />
        </Link>
      )}
      <h1 className="font-gfbold text-4xl leading-tight text-on-surface md:text-5xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-prose text-on-surface-variant">{subtitle}</p>}
    </header>
  );
}

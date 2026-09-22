import Link from "next/link";
import { FaGithub, FaTelegram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-board-line/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 font-mono text-xs text-muted md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-col gap-1">
          <span>© {new Date().getFullYear()} Riza Maulana</span>
          <span>Kelas 11 · Rekayasa Perangkat Lunak 1</span>
        </div>
        <div className="flex items-center gap-2">
          <Link href={'https://github.com/Reiii3'} target="_blank">
            <FaGithub className="size-5.5 cursor-pointer"/>
          </Link>
          <Link href={'https://t.me/JaaGabu'} target="_blank">
            <FaTelegram className="size-5.5 cursor-pointer"/>
          </Link>
          <Link href={'https://whatsapp.com/channel/0029Vb6RzcU5vKA4XgE27B1L'} target="_blank">
            <FaWhatsapp className="size-5.5 cursor-pointer"/>
          </Link>
        </div>
      </div>
    </footer>
  );
}

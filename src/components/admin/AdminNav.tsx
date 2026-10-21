"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdHome, MdWork } from "react-icons/md";

const items = [
  { href: "/admin/projects", label: "Proyek", icon: MdWork, activeWhen: "/admin/projects" },
  { href: "/", label: "Situs", icon: MdHome, activeWhen: null },
];

// variant "rail" = navigation rail (tablet/desktop), "bar" = navigation bar (HP)
export default function AdminNav({ variant }: { variant: "rail" | "bar" }) {
  const pathname = usePathname();

  return (
    <ul className={variant === "rail" ? "flex flex-col gap-3" : "flex w-full"}>
      {items.map(({ href, label, icon: Icon, activeWhen }) => {
        const active = activeWhen ? pathname.startsWith(activeWhen) : false;
        return (
          <li key={href} className={variant === "bar" ? "flex-1" : ""}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`group flex flex-col items-center gap-1 text-xs font-medium ${
                variant === "bar" ? "pb-4 pt-3" : "w-20 py-1"
              } ${active ? "text-on-surface" : "text-on-surface-variant"}`}
            >
              <span
                className={`flex h-8 w-16 items-center justify-center rounded-full transition-colors duration-300 ease-emphasized ${
                  active
                    ? "bg-secondary-container text-on-secondary-container"
                    : "group-hover:bg-on-surface/8"
                }`}
              >
                <Icon className="size-6" />
              </span>
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

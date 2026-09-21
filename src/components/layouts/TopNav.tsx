"use client";

import { useEffect, useState } from "react";
import { IoMdBriefcase } from "react-icons/io";
import { MdInfo, MdLayers, MdMail } from "react-icons/md";
import {useRouter} from "next/navigation";
import { LangSwitcherMobile, LangSwitcherDesktop } from "../ui/LangSwitcher";
import { useTranslation } from "react-i18next";

interface NavLink {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [openTopBar, setOpenTopBar] = useState(false);
    const {t} = useTranslation()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links: NavLink[] = [
        { href: "#tentang", label: t("topPanel.listLink.about"), icon: MdLayers },
        { href: "#stack", label: t("topPanel.listLink.stack"), icon: MdInfo },
        { href: "#proyek", label: t("topPanel.listLink.project"), icon: IoMdBriefcase },
        { href: "#kontak", label: t("topPanel.listLink.contact"), icon: MdMail },
    ];

    return (
        <header
            className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
                scrolled
                ? "border-board-line/70 bg-board/80 backdrop-blur-md"
                : "border-transparent bg-transparent"
            }`}
        >
            <nav className="relative z-30 mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
                <a href="#" className="font-mono text-xl tracking-tight text-copper-light">
                    Jaa<span className="text-paper">.dev</span>
                </a>
                <ul className="hidden gap-8 font-mono text-sm text-muted md:flex items-center">
                    <LangSwitcherDesktop />
                    {links.map((link) => (
                        <li key={link.href}>
                        <a
                            href={link.href}
                            className="transition-colors hover:text-copper-light"
                        >
                            {link.label}
                        </a>
                        </li>
                    ))}
                </ul>
                <a
                    href="#kontak"
                    className="rounded-sm border hidden md:block border-copper-dim px-4 py-2 font-mono text-xs text-copper-light transition-colors hover:border-copper hover:bg-copper/10"
                >
                    Hubungi
                </a>
                <BurgerNav isOpen={openTopBar} handleOpen={() => setOpenTopBar(!openTopBar)} />
            </nav>
            <LayoutTopPanel isOpen={openTopBar} handleOpen={() => setOpenTopBar(!openTopBar)} listNavigasi={links} />
        </header>
    );
}

interface BurgerProps {
    handleOpen: () => void;
    isOpen: boolean;
}

interface LayoutTopPanelProps extends BurgerProps {
    listNavigasi: NavLink[];
}

function BurgerNav({ handleOpen, isOpen }: BurgerProps) {
    return (
        <div
            onClick={handleOpen}
            className={`group/nav transition ease-in-out duration-300 hover:cursor-pointer tablet:hidden bg-surface-hover hover:bg-transparent p-2 w-10 flex gap-1 flex-col rounded-md
                ${isOpen ? "rotate-90" : ""}
            `}
            >
        <div
            className={`w-full p-0.5 rounded-2xl transition ease-in-out duration-300 ${
                isOpen ? "bg-primary rotate-30 translate-y-1" : "bg-white group-hover/nav:bg-primary"
            }`}
        />
        <div
            className={`w-full p-0.5 rounded-2xl transition ease-in-out duration-300 ${
                isOpen ? "bg-primary -rotate-90 opacity-0" : "bg-white group-hover/nav:bg-primary"
            }`}
        />
        <div
            className={`w-full p-0.5 rounded-2xl transition ease-in-out duration-300 ${
                isOpen ? "bg-primary -rotate-30 -translate-y-3" : "bg-white group-hover/nav:bg-primary"
            }`}
        />
        </div>
    );
}

function LayoutTopPanel({ isOpen, handleOpen, listNavigasi }: LayoutTopPanelProps) {
    const route = useRouter();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    function handle(link: string) {
        route.push(link);
        handleOpen();
    }

    const zIndex = 25;

    return (
        <>
            <div
                onClick={handleOpen}
                style={{ zIndex }}
                className={`
                    fixed top-0 left-0 right-0 bottom-0 bg-black/50
                    transition-opacity duration-300
                    ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
                    tablet:opacity-0
                `}
            />
            <div
                style={{ zIndex: zIndex + 1 }}
                className={`
                    fixed top-0 left-0 right-0
                    bg-surface-container/80 rounded-b-3xl
                    transition-transform duration-300
                    ${isOpen ? "translate-y-0" : "-translate-y-full"}
                    tablet:-translate-y-full
                `}
            >
            <div className="p-3 tablet:p-5 pt-25 h-full" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col gap-0.5 rounded-xl overflow-hidden">
                    {
                        listNavigasi.map((link) => (
                            <MobileListNavigasi key={link.href} event={() => handle(link.href)} name={link.label} fa={link.icon}/>
                        ))
                    }
                </div>
                    <div className="border-t border-border mt-3 pt-2">
                        <p className="font-gflight text-text-muted text-xs px-4 pb-1">Bahasa</p>
                        <LangSwitcherMobile />
                    </div>
                </div>
                <div className="w-12 h-1.5 bg-border rounded-full mx-auto mb-3" />
            </div>
        </>
    );
}

interface ListMobileNavProps {
  name: string;
  fa: React.ComponentType<{ className?: string }>;
  event: () => void;
}

function MobileListNavigasi({ name, fa: Icon, event }: ListMobileNavProps) {
    return (
        <div
            onClick={event}
            className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium
                transition ease-in-out duration-300
                bg-surface-container-high/70
            }`}
        >
            <Icon className="size-5" />
            <span>{name}</span>
        </div>
    );
}
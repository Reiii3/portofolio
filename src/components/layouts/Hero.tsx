"use client"

import Image from "next/image";
import { useTranslation } from "react-i18next";

const listTag = [
    "Android Tools Developer",
    "Web Developer",
    "AxManager Society",
    "KernelSU Community",
    "AOSP Community",
]

export default function Hero() {
    const {t} = useTranslation()
    return (
        <section className="trace-grid relative overflow-hidden border-b border-board-line/70">
            <div className="mx-auto flex max-w-6xl gap-10 px-6 py-20 flex-col md:flex-row items-center justify-between">
                <div>
                    <p className="mb-5 font-mono text-sm text-copper-light">
                        {t("header.tag")}
                    </p>
                    <h1 className="text-4xl font-bold leading-[1.05] text-paper sm:text-5xl md:text-6xl">
                        {t("header.title")}
                        <br />
                        <span className="text-primary">{t("header.scondTitle")}</span>
                    </h1>
                    <p className="mt-6 max-w-md text-sm leading-relaxed text-muted md:text-base">
                        {t("header.desc")}
                    </p>
                    <div className="mt-9 flex flex-wrap gap-4">
                        <a
                        href="#proyek"
                        className="clip-cut-tl-sm bg-primary px-6 py-3 font-medium text-sm text-board transition-colors hover:bg-copper-light"
                        >
                            {t("header.btn.project")}
                        </a>
                        <a href="#kontak" className="bg-inverse-on-surface clip-cut-tl-sm px-6 py-3 font-medium text-sm text-paper transition-colors hover:border-copper-dim">
                            {t("header.btn.contact")}
                        </a>
                    </div>
                    
                    <div className="mt-10 flex flex-col justify-between gap-6 border-t border-board-line pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                        <div>
                            <p className="font-semibold text-4xl text-copper-light">05</p>
                            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-muted">
                                {t("header.me.coding")}
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold text-4xl text-copper-light">14</p>
                            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-muted">
                                {t("header.me.tools")}
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold text-[17px] text-paper">{t("header.me.focus.title")}</p>
                            <p className="mt-1 text-sm text-muted">
                                {t("header.me.focus.desc")}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col gap-8">
                    <div className="group hidden tablet:block hover:rotate-2 transition-all ease-in-out duration-300 relative w-75 h-75 lg:w-100 lg:h-100 rounded-3xl bg-surface-container">
                        <Image 
                            src="/me.png" 
                            alt="Riza Maulana" 
                            width={500} 
                            height={500} 
                            className="hidden group-hover:-rotate-3 group-hover:brightness-100 group-hover:saturate-100 brightness-50 saturate-50 transition-all ease-in-out duration-300 absolute -top-3 -left-3 tablet:block rounded-3xl object-cover shrink-0 w-75 h-75 lg:w-100 lg:h-100" 
                        />
                    </div>
                    <h1 className="text-xl text-center font-bold leading-[1.05] text-paper md:text-2xl max-w-100">``If Your Operating System Sucks, Then Make It Better``</h1>
                </div>
            </div>
        </section>
    );
}
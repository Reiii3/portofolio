"use client"
import { useTranslation } from "react-i18next";
import { BsMailbox } from "react-icons/bs";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

export default function Contact() {
    const {t} = useTranslation()
    return (
        <section id="kontak" className="bg-surface-container ">
            <div className="flex flex-col md:flex-row lg:justify-between items-center mx-auto max-w-7xl gap-5 px-8 md:px-20 py-20 md:py-25">
                <div className="flex flex-col gap-4 md:max-w-80 lg:max-w-140">
                    <div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl text-secondary font-bold">{t("contact.title")}</h1>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl text-secondary-container font-bold">{t("contact.secondTitle")}</h2>
                    </div>
                    <p className="text-muted/80">{t("contact.desc")}</p>
                </div>
                <div className="bg-surface-container-high w-full md:max-w-120 lg:max-w-140 rounded-xl flex flex-col gap-4 p-6 md:p-8">
                    <div>
                        <h1 className="text-2xl font-bold">{t("contact.sendEmail.title")}</h1>
                        <p className="text-muted/80">{t("contact.sendEmail.desc")}</p>
                    </div>
                    
                    {/* Perubahan ada di tag <a> ini (menambahkan class 'group' dan efek hover) */}
                    <a href="mailto:rizamaulanaa3@gmail.com" target="_blank" className="group bg-surface-container-highest hover:bg-surface-container-highest/60 hover:-translate-y-1 hover:shadow-md transition-all ease-out duration-300 rounded-lg p-3 md:p-5 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                            {/* Efek ikon mailbox sedikit membesar dan miring saat kursor diarahkan */}
                            <BsMailbox className="size-5 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300"/>
                            <p className="text-muted/80 line-clamp-1">rizamaulanaa3@gmail.com</p>
                        </div>
                        {/* Efek ikon panah bergerak sedikit ke kanan atas saat kursor diarahkan */}
                        <HiArrowTopRightOnSquare size={24} className="text-muted/80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"/>
                    </a>
                    
                </div>
            </div>
        </section>
    )
}
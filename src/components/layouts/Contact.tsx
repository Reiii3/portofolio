"use client"
import { useTranslation } from "react-i18next";
import { BsMailbox } from "react-icons/bs";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

export default function Contact() {
    const {t} = useTranslation()
    return (
        <>
            <div id="kontak" className="bg-surface-container flex flex-col md:flex-row lg:justify-between items-center gap-5 px-15 md:px-20 py-20 md:py-25">
                <div className="flex flex-col gap-4 md:max-w-80 lg:max-w-140">
                    <div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl text-secondary font-bold">{t("contact.title")}</h1>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl text-secondary-container font-bold">{t("contact.secondTitle")}</h2>
                    </div>
                    <p className="text-muted/80">{t("contact.desc")}</p>
                </div>
                <div className="bg-surface-container-high md:max-w-120 lg:max-w-140 rounded-xl flex flex-col gap-4 p-8">
                    <div>
                        <h1 className="text-2xl font-bold">{t("contact.sendEmail.title")}</h1>
                        <p className="text-muted/80">{t("contact.sendEmail.desc")}</p>
                    </div>
                    <a href="mailto:rizamaulanaa3@gmail.com" target="_blank" className="bg-surface-container-highest hover:bg-surface-container-highest/60 transition-all ease-in-out duration-300 rounded-lg p-5 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                            <BsMailbox size={24} className=""/>
                            <p className="text-muted/80">rizamaulanaa3@gmail.com</p>
                        </div>
                        <HiArrowTopRightOnSquare size={24} className="text-muted/80"/>
                    </a>
                </div>
            </div>
        </>
    )
}
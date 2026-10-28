"use client"
import { useTranslation } from "react-i18next";
import ContactForm from "./ContactForm";

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
                    
                    <ContactForm />
                    
                </div>
            </div>
        </section>
    )
}
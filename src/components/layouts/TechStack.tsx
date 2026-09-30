"use client"
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface CardProps {
    label: string;
    icon: string; // ganti dari ComponentType
}

export default function TechStack() {
    const {t} = useTranslation()
    const listStackLanguage: CardProps[] = [
        { label: "Kotlin", icon: "/img/kotlin-svgrepo-com.svg" },
        { label: "Bash", icon: "/img/bash-icon-svgrepo-com.svg" },
        { label: "Python", icon: "/img/python-svgrepo-com.svg" },
        { label: "Java", icon: "/img/java-svgrepo-com.svg" },
        { label: "React", icon: "/img/react-svgrepo-com.svg" },
        { label: "JavaScript", icon: "/img/js-official-svgrepo-com.svg" },
        { label: "TypeScript", icon: "/img/typescript-icon-svgrepo-com.svg" },
        { label: "Tailwind", icon: "/img/tailwind-svgrepo-com.svg" },
    ];

    const listStackFramework: CardProps[] = [
        { label: "Jetpack Compose", icon: "/img/android-color-svgrepo-com.svg" },
        { label: "Vite", icon: "/img/vite-svgrepo-com.svg" },
        { label: "Next.js", icon: "/img/next-dot-js-svgrepo-com.svg" },
        { label: "KernelSU", icon: "/img/kernelsu.png" },
        { label: "Git", icon: "/img/git-svgrepo-com.svg" },
        { label: "Github", icon: "/img/github-142-svgrepo-com.svg" },
    ];

    return (
        <section id="stack" className="bg-[url(/coding.webp)] bg-no-repeat bg-cover">
            <div className="backdrop-blur-sm px-6 py-20 md:px-10 md:py-28">
                <div className="flex items-center flex-col md:flex-row  md:justify-between md:gap-2 gap-4.5">
                    <div className="flex flex-col gap-1.5 md:max-w-85">
                        <h1 className="text-3xl font-bold">{t("techStack.language.title")}</h1>
                        <p className="text-sm text-muted/80">
                            {t("techStack.language.desc")}
                        </p>
                    </div>
                    <div className="p-3 border-l-3 rounded-r-xl flex flex-wrap gap-2 border-green-400 bg-surface-container/80">
                        {listStackLanguage.map((item) => (
                            <Card key={item.label} label={item.label} icon={item.icon} />
                        ))}
                    </div>
                </div>

                <div className="flex items-center flex-col md:flex-row md:justify-between md:gap-2 gap-4 mt-8">
                    <div className="flex flex-col gap-1.5 md:max-w-85">
                        <h1 className="text-3xl font-bold">{t("techStack.framework.title")}</h1>
                        <p className="text-sm text-muted/80">
                            {t("techStack.framework.desc")}
                        </p>
                    </div>
                    <div className="p-3 border-l-3 rounded-r-xl flex flex-wrap gap-2 border-green-400 bg-surface-container/80">
                        {listStackFramework.map((item) => (
                            <Card key={item.label} label={item.label} icon={item.icon} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function Card({ label, icon }: CardProps) {
    return (
        <div className="bg-white/20 backdrop-blur-2xl hover:-translate-y-1 transition-all ease-in-out duration-300 flex flex-col items-center gap-1 p-4 px-6 rounded-xl">
            <Image
                src={icon}
                alt={label}
                width={40}
                height={40}
                className="size-10 object-contain"
            />
            <p>{label}</p>
        </div>
    );
}
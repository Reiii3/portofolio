import Image from "next/image";
import type { StaticImageData } from "next/image";

import Kotlin from "../../img/kotlin-svgrepo-com.svg";
import Bash from "../../img/bash-icon-svgrepo-com.svg";
import Python from "../../img/python-svgrepo-com.svg";
import Java from "../../img/java-svgrepo-com.svg";
import ReactIcon from "../../img/react-svgrepo-com.svg";
import Js from "../../img/js-official-svgrepo-com.svg";
import Ts from "../../img/typescript-icon-svgrepo-com.svg";
import Tailwind from "../../img/tailwind-svgrepo-com.svg";
import Jetpack from "../../img/android-color-svgrepo-com.svg";
import Vite from "../../img/vite-svgrepo-com.svg";
import Next from "../../img/next-dot-js-svgrepo-com.svg";
import KernelSU from "../../img/kernelsu.png";
import Git from "../../img/git-svgrepo-com.svg";
import Github from "../../img/github-142-svgrepo-com.svg";

interface CardProps {
    label: string;
    icon: StaticImageData; // ganti dari ComponentType
}

export default function TechStack() {
    const listStackLanguage: CardProps[] = [
        { label: "Kotlin", icon: Kotlin },
        { label: "Bash", icon: Bash },
        { label: "Python", icon: Python },
        { label: "Java", icon: Java },
        { label: "React", icon: ReactIcon },
        { label: "JavaScript", icon: Js },
        { label: "TypeScript", icon: Ts },
        { label: "Tailwind", icon: Tailwind },
    ];

    const listStackFramework: CardProps[] = [
        { label: "Jetpack Compose", icon: Jetpack },
        { label: "Vite", icon: Vite },
        { label: "Next.js", icon: Next },
        { label: "KernelSU", icon: KernelSU },
        { label: "Git", icon: Git },
        { label: "Github", icon: Github },
    ];

    return (
        <section id="stack" className="bg-[url(/coding.webp)] bg-no-repeat bg-cover">
            <div className="backdrop-blur-sm px-6 py-20 md:px-10 md:py-28">
                <div className="flex items-center flex-col md:flex-row md:gap-2 gap-4.5">
                    <div className="flex flex-col gap-1.5 md:max-w-85">
                        <h1 className="text-3xl font-bold">Programming Language Stack</h1>
                        <p className="text-sm text-muted/80">
                            Inilah bahasa pemrograman yang sudah saya kuasai selama 5 tahun terakhir ini dan semenjak saya mengenal coding di kelas 1 smp, ada sekitar 8 bahasa pemrograman.
                        </p>
                    </div>
                    <div className="p-3 border-l-3 rounded-r-xl flex flex-wrap gap-2 border-green-400 bg-surface-container/80">
                        {listStackLanguage.map((item) => (
                            <Card key={item.label} label={item.label} icon={item.icon} />
                        ))}
                    </div>
                </div>

                <div className="flex items-center flex-col md:flex-row-reverse md:gap-2 gap-4 mt-8">
                    <div className="flex flex-col gap-1.5 md:max-w-85">
                        <h1 className="text-3xl font-bold">Framework Stack</h1>
                        <p className="text-sm text-muted/80">
                            Inilah framework daan Tools yang sudah saya kuasai selama 5 tahun terakhir ini dan semenjak saya mengenal coding di kelas 1 smp, ada sekitar 6 framework.
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

function Card({ label, icon: Icon }: CardProps) {
    return (
        <div className="bg-white/20 backdrop-blur-2xl hover:-translate-y-1 transition-all ease-in-out duration-300 flex flex-col items-center gap-1 p-4 px-6 rounded-xl">
            <Image src={Icon} className="size-10" alt={label} />
            <p>{label}</p>
        </div>
    );
}
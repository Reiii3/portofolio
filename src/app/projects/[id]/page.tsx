"use client";

import { useParams } from "next/navigation";
import { dataProject } from "../data/dataProject";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function ProjectDetail() {
    const { id } = useParams<{ id: string }>();
    const project = dataProject.find((item) => item.id === Number(id));

    if (!project) {
        return <ProjectNotFound/>;
    }

    const githubLink = project.gitLink ? (
        <a
            href={project.gitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md font-semibold bg-primary text-on-secondary px-4 py-2 rounded-full"
        >
            GitHub
        </a>
    ) : null;

    const liveLink = project.demoLink ? (
        <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md font-semibold bg-primary text-on-secondary px-4 py-2 rounded-full"
        >
            Live Demo
        </a>
    ) : null;

    const customLink = project.link ? (
        <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md font-semibold bg-primary text-on-secondary px-4 py-2 rounded-full"
        >
            Magisk Module
        </a>
    ) : null

    return (
        <section className="trace-grid h-screen gap-10 px-6 py-20 relative overflow-hidden">
            <div className="flex flex-col items-center tablet:flex-row tablet:items-start gap-4 max-w-6xl mx-auto">
                <div className="group flex w-full flex-col gap-2 tablet:w-105 lg:w-150 tablet:shrink-0 transition-all ease-in-out duration-300">
                    <h1 className="text-4xl font-bold text-center mb-5">{project.name}</h1>
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative overflow-hidden rounded-xl w-full h-70 tablet:h-80 lg:h-90">
                            <Image
                                src={project.image}
                                alt={project.name}
                                fill
                                className="object-cover scale-105 group-hover:brightness-50 group-hover:scale-110 transition-all duration-300"
                            />
                            <div className="absolute bottom-0 z-2 flex items-center justify-between p-3">
                                <div className="bg-muted/50 cursor-pointer opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300 flex items-center gap-1 px-3 py-2 rounded-full">
                                    <FaGithub />
                                    <p className="text-xs">Code</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="w-full flex flex-col gap-2 bg-surface-container rounded-2xl p-6">
                        <h1 className="text-2xl font-bold">Tentang Project</h1>
                        <p className="text-muted/80">{project.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((tag) => (
                                <span key={tag} className="text-xs w-fit px-2 py-0.5 rounded-full bg-white/10">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {githubLink}
                        {liveLink}
                        {customLink}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProjectNotFound() {
    return (
        <section className="trace-grid flex h-screen justify-center py-30 px-6">
            <div className="max-w-md text-center">
                <p className="font-mono text-sm text-copper-dim">Error 404</p>
                <h1 className="mt-4 text-3xl font-semibold text-paper sm:text-4xl">
                    Proyek tidak ditemukan
                </h1>
                <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                    Proyek yang kamu cari belum di publikasikan, di pindahkan atau anda salah memasukkan link project yang anda cari
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Link
                        href="/#proyek"
                        className="rounded-sm bg-copper px-6 py-3 font-mono text-sm text-board transition-colors hover:bg-copper-light"
                    >
                        Lihat semua proyek
                    </Link>
                    <Link
                        href="/"
                        className="rounded-sm border border-board-line px-6 py-3 font-mono text-sm text-paper transition-colors hover:border-copper-dim"
                    >
                        Kembali ke beranda
                    </Link>
                </div>
            </div>
        </section>
    );
}
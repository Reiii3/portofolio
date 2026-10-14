"use client";

import { useParams } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import { FaGithub, FaGlobe, FaArrowLeft } from "react-icons/fa";
import { BsBoxSeamFill } from "react-icons/bs"; // Icon untuk Magisk
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import TraceGridBackground from "@/components/TraceGrid";

interface Project {
    id: number;
    name: string;
    category: string;
    description: string;
    image: StaticImageData | string;
    tech: string[];
    demo_link?: string;
    githubLink?: string;
    link?: string;
}

export default function ProjectDetail() {
    const { id } = useParams<{ id: string }>();
    const [dataProject, setDataProject] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [labelStatus, setLabelStatus] = useState('');

    const project = dataProject.find((item) => item.id === Number(id));

    useEffect(() => {
        async function load() {
            try {
                setIsLoading(true);
                setLabelStatus('Initializing data projects...');
                const { data } = await supabase.from('projects').select('*');
                setDataProject(data ?? []);
                setLabelStatus('Loading data projects...');
            } catch (error) {
                console.log(error);
            } finally {
                // PERBAIKAN: Gunakan setTimeout, bukan setInterval agar tidak memori bocor
                setTimeout(() => {
                    setLabelStatus('Data projects initialized successfully');
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 800);
                }, 800);
            }
        }
        load();
    }, []);
    
    if (isLoading) {
        return <LoadingScreen label={labelStatus}/>
    }

    if (!project) {
        return <ProjectNotFound/>;
    }

    return (
        <section className="min-h-screen px-6 py-20 relative overflow-hidden flex flex-col justify-center">
            <TraceGridBackground />
            <div className="max-w-6xl mx-auto w-full">
                
                <Link 
                    href="/#proyek" 
                    className="inline-flex items-center gap-2 text-muted hover:text-copper-light transition-colors mb-8 font-mono text-sm"
                >
                    <FaArrowLeft /> Kembali ke Portofolio
                </Link>

                <div className="flex flex-col tablet:flex-row items-start gap-10">
                    <div className="w-full tablet:w-1/2 lg:w-7/12 flex flex-col gap-4">
                        <div className="group relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/40 bg-surface-container-high border border-white/5">
                            <div className="relative aspect-video w-full">
                                <Image
                                    src={project.image}
                                    alt={project.name ?? "Project Image"}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>
                    </div>

                    {/* BAGIAN KANAN: Detail & Aksi */}
                    <div className="w-full tablet:w-1/2 lg:w-5/12 flex flex-col gap-6">
                        <div>
                            {/* Kategori dimunculkan */}
                            <span className="text-copper font-mono tracking-widest text-xs uppercase font-semibold mb-2 block">
                                {project.category || "Project"}
                            </span>
                            <h1 className="text-4xl tablet:text-5xl font-gfbold text-paper mb-4 leading-tight">
                                {project.name}
                            </h1>
                        </div>

                        <div className="bg-surface-container/50 border border-board-line/50 rounded-2xl p-6 backdrop-blur-sm">
                            <h2 className="text-lg font-semibold text-paper mb-3">Tentang Proyek</h2>
                            <p className="text-muted leading-relaxed text-sm tablet:text-base">
                                {project.description}
                            </p>
                            
                            <div className="mt-6 pt-6 border-t border-board-line/50">
                                <h3 className="text-sm font-semibold text-paper mb-3">Teknologi yang digunakan</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tag) => (
                                        <span key={tag} className="text-xs font-mono px-3 py-1.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tombol Aksi - Lebih Pop-out */}
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                            {project.githubLink && (
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm font-semibold bg-surface-container hover:bg-surface-container-high text-paper border border-board-line px-5 py-2.5 rounded-lg transition-all"
                                >
                                    <FaGithub className="text-lg" /> Repository
                                </a>
                            )}
                            {project.demo_link && (
                                <a
                                    href={project.demo_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm font-semibold bg-primary hover:bg-primary/90 text-board px-5 py-2.5 rounded-lg transition-all"
                                >
                                    <FaGlobe className="text-lg" /> Live Demo
                                </a>
                            )}
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm font-semibold bg-copper hover:bg-copper-light text-board px-5 py-2.5 rounded-lg transition-all"
                                >
                                    <BsBoxSeamFill className="text-lg" /> Magisk Module
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Komponen ProjectNotFound tidak diubah, sudah oke.

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
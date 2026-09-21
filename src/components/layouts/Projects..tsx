import Image from "next/image";
import { StaticImageData } from "next/image";
import IconAxVision from "../../img/icon_axvision_2.webp";
import RedCorner from "../../img/red_corner_project.webp";
import { FaGithub } from "react-icons/fa";

interface Project {
    title: string;
    category: string;
    description: string;
    image: StaticImageData | string;
    tags: string[];
    liveUrl?: string;
    githubUrl?: string;
}

const projects: Project[] = [
    {
        title: "Project AxVision",
        category: "TOOLS",
        description:
            "Tools Android system optimizer yang saya kembangkan sendiri sebagai solo developer. Mengoptimalkan performa sistem Android yang dikenal berat dan boros RAM, terutama di perangkat Xiaomi/POCO/Redmi/Infinix/TECNO.",
        image: RedCorner,
        tags: ["Bash", "JavaScript", "Android", "Root", "KernelSU", "AxManager", "KernelSU API", "Vite.js", "React"],
        githubUrl: "https://github.com/username/axvision",
    },
    {
        title: "Website Game Corner",
        category: "WEB",
        description:
            "Project perdana saya yang merangkum semua skill yang sudah dipelajari. Website untuk aplikasi di Play Store milik teman/guru yang jadi salah satu orang pertama yang mengajarkan saya coding.",
        image: RedCorner,
        tags: ["React", "JavaScript", "Vite.js", "Tailwind CSS", "Play Store Scraper API", "Firebase"],
        liveUrl: "https://debug.game-corner.pages.dev/",
    },
    {
        title: "Website AxManager Society",
        category: "WEB",
        description:
            "Dikembangkan dari tugas sekolah Pak Tri Gunawan. AxManager adalah tools Android untuk modifikasi ringan (non-root) maupun berat (root). Saya jadi salah satu plugin developer di aplikasi ini (5 plugin, 3 di antaranya sudah tidak mendapat update). Website ini mengenalkan AxManager ke pengguna baru dan komunitas.",
        image: RedCorner,
        tags: ["React", "JavaScript", "Vite.js", "Tailwind CSS", "Play Store Scraper API", "Firebase"],
        liveUrl: "https://debug.game-corner.pages.dev/",
    },
];

export default function Projects() {
    return (
        <section id="proyek" className="px-6 py-20 md:px-10 md:py-28 border-t">
            <div className="mb-10">
                <h2 className="text-3xl font-bold">Various Projects of Mine</h2>
                <p className="text-sm text-muted/80 max-w-110">A collection of all the software projects, tools, and various projects I have worked on during my time as a software developer</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </div>
        </section>
    );
}

function ProjectCard({ project }: { project: Project }) {
    const githubLink = project.githubUrl ? (
        <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md font-semibold bg-primary text-on-secondary px-4 py-2 rounded-full"
        >
            GitHub
        </a>
    ) : null;

    const liveLink = project.liveUrl ? (
        <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md font-semibold bg-primary text-on-secondary px-4 py-2 rounded-full"
        >
            Live Demo
        </a>
    ) : null;

    return (
        <div className="group transition-all duration-300">
            <div className="flex flex-col gap-4">
                <div className="relative overflow-hidden rounded-xl w-full h-50">
                    <Image
                        src={project.image}
                        alt={project.title}
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
                <div>
                    <p className="text-[12px] text-muted/80">{project.category}</p>
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                </div>
                <p className="text-sm text-muted/80">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                        <span key={tag} className="text-xs w-fit px-2 py-0.5 rounded-full bg-white/10">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex gap-3 mt-1">
                    {githubLink}
                    {liveLink}
                </div>
            </div>
        </div>
    );
}
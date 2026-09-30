interface ProjectData {
    id: number
    name: string;
    image: string;
    link?: string;
    gitLink?: string;
    demoLink?: string;
    desc: string;
    category: string[];
    tech: string[]
}

export const dataProject: ProjectData[] = [
    {
        id: 1,
        name: "Project AxVision",
        image: "/img/axvision_hawk.webp",
        link: "https://www.magiskmodule.com/axvision",
        desc: "Tools Android system optimizer yang saya kembangkan sendiri sebagai solo developer. Mengoptimalkan performa sistem Android yang dikenal berat dan boros RAM, terutama di perangkat Xiaomi/POCO/Redmi/Infinix/TECNO.",
        category: ["TOOLS"],
        tech: ["Bash", "JavaScript", "Android", "Root", "KernelSU", "AxManager", "KernelSU API", "Vite.js", "React"],
    },
    {
        id: 2,
        name: "Website Game Corner",
        image: "/img/red_corner_project.webp",
        demoLink: "https://debug.game-corner.pages.dev/",
        desc: "Project perdana saya yang merangkum semua skill yang sudah dipelajari. Website untuk aplikasi di Play Store milik teman/guru yang jadi salah satu orang pertama yang mengajarkan saya coding.",
        category: ["WEB"],
        tech: ["React", "JavaScript", "Vite.js", "Tailwind CSS", "Play Store Scraper API", "Firebase"],
    },
    {
        id: 3,
        name: "Website AxManager Society",
        image: "/img/axmanager_society.webp",
        gitLink: "https://debug.game-corner.pages.dev/",
        desc: "Dikembangkan dari tugas sekolah Pak Tri Gunawan. AxManager adalah tools Android untuk modifikasi ringan (non-root) maupun berat (root). Saya jadi salah satu plugin developer di aplikasi ini (5 plugin, 3 di antaranya sudah tidak mendapat update). Website ini mengenalkan AxManager ke pengguna baru dan komunitas.",
        category: ["WEB"],
        tech: ["React", "JavaScript", "Vite.js", "Tailwind CSS", "Play Store Scraper API", "Firebase"],
    },
]
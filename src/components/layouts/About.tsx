"use client"

import Tag from "../ui/Tag";
import { useTranslation } from 'react-i18next'

export default function About() {
  const {t} = useTranslation()
  return (
    <section id="tentang" className="border-b border-board-line/70">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <Tag>
          <p className="font-medium text-md">{t("about.tag")}</p>
        </Tag>
        <h2 className="mt-4 max-w-2xl text-2xl font-semibold leading-snug text-paper sm:text-3xl md:text-4xl">
          {t("about.title")}
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <p className="text-sm leading-relaxed text-muted/70 md:text-base">
            {t("about.desc.me")}
          </p>
          <p className="text-sm leading-relaxed text-muted/70 md:text-base">
            {t("about.desc.work")}
          </p>
        </div>
      </div>
    </section>
  );
}

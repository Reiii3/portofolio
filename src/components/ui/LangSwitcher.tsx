"use client";

import { useState, useRef, useEffect } from "react";
import { MdLanguage, MdCheck } from "react-icons/md";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

const languages = [
  { code: "id", name: "Indonesia", country: "ID" },
  { code: "en", name: "English", country: "GB" },
];

export function LangSwitcherDesktop() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLang = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <div className="relative hidden tablet:block" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-surface-hover hover:bg-surface p-2 rounded-full border border-border transition duration-200 cursor-pointer"
      >
        <MdLanguage size={16} className="text-text-secondary" />
        <ReactCountryFlag
          countryCode={activeLang.country}
          svg
          style={{ width: "1em", height: "1em", borderRadius: "50%" }}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-surface border border-border rounded-2xl p-2 shadow-lg shadow-black/30 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary transition duration-150 cursor-pointer"
            >
              <ReactCountryFlag
                countryCode={lang.country}
                svg
                style={{ width: "1em", height: "1em", borderRadius: "50%" }}
              />
              <span className="flex-1 text-left">{lang.name}</span>
              {i18n.language === lang.code && <MdCheck size={14} className="text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function LangSwitcherMobile() {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      {languages.map((lang) => {
        const isActive = i18n.language === lang.code;

        return (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-200 cursor-pointer active:scale-90 ${
              isActive ? "border-primary scale-110" : "border-border opacity-60"
            }`}
          >
            <ReactCountryFlag
              countryCode={lang.country}
              svg
              style={{ width: "1.2em", height: "1.2em", borderRadius: "50%" }}
            />
          </button>
        );
      })}
    </div>
  );
}
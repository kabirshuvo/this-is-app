"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("language") || "en";
    setCurrentLang(storedLang);
  }, []);

  const changeLanguage = (lang: string) => {
    setCurrentLang(lang);
    localStorage.setItem("language", lang);
    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${lang}`);
    router.push(newPath);
  };

  const CustomCheckbox = ({
    id,
    checked,
    onChange,
    label,
  }: {
    id: string;
    checked: boolean;
    onChange: () => void;
    label: string;
  }) => (
    <div className="flex items-start space-x-2 gap-2">
      <div
        className={`w-6 h-6 md:w-8 md:h-8 border-4 ${
          checked ? "bg-yellow-400 border-yellow-400" : "border-white"
        } rounded-md cursor-pointer flex items-center justify-center`}
        onClick={onChange}
      >
        {checked && <Check className="text-green-800" size={24} />}
      </div>
      <label
        htmlFor={id}
        className="text-2xl md:text-3xl font-medium leading-none cursor-pointer"
        onClick={onChange}
      >
        {label}
      </label>
    </div>
  );

  return (
    <footer className="py-6 flex justify-center gap-20 bg-green-800 text-white mt-10">
      <CustomCheckbox
        id="english"
        checked={currentLang === "en"}
        onChange={() => changeLanguage("en")}
        label="English"
      />
      <CustomCheckbox
        id="zulu"
        checked={currentLang === "zu"}
        onChange={() => changeLanguage("zu")}
        label="Zulu"
      />
    </footer>
  );
}

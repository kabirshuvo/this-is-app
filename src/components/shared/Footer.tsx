"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState("en");
  console.log(router);

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
    <div className="flex items-start gap-1 md:gap-2">
      <div
        className={`w-3 h-3 md:w-6 md:h-6 border-2 md:border-4 ${
          checked ? "bg-yellow-400 border-yellow-400" : "border-white"
        } rounded-sm cursor-pointer flex items-center justify-center`}
        onClick={onChange}
      >
        {checked && <Check className="text-green-800" />}
      </div>
      <label
        htmlFor={id}
        className="text-sm md:text-lg lg:text-2xl font-medium leading-none cursor-pointer"
        onClick={onChange}
      >
        {label}
      </label>
    </div>
  );

  return (
    <footer className="py-2 flex items-center justify-around md:justify-between bg-green-800 text-white px-4 lg:px-10">
      <div className="flex items-center gap-2 md:gap-6 lg:gap-10">
        <Link href="/" onClick={() => router.back()}>
          <Image
            src="/svg/back.svg"
            alt="TJ Logo"
            width={100}
            height={100}
            className="w-8 h-6 md:w-10 md:h-10 max-w-20 max-h-20"
          />
        </Link>
        <Link href="/">
          <Image
            src="/svg/home.svg"
            alt="TJ Logo"
            width={100}
            height={100}
            className="w-8 h-6 md:w-10 md:h-10 max-w-20 max-h-20"
          />
        </Link>
      </div>

      <div className="flex items-center justify-around gap-2 sm:gap-4 lg:gap-10 xl:gap-16">
        <CustomCheckbox
          id="english"
          checked={currentLang === "en"}
          onChange={() => changeLanguage("en")}
          label="English"
        />
        <Image
          src="/images/tj-logo-header.webp"
          alt="TJ Logo"
          width={100}
          height={100}
          className="w-12 md:w-24 md:h-12"
        />
        <CustomCheckbox
          id="zulu"
          checked={currentLang === "zu"}
          onChange={() => changeLanguage("zu")}
          label="Zulu"
        />
      </div>

      <div className="h-full flex items-center">
        <Link href="/">
          <Image
            src="/images/pals-club-button.webp"
            alt="pals club"
            width={100}
            height={100}
            className="w-14 md:w-24 md:h-8"
          />
        </Link>
      </div>
    </footer>
  );
}

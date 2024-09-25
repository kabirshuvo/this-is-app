"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Check, Home } from "lucide-react";
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
    <div className="flex items-start space-x-2 gap-2">
      <div
        className={`w-6 h-6 md:w-7 md:h-7 border-4 ${
          checked ? "bg-yellow-400 border-yellow-400" : "border-white"
        } rounded-md cursor-pointer flex items-center justify-center`}
        onClick={onChange}
      >
        {checked && <Check className="text-green-800" size={24} />}
      </div>
      <label
        htmlFor={id}
        className="text-xl md:text-2xl lg:text-3xl font-medium leading-none cursor-pointer"
        onClick={onChange}
      >
        {label}
      </label>
    </div>
  );

  return (
    <footer className="py-3 lg:py-4 flex items-start justify-between bg-green-800 text-white px-4 lg:px-10">
      <div className="flex items-center gap-6">
        <Link href="/" onClick={() => router.back()}>
          <Image
            src="/svg/back.svg"
            alt="TJ Logo"
            width={100}
            height={100}
            className="w-24 h-12"
          />
        </Link>
        <Link href="/">
          <Image
            src="/svg/home.svg"
            alt="TJ Logo"
            width={100}
            height={100}
            className="w-24 h-12"
          />
        </Link>
      </div>
      <div className="flex items-center justify-center gap-10 lg:gap-16">
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
          className="w-24 h-12"
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
            className="w-24 h-8"
          />
        </Link>
      </div>
    </footer>
  );
}

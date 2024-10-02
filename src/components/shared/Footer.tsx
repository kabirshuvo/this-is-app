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
    <footer className="py-1 flex items-center justify-around md:justify-between bg-[#049c2c] text-white px-16 lg:px-24">
      <div className="flex items-center gap-2 md:gap-6 lg:gap-10">
        <Link href="/" onClick={() => router.back()}>
          <Image
            src="/footerAssets/Left_Arrow_Icon.svg"
            alt="TJ Logo"
            width={230}
            height={230}
            className="w-12 h-8 md:w-16 md:h-12 max-w-28 max-h-28"
          />
        </Link>
        <Link href="/">
          <Image
            src="/footerAssets/Home_Icon.svg"
            alt="TJ Logo"
            width={200}
            height={200}
            className="w-12 h-8 md:w-16 md:h-12 max-w-28 max-h-28"
          />
        </Link>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-16 xl:gap-24 relative">
        {/* <CustomCheckbox
          id="english"
          checked={currentLang === "en"}
          onChange={() => changeLanguage("en")}
          label="E n g l i s h"
        /> */}
        <Image
          src="/footerAssets/EnglishWithRightArrow.png"
          alt="TJ Logo"
          width={200}
          height={200}
          className="w-120 h-8 md:w-120 md:h-12 max-w-120 max-h-28"
        />
        <Image
          src="/footerAssets/TJandPals_Footer_Logo.png"
          alt="TJ Logo"
          width={100}
          height={100}
          className="w-120 md:w-40 md:h-120"
        />
        {/* <CustomCheckbox
          id="zulu"
          checked={currentLang === "zu"}
          onChange={() => changeLanguage("zu")}
          label="Z u l u"
        /> */}
        <Image
          src="/footerAssets/zuluWithNoA.png"
          alt="TJ Logo"
          width={200}
          height={200}
          className="w-120 h-8 md:w-120 md:h-12 max-w-120 max-h-28"
        />
      </div>

      <div className="h-full flex items-center">
        <Link href="/">
          <Image
            src="/footerAssets/PalsClub_Logo.png"
            alt="TJ Logo"
            width={200}
            height={200}
            className="w-160 h-8 md:w-160 md:h-12 max-w-160 max-h-28"
          />
        </Link>
      </div>
    </footer>
  );
}

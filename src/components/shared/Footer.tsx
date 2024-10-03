"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

  return (
    <footer className="py-1 flex items-center justify-around md:justify-between bg-[#049c2c] text-white px-16 lg:px-24">
      <div className="flex items-center gap-2 md:gap-6 lg:gap-10">
        <Link href="/" onClick={() => router.back()}>
          <Image
            src="/footerAssets/Left_Arrow_Icon.svg"
            alt="TJ Logo"
            width={230}
            height={230}
            className="w-12 h-8 md:w-16 md:h-12 max-w-28 max-h-28 hover:scale-110 transform transition duration-200"
          />
        </Link>
        <Link href="/">
          <Image
            src="/footerAssets/Home_Icon.svg"
            alt="TJ Logo"
            width={200}
            height={200}
            className="w-12 h-8 md:w-16 md:h-12 max-w-28 max-h-28 hover:scale-110 transform transition duration-200"
          />
        </Link>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-16 xl:gap-24 relative">
        {/* Language selector for English */}
        <div
          className="relative flex cursor-pointer"
          onClick={() => changeLanguage("en")}
        >
          <Image
            src={
              currentLang === "en"
                ? "/footerAssets/EnglishWith_TickMark.png"
                : "/footerAssets/EnglishWithNo_TickMark.png"
            }
            alt="English"
            width={200}
            height={200}
            className="w-120 h-8 md:w-120 md:h-12 max-w-120 max-h-28 hover:scale-110 transform transition duration-200"
          />
        </div>

        <Image
          src="/footerAssets/TJandPals_Footer_Logo.png"
          alt="TJ Logo"
          width={100}
          height={100}
          className="w-120 md:w-40 md:h-120 hover:scale-110 transform transition duration-200"
        />

        {/* Language selector for Zulu */}
        <div
          className="relative flex cursor-pointer"
          onClick={() => changeLanguage("zu")}
        >
          <Image
            src={
              currentLang === "zu"
                ? "/footerAssets/ZuluWithTickMark.png"
                : "/footerAssets/zuluWithNoTickMark.png"
            }
            alt="Zulu"
            width={200}
            height={200}
            className="w-120 h-8 md:w-120 md:h-12 max-w-120 max-h-28 hover:scale-110 transform transition duration-200"
          />
        </div>
      </div>

      <div className="h-full flex items-center">
        <Link href="/">
          <Image
            src="/footerAssets/PalsClub_Logo.png"
            alt="TJ Logo"
            width={200}
            height={200}
            className="w-160 h-8 md:w-160 md:h-12 max-w-160 max-h-28 hover:scale-110 transform transition duration-200"
          />
        </Link>
      </div>
    </footer>
  );
}

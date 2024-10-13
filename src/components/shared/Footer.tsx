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
    <footer className="py-1 flex items-center justify-around md:justify-between bg-[#049c2c] text-white px-4 md:px-12 gap-2">
      <div className="flex items-center justify-center gap-2 md:gap-6 lg:gap-10 lg:ml-28">
        <Link href="/" onClick={() => router.back()}>
          <Image
            src="/footerAssets/LeftArrow.svg"
            alt="TJ Logo"
            width={200}
            height={200}
            className="w-6 h-8 md:w-12 md:h-12 max-w-28 max-h-28 hover:scale-110 transform transition duration-200 md:mt-2"
          />
        </Link>
        <Link href="/">
          <Image
            src="/footerAssets/home.svg"
            alt="TJ Logo"
            width={200}
            height={200}
            className="w-6 h-8 md:w-12 md:h-12 max-w-28 max-h-28 hover:scale-110 transform transition duration-200"
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
                ? "/footerAssets/EnglishWithRightTickMark.svg"
                : "/footerAssets/EnglishWithNoRightTickMark.svg"
            }
            alt="English"
            width={200}
            height={200}
            className={`w-120 h-8 md:w-44 md:h-12 hover:scale-110 transform transition duration-200 ${
              currentLang === "en" ? "" : "mt-1.5"
            }`}
          />
        </div>

        <Image
          src="/footerAssets/TJandPALS_footerLogo.svg"
          alt="TJ Logo"
          width={100}
          height={100}
          className="w-120 md:w-44 md:h-12 hover:scale-110 transform transition duration-200 max-w-full max-h-full mt-1.5"
        />

        {/* Language selector for Zulu */}
        <div
          className="relative flex cursor-pointer"
          // onClick={() => changeLanguage("zu")}
        >
          {/* <Image
            src={
              currentLang === "zu"
                ? "/footerAssets/ZuluWithRightTickMark.svg"
                : "/footerAssets/ZuluWithNoRightTickMark.svg"
            }
            alt="Zulu"
            width={200}
            height={200}
            className={`w-40 h-8 md:w-32 md:h-12 hover:scale-110 transform transition duration-200 ${
              currentLang === "zu" ? "" : "mt-1"
            }`}
          /> */}
          <Link href="/en/under-construction">
            <Image
              src="/footerAssets/ZuluWithNoRightTickMark.svg"
              alt="ZuluWithNoRightTickMark"
              width={200}
              height={200}
              className={`w-40 h-8 md:w-32 md:h-12 hover:scale-110 transform transition duration-200 `}
            />
          </Link>
        </div>
      </div>

      <div className="h-full flex items-center lg:mr-28">
        <Link href="/en/under-construction">
          <Image
            src="/footerAssets/palsClubLogo.svg"
            alt="TJ Logo"
            width={200}
            height={200}
            className="w-40 h-8 md:w-160 md:h-12 max-w-full max-h-full hover:scale-110 transform transition duration-200"
          />
        </Link>
      </div>
    </footer>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "@/app/hooks/useLocale";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import PencilAnimation from "./PencilAnimation";
import localFont from "next/font/local";
import Pagination from "@/components/pagination/Pagination";
import { useTranslations } from "next-intl";

const kabelu = localFont({
  src: "./KABELU.ttf",
  variable: "--font-kabelu",
  weight: "100 900",
});

export default function HeaderOne() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("HeaderOne"); // Hook to access translations
  const [category, setCategory] = useState("");

  useEffect(() => {
    // Log pathname to ensure it's accessible
    console.log("Current Pathname:", pathname);

    // Split the pathname into parts
    const pathParts = pathname.split("/");

    // Check if the pathname is the home page (e.g., `/en` or `/zu`)
    const isHomePage = pathParts.length === 2 && (pathParts[1] === "en" || pathParts[1] === "zu");

    if (isHomePage) {
      // Use the default title for the home page
      const defaultTitle = t("title.default");
      setCategory(defaultTitle.toUpperCase());
      console.log("Home page detected. Category set to:", defaultTitle);
    } else {
      // Get the last part of the path as the category
      const currentCategory = pathParts[pathParts.length - 1];

      // Translate the category
      const translatedCategory = t(`title.${currentCategory.toLowerCase()}`, {
        fallback: t("title.default"), // Fallback to default title if translation key doesn't exist
      });

      // Set the category and log the final category for debugging
      setCategory(translatedCategory.toUpperCase());
      console.log("Category set to:", translatedCategory);
    }
  }, [pathname, locale, t]);

  const categoryLetters = category.split("");
  const letterVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
      },
    }),
  };
  const animatedKey = `${category}-${pathname}`;

  const navItems = [
    { label: t("menu.home"), href: `/${locale}` },
    { label: t("menu.aboutUs"), href: `/${locale}/about` },
    { label: t("menu.settings"), href: `/${locale}/settings` },
    { label: t("menu.help"), href: `/${locale}/help` },
  ];

  return (
    <div
      className="relative text-tjyellow flex items-center justify-between px-2 md:px-6 header header-with-curve h-32 md:h-full md:mb-0"
      style={{
        backgroundImage: "url('/menupages/header_banner.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* TJ&PALS Logo */}
      <div className="flex justify-start flex-1">
        <Link href="/" className="h-fit">
          <Image
            src="/menupages/app_logo.svg"
            alt="Logo"
            width={300}
            height={300}
            className="w-16 md:w-48 xl:w-60 pt-6 pb-16 mt-8 md:-mt-6 w-fit-content h-fit-content ml-0"
          />
        </Link>
      </div>

      {/* Magnifying Glass and Text in the middle */}
      <div className="flex justify-between items-center 2xl:py-4 py-2 md:ml-16 mb-16 gap-6 md:gap-8">
        <PencilAnimation animatedKey={animatedKey} />
        <div className="flex flex-col justify-center items-center">
          <h1
          className={`${kabelu.variable} kabelu-font text-md md:text-4xl lg:text-5xl 2xl:text-7xl pb-1 mt-20 md:mt-4 flex`}
          style={{
            textShadow: `
              1.5px 1.5px 0 #228B22,
              -1.5px -1.5px 0 #228B22,
              1.5px -1.5px 0 #228B22,
              -1.5px 1.5px 0 #228B22,
              1.5px 0px 0 #228B22,
              -1.5px 0px 0 #228B22,
              0px 1.5px 0 #228B22,
              0px -1.5px 0 #228B22,
              3px 3px 5px rgba(0, 0, 0, 0.3)
            `,
          }}
        >
          {categoryLetters.map((letter, index) => (
            <motion.span
              key={`${animatedKey}-${index}`}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
              className="inline-block"
              style={{ whiteSpace: letter === " " ? "pre" : "normal" }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <Pagination />
        </div>

        
      </div>

      <Dialog>
        <div className="flex flex-1 justify-end md:mb-6 -mt-6 md:-mt-8">
          <DialogTrigger asChild>
            <Image
              src="/images/menu/menu.webp"
              alt="Menu"
              width={200}
              height={200}
              className="w-6 h-3 md:w-12 lg:w-14 md:h-full cursor-pointer"
            />
          </DialogTrigger>
        </div>
        <DialogContent className="bg-tjgreen-500 text-tjyellow-500 border-none max-w-[90%] md:max-w-lg rounded-lg">
          <nav className="mt-6 space-y-2">
            {navItems.map((item) => (
              <DialogClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className="block text-lg md:text-2xl text-tjyellow-500 p-2 rounded-md hover:bg-tjgreen-600 transition-all duration-200 ease-in-out"
                >
                  {item.label}
                </Link>
              </DialogClose>
            ))}
          </nav>
        </DialogContent>
      </Dialog>
    </div>
  );
}
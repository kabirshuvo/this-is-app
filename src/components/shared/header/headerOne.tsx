"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "@/app/hooks/useLocale";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
// import PencilAnimation from "./PencilAnimation";
import localFont from "next/font/local";

const kabelu = localFont({
  src: "./KABELU.ttf",
  variable: "--font-kabelu",
  weight: "100 900",
});

export default function HeaderOne() {
  const locale = useLocale();
  const pathname = usePathname();
  const [category, setCategory] = useState("LEARN WORD GAMES");

  useEffect(() => {
    const pathParts = pathname.split("/");
    const currentCategory = pathParts[pathParts.length - 1];
    setCategory(
      currentCategory !== locale && currentCategory !== ""
        ? decodeURIComponent(currentCategory).toUpperCase()
        : "LEARN WORD GAMES"
    );
  }, [pathname, locale]);

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
    { label: "Home", href: `/${locale}` },
    { label: "About Us", href: `/${locale}/about` },
    { label: "Settings", href: `/${locale}/settings` },
    { label: "Help", href: `/${locale}/help` },
  ];

  return (
    <div
      className="relative pt-8 pb-14 md:pb-8 lg:pb-4 md:pt-2 lg:pt-2 text-tjyellow flex items-center justify-between px-4 header header-with-curve mb-10 md:mb-0"
      style={{
        backgroundImage: "url('/menupages/header_banner.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Logo on the left */}
      <div className="flex justify-start flex-1">
        <Link href="/" className="xl:h-fit">
          <Image
            src="/menupages/app_logo.svg"
            alt="Logo"
            width={300}
            height={300}
            className="max-w-[85%] max-h-[85%] xl:max-w-[85%] w-fit-content h-fit-content ml-0"
          />
        </Link>
      </div>

      {/* Magnifying Glass and Text in the middle */}
      <div className="hidden md:flex justify-center items-center py-6 xl:py-4">
        <div className="flex items-center">
          <Image
            src="/menupages/TJ_magnifying-GLASS.svg"
            alt="Magnifying Glass"
            width={150}
            height={200}
            className="h-14 md:h-44 xl:h-56"
          />
        </div>

        {/* <PencilAnimation animatedKey={animatedKey} /> */}

        <h1
          className={`${kabelu.variable} kabelu-font text-3xl md:text-4xl lg:text-5xl xl:text-7xl pb-10 flex page-title`}
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
      </div>

      <Dialog>
        <div className="flex flex-1 justify-end md:mb-6">
          <DialogTrigger asChild>
            <Menu className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 cursor-pointer" />
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

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
        : "LEARN WORDS GAME"
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
      className="relative text-tjyellow flex items-center justify-between px-6 header header-with-curve mb-10 md:mb-0"
      style={{
        backgroundImage: "url('/menupages/header_banner.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* TJ&PALS Logo */}
      <div className="flex justify-start flex-1">
        <Link href="/" className="xl:h-fit">
          <Image
            src="/menupages/app_logo.svg"
            alt="Logo"
            width={300}
            height={300}
            className="w-20 md:w-36 lg:w-48 xl:w-60 pt-6 pb-16 mt-4 md:-mt-6 w-fit-content h-fit-content ml-0"
          />
        </Link>
      </div>

      {/* Magnifying Glass and Text in the middle */}
      <div className="hidden md:flex justify-center items-center 2xl:py-4 py-2 ml-16 mb-16 md:gap-6">

          {/* <Image
            src="/menupages/TJ_magnifying-GLASS.svg"
            alt="Magnifying Glass"
            width={150}
            height={200}
            className="h-64 w-full z-10 grayscale"
          /> */}
          <PencilAnimation animatedKey={animatedKey} />
        {/* </div> */}

        

        <h1
          className={`${kabelu.variable} kabelu-font text-3xl md:text-4xl lg:text-5xl 2xl:text-7xl pb-10 mt-4 flex`}
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
        <div className="flex flex-1 justify-end md:mb-6 -mt-8">
          <DialogTrigger asChild>
            <Image
              src="/images/menu/menu.webp"
              alt="Menu"
              width={200}
              height={200}
              className="w-8 h-4 md:w-12 lg:w-14 md:h-full cursor-pointer"
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

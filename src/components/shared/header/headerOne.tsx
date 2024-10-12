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
import PencilAnimation from "./PencilAnimation";

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
            className="max-w-[80%] max-h-[80%] xl:max-w-[85%] w-fit-content h-fit-content ml-0"
          />
        </Link>
      </div>

      {/* Magnifying Glass and Text in the middle */}
      <div className="hidden md:flex justify-center items-center py-4 lg:py-6 xl:pb-20 xl:py-14 space-x-4">
        {/* <div className="flex items-center gap-4">
          <Image
            src="/menupages/TJ_magnifying-GLASS.svg"
            alt="Magnifying Glass"
            width={150}
            height={200}
            className="h-14 md:h-44 xl:h-64"
          />
          <h1 className="text-3xl md:text-3xl lg:text-5xl xl:text-6xl -mt-10">
            {category}
          </h1>
        </div> */}

        <PencilAnimation animatedKey={animatedKey} />

        <h1 className="text-3xl md:text-4xl xl:text-6xl pb-4 flex page-title">
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
    </div >
  );
}

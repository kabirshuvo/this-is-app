"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocale } from "@/app/hooks/useLocale";

export default function HeaderOne() {
  const locale = useLocale();
  const pathname = usePathname();
  const [category, setCategory] = useState("LEARN WORD GAMES");

  useEffect(() => {
    const pathParts = pathname.split("/");
    const currentCategory = pathParts[pathParts.length - 1];
    setCategory(
      currentCategory !== locale && currentCategory !== ""
        ? currentCategory.toUpperCase()
        : "LEARN WORD GAMES"
    );
  }, [pathname, locale]);

 
  const categoryLetters = category.split("");

  // Animation variants for each letter
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
      className="relative text-tjyellow flex items-center justify-between mb-20 px-4 pb-8 header header-with-curve"
      style={{
        backgroundImage: "url('/menupages/header_banner.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Logo on the left */}
      <div className="flex justify-start flex-1">
        <Link href="/" className="flex">
          <Image
            src="/menupages/app_logo.svg"
            alt="Logo"
            width={280}
            height={280}
            className="rounded-full"
          />
        </Link>
      </div>

      {/* Magnifying Glass and Text in the middle */}
      <div className="hidden md:flex justify-center items-center gap-8 ">
        <motion.div
          key={`${animatedKey}-pencil`} 
          className="relative w-[150px] h-[120px]"
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: "spring", stiffness: 100, damping: 8, duration: 1 }}
        >
          {/* Pencil */}
          <Image
            src="/menupages/tj-pancil/pancil.svg"
            alt="TJ Pencil"
            width={90}
            height={100}
            className="absolute top-0 left-16 z-10"
          />

          {/* Magnifying Glass */}
          <motion.div
            key={`${animatedKey}-glass`} 
            initial={{ scale: 0, y: 0 }} 
            animate={{ scale: [0, 1.5, 1], y: [0, -10, 0] }} 
            transition={{ duration: 2 }}
            className="absolute top-10 -right-2 z-20"
          >
            <Image
              src="/menupages/tj-pancil/glass.svg"
              alt="Magnifying Glass"
              width={35}
              height={40}
            />
          </motion.div>

          {/* Hand */}
          <motion.div
            key={`${animatedKey}-hand`} 
            initial={{ rotate: -45, x: 24, scale:0 }} 
            animate={{ rotate: 0, x: 0, scale: [0, 1.5, 1] }} 
            transition={{ duration: 1.8, ease: "easeOut" }} 
            className="absolute top-2/3 left-6"
          >
            <Image
              src="/menupages/tj-pancil/hand.svg"
              alt="Hand"
              width={60}
              height={72}
            />
          </motion.div>
        </motion.div>

        <h1 className="text-3xl md:text-4xl xl:text-5xl pb-4 flex page-title">
          
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
        <div className="flex flex-1 justify-end">
          <DialogTrigger asChild>
            <Menu className="w-10 h-10 md:w-14 md:h-14 cursor-pointer" />
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

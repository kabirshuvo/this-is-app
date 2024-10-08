"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
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
    // I need to display the pathParts all in uppercase
    const pathParts = pathname.split("/");
    const currentCategory = pathParts[pathParts.length - 1];
    setCategory(
      currentCategory !== locale && currentCategory !== ""
        ? currentCategory.toUpperCase()
        : "LEARN WORD GAMES"
    );
  }, [pathname, locale]);

  const navItems = [
    { label: "Home", href: `/${locale}` },
    { label: "About Us", href: `/${locale}/about` },
    { label: "Settings", href: `/${locale}/settings` },
    { label: "Help", href: `/${locale}/help` },
  ];

  return (
    <div
      className="relative pt-8 pb-14 md:pb-8 lg:pb-4 md:pt-4 lg:pt-2 text-tjyellow flex items-center justify-between px-4 header header-with-curve mb-10 md:mb-0"
      style={{
        backgroundImage: "url('/menupages/header_banner.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Logo on the left */}
      <div className="flex justify-start flex-1">
        <Link href="/" className="">
          <Image
            src="/menupages/app_logo.svg"
            alt="Logo"
            width={280}
            height={280}
            className="h-14 md:h-40 lg:h-64"
          />
        </Link>
      </div>

      {/* Magnifying Glass and Text in the middle */}
      <div className="hidden md:flex justify-center items-center py-2">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/menupages/TJ_magnifying-GLASS.svg"
            alt="Magnifying Glass"
            width={200}
            height={200}
            className="h-40 lg:h-64"
          />
          <h1 className="text-3xl md:text-4xl xl:text-5xl -mt-10">
            {category}
          </h1>
        </Link>
      </div>

      <Dialog>
        <div className="flex flex-1 justify-end md:mb-6">
          <DialogTrigger asChild>
            <Menu className="w-12 h-12 md:w-16 md:h-16 cursor-pointer" />
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

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocale } from "@/app/hooks/useLocale";

export default function HeaderOne() {
  const locale = useLocale();

  const navItems = [
    { label: "Home", href: `/${locale}` },
    { label: "About Us", href: `/${locale}/about` },
    { label: "Settings", href: `/${locale}/settings` },
    { label: "Help", href: `/${locale}/help` },
  ];

  return (
    <div
      className="relative py-4 text-tjyellow flex items-center justify-between px-4 header header-with-curve"
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
      <div className="hidden md:flex justify-center items-center ">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/menupages/TJ_magnifying-GLASS.svg"
            alt="Magnifying Glass"
            width={200} // Adjusted width
            height={200} // Adjusted height
            // layout="responsive"
          />
          <h1 className="text-3xl md:text-4xl xl:text-5xl -mt-16">
            LEARN WORD GAMES
          </h1>
        </Link>
      </div>

      {/* Dialog / Menu on the right */}
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

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
import "./header.css";

export default function Header() {
  const locale = useLocale();

  const navItems = [
    { label: "Home", href: `/${locale}` },
    { label: "About Us", href: `/${locale}/about` },
    { label: "Settings", href: `/${locale}/settings` },
    { label: "Help", href: `/${locale}/help` },
  ];

  return (
    <div className="relative py-4 bg-tjgreen-500 text-tjyellow flex items-center justify-between px-4 header-with-curv">
      <div className="flex justify-start flex-1">
        <Link
          href="/"
          className="flex flex-col items-center justify-start gap-1"
        >
          <Image
            src="/images/tj-logo-header.webp"
            alt="TJ Logo"
            width={250}
            height={250}
            layout="responsive"
            className="max-w-[80%] max-h-[80%] rounded-full"
          />
          <p className="hidden text-xs md:text-sm lg:text-base md:block font-extralight">
            Where Learning is Fun
          </p>
        </Link>
      </div>

      <div className="hidden md:flex justify-center flex-1">
        <Link href="/">
<<<<<<< HEAD:src/components/shared/Header.tsx
          <h1 className="text-4xl md:text-5xl xl:text-6xl">LEARN WORD GAMES</h1>
=======
          <h1 className="text-4xl md:text-5xl">TJ & PALS</h1>
>>>>>>> b96f1ce53fea6d283d1869c0b997611ebbf42712:src/components/shared/header/Header.tsx
        </Link>
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

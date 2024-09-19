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

export default function Header() {
  const locale = useLocale();

  const navItems = [
    { label: "Home", href: `/${locale}` },
    { label: "About Us", href: `/${locale}/about` },
    { label: "Settings", href: `/${locale}/settings` },
    { label: "Help", href: `/${locale}/help` },
  ];

  return (
    <div className="py-6 bg-tjgreen-500 text-tjyellow flex items-center justify-between px-4">
      <div className="flex justify-start flex-1">
        <Link
          href="/"
          className="flex flex-col items-center justify-start gap-2"
        >
          <Image
            src="/tj-logo-header.webp"
            alt="TJ Logo"
            width={250}
            height={250}
            className="w-28 h-16 md:w-36 md:h-20 lg:w-64 lg:h-32"
          />
          <p className="hidden md:block text-lg">Where Learning is Fun</p>
        </Link>
      </div>

      <div className="hidden md:flex justify-center flex-1">
        <Link href="/">
          <h1 className="text-5xl md:text-6xl xl:text-8xl">LEARN WORD GAMES</h1>
        </Link>
      </div>

      <Dialog>
        <div className="flex flex-1 justify-end">
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
                  className="block text-2xl text-tjyellow-500 p-2 rounded-md hover:bg-tjgreen-600 transition-all duration-200 ease-in-out"
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

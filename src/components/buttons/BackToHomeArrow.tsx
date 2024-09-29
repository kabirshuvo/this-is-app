"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function BackToHomeArrow() {
  const pathname = usePathname();

  if (pathname === "/en" || pathname === "/zu") {
    return null;
  }

  return (
    <Link href="/" className="hidden lg:block ml-4">
      <Image
        src="/svg/arrow.svg"
        alt="home"
        width={200}
        height={200}
        className="w-14 h-14 xl:w-16 xl:h-16 max-w-18 max-h-18"
      />
    </Link>
  );
}

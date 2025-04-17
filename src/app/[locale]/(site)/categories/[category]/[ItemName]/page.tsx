"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import ConfettiComponent from "@/components/page-components/category/ConfettiComponent";
import Link from "next/link";
import localFont from "next/font/local";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useTranslations } from "next-intl";

const helveticaNeue = localFont({
  src: "./HelveticaNeueBlack.otf",
  variable: "--font-helevetica-neue",
  weight: "400",
});

export default function ItemPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const src = searchParams.get("src");
  const name = searchParams.get("name");

  const [showConfetti, setShowConfetti] = useState(false);

  const t = useTranslations("items");

  useEffect(() => {
    if (src && name) {
      setShowConfetti(true);

      const timeoutId = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [src, name]);

  if (!src) return null;

  // Normalize the name to match translation keys
  const normalizeName = (name: string) =>
    name.toLowerCase().trim().replace(/\s+/g, "-");

  const translationKey = name ? normalizeName(name) : "";
  const translatedName = translationKey ? t(translationKey, { fallback: name }) : "";

  return (
    <div className="flex items-end mx-auto min-h-[calc(100vh-20rem)] w-full max-w-lg justify-around space-x-6">
      <Link
        href="/"
        className="p-1 rounded-full mb-10"
        onClick={() => router.back()}
      >
        <Image
          src="/images/arrow.png"
          alt="arrow"
          width={32}
          height={32}
          className="w-6 xl:w-7 rotate-180 hover:scale-110 transition duration-200 ease-in-out"
        />
      </Link>

      <div className="w-full h-full flex flex-col items-center justify-center text-black bg-white px-5 pt-5 pb-2 md:px-10 md:pt-10 md:pb-5 rounded mx-auto">
            <AspectRatio ratio={1 / 1} className="overflow-hidden rounded-md">
              <Image
                src={src}
                alt={name || "Image"}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </AspectRatio>
          <h2
            className={`${helveticaNeue.variable} helevetica-neue-font text-3xl xl:text-5xl tracking-wide mt-4`}
          >
            {name && (
              <>
                <span className="text-red-500">{translatedName.charAt(0)}</span>
                {translatedName.slice(1)}
              </>
            )}
          </h2>

        {showConfetti && <ConfettiComponent showConfetti={showConfetti} />}
      </div>

      <Link
        href="/"
        className="p-1 rounded-full mb-10"
        onClick={() => router.back()}
      >
        <Image
          src="/images/arrow.png"
          alt="arrow"
          width={32}
          height={32}
          className="w-6 xl:w-7 hover:scale-110 transition duration-200 ease-in-out"
        />
      </Link>
    </div>
  );
}

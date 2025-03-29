"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import ConfettiComponent from "@/components/page-components/category/ConfettiComponent";
import Link from "next/link";
import localFont from "next/font/local";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const helveticaNeue = localFont({
  src: "./HelveticaNeueBlack.otf",
  variable: "--font-helevetica-neue",
  weight: "400",
});

export default function ItemPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const src = searchParams.get("src");
  const name = searchParams.get("name")?.toLocaleLowerCase();
  const [showConfetti, setShowConfetti] = useState(false);

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

  return (
    <div className="flex items-end mx-auto justify-around space-x-6">
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

      <div className="w-full max-w-4xl flex items-center justify-center text-black bg-white px-5 pt-5 pb-2 md:px-10 md:pt-10 md:pb-5 rounded mx-auto">
        <div className="text-center">
          <div className="">
            <AspectRatio ratio={1 / 1} className="overflow-hidden rounded-md">
              <Image
                src={src}
                alt={name || "Image"}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </AspectRatio>
          </div>
          <h2
            className={`${helveticaNeue.variable} helevetica-neue-font text-3xl xl:text-5xl tracking-wide mt-4`}
          >
            {name && (
              <>
                <span className="text-red-500">{name.charAt(0)}</span>
                {name.slice(1)}
              </>
            )}
          </h2>
        </div>

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

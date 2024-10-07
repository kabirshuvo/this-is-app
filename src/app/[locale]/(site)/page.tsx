"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import useCategories from "@/app/hooks/useCategories";

const Home: React.FC = () => {
  const locale = useLocale();
  const categories = useCategories();

  return (
    <div className="w-fulls grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 flex-1 flex-grow h-full">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`${locale}/categories/${category.name.toLowerCase()}`}
          passHref
        >
          <div className="h-full flex flex-col gap-2">
            <div className="flex-1">
              <h3 className="text-sm lg:text-xl xl:text-2xl text-center uppercase lg:text-pretty tracking-widest text-nowrap">
                {category.name}
              </h3>
            </div>
            <div className="flex justify-center items-center bg-white hover:shadow-xl transform transition duration-200 cursor-pointer rounded w-full h-full min-w-20 max-w-60 min-h-20 max-h-60 mx-auto border-4 border-transparent hover:border-4 hover:border-red-500 hover:scale-105">
              <Image
                src={category.image}
                alt={category.name}
                width={240}
                height={240}
                priority
                layout="responsive"
                className="h-40 w-40 object-contain flex-grow flex-1 flex transform transition duration-200 p-3"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;

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
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 flex-1 flex-grow h-full -mt-8">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`${locale}/categories/${category.name.toLowerCase()}`}
          passHref
        >
          <div className="h-full flex flex-col gap-1">
            <div className="flex-1">
              <h3 className="marker-felt-font text-sm xl:text-2xl text-center uppercase lg:text-pretty tracking-widest text-nowrap pt-6">
                {category.name}
              </h3>
            </div>
            <div className="flex justify-center items-center transform transition duration-200 rounded w-full h-full border-4 border-transparent hover:border-4 hover:border-red-500">
              <Image
                src={category.image}
                alt={category.name}
                width={240}
                height={240}
                priority
                layout="responsive"
                className="object-contain hover:scale-110 flex-grow flex-1 flex transform transition duration-200"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;

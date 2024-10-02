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
    <div className="container mx-auto  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 flex-1 flex-grow h-full">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`${locale}/categories/${category.name.toLowerCase()}`}
          passHref
        >
          <div className="h-full flex flex-col gap-2">
            <div className="flex-1">
              <h3 className="lg:text-xl xl:text-2xl text-center uppercase text-pretty tracking-widest">
                {category.name}
              </h3>
            </div>
            <div className="flex justify-center items-center bg-white  hover:shadow-xl transform transition duration-200 h-full cursor-pointer gap-4 ">
              <Image
                src={category.image}
                alt={category.name}
                width={240}
                height={240}
                priority
                layout="responsive"
                className=" h-44 w-44 object-contain flex-grow flex-1 flex hover:scale-110 transform transition duration-200 max-w-44 max-h-44"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;

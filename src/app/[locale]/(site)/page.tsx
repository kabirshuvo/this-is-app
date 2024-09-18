"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Category } from "@/types/category";
import { fetchCategories } from "@/app/lib/getCatgories";
import Link from "next/link";
import { useLocale } from "next-intl";

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const locale = useLocale();

  useEffect(() => {
    async function loadCategories() {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    }

    loadCategories();
  }, []);

  return (
    <div className="">
      <div className="container mx-auto p-2 my-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`${locale}/categories/${category.name.toLowerCase()}`}
            className="space-y-4"
          >
            <h3 className="text-2xl text-center uppercase">{category.name}</h3>
            <div className="flex justify-center items-center bg-white rounded-lg shadow-lg hover:shadow-xl transform transition hover:scale-105 h-64 p-6 cursor-pointer">
              <Image
                src={category.image}
                alt={category.name}
                width={200}
                height={200}
                priority
                className="w-full object-cover rounded-t-lg"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

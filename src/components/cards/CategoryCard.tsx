import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    image: string;
  };
  locale: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = React.memo(
  ({ category, locale }) => (
    <Link href={`${locale}/categories/${category.name.toLowerCase()}`} passHref>
      <div className="h-full flex flex-col gap-1">
        <div className="flex-1">
          <h3 className="marker-felt-font text-sm xl:text-2xl text-center uppercase lg:text-pretty tracking-widest text-nowrap pt-6">
            {category.name}
          </h3>
        </div>
        <div className="hover:scale-105 flex justify-center items-center transform transition duration-200 rounded w-full h-full border-4 border-transparent hover:border-4 hover:border-red-500">
          <Image
            src={category.image}
            alt={category.name}
            width={240}
            height={240}
            priority
            layout="responsive"
            className="object-contain flex-grow flex-1 transform transition duration-200"
          />
        </div>
      </div>
    </Link>
  )
);

CategoryCard.displayName = "CategoryCard";

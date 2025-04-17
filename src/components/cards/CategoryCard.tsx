import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    image: string;
  };
  locale: string;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, locale, className }) => {
  const t = useTranslations("categories");

  // Step 1: Map category names to translation keys (hyphenated where needed)
  const getTranslationKey = (name: string) => {
    const lowerName = name.toLowerCase();
    // Handle special cases with hyphens
    if (lowerName === "fun things") return "fun-things";
    if (lowerName === "fun activities") return "fun-activities";
    // Default: replace spaces with hyphens (or keep as-is if already hyphenated)
    return lowerName.replace(/\s+/g, "-");
  };

  const translationKey = getTranslationKey(category.name);
  const translatedName = t(translationKey) || category.name; // Fallback to original name

  return (
    <Link href={`/${locale}/categories/${category.name.toLowerCase().replace(/\s+/g, "-")}`} passHref>
      <div className={`h-full flex flex-col gap-1 ${className}`}>
        <div className="flex-1">
          <h3 className="marker-felt-font 2xl:text-xl text-center uppercase lg:text-pretty tracking-widest text-nowrap pt-6">
            {translatedName}
          </h3>
        </div>
        <div className="hover:scale-105 flex justify-center items-center transform transition duration-200 rounded w-full h-full border-4 border-transparent hover:border-4 hover:border-red-500">
          <Image
            src={category.image}
            alt={translatedName}
            width={240}
            height={240}
            priority
            layout="responsive"
            className="object-contain flex-grow flex-1 transform transition duration-200"
          />
        </div>
      </div>
    </Link>
  );
};

CategoryCard.displayName = "CategoryCard";
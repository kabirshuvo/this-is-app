"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useLocale } from "next-intl";
import useCategories from "@/app/hooks/useCategories";
import Pagination from "@/components/shared/Pagination";
import { CategoryCard } from "@/components/cards/CategoryCard";

const ITEMS_PER_PAGE = 12;
const FADE_DURATION = 300;

const Home: React.FC = () => {
  const locale = useLocale();
  const categories = useCategories();
  const [page, setPage] = useState(0);
  const [fade, setFade] = useState(true);

  const totalPages = useMemo(
    () => Math.ceil(categories.length / ITEMS_PER_PAGE),
    [categories.length]
  );

  const paginatedCategories = useMemo(
    () => categories.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE),
    [categories, page]
  );

  const handlePageChange = useCallback((newPage: number) => {
    setFade(false);
    setTimeout(() => {
      setPage(newPage);
      setFade(true);
    }, FADE_DURATION);
  }, []);

  const handleNext = useCallback(() => {
    if (page < totalPages - 1) {
      handlePageChange(page + 1);
    }
  }, [page, totalPages, handlePageChange]);

  const handlePrevious = useCallback(() => {
    if (page > 0) {
      handlePageChange(page - 1);
    }
  }, [page, handlePageChange]);

  return (
    <div className="flex flex-col items-center w-full h-full mt-16 md:-mt-8 px-4 md:px-12 xl:px-20 2xl:px-0">
      <div
        key={page}
        className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-2 md:gap-4 flex-1 flex-grow transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {paginatedCategories.map((category) => (
          <CategoryCard key={category.id} category={category} locale={locale} />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onPageSelect={handlePageChange}
      />
    </div>
  );
};

export default Home;

"use client";

import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPage, setTotalPages } from "@/store/pagination-slice";
import { useLocale } from "next-intl";
import useCategories from "@/app/hooks/useCategories";
import { CategoryCard } from "@/components/cards/CategoryCard";

const ITEMS_PER_PAGE = 12;

const Home: React.FC = () => {
  const locale = useLocale();
  const categories = useCategories();
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => state.pagination);

  // Calculate total pages
  const totalPages = useMemo(
    () => Math.ceil(categories.length / ITEMS_PER_PAGE),
    [categories.length]
  );

  // Update total pages in Redux and reset to page 1 if necessary
  useEffect(() => {
    dispatch(setTotalPages(totalPages));
    if (currentPage > totalPages) {
      dispatch(setPage(1)); // Reset to the first page if currentPage is out of range
    }
  }, [categories.length, totalPages, currentPage, dispatch]);

  // Paginated categories
  const paginatedCategories = useMemo(
    () =>
      categories.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ),
    [categories, currentPage]
  );

  return (
    <div className="flex flex-col items-center w-full h-full mt-16 px-4">
      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {paginatedCategories.map((category) => (
          <CategoryCard key={category.id} category={category} locale={locale} />
        ))}
      </div>
    </div>
  );
};

export default Home;

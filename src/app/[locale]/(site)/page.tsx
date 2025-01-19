"use client";

import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setPage,
  setTotalPages,
  prevPage,
  nextPage,
} from "@/store/pagination-slice";
import { useLocale } from "next-intl";
import useCategories from "@/app/hooks/useCategories";
import { CategoryCard } from "@/components/cards/CategoryCard";
import Image from "next/image";

const ITEMS_PER_PAGE = 12;

const Home: React.FC = () => {
  const locale = useLocale();
  const categories = useCategories();
  const dispatch = useAppDispatch();
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.pagination
  );

  // Calculate total pages
  const totalPagesCalculated = useMemo(
    () => Math.ceil(categories.length / ITEMS_PER_PAGE),
    [categories.length]
  );

  // Update total pages in Redux and reset to page 1 if necessary
  useEffect(() => {
    dispatch(setTotalPages(totalPagesCalculated));
    if (currentPage > totalPagesCalculated) {
      dispatch(setPage(1)); // Reset to the first page if currentPage is out of range
    }
  }, [categories.length, totalPagesCalculated, currentPage, dispatch]);

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
    <div className="flex gap-10 items-center w-full h-full mt-16 px-4">
      {/* Previous Page */}
      <button
        onClick={() => dispatch(prevPage())}
        disabled={currentPage === 1}
        className="p-2 text-white rounded disabled:opacity-50 hover:opacity-80 transition-opacity"
        aria-label="Previous page"
      >
        <Image
          src="/images/arrow.png"
          alt="Previous page"
          width={100}
          height={100}
          className="rotate-180"
        />
      </button>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {paginatedCategories.map((category) => (
          <CategoryCard key={category.id} category={category} locale={locale} />
        ))}
      </div>

      {/* Next Page */}
      <button
        onClick={() => dispatch(nextPage())}
        disabled={currentPage === totalPages}
        className="p-2 text-white rounded disabled:opacity-50 hover:opacity-80 transition-opacity"
        aria-label="Next page"
      >
        <Image
          src="/images/arrow.png"
          alt="Next page"
          width={100}
          height={100}
        />
      </button>
    </div>
  );
};

export default Home;

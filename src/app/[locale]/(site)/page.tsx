"use client";

import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPage, setTotalPages } from "@/store/pagination-slice";
import { useLocale } from "next-intl";
import useCategories from "@/app/hooks/useCategories";
import { CategoryCard } from "@/components/cards/CategoryCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import PrevButton from "@/components/pagination/PrevButton";
import NextButton from "@/components/pagination/NextButton";

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
    <div className="flex flex-col justify-between items-center w-full h-full mt-12 px-4 gap-4">
      <div className="flex gap-10 items-center w-full">
        <PrevButton size={100} />

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 h-full grid-rows-2">
          {paginatedCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              locale={locale}
              className="row-span-1"
            />
          ))}
          {/* Add placeholders to fill the remaining space */}
          {Array.from({ length: 12 - paginatedCategories.length }).map(
            (_, index) => (
              <div key={index} className="row-span-1"></div>
            )
          )}
        </div>

        <NextButton size={100} />
      </div>

      {/* Pagination Bar */}
      <Pagination>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setPage(page));
                }}
                className={`w-6 h-2 rounded-full ${
                  currentPage === page ? "" : "bg-gray-300 opacity-50"
                }`}
              ></PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Home;

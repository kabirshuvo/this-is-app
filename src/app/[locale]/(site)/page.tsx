"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const locale = useLocale();
  const categories = useCategories();
  const dispatch = useAppDispatch();
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.pagination
  );

  const [isLoaded, setIsLoaded] = useState(false);
  const [gridPositions, setGridPositions] = useState<
    { x: number; y: number }[]
  >([]);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPagesCalculated = useMemo(
    () => Math.ceil(categories.length / itemsPerPage),
    [categories.length, itemsPerPage]
  );

  useEffect(() => {
    dispatch(setTotalPages(totalPagesCalculated));
    if (currentPage > totalPagesCalculated) {
      dispatch(setPage(1));
    }
  }, [categories.length, totalPagesCalculated, currentPage, dispatch]);

  const paginatedCategories = useMemo(
    () =>
      categories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [categories, currentPage, itemsPerPage]
  );

  const calculateGridPositions = () => {
    const count = paginatedCategories.length;

    const cols = window.innerWidth < 640 ? 2 : window.innerWidth > 1024 ? 6 : 3;
    const gap = 20;
    const cardWidth =
      window.innerWidth < 1024 ? 140 : window.innerWidth < 1920 ? 160 : 200;
    const cardHeight =
      window.innerWidth < 1024 ? 160 : window.innerWidth < 1920 ? 180 : 220;

    const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
    const totalGridWidth = cols * cardWidth + (cols - 1) * gap;
    const offsetX = (containerWidth - totalGridWidth) / 2;

    const positions = Array.from({ length: count }).map((_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = offsetX + col * (cardWidth + gap);
      const y = row * (cardHeight + gap);
      return { x, y };
    });

    setGridPositions(positions);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);

    calculateGridPositions();
    window.addEventListener("resize", calculateGridPositions);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateGridPositions);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length, paginatedCategories]);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 1024 ? 6 : 12);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col justify-between items-center w-full h-full mt-16 xl:mt-0 2xl:mt-12 px-4 gap-4">
      <div className="flex gap-10 items-center w-full">
        {categories.length > itemsPerPage && <PrevButton size={50} />}

        {/* Container with ref */}
        <div
          ref={containerRef}
          className="relative w-full overflow-visible"
          style={{ height: `calc(100vh - 160px)` }}
        >
          {paginatedCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ x: 100, y: 0, opacity: 0 }}
              animate={
                isLoaded
                  ? {
                      x: gridPositions[index]?.x || 0,
                      y: gridPositions[index]?.y || 0,
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1,
                      },
                    }
                  : {}
              }
              className="absolute w-[140px] h-[160px] xl:w-[160px] xl:h-[180px] 2xl:w-[200px] 2xl:h-[220px]"
            >
              <CategoryCard category={category} locale={locale} />
            </motion.div>
          ))}
        </div>

        {categories.length > itemsPerPage && <NextButton size={50} />}
      </div>

      {categories.length > itemsPerPage && (
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
                />
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Home;

"use client";

import React, { useEffect, useMemo, useState } from "react";
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

const ITEMS_PER_PAGE = window.innerWidth < 1024 ? 6 : 12;

const Home: React.FC = () => {
  const locale = useLocale();
  const categories = useCategories();
  const dispatch = useAppDispatch();
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.pagination
  );

  const [isLoaded, setIsLoaded] = useState(false);
  const [gridPositions, setGridPositions] = useState<{ x: number; y: number }[]>([]);

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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500); // Simulate loading delay

    const calculateGridPositions = () => {
      const positions: { x: number; y: number }[] = [];
      const count = categories.length;
      const cols = window.innerWidth < 640 ? 2 : window.innerWidth > 1024 ? 6 : 3; // Adjust columns based on screen width
      const gap = 20; // Space between cards
      const cardWidth = window.innerWidth < 1024 ? 140 : window.innerWidth < 1920 ? 160 : 200; // Width of each card
      const cardHeight = window.innerWidth < 1024 ? 160 : window.innerWidth < 1920 ? 180 : 220;; // Height of each card
    
      // Calculate the total width of all columns
      const totalWidth = cols * cardWidth + (cols - 1) * gap; 
      const offsetX = (window.innerWidth - totalWidth) / 2; // Center horizontally within the screen
    
      // Calculate positions for each card
      for (let i = 0; i < count; i++) {
        const row = Math.floor(i / cols); // Row index
        const col = i % cols; // Column index
    
        // Correctly calculate the x and y positions, ensuring no overflow
        const xPosition = offsetX + col * (cardWidth + gap) - (cardWidth - (2 * gap));
        const yPosition = row * (cardHeight + gap);
    
        // Ensure cards stay within the screen bounds
        if (xPosition >= window.innerWidth || yPosition >= window.innerHeight) {
          console.warn("Position out of bounds: ", { x: xPosition, y: yPosition });
        }
    
        positions.push({
          x: xPosition, 
          y: yPosition, 
        });
      }
    
      setGridPositions(positions);
    };
    
    
    
    calculateGridPositions();

    return () => clearTimeout(timer);
  }, [paginatedCategories]);

  return (
    <div className="flex flex-col justify-between items-center w-full h-full mt-10 lg:mt-16 xl:mt-0 2xl:mt-12 px-4 gap-4">
      <div className="flex gap-10 items-center w-full">
      <PrevButton size={50} />

        {/* Categories */}
        <div className="relative w-full overflow-visible" 
        style={{
          height: `calc(100vh - 160px)`, 
        }}
        >
  {paginatedCategories.map((category, index) => (
    <motion.div
      key={category.id}
      initial={{ x: 100, y: 0, opacity: 0 }} // Start slightly to the left of the container
      animate={
        isLoaded
          ? {
              x: gridPositions[index]?.x || 0,
              y: gridPositions[index]?.y || 0,
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: index * 0.1, // Stagger animation
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


        <NextButton size={50} />
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

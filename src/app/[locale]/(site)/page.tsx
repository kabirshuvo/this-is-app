"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import useCategories from "@/app/hooks/useCategories";
import { motion } from "framer-motion";
import {
  TriangleUpIcon,
  TriangleDownIcon,
  TriangleLeftIcon,
  TriangleRightIcon,
} from "@radix-ui/react-icons";

const ITEMS_PER_PAGE = 12;

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const locale = useLocale();
  const categories = useCategories();
  const [gridPositions, setGridPositions] = useState<{ x: number; y: number }[]>([]);
  const [page, setPage] = useState(0);
  const [fade, setFade] = useState(true);

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

  const paginatedCategories = categories.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const handleNext = () => {
    if (page < totalPages - 1) {
      setFade(false);
      setTimeout(() => {
        setPage((prev) => prev + 1);
        setFade(true);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (page > 0) {
      setFade(false);
      setTimeout(() => {
        setPage((prev) => prev - 1);
        setFade(true);
      }, 300);
    }
  };

  const handlePageSelect = (pageNum: number) => {
    setFade(false);
    setTimeout(() => {
      setPage(pageNum);
      setFade(true);
    }, 300);
  };

  useEffect(() => {
    const calculateGridPositions = () => {
      const positions: { x: number; y: number }[] = [];
      const count = categories.length;
      const screenWidth = window.innerWidth;

      // Determine columns and card size based on screen width
      const cols = screenWidth < 640 ? 1 : screenWidth < 1024 ? 2 : screenWidth < 1920 ? 4 : 6;
      const gap = 20; // Space between cards
      const cardWidth = screenWidth < 640 ? 200 : 240;
      const cardHeight = cardWidth; // Square cards

      for (let i = 0; i < count; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;

        positions.push({
          x: col * (cardWidth + gap) - (cols * (cardWidth + gap)) / 2 + cardWidth / 2,
          y: row * (cardHeight + gap),
        });
      }

      setGridPositions(positions);
    };

    // Initial calculation
    calculateGridPositions();

    // Recalculate on window resize
    const handleResize = () => calculateGridPositions();
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [categories]);

  useEffect(() => {
    // Simulate component mount animation delay
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center flex-wrap h-[100vh] xl:h-[140vh] 2xl:h-[100vh] w-full mt-16 md:-mt-6 px-4 md:px-12 xl:px-0">
      <div
        key={page} // Forces React to treat each page change as a new element
        className={`transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
      >
        {paginatedCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{
              x: gridPositions[index]?.x || -260, // Start off-screen if no position yet
              y: gridPositions[index]?.y || 0,
            }}
            animate={
              isLoaded
                ? {
                    x: gridPositions[index]?.x || 0,
                    y: gridPositions[index]?.y || 0,
                    
                    transition: { duration: 0.5, delay: index * 0.1 },
                  }
                : {}
            }
            className="absolute"
            style={{ width: "240px", height: "240px" }}
          >
            <Link href={`${locale}/categories/${category.name.toLowerCase()}`} passHref>
              <div className="h-full flex flex-col items-center justify-center hover:shadow-xl gap-1 cursor-pointer pt-4">
                <div className="flex-1">
                  <h3 className="marker-felt-font text-sm xl:text-2xl text-center uppercase lg:text-pretty bg-tjblue-500 tracking-widest text-nowrap">
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
          </motion.div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="md:fixed bottom-16 left-2 bg-white bg-opacity-50 flex flex-row md:flex-col items-center justify-center gap-4 md:h-48 w-48 md:w-12 px-2 py-4 rounded-md shadow-lg mt-8 md:mt-0">
        <button
          onClick={handlePrevious}
          disabled={page === 0}
          className="bg-tjgreen-500 rounded-full w-8 h-8 text-2xl flex items-center justify-center disabled:bg-red-600 disabled:cursor-not-allowed"
        >
          <TriangleUpIcon className="w-6 h-6 hidden md:block" />
          <TriangleLeftIcon className="w-6 h-6 md:hidden" />
        </button>

        {/* Page number buttons */}
        <div className="flex md:flex-col gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageSelect(index)}
              className={`rounded-full w-4 h-4 text-sm flex items-center justify-center ${
                index === page ? "bg-tjblue-500 p-3" : "bg-gray-500 bg-opacity-50 p-3"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={page === totalPages - 1}
          className="bg-tjgreen-500 rounded-full w-8 h-8 text-2xl flex items-center justify-center disabled:bg-red-600 disabled:cursor-not-allowed"
        >
          <TriangleDownIcon className="w-6 h-6 hidden md:block" />
          <TriangleRightIcon className="w-6 h-6 md:hidden" />
        </button>
      </div>
    </div>
  );
};

export default Home;

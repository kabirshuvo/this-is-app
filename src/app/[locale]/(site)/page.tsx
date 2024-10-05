"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import useCategories from "@/app/hooks/useCategories";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const locale = useLocale();
  const categories = useCategories();
  const [gridPositions, setGridPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    // Wait until the component is mounted to access window
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500); // Time to wait before starting the animation

    const calculateGridPositions = () => {
      const positions = [];
      const count = categories.length;
      const cols = window.innerWidth < 640 ? 2 : window.innerWidth < 1920 ? 4 : 6; // Example logic for responsiveness
      const gap = 20; // Space between cards
      const cardWidth = 200; // Width of each card
      const cardHeight = 220; // Height of each card

      for (let i = 0; i < count; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        positions.push({
          x:
            col * (cardWidth + gap) -
            (cols * (cardWidth + gap)) / 2 +
            cardWidth / 2, // Center the cards horizontally
          y: row * (cardHeight + gap), // Adjust based on card height and gap
        });
      }

      setGridPositions(positions);
    };

    calculateGridPositions(); // Calculate positions after component mounts

    return () => clearTimeout(timer);
  }, [categories]);

  return (
    <div className="flex justify-center flex-wrap items-start h-[120vh]">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 1, x: -150, y: 0 }} // Start slightly from the left
          animate={
            isLoaded
              ? {
                  x: gridPositions[index]?.x || 0,
                  y: gridPositions[index]?.y || 0,
                  transition: { duration: 0.5, delay: index * 0.1 },
                }
              : {}
          } // Animate to the respective position when loaded
          className="absolute" // Keep the cards positioned absolutely
          style={{ width: "200px", height: "200px" }} // Set fixed dimensions for the cards
        >
          <Link
            href={`${locale}/categories/${category.name.toLowerCase()}`}
            passHref
          >
            <div className="flex flex-col items-center justify-center hover:shadow-xl h-full cursor-pointer">
              <h3 className="lg:text-xl xl:text-2xl text-center uppercase text-pretty tracking-widest mb-2">
                {category.name}
              </h3>
              <div className="bg-white w-full h-full flex justify-center">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={200}
                  height={200}
                  priority
                  className="h-44 w-44 object-contain hover:scale-110 transform transition duration-200 max-w-44 max-h-44"
                />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default Home;

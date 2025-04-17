"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Category } from "@/types/category";
import ItemImageCard from "@/components/cards/ItemImageCard";
import { useAppSelector } from "@/store/hooks";
import PrevButton from "@/components/pagination/PrevButton";
import NextButton from "@/components/pagination/NextButton";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface ThisIsProps {
  relatedData: Category[];
}

const ITEMS_PER_PAGE = 6;

const ThisIs: React.FC<ThisIsProps> = ({ relatedData }) => {
  const page = useAppSelector((state) => state.pagination.currentPage - 1);
  const t = useTranslations("ThisIs");

  const paginatedData = useMemo(
    () => relatedData.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE),
    [relatedData, page]
  );

  const [gridPositions, setGridPositions] = useState<{ x: number; y: number }[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 400);

    const calculateGridPositions = () => {
      const positions: { x: number; y: number }[] = [];
      const count = paginatedData.length;
      const cols = window.innerWidth > 1024 ? 6 : 3;
      const gap = 16;
      const cardWidth =
        window.innerWidth < 1024 ? 150 : window.innerWidth < 1920 ? 180 : 200;
      const cardHeight =
        window.innerWidth < 1024 ? 150 : window.innerWidth < 1920 ? 180 : 200;

      const totalWidth = cols * cardWidth + (cols - 1) * gap;
      const offsetX = (window.innerWidth - totalWidth) / 2;

      for (let i = 0; i < count; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const xPosition = offsetX + col * (cardWidth + gap);
        const yPosition = row * (cardHeight + gap);

        positions.push({ x: xPosition, y: yPosition });
      }

      setGridPositions(positions);
    };

    calculateGridPositions();
    window.addEventListener("resize", calculateGridPositions);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateGridPositions);
    };
  }, [paginatedData]);

  return (
    <div className="relative w-full mt-6">
      <div className="flex justify-center items-center gap-6">
        <PrevButton size={20} />
        <h3 className="md:text-2xl xl:text-3xl text-center uppercase">
          {t("title")}
        </h3>
        <NextButton size={20} />
      </div>

      <div
        className="relative w-full overflow-visible mt-4"
        style={{ height: "260px" }} // adjust based on card height if needed
      >
        {paginatedData.map((item, index) => (
          <motion.div
            key={item.id}
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
            className="absolute w-[150px] h-[150px] md:w-[180px] md:h-[180px] 2xl:w-[200px] 2xl:h-[200px]"
          >
            <ItemImageCard
              src={item.image}
              alt={item.name}
              audio={item.audio.itemAudio}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ThisIs;

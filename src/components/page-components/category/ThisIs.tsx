"use client";

import React, { useMemo } from "react";
import { Category } from "@/types/category";
import ItemImageCard from "@/components/cards/ItemImageCard";
import { useAppSelector } from "@/store/hooks";
import PrevButton from "@/components/pagination/PrevButton";
import NextButton from "@/components/pagination/NextButton";
import { useTranslations } from "next-intl";

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

  return (
    <div>
      <div className="flex justify-center items-center gap-6">
        <PrevButton size={20} />
        <h3 className="md:text-2xl xl:text-3xl text-center uppercase">
          {t("title")}
        </h3>
        <NextButton size={20} />
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 mt-4">
        {paginatedData.map((item) => (
          <ItemImageCard
            key={item.id}
            src={item.image}
            alt={item.name}
            audio={item.audio.itemAudio}
          />
        ))}
      </div>
    </div>
  );
};

export default ThisIs;

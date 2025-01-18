"use client";

import React, { useMemo } from "react";
import { Category } from "@/types/category";
import ItemImageCard from "@/components/cards/ItemImageCard";
import { useAppSelector } from "@/store/hooks";

interface ThisIsProps {
  relatedData: Category[];
}

const ITEMS_PER_PAGE = 6;

const ThisIs: React.FC<ThisIsProps> = ({ relatedData }) => {
  const page = useAppSelector((state) => state.pagination.currentPage - 1);

  const paginatedData = useMemo(
    () => relatedData.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE),
    [relatedData, page]
  );

  return (
    <div className="">
      <h3 className="md:text-2xl xl:text-3xl text-center uppercase">
        This is!
      </h3>
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

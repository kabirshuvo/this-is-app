"use client";

import React, { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { fetchRelatedData } from "@/app/hooks/useCategoryData";
import ItemImageCard from "@/components/cards/ItemImageCard";

interface Params {
  category: string;
}

const ThisIs: React.FC<{ params: Params }> = ({ params }) => {
  const [relatedData, setRelatedData] = useState<Category[]>([]);

  useEffect(() => {
    async function loadRelatedData() {
      const data = await fetchRelatedData(params.category);
      setRelatedData(data);
    }

    loadRelatedData();
  }, [params.category]);

  return (
    <div className="">
      <h3 className="md:text-2xl lg:text-4xl text-center uppercase">This is</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 mt-4">
        {relatedData.map((item) => (
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

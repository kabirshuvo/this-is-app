"use client";

import React, { useEffect, useState } from "react";
import { fetchRelatedData } from "@/hooks/useCategoryData";
import { Category } from "@/types/category";
import Image from "next/image";

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

  const playAudio = (audio: string) => {
    const audioEl = new Audio(audio);
    audioEl.play();
  };

  return (
    <div>
      <h3 className="text-4xl text-center uppercase mt-20">This is</h3>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 mt-10">
        {relatedData.map((item) => (
          <div
            key={item.id}
            onClick={() => playAudio(item.audio)}
            className="space-y-4"
          >
            <div className="flex justify-center items-center bg-white rounded-lg shadow-lg hover:shadow-xl transform transition hover:scale-105 h-64 p-6 cursor-pointer">
              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={200}
                className="w-full object-cover rounded-t-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThisIs;

"use client";

import React, { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { fetchRelatedData } from "@/app/hooks/useCategoryData";
import ItemImageCard from "@/components/cards/ItemImageCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTotalPages } from "@/store/pagination-slice";
import { useMemo } from "react";

interface Params {
  category: string;
}

const ITEMS_PER_PAGE = 6;

const ThisIs: React.FC<{ params: Params }> = ({ params }) => {
  const [relatedData, setRelatedData] = useState<Category[]>([]);
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.pagination.currentPage - 1);
  // const totalPages = useAppSelector((state) => state.pagination.totalPages);

  console.log("Related data", relatedData);

  useEffect(() => {
    async function loadRelatedData() {
      const data = await fetchRelatedData(params.category);
      setRelatedData(data);
      dispatch(setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE)));
    }

    loadRelatedData();
  }, [params.category, dispatch]);

  const paginatedData = useMemo(
    () => relatedData.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE),
    [relatedData, page]
  );

  console.log("Paginated data", paginatedData);

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

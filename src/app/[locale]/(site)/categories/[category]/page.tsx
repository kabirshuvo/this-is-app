"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Category } from "@/types/category";
import { fetchRelatedData } from "@/app/hooks/useCategoryData";
import { useAppDispatch } from "@/store/hooks";
import { setTotalPages } from "@/store/pagination-slice";
import ThisIs from "@/components/page-components/category/ThisIs";
import WhichIs from "@/components/page-components/category/WhichIs";

const ITEMS_PER_PAGE = 6;

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const [relatedData, setRelatedData] = useState<Category[]>([]);
  const dispatch = useAppDispatch();

  const loadRelatedData = useCallback(async () => {
    try {
      const data = await fetchRelatedData(params.category);
      setRelatedData(data);
      dispatch(setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE)));
    } catch (error) {
      console.error("Failed to load related data:", error);
    }
  }, [params.category, dispatch]);

  useEffect(() => {
    loadRelatedData();
  }, [loadRelatedData]);

  return (
    <div className="md:container mx-auto xl:px-2 lg:space-y-6 xl:space-y-10">
      <ThisIs relatedData={relatedData} />
      <WhichIs relatedData={relatedData} params={params} />
    </div>
  );
}

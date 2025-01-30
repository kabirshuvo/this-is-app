"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Category } from "@/types/category";
import { fetchRelatedData } from "@/app/hooks/useCategoryData";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTotalPages } from "@/store/pagination-slice";
import ThisIs from "@/components/page-components/category/ThisIs";
import WhichIs from "@/components/page-components/category/WhichIs";
import { useLocale } from "next-intl";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const [relatedData, setRelatedData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Default value

  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => state.pagination);
  const locale = useLocale();

  const loadRelatedData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchRelatedData(params.category);
      if (data.length === 0) {
        setError("No data found for this category.");
      } else {
        setRelatedData(data);
        dispatch(setTotalPages(Math.ceil(data.length / itemsPerPage)));
      }
    } catch (error) {
      console.error("Failed to load related data:", error);
      setError("Failed to load data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [params.category, dispatch, itemsPerPage]);

  useEffect(() => {
    loadRelatedData();
  }, [loadRelatedData, locale]); // Re-fetch data when locale changes

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 1024 ? 6 : 12);
    };

    // Set initial value
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const paginatedData = useMemo(
    () =>
      relatedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [relatedData, currentPage, itemsPerPage]
  );

  if (isLoading) {
    return <div>Loading...</div>; // Replace with a loading spinner
  }

  if (error) {
    return <div>{error}</div>; // Replace with a more user-friendly error component
  }

  return (
    <div className="md:container mx-auto xl:px-2 lg:space-y-6 xl:space-y-10">
      <ThisIs relatedData={paginatedData} />
      <WhichIs relatedData={paginatedData} params={params} />
    </div>
  );
}
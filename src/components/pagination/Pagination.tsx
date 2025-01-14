"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { nextPage, prevPage, setPage } from "@/store/pagination-slice";
import { cn } from "@/app/lib/utils";
import Image from "next/image";

export default function Pagination() {
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.pagination
  );
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-2">
      {/* Previous Page */}
      <button
        onClick={() => dispatch(prevPage())}
        disabled={currentPage === 1}
        className="p-2 text-white rounded disabled:opacity-50 hover:opacity-80 transition-opacity"
        aria-label="Previous page"
      >
        <Image
          src="/images/arrow.png"
          alt="Previous page"
          width={24}
          height={24}
          className="rotate-180"
        />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => dispatch(setPage(page))}
          className={cn(
            "w-8 h-8 rounded-full text-xl font-bold transition-colors",
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 hover:bg-blue-100"
          )}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {/* Next Page */}
      <button
        onClick={() => dispatch(nextPage())}
        disabled={currentPage === totalPages}
        className="p-2 text-white rounded disabled:opacity-50 hover:opacity-80 transition-opacity"
        aria-label="Next page"
      >
        <Image src="/images/arrow.png" alt="Next page" width={24} height={24} />
      </button>
    </div>
  );
}

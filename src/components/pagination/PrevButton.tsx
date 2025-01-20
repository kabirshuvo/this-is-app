"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { prevPage } from "@/store/pagination-slice";
import Image from "next/image";

interface PrevButtonProps {
  size: number;
}

const PrevButton: React.FC<PrevButtonProps> = ({ size }) => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => state.pagination);

  return (
    <button
      onClick={() => dispatch(prevPage())}
      disabled={currentPage === 1}
      className="p-2 text-white rounded disabled:opacity-50 hover:opacity-80 transition-opacity"
      aria-label="Previous page"
    >
      <Image
        src="/images/arrow.png"
        alt="Previous page"
        width={size}
        height={size}
        className="rotate-180"
      />
    </button>
  );
};

export default PrevButton;

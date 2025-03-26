"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { nextPage } from "@/store/pagination-slice";
import Image from "next/image";

interface NextButtonProps {
  size: number;
}

const NextButton: React.FC<NextButtonProps> = ({ size }) => {
  const dispatch = useAppDispatch();
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.pagination
  );

  return (
    <button
      onClick={() => dispatch(nextPage())}
      disabled={currentPage === totalPages}
      className="p-2 text-white rounded disabled:opacity-50 hover:opacity-80 transition-opacity"
      aria-label="Next page"
    >
      <Image
        src="/images/arrow.png"
        alt="Next page"
        width={size}
        height={size}
      />
    </button>
  );
};

export default NextButton;

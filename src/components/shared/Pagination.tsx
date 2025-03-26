import React from "react";
import {
  TriangleUpIcon,
  TriangleDownIcon,
  TriangleLeftIcon,
  TriangleRightIcon,
} from "@radix-ui/react-icons";

interface PaginationProps {
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
  onPageSelect: (pageNum: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onNext,
  onPrevious,
  onPageSelect,
}) => {
  return (
    <div className="md:fixed bottom-16 left-2 bg-white bg-opacity-50 flex flex-row md:flex-col items-center justify-center gap-4 md:h-48 w-48 md:w-12 px-2 py-4 rounded-md shadow-lg mt-8 md:mt-0">
      <button
        onClick={onPrevious}
        disabled={page === 0}
        className="bg-tjgreen-500 rounded-full w-8 h-8 text-2xl flex items-center justify-center disabled:bg-red-600 disabled:cursor-not-allowed"
      >
        <TriangleUpIcon className="w-6 h-6 hidden md:block" />
        <TriangleLeftIcon className="w-6 h-6 md:hidden" />
      </button>

      <div className="flex md:flex-col gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageSelect(index)}
            className={`rounded-full w-4 h-4 text-sm flex items-center justify-center ${
              index === page
                ? "bg-tjblue-500 p-3"
                : "bg-gray-500 bg-opacity-50 p-3"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={page === totalPages - 1}
        className="bg-tjgreen-500 rounded-full w-8 h-8 text-2xl flex items-center justify-center disabled:bg-red-600 disabled:cursor-not-allowed"
      >
        <TriangleDownIcon className="w-6 h-6 hidden md:block" />
        <TriangleRightIcon className="w-6 h-6 md:hidden" />
      </button>
    </div>
  );
};

export default Pagination;

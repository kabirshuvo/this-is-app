import React from "react";
import Image from "next/image";
import { Category } from "@/types/category";

interface WhichIsCardProps {
  relatedData: Category[];
  handleCardClick: (
    itemId: number,
    itemName: string,
    itemSrc: string,
    itemAlt: string
  ) => void;
  shakeItemId: number | null;
  className?: string;
  id: number;
  src: string;
  alt: string;
  audio: string;
}

const WhichIsCard: React.FC<WhichIsCardProps> = ({
  handleCardClick,
  shakeItemId,
  className,
  id,
  src,
  alt,
}) => {
  return (
    <div
      key={src}
      onClick={() => handleCardClick(id, alt, src, alt)}
      className={`md:min-w-28 lg:min-w-52 max-w-52 md:min-h-28 lg:min-h-52 max-h-52 mx-auto h-full space-y-4 cursor-pointer flex justify-center items-center bg-white rounded-lg shadow-lg hover:shadow-xl transform transition duration-200 border-4 border-transparent hover:border-4 hover:border-red-500 overflow-hidden hover:scale-105 ${
        shakeItemId === id ? "animate-shake" : ""
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={400}
        height={400}
        layout="responsive"
        objectFit="cover"
        className="max-w-40 max-h-48 object-cover flex-grow flex-1 flex transform transition duration-200"
      />
    </div>
  );
};

export default WhichIsCard;

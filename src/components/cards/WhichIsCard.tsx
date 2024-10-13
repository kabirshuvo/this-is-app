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
      className={`md:min-w-28 lg:min-w-52 max-w-52 md:min-h-28 lg:min-h-52 max-h-52 mx-auto h-full space-y-4 flex justify-center items-center transform transition duration-200 border-4 border-transparent hover:border-4 hover:border-red-500 overflow-hidden ${shakeItemId === id ? "animate-shake" : ""
        } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={400}
        height={400}
        layout="responsive"
        objectFit="cover"
        priority
        className="w-full h-full object-cover flex-grow flex-1 flex transform transition duration-200"
      />
    </div>
  );
};

export default WhichIsCard;

import React from "react";
import Image from "next/image";
import { Category } from "@/types/category";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
      className={`w-[100px] md:w-[180px] 2xl:w-[240px] transform transition duration-200 border-4 border-transparent hover:border-4 hover:border-red-500 overflow-hidden ${
        shakeItemId === id ? "animate-shake" : ""
      } ${className}`}
    >
      <AspectRatio ratio={16 / 9} className="w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover"
        />
      </AspectRatio>
    </div>
  );
};

export default WhichIsCard;

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
      className={`w-full transform transition duration-200 border-4 border-transparent hover:border-4 hover:border-red-500 overflow-hidden ${
        shakeItemId === id ? "animate-shake" : ""
      } ${className}`}
    >
      <AspectRatio ratio={4 / 3} className="w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover"
        />
      </AspectRatio>
    </div>
  );
};

export default WhichIsCard;

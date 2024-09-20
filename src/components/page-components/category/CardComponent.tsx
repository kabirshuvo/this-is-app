import React from "react";
import Image from "next/image";
import { Category } from "@/types/category";

interface CardComponentProps {
  item: Category;
  handleCardClick: (itemId: number, itemName: string) => void;
  shakeItemId: number | null;
}

const CardComponent: React.FC<CardComponentProps> = ({
  item,
  handleCardClick,
  shakeItemId,
}) => {
  return (
    <div onClick={() => handleCardClick(item.id, item.name)}>
      <div
        className={`flex justify-center items-center bg-white rounded-lg shadow-lg transform transition h-64 p-6 hover:shadow-xl hover:rounded-lg ${
          shakeItemId === item.id ? "animate-shake" : ""
        }`}
      >
        <Image
          src={item.image}
          alt={item.name}
          width={200}
          height={200}
          className="w-full object-cover hover:rounded-lg"
        />
      </div>
    </div>
  );
};

export default CardComponent;

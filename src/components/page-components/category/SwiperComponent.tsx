import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Category } from "@/types/category";

interface SwiperComponentProps {
  relatedData: Category[];
  handleCardClick: (itemId: number, itemName: string) => void;
  shakeItemId: number | null;
  className?: string;
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({
  relatedData,
  handleCardClick,
  shakeItemId,
  className,
}) => {
  const swiperRef = useRef<SwiperCore | null>(null);

  return (
    <Swiper
      spaceBetween={15}
      slidesPerView={1}
      modules={[Navigation]}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 4 },
      }}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      className={`${className}`}
    >
      {relatedData.map((item) => (
        <SwiperSlide
          key={item.id}
          onClick={() => handleCardClick(item.id, item.name)}
          className={`h-full space-y-4 cursor-pointer flex justify-center items-center bg-white rounded-lg shadow-lg hover:shadow-xl transform transition hover:scale-105 ${
            shakeItemId === item.id ? "animate-shake" : ""
          }`}
        >
          <Image
            src={item.image}
            alt={item.name}
            width={400}
            height={400}
            layout="responsive"
            objectFit="cover"
            className="w-full h-full object-cover flex-grow flex-1 flex"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;

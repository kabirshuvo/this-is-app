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
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({
  relatedData,
  handleCardClick,
  shakeItemId,
}) => {
  const swiperRef = useRef<SwiperCore | null>(null);

  return (
    <Swiper
      spaceBetween={15}
      slidesPerView={1}
      modules={[Navigation]}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      className="mt-4"
    >
      {relatedData.map((item) => (
        <SwiperSlide
          key={item.id}
          className={`space-y-4 cursor-pointer ${
            shakeItemId === item.id ? "animate-shake" : ""
          }`}
        >
          <div onClick={() => handleCardClick(item.id, item.name)}>
            <div className="flex justify-center items-center bg-white rounded-lg shadow-lg transform transition h-64 p-6 hover:shadow-xl hover:rounded-lg">
              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={200}
                className="w-full object-cover hover:rounded-lg"
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;

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
  handleCardClick: (itemId: number, itemName: string, itemSrc: string) => void;
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
    <>
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 4 },
        }}
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        className={`md:max-w-5xl w-[90%] mx-auto ${className}`}
      >
        {relatedData.map((item) => (
          <SwiperSlide
            key={item.id}
            onClick={() => handleCardClick(item.id, item.name, item.image)}
            className={`h-full space-y-4 cursor-pointer bg-white rounded-lg shadow-lg hover:shadow-xl transform transition hover:scale-105 w-full md:min-w-28 lg:min-w-52 md:min-h-28 lg:min-h-52 max-h-52 mx-auto overflow-hidden ${
              shakeItemId === item.id ? "animate-shake" : ""
            }`}
          >
            <div className="h-full flex items-center justify-center">
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={400}
                layout="responsive"
                objectFit="cover"
                className="w-full h-full object-cover flex-grow flex-1 flex rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute top-2/4 -left-16 md:-left-20 transform -translate-y-1/2">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="p-2 rounded-full shadow"
        >
          <Image
            src="/images/arrow.png"
            alt="arrow"
            width={32}
            height={32}
            className="w-4 md:w-8 rotate-180 hover:scale-110 transition duration-200 ease-in-out"
          />
        </button>
      </div>
      <div className="absolute top-2/4 -right-16 md:-right-20 transform -translate-y-1/2">
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="p-2 rounded-full shadow"
        >
          <Image
            src="/images/arrow.png"
            alt="arrow"
            width={32}
            height={32}
            className="w-4 md:w-8 hover:scale-110 transition duration-200 ease-in-out"
          />
        </button>
      </div>
    </>
  );
};

export default SwiperComponent;

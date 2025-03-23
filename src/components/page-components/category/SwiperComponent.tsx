import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Category } from "@/types/category";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
        spaceBetween={20}
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
        className={`w-[66%] mx-auto ${className}`}
      >
        {relatedData.map((item) => (
          <SwiperSlide
            key={item.id}
            onClick={() => handleCardClick(item.id, item.name, item.image)}
            className={`h-full cursor-pointer transform transition duration-300 w-full mx-auto overflow-hidden border-4 border-transparent hover:border-4 hover:border-red-500 rounded ${
              shakeItemId === item.id ? "animate-shake" : ""
            }`}
          >
            <AspectRatio ratio={10/9} className="w-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover"
              />
            </AspectRatio>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute top-2/4 -left-16 md:-left-10 lg:left-20 xl:left-32 transform -translate-y-1/2">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="p-2 rounded-full"
        >
          <Image
            src="/images/arrow.png"
            alt="arrow"
            width={32}
            height={32}
            className="w-4 md:w-6 xl:w-7 rotate-180 hover:scale-110 transition duration-200 ease-in-out"
          />
        </button>
      </div>
      <div className="absolute top-2/4 -right-16 md:-right-10 lg:right-20 xl:right-40 transform -translate-y-1/2">
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="p-2 rounded-full"
        >
          <Image
            src="/images/arrow.png"
            alt="arrow"
            width={32}
            height={32}
            className="w-4 md:w-6 xl:w-7 hover:scale-110 transition duration-200 ease-in-out"
          />
        </button>
      </div>
    </>
  );
};

export default SwiperComponent;

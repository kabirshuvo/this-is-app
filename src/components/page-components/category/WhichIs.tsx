"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types";
import { Navigation } from "swiper/modules";
import { Category } from "@/types/category";
import { Volume2 } from "lucide-react";
import { fetchRelatedData } from "@/app/hooks/useCategoryData";

import "swiper/css";
import "swiper/css/navigation";

interface Params {
  category: string;
}

const WhichIs: React.FC<{ params: Params }> = ({ params }) => {
  const [relatedData, setRelatedData] = useState<Category[]>([]);
  const [randomItemName, setRandomItemName] = useState<string | null>(null);
  const swiperRef = useRef<SwiperCore | null>(null);
  console.log(randomItemName);

  useEffect(() => {
    async function loadRelatedData() {
      const data = await fetchRelatedData(params.category);
      setRelatedData(data);

      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);

        setRandomItemName(data[randomIndex].name);
      }
    }

    loadRelatedData();
  }, [params.category]);

  const playAudio = (audio: string) => {
    const audioEl = new Audio(audio);
    audioEl.play();
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        utterance.voice = voices[0];
      }

      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Text-to-speech is not supported in this browser.");
    }
  };

  return (
    <div className="relative">
      <div className="flex items-start justify-center gap-2 mt-20">
        <h3 className="text-4xl text-center uppercase">
          Which one is the {randomItemName}?
        </h3>
        <Volume2
          size={32}
          className="cursor-pointer"
          onClick={() => {
            speakText(`Which one is the ${randomItemName}?`);
          }}
        />
      </div>

      <Swiper
        spaceBetween={15}
        slidesPerView={1}
        modules={[Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="mt-4"
      >
        {relatedData.map((item) => (
          <SwiperSlide key={item.id} className="rounded-lg hover:rounded-lg">
            <div
              onClick={() => playAudio(item.audio)}
              className="space-y-4 cursor-pointer"
            >
              <div className="flex justify-center items-center bg-white rounded-lg hover:rounded-lg shadow-lg hover:shadow-xl transform transition h-64 p-6">
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

      <div className="absolute top-2/3 -left-20 transform -translate-y-1/2">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="p-2 rounded-full shadow"
        >
          <Image
            src="/arrow.png"
            alt="arrow"
            width={32}
            height={32}
            className="rotate-180 hover:scale-110 transition duration-200 ease-in-out"
          />
        </button>
      </div>
      <div className="absolute top-2/3 -right-20 transform -translate-y-1/2">
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="p-2 rounded-full shadow"
        >
          <Image
            src="/arrow.png"
            alt="arrow"
            width={32}
            height={32}
            className="hover:scale-110 transition duration-200 ease-in-out"
          />
        </button>
      </div>
    </div>
  );
};

export default WhichIs;

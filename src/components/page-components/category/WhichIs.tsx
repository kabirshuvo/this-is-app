"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types";
import { Navigation } from "swiper/modules";
import { Category } from "@/types/category";
import { Volume2 } from "lucide-react";
import { fetchRelatedData } from "@/app/hooks/useCategoryData";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import "swiper/css";
import "swiper/css/navigation";

interface Params {
  category: string;
}

const WhichIs: React.FC<{ params: Params }> = ({ params }) => {
  const [relatedData, setRelatedData] = useState<Category[]>([]);
  const [randomItemName, setRandomItemName] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const swiperRef = useRef<SwiperCore | null>(null);
  const { width, height } = useWindowSize();
  // const [showModal, setShowModal] = useState(false);
  const [shakeItemId, setShakeItemId] = useState<number | null>(null);
  const [correctAudio, setCorrectAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [incorrectAudio, setIncorrectAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

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

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setCorrectAudio(new Audio("/audio/congrats.mp3"));
      setIncorrectAudio(new Audio("/audio/error.mp3"));
      setVoices(window.speechSynthesis.getVoices());
    }
  }, []);

  const playAudio = useCallback((audio: HTMLAudioElement | null) => {
    if (audio) {
      audio.play();
    }
  }, []);

  const speakText = useCallback(
    (text: string) => {
      if (voices.length > 0) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voices[0];
        window.speechSynthesis.speak(utterance);
      } else {
        console.error("Text-to-speech is not supported in this browser.");
      }
    },
    [voices]
  );

  const handleCardClick = useCallback(
    (itemId: number, itemName: string) => {
      if (itemName === randomItemName) {
        console.log("Correct!");
        setShowConfetti(true);
        // setShowModal(true);
        playAudio(correctAudio);

        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);

        setTimeout(() => {
          // setShowModal(false);
        }, 3000);
      } else {
        console.log("Incorrect!");
        setShakeItemId(itemId);
        playAudio(incorrectAudio);
        setTimeout(() => setShakeItemId(null), 500);
      }
    },
    [randomItemName, correctAudio, incorrectAudio, playAudio]
  );

  return (
    <div className="relative">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}
        />
      )}
      {/* <CorrectModal isOpen={showModal} randomItemName={randomItemName} /> */}
      <div className="flex items-start justify-center gap-2 mt-20">
        <h3 className="text-4xl text-center uppercase">
          Which one is the {randomItemName}?
        </h3>
        <Volume2
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

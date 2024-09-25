"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { Swiper as SwiperCore } from "swiper/types";
import { Category } from "@/types/category";
import { Volume2 } from "lucide-react";
import { fetchRelatedData } from "@/app/hooks/useCategoryData";
import { Button } from "@/components/ui/button";
import useItemAudio from "@/app/hooks/useItemAudio";
import useItemQueryAudio from "@/app/hooks/useItemQueryAudio";
import useErrorAudio from "@/app/hooks/useErrorAudio";
import useItemData from "@/app/hooks/useItemData";
import ConfettiComponent from "./ConfettiComponent";
import SwiperComponent from "./SwiperComponent";

interface Params {
  category: string;
}

const WhichIs: React.FC<{ params: Params }> = ({ params }) => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [relatedData, setRelatedData] = useState<Category[]>([]);
  const [randomItemName, setRandomItemName] = useState<string>("");
  const [randomItemId, setRandomItemId] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shakeItemId, setShakeItemId] = useState<number | null>(null);
  const [correctAudio, setCorrectAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [incorrectAudio, setIncorrectAudio] = useState<HTMLAudioElement | null>(
    null
  );

  const clickedItemData = useItemData({
    itemId: shakeItemId,
    category: params.category,
  });

  useEffect(() => {
    if (clickedItemData) {
      const matchedItem = relatedData.find(
        (item) => item.id === clickedItemData.id
      );
      if (!matchedItem) {
        console.log("No matching item found in relatedData");
      }
    }
  }, [clickedItemData, relatedData]);

  const itemAudio = useItemAudio(randomItemName ?? "");
  const playWhichAudio = useItemQueryAudio(
    randomItemName ? randomItemName.toLowerCase() : "",
    "q"
  );
  const playSuccessAudio = useItemQueryAudio(
    randomItemName ? randomItemName.toLowerCase() : "",
    "c"
  );
  const playErrorAudio = useErrorAudio(
    clickedItemData?.name.toLowerCase() ?? ""
  );

  const playAudio = useCallback((audio: HTMLAudioElement | null) => {
    if (audio) {
      audio.play();
    }
  }, []);

  useEffect(() => {
    const loadRelatedData = async () => {
      const data = await fetchRelatedData(params.category);
      setRelatedData(data);

      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomItemName(data[randomIndex].name);
        setRandomItemId(data[randomIndex].id);
      }
    };

    loadRelatedData();
  }, [params.category]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCorrectAudio(new Audio("/audio/congrats.mp3"));
      setIncorrectAudio(new Audio("/audio/error.mp3"));
      const whichOneAudio = new Audio("/audio/whichone.mp3");
      const questionAudio = new Audio(`/audio/${itemAudio?.question}.mp3`);

      whichOneAudio.preload = "auto";
      questionAudio.preload = "auto";

      whichOneAudio.addEventListener("ended", () => {
        questionAudio.play();
      });

      return () => {
        whichOneAudio.removeEventListener("ended", () => {
          questionAudio.play();
        });
      };
    }
  }, [itemAudio]);

  const speakText = useCallback(() => {
    playWhichAudio();
  }, [playWhichAudio]);

  const handleCardClick = useCallback(
    (itemId: number, itemName: string) => {
      if (itemName === randomItemName) {
        setShowConfetti(true);
        playSuccessAudio();

        const confettiTimeout = setTimeout(() => {
          setShowConfetti(false);
        }, 5000);

        if (relatedData.length > 0) {
          const randomIndex = Math.floor(Math.random() * relatedData.length);
          setRandomItemName(relatedData[randomIndex].name);
        }
        return () => clearTimeout(confettiTimeout);
      } else {
        setShakeItemId(itemId);
        setTimeout(() => setShakeItemId(null), 500);
      }
    },
    [randomItemName, correctAudio, incorrectAudio, playAudio, relatedData]
  );

  useEffect(() => {
    if (shakeItemId !== randomItemId) {
      playErrorAudio(clickedItemData?.name);
    }
  }, [shakeItemId, randomItemId, clickedItemData]);

  const memoizedRelatedData = useMemo(() => relatedData, [relatedData]);

  return (
    <div className="relative">
      {showConfetti && <ConfettiComponent showConfetti={showConfetti} />}
      <div className="flex items-start justify-center gap-4 mt-20">
        <h3 className="text-4xl text-center uppercase mt-1">
          Which one is the {randomItemName}?
        </h3>
        <div>
          <Volume2 size={32} />
        </div>
        <Button variant="ghost" size="icon" onClick={speakText} title="Speak">
          <Image
            src="/svg/arrow.svg"
            alt="home"
            width={200}
            height={200}
            className="w-8 h-8"
          />
        </Button>
      </div>
      <SwiperComponent
        relatedData={memoizedRelatedData}
        handleCardClick={handleCardClick}
        shakeItemId={shakeItemId}
      />
      <div className="absolute top-2/3 -left-20 transform -translate-y-1/2">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="p-2 rounded-full shadow"
        >
          <Image
            src="/images/arrow.png"
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
            src="/images/arrow.png"
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

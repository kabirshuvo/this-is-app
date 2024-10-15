"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { Category } from "@/types/category";
import { Volume2 } from "lucide-react";
import { fetchRelatedData } from "@/app/hooks/useCategoryData";
import { Button } from "@/components/ui/button";
import useItemAudio from "@/app/hooks/useItemAudio";
import useItemQueryAudio from "@/app/hooks/useItemQueryAudio";
import useErrorAudio from "@/app/hooks/useErrorAudio";
import useItemData from "@/app/hooks/useItemData";
import SwiperComponent from "./SwiperComponent";
import { useRouter } from "next/navigation";
import WhichIsCard from "@/components/cards/WhichIsCard";

interface Params {
  category: string;
}

const WhichIs: React.FC<{ params: Params }> = ({ params }) => {
  const router = useRouter();
  const [relatedData, setRelatedData] = useState<Category[]>([]);
  const [randomItemName, setRandomItemName] = useState<string>("");
  const [randomItemId, setRandomItemId] = useState<number | null>(null);
  const [shakeItemId, setShakeItemId] = useState<number | null>(null);
  const errorAudioRef = useRef<HTMLAudioElement | null>(null);

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
  useErrorAudio(clickedItemData?.name.toLowerCase() ?? "");

  const loadRelatedData = useCallback(async () => {
    try {
      const data = await fetchRelatedData(params.category);
      const shuffledData = shuffleArray(data);
      setRelatedData(shuffledData);

      if (shuffledData.length > 0) {
        const randomIndex = Math.floor(Math.random() * shuffledData.length);
        setRandomItemName(shuffledData[randomIndex].name);
        setRandomItemId(shuffledData[randomIndex].id);
      }
    } catch (error) {
      console.error("Failed to load related data:", error);
    }
  }, [params.category]);

  useEffect(() => {
    loadRelatedData();
  }, [loadRelatedData]);

  useEffect(() => {
    let whichOneAudio: HTMLAudioElement | null = null;
    let questionAudio: HTMLAudioElement | null = null;

    if (typeof window !== "undefined") {
      whichOneAudio = new Audio("/audio/whichone.mp3");
      questionAudio = new Audio(`/audio/${itemAudio?.question}.mp3`);

      whichOneAudio.preload = "auto";
      questionAudio.preload = "auto";

      whichOneAudio.addEventListener("ended", () => {
        questionAudio?.play();
      });

      return () => {
        whichOneAudio?.removeEventListener("ended", () => {
          questionAudio?.play();
        });
      };
    }
  }, [itemAudio]);

  const speakText = useCallback(() => {
    playWhichAudio();
  }, [playWhichAudio]);

  const handleCardClick = useCallback(
    (itemId: number, itemName: string, itemSrc: string) => {
      if (itemName === randomItemName) {
        playSuccessAudio();

        if (errorAudioRef.current) {
          errorAudioRef.current.pause();
          errorAudioRef.current.currentTime = 0;
        }

        const url = `${params.category}/${itemName.toLowerCase()}?src=${encodeURIComponent(itemSrc)}&name=${encodeURIComponent(itemName)}`;
        router.push(url);

        if (relatedData.length > 0) {
          const randomIndex = Math.floor(Math.random() * relatedData.length);
          setRandomItemName(relatedData[randomIndex].name);
          setRandomItemId(relatedData[randomIndex].id);
          setRelatedData((prevData) => shuffleArray([...prevData]));
        }
      } else {
        setShakeItemId(itemId);
        setTimeout(() => setShakeItemId(null), 500);
      }
    },
    [randomItemName, relatedData, playSuccessAudio, params.category, router]
  );

  const shuffleArray = (array: Category[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const memoizedRelatedData = useMemo(() => {
    if (randomItemId === null) return [];

    const dataCopy = [...relatedData];

    const filteredData = dataCopy.filter((item) => item.id !== randomItemId);

    const randomItems = [];
    const tempFilteredData = [...filteredData];
    while (randomItems.length < 6 && tempFilteredData.length > 0) {
      const randomIndex = Math.floor(Math.random() * tempFilteredData.length);
      randomItems.push(tempFilteredData.splice(randomIndex, 1)[0]);
    }

    const correctItem = dataCopy.find((item) => item.id === randomItemId);

    if (!correctItem) {
      console.warn(
        `correctItem with id ${randomItemId} not found in relatedData`
      );
      return randomItems;
    }

    const combinedData = [...randomItems, correctItem];

    // Shuffle the combined array
    for (let i = combinedData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combinedData[i], combinedData[j]] = [combinedData[j], combinedData[i]];
    }

    return combinedData;
  }, [randomItemId, relatedData]);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-center gap-3 lg:gap-4 mt-4">
        <h3 className="md:text-2xl xl:text-3xl text-center uppercase mt-1">
          Which is the {randomItemName}?
        </h3>
        <div>
          <Volume2 size={28} />
        </div>
        <Button variant="ghost" size="icon" onClick={speakText} title="Speak">
          <Image
            src="/svg/arrow.svg"
            alt="home"
            width={50}
            height={50}
            className="w-5 h-5 md:w-6 md:h-6"
          />
        </Button>
      </div>

      <section>
        <div className="md:hidden grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 mt-4">
          {memoizedRelatedData.map((item) => (
            <WhichIsCard
              key={item.id}
              id={item.id}
              src={item.image}
              alt={item.name}
              audio={item.audio.itemAudio}
              relatedData={memoizedRelatedData}
              handleCardClick={handleCardClick}
              shakeItemId={shakeItemId}
            />
          ))}
        </div>

        <div
          className="relative hidden md:block"
        >
          <SwiperComponent
            relatedData={memoizedRelatedData}
            handleCardClick={handleCardClick}
            shakeItemId={shakeItemId}
          />
        </div>
      </section>
    </div>
  );
};

export default WhichIs;
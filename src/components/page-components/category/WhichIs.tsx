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
import { Button } from "@/components/ui/button";
import useItemQueryAudio from "@/app/hooks/useItemQueryAudio";
import useErrorAudio from "@/app/hooks/useErrorAudio";
import useItemData from "@/app/hooks/useItemData";
import SwiperComponent from "./SwiperComponent";
import { useRouter } from "next/navigation";
import WhichIsCard from "@/components/cards/WhichIsCard";
import { useAppSelector } from "@/store/hooks";

interface Params {
  category: string;
}

interface WhichIsProps {
  relatedData: Category[];
  params: Params;
}

const ITEMS_PER_PAGE = 6;

const WhichIs: React.FC<WhichIsProps> = ({ relatedData, params }) => {
  const router = useRouter();
  const [randomItemName, setRandomItemName] = useState<string>("");
  const [shakeItemId, setShakeItemId] = useState<number | null>(null);
  const errorAudioRef = useRef<HTMLAudioElement | null>(null);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);
  const page = useAppSelector((state) => state.pagination.currentPage - 1);

  const clickedItemData = useItemData({
    itemId: shakeItemId,
    category: params.category,
  });
  const decodedCategory = decodeURIComponent(params.category);

  // Format the category to replace spaces with hyphens
  const formattedCategory = decodedCategory.replace(/\s+/g, "-");
  
  const audioHandler = useItemQueryAudio(
    randomItemName.toLowerCase().replace(/\s+/g, "-"),
    "q",
    formattedCategory
  );

  // useErrorAudio(clickedItemData?.name.toLowerCase().replace(/\s+/g, "-") ?? "");
  useErrorAudio(
    clickedItemData?.name.toLowerCase().replace(/\s+/g, "-") ?? "",
    formattedCategory
  );

  const shuffleArray = (array: Category[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const paginatedData = useMemo(
    () =>
      shuffleArray(
        relatedData.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
      ),
    [relatedData, page]
  );

  useEffect(() => {
    if (paginatedData.length > 0) {
      const randomIndex = Math.floor(Math.random() * paginatedData.length);
      setRandomItemName(paginatedData[randomIndex].name);
    }
  }, [paginatedData]);

  useEffect(() => {
    let whichOneAudio: HTMLAudioElement | null = null;
    let questionAudio: HTMLAudioElement | null = null;

    if (typeof window !== "undefined") {
      whichOneAudio = new Audio("/audio/whichone.mp3");
      questionAudio = new Audio(
        `/audio/which/${params.category}/q-${randomItemName
          .toLowerCase()
          .replace(/\s+/g, "-")}.mp3`
      );

      whichOneAudio.preload = "auto";
      questionAudio.preload = "auto";

      whichOneAudio.addEventListener("ended", () => {
        questionAudio?.play();
      });

      return () => {
        if (whichOneAudio) {
          whichOneAudio.pause();
          whichOneAudio = null;
        }
        if (questionAudio) {
          questionAudio.pause();
          questionAudio = null;
        }
      };
    }
  }, [formattedCategory, randomItemName]);

  const speakText = useCallback(() => {
    audioHandler();
  }, [audioHandler]);

  const handleCardClick = useCallback(
    (itemId: number, itemName: string, itemSrc: string) => {
      const formattedItemName = itemName.toLowerCase().replace(/\s+/g, "-");
  
      if (itemName === randomItemName) {
        if (successAudioRef.current) {
          successAudioRef.current.pause();
          successAudioRef.current = null;
        }
  
        successAudioRef.current = new Audio(
          `/audio/correct/${formattedCategory}/c-${formattedItemName}.mp3`
        );
        successAudioRef.current.play();
  
        if (errorAudioRef.current) {
          errorAudioRef.current.pause();
          errorAudioRef.current.currentTime = 0;
        }
  
        const url = `${formattedCategory}/${formattedItemName}?src=${encodeURIComponent(
          itemSrc
        )}&name=${encodeURIComponent(itemName)}`;
  
        router.push(url);
  
        if (relatedData.length > 0) {
          const randomIndex = Math.floor(Math.random() * relatedData.length);
          setRandomItemName(relatedData[randomIndex].name);
        }
      } else {
        setShakeItemId(itemId);
        setTimeout(() => setShakeItemId(null), 500);
      }
    },
    [randomItemName, relatedData, formattedCategory, router]
  );

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
          {paginatedData.map((item) => (
            <WhichIsCard
              key={item.id}
              id={item.id}
              src={item.image}
              alt={item.name}
              audio={item.audio.itemAudio}
              relatedData={paginatedData}
              handleCardClick={handleCardClick}
              shakeItemId={shakeItemId}
            />
          ))}
        </div>

        <div className="relative hidden md:block">
          <SwiperComponent
            relatedData={paginatedData}
            handleCardClick={handleCardClick}
            shakeItemId={shakeItemId}
          />
        </div>
      </section>
    </div>
  );
};

export default WhichIs;

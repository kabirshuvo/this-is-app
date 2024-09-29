"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Category } from "@/types/category";
import { Volume2 } from "lucide-react";
import { fetchRelatedData } from "@/app/hooks/useCategoryData";
import { Button } from "@/components/ui/button";
import useItemAudio from "@/app/hooks/useItemAudio";
import useItemQueryAudio from "@/app/hooks/useItemQueryAudio";
import useItemData from "@/app/hooks/useItemData";
import ConfettiComponent from "./ConfettiComponent";
import WhichIsCard from "@/components/cards/WhichIsCard";
import { useRouter } from "next/navigation";
import CorrectCardModal from "@/components/modals/CorrectCardModal";

interface Params {
  category: string;
}

const WhichIs: React.FC<{ params: Params }> = ({ params }) => {
  const router = useRouter();
  const [relatedData, setRelatedData] = useState<Category[]>([]);
  const [randomItemName, setRandomItemName] = useState<string>("");
  const [randomItemId, setRandomItemId] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shakeItemId, setShakeItemId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    src: string;
    name: string;
  } | null>(null);

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
    (itemId: number, itemName: string, itemSrc: string) => {
      if (itemName === randomItemName) {
        setShowConfetti(true);
        playSuccessAudio();

        const confettiTimeout = setTimeout(() => {
          setShowConfetti(false);
        }, 5000);

        // Show the modal with the correct image details
        setSelectedItem({ src: itemSrc, name: itemName });
        setModalOpen(true);

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
    [randomItemName, playSuccessAudio, relatedData]
  );

  const memoizedRelatedData = useMemo(() => {
    if (randomItemId === null) return [];

    // Filter out the correct item
    const filteredData = relatedData.filter((item) => item.id !== randomItemId);

    // Randomly select 3 items from the filtered data
    const randomItems = [];
    while (randomItems.length < 3 && filteredData.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredData.length);
      randomItems.push(filteredData.splice(randomIndex, 1)[0]);
    }

    // Find the correct item
    const correctItem = relatedData.find((item) => item.id === randomItemId);

    // If correctItem is undefined, return the randomItems array
    if (!correctItem) return randomItems;

    // Combine the correct item with the 3 randomly selected items
    const combinedData = [...randomItems, correctItem];

    // Shuffle the combined array
    for (let i = combinedData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combinedData[i], combinedData[j]] = [combinedData[j], combinedData[i]];
    }

    return combinedData;
  }, [randomItemId, relatedData]);

  return (
    <div className="">
      {showConfetti && <ConfettiComponent showConfetti={showConfetti} />}
      <div className="flex items-center justify-center gap-3 lg:gap-4 mt-4">
        <h3 className="md:text-2xl lg:text-4xl text-center uppercase mt-1">
          Which one is the {randomItemName}?
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
            className="w-5 h-5 md:w-7 md:h-7"
          />
        </Button>
      </div>
      <section className="relative gap-2">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full shadow"
          onClick={() => router.back()}
        >
          <Image
            src="/images/arrow.png"
            alt=""
            width={28}
            height={28}
            className="transition duration-200 ease-in-out rotate-180"
          />
        </button>
        <div className="grid grid-cols-4 gap-2 md:gap-4 mt-4 max-w-[80%] lg:max-w-[70%] mx-auto justify-center">
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
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full shadow"
          onClick={() => {
            // Logic to handle right arrow click
          }}
        >
          <Image
            src="/images/arrow.png"
            alt=""
            width={28}
            height={28}
            className="transition duration-200 ease-in-out"
          />
        </button>
      </section>
      {selectedItem && (
        <CorrectCardModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          itemImage={selectedItem.src}
          itemName={selectedItem.name}
        />
      )}
    </div>
  );
};

export default WhichIs;

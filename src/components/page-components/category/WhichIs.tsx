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
import ConfettiComponent from "./ConfettiComponent";
// import WhichIsCard from "@/components/cards/WhichIsCard";
import CorrectCardModal from "@/components/modals/CorrectCardModal";
import SwiperComponent from "./SwiperComponent";

interface Params {
  category: string;
}

const WhichIs: React.FC<{ params: Params }> = ({ params }) => {
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
  // const [correctClicked, setCorrectClicked] = useState(false);
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
        // setCorrectClicked(true);
        setShowConfetti(true);
        playSuccessAudio();

        if (errorAudioRef.current) {
          errorAudioRef.current.pause();
          errorAudioRef.current.currentTime = 0;
        }

        const confettiTimeout = setTimeout(() => {
          setShowConfetti(false);
          // setCorrectClicked(false);
        }, 5000);

        // Show the modal with the correct image details
        setSelectedItem({ src: itemSrc, name: itemName });
        setModalOpen(true);

        if (relatedData.length > 0) {
          const randomIndex = Math.floor(Math.random() * relatedData.length);
          setRandomItemName(relatedData[randomIndex].name);
          setRandomItemId(relatedData[randomIndex].id);
          setRelatedData((prevData) => shuffleArray([...prevData]));
        }
        return () => clearTimeout(confettiTimeout);
      } else {
        setShakeItemId(itemId);
        setTimeout(() => setShakeItemId(null), 500);
        // setCorrectClicked(false);
      }
    },
    [randomItemName, relatedData, playSuccessAudio]
  );

  const shuffleArray = (array: Category[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // useEffect(() => {
  //   if (shakeItemId !== randomItemId && clickedItemData && !correctClicked) {
  //     playErrorAudio(clickedItemData.name);
  //   }
  // }, [
  //   shakeItemId,
  //   randomItemId,
  //   clickedItemData,
  //   playErrorAudio,
  //   correctClicked,
  // ]);

  const memoizedRelatedData = useMemo(() => {
    if (randomItemId === null) return [];

    // Create a shallow copy of relatedData to avoid external mutation
    const dataCopy = [...relatedData];

    // Filter out the correct item
    const filteredData = dataCopy.filter((item) => item.id !== randomItemId);

    // Randomly select 3 items from the filtered data
    const randomItems = [];
    const tempFilteredData = [...filteredData]; // Copy to avoid mutation in splice
    while (randomItems.length < 6 && tempFilteredData.length > 0) {
      const randomIndex = Math.floor(Math.random() * tempFilteredData.length);
      randomItems.push(tempFilteredData.splice(randomIndex, 1)[0]);
    }

    // Find the correct item
    const correctItem = dataCopy.find((item) => item.id === randomItemId);

    // Return only randomItems if correctItem is not found
    if (!correctItem) {
      console.warn(
        `correctItem with id ${randomItemId} not found in relatedData`
      );
      return randomItems;
    }

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
    <div className="mt-4">
      {showConfetti && <ConfettiComponent showConfetti={showConfetti} />}
      <div className="flex items-center justify-center gap-3 lg:gap-4 mt-4">
        <h3 className="md:text-2xl lg:text-4xl text-center uppercase mt-1">
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
            className="w-5 h-5 md:w-7 md:h-7"
          />
        </Button>
      </div>
      <section className="relative gap-2 flex justify-center w-[70%] px-0 mx-auto mt-2">
        {/* <div className="grid grid-cols-4 gap-2 md:gap-4 mt-4 max-w-[80%] lg:max-w-[70%] mx-auto justify-center">
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
        </div> */}

        <SwiperComponent
          relatedData={memoizedRelatedData}
          handleCardClick={handleCardClick}
          shakeItemId={shakeItemId}
        />
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

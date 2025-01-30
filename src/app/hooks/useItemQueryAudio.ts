import { useEffect, useRef } from "react";

type AudioType = "default" | "q" | "c" | "w";

const useItemQueryAudio = (itemName: string, type: AudioType = "default", category: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const formattedName = itemName.replace(/\s+/g, '-');

  useEffect(() => {
    if (itemName) {
      let audioSrc = "";
      switch (type) {
        case "q":
          audioSrc = `/audio/which/${category}/q-${formattedName}.mp3`;
          break;
        case "c":
          audioSrc = `/audio/success/${category}/c-${formattedName}.mp3`;
          break;
        case "w":
          audioSrc = `/audio/warning/${category}/w-${formattedName}.mp3`;
          break;
        case "default":
        default:
          audioSrc = `/audio/this/${category}/${formattedName}.mp3`;
          break;
      }
      audioRef.current = new Audio(audioSrc);

      audioRef.current.onerror = () => {
        console.error(`Failed to load audio: ${audioSrc}`);
        audioRef.current = null;
      };
    }
  }, [itemName, type, category, formattedName]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
        audioRef.current = null;
      });
    }
  };

  return playAudio;
};

export default useItemQueryAudio;

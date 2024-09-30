import { useEffect, useRef } from "react";

type AudioType = "default" | "q" | "c" | "w";

const useItemQueryAudio = (itemName: string, type: AudioType = "default") => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (itemName) {
      let audioSrc = "";
      switch (type) {
        case "q":
          audioSrc = `/audio/which/q-${itemName}.mp3`;
          break;
        case "c":
          audioSrc = `/audio/correct/c-${itemName}.mp3`;
          break;
        case "w":
          audioSrc = `/audio/warning/w-${itemName}.mp3`;
          break;
        case "default":
        default:
          audioSrc = `/audio/this/${itemName}.mp3`;
          break;
      }
      audioRef.current = new Audio(audioSrc);
    }
  }, [itemName, type]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return playAudio;
};

export default useItemQueryAudio;

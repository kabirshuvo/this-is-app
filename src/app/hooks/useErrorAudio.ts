import { useEffect, useRef } from "react";

const useErrorAudio = (errorItem: string | null, category: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (errorItem) {
      // Format the category to replace spaces with hyphens
      const formattedCategory = category.replace(/\s+/g, "-");
      console.log("FORMATTED CATEGORY:", formattedCategory);

      // Include the formatted category in the error audio path
      audioRef.current = new Audio(`/audio/error/${formattedCategory}/n-${errorItem}.mp3`);
      
      audioRef.current.onerror = () => {
        console.error(`Failed to load audio: /audio/error/${formattedCategory}/n-${errorItem}.mp3`);
        audioRef.current = null;
      };

      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
        audioRef.current = null;
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [errorItem, category]);

  const playErrorAudio = (name: string | undefined) => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
        audioRef.current = null;
      });
    } else {
      console.log(`Error audio for ${name} not found`);
    }
  };

  return playErrorAudio;
};

export default useErrorAudio;

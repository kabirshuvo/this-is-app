import { useEffect, useRef } from "react";

const useErrorAudio = (errorItem: string | null) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (errorItem) {
      audioRef.current = new Audio(`/audio/error/n-${errorItem}.mp3`);

      audioRef.current.onerror = () => {
        console.error(`Failed to load audio: ${errorItem}.mp3`);
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
  }, [errorItem]);

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

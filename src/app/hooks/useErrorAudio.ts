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
    }
  }, [errorItem]);

  const playErrorAudio = (name: string | undefined) => {
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      console.log(`Error audio for ${name} not found`);
    }
  };

  return playErrorAudio;
};

export default useErrorAudio;

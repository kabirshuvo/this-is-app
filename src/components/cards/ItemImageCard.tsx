import Image from "next/image";
import { useRef, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Global audio reference to ensure only one audio plays at a time
let globalAudioRef: HTMLAudioElement | null = null;

// Cache for preloaded audio elements
const audioCache = new Map<string, HTMLAudioElement>();

interface ResponsiveItemImageCardProps {
  src: string;
  alt: string;
  audio: string;
}

export default function ItemImageCard({
  src,
  alt,
  audio,
}: ResponsiveItemImageCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Preload audio when component mounts
  useEffect(() => {
    if (!audioCache.has(audio)) {
      const audioElement = new Audio(audio);
      audioElement.preload = "auto";
      audioCache.set(audio, audioElement);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [audio]);

  const playAudio = (audioUrl: string) => {
    // Stop and cleanup any existing global audio
    if (globalAudioRef) {
      globalAudioRef.pause();
      globalAudioRef.currentTime = 0;
      globalAudioRef = null;
    }

    // Get or create audio element
    let audioElement = audioCache.get(audioUrl);
    if (!audioElement) {
      audioElement = new Audio(audioUrl);
      audioElement.preload = "auto";
      audioCache.set(audioUrl, audioElement);
    }

    // Play the audio
    globalAudioRef = audioElement;
    globalAudioRef.play().catch((error) => {
      console.error("Error playing audio:", error);
      globalAudioRef = null;
    });
  };

  return (
    <div
      onClick={() => playAudio(audio)}
      className="duration-200 w-full flex justify-center items-center transform transition overflow-hidden border-4 border-transparent hover:border-4 hover:border-red-500"
    >
      <AspectRatio ratio={200 / 170} className="w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover"
        />
      </AspectRatio>
    </div>
  );
}

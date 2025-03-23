import Image from "next/image";
import { useRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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

  const playAudio = (audio: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current = new Audio(audio);
    audioRef.current.play();
  };

  return (
    <div
      onClick={() => playAudio(audio)}
      className="duration-200 w-full flex justify-center items-center transform transition overflow-hidden border-4 border-transparent hover:border-4 hover:border-red-500"
    >
      <AspectRatio ratio={200/170} className="w-full">
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

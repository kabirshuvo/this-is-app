import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

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
  const playAudio = (audio: string) => {
    const audioEl = new Audio(audio);
    audioEl.play();
  };
  return (
    <Card className="w-full mx-auto">
      <CardContent
        onClick={() => playAudio(audio)}
        className="flex justify-center items-center rounded-xl shadow-lg transform transition border-4 border-transparent hover:border-4 hover:border-red-500 h-full p-6 cursor-pointer"
      >
        <Image
          src={src}
          alt={alt}
          width={400}
          height={400}
          priority
          layout="responsive"
          className="w-full h-full object-cover flex-grow flex-1 flex"
        />
      </CardContent>
    </Card>
  );
}

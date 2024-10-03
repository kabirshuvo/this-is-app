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
        className="flex justify-center items-center shadow-lg transform transition h-full cursor-pointer"
      >
        <Image
          src={src}
          alt={alt}
          width={200}
          height={200}
          priority
          layout="responsive"
          className="max-w-40 max-h-48 object-cover flex-grow flex-1 flex hover:scale-110 transform transition duration-200"
        />
      </CardContent>
    </Card>
  );
}

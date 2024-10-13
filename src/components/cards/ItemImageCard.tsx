import Image from "next/image";

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
    <div
      onClick={() => playAudio(audio)}
      className="duration-200 w-full flex justify-center items-center transform transition h-full overflow-hidden border-4 border-transparent hover:border-4 hover:border-red-500 bg-whit"
    >
      <Image
        src={src}
        alt={alt}
        width={400}
        height={400}
        priority
        layout="responsive"
        className="object-cover flex-grow flex-1 flex transform transition duration-200 h-full w-full"
      />
    </div>
  );
}

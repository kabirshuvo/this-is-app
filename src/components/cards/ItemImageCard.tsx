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
      className="bg-white hover:shadow-xl duration-200 rounded w-full md:min-w-28 lg:min-w-52 max-w-52 md:min-h-28 lg:min-h-52 max-h-52 mx-auto flex justify-center items-center shadow-lg transform transition h-full cursor-pointer overflow-hidden border-4 border-transparent hover:border-4 hover:border-red-500 hover:scale-105"
    >
      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        priority
        layout="responsive"
        className="max-w-40 max-h-48 object-cover flex-grow flex-1 flex transform transition duration-200"
      />
    </div>
  );
}

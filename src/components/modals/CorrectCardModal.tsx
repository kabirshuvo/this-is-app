import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CorrectCardModalProps {
  open: boolean;
  onClose: () => void;
  itemImage: string;
  itemName: string;
}

const CorrectCardModal: React.FC<CorrectCardModalProps> = ({
  open,
  onClose,
  itemImage,
  itemName,
}) => {
  const router = useRouter();
  const firstLetter = itemName.charAt(0);
  const restOfName = itemName.slice(1);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] md:h-[90vh] max-w-none max-h-none p-4 flex flex-col items-center justify-center bg-tjblue-500 border-none">
        <div className="realative flex-grow flex flex-row space-x-4 lg:space-x-10 items-center">
          <div className="mt-auto pb-20 lg:pb-40">
            <Image
              src="/images/arrow.png"
              alt=""
              width={28}
              height={28}
              className="transition duration-200 ease-in-out rotate-180"
              onClick={() => router.push("/")}
            />
          </div>
          <div className="w-auto h-auto max-w-full max-h-full space-y-8 bg-white rounded-lg overflow-hidden">
            <Image
              src={itemImage}
              alt={itemName}
              layout="responsive"
              width={400}
              height={400}
              objectFit="contain"
              className="w-full h-full"
            />
            <DialogTitle className="text-center text-2xl md:text-4xl xl:text-6xl text-black tracking-wide">
              <span className="text-red-500">{firstLetter}</span>
              {restOfName}
            </DialogTitle>
          </div>
          <div className="mt-auto pb-20 lg:pb-40">
            <DialogClose className="outline-none focus:outline-none">
              <Image
                src="/images/arrow.png"
                alt=""
                width={28}
                height={28}
                className="transition duration-200 ease-in-out"
              />
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CorrectCardModal;

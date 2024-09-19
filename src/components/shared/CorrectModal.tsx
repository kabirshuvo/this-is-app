import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface CorrectModalProps {
  isOpen: boolean;
  randomItemName: string | null;
}

const CorrectModal: React.FC<CorrectModalProps> = ({
  isOpen,
  randomItemName,
}) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="w-fit rounded-xl bg-tjgreen-600 text-tjyellow-500 border-none p-10">
        <DialogHeader>
          <DialogTitle className="text-4xl font-normal text-white text-center">
            Congratulations!
          </DialogTitle>
          <DialogDescription className="text-2xl font-light text-tjyellow-500 text-center">
            You correctly identified the {randomItemName}!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CorrectModal;

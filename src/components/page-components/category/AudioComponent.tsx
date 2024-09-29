// import React, { useEffect } from "react";
// import useItemAudio from "@/app/hooks/useItemAudio";
// import useItemQueryAudio from "@/app/hooks/useItemQueryAudio";
// import useErrorAudio from "@/app/hooks/useErrorAudio";

// interface AudioComponentProps {
//   randomItemName: string;
//   clickedItemData: any;
//   setCorrectAudio: (audio: HTMLAudioElement) => void;
//   setIncorrectAudio: (audio: HTMLAudioElement) => void;
//   setWhichOneAudio: (audio: HTMLAudioElement) => void;
//   setQuestionAudio: (audio: HTMLAudioElement) => void;
// }

// const AudioComponent: React.FC<AudioComponentProps> = ({
//   randomItemName,
//   clickedItemData,
//   setCorrectAudio,
//   setIncorrectAudio,
//   setWhichOneAudio,
//   setQuestionAudio,
// }) => {
//   const itemAudio = useItemAudio(randomItemName ?? "");
//   const playWhichAudio = useItemQueryAudio(
//     randomItemName ? randomItemName.toLowerCase() : "",
//     "q"
//   );
//   const playSuccessAudio = useItemQueryAudio(
//     randomItemName ? randomItemName.toLowerCase() : "",
//     "c"
//   );
//   const playErrorAudio = useErrorAudio(
//     clickedItemData?.name.toLowerCase() ?? ""
//   );

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const correctAudioElement = new Audio("/audio/congrats.mp3");
//       const incorrectAudioElement = new Audio("/audio/error.mp3");
//       const whichOneAudioElement = new Audio("/audio/whichone.mp3");
//       const questionAudioElement = new Audio(
//         `/audio/${itemAudio?.question}.mp3`
//       );

//       correctAudioElement.preload = "auto";
//       incorrectAudioElement.preload = "auto";
//       whichOneAudioElement.preload = "auto";
//       questionAudioElement.preload = "auto";

//       whichOneAudioElement.addEventListener("ended", () => {
//         questionAudioElement.play();
//       });

//       setCorrectAudio(correctAudioElement);
//       setIncorrectAudio(incorrectAudioElement);
//       setWhichOneAudio(whichOneAudioElement);
//       setQuestionAudio(questionAudioElement);

//       return () => {
//         whichOneAudioElement.removeEventListener("ended", () => {
//           questionAudioElement.play();
//         });
//       };
//     }
//   }, [
//     itemAudio,
//     setCorrectAudio,
//     setIncorrectAudio,
//     setWhichOneAudio,
//     setQuestionAudio,
//   ]);

//   return null;
// };

// export default AudioComponent;

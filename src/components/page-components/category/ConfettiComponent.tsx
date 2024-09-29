import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const ConfettiComponent: React.FC<{ showConfetti: boolean }> = ({
  showConfetti,
}) => {
  const { width, height } = useWindowSize();

  return (
    <>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}
        />
      )}
    </>
  );
};

export default ConfettiComponent;

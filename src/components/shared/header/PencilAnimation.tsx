import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PencilAnimation({ animatedKey }: { animatedKey: string }) {
  return (
    <div className="relative w-[34px] md:w-[120px] 2xl:w-[200px] h-[200px]">
      <motion.div
        key={`${animatedKey}-pencil`}
        className="w-full h-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 8,
          duration: 1,
        }}
      >
        {/* Pencil */}
        <Image
          src="/menupages/tj-pancil/pancil.svg"
          alt="TJ Pencil"
          width={200}
          height={200}
          className="absolute top-9 md:top-6 left-4 2xl:left-10 z-10 h-full"
        />

        {/* Magnifying Glass */}
        <motion.div
          key={`${animatedKey}-glass`}
          initial={{ scale: 0, y: 0 }}
          animate={{ scale: [0.8, 1.2, 1], y: [0, -4, 0] }}
          transition={{ duration: 1.7 }}
          className="absolute top-28 md:top-16 right-[-18px] md:-right-3 2xl:right-1 z-20"
        >
          <Image
            src="/menupages/tj-pancil/glass.svg"
            alt="Magnifying Glass"
            width={44}
            height={50}
            className="w-[16px] md:w-[44px]"
          />
        </motion.div>

        {/* Hand */}
        <motion.div
          key={`${animatedKey}-hand`}
          initial={{ rotate: -35, x: 20, scale: 0 }}
          animate={{ rotate: 0, x: 0, scale: [1, 1.5, 1]}}
          transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}
          className="absolute top-[133px] md:top-32 left-[4px] md:-left-2 2xl:left-14"
        >
          <Image
            src="/menupages/tj-pancil/hand.svg"
            alt="Hand"
            width={60}
            height={72}
            className="w-[20px] md:w-[60px]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

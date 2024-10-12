import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PencilAnimation({ animatedKey }: { animatedKey: string }) {
  return (
    <div>
      <motion.div
        key={`${animatedKey}-pencil`}
        className="relative w-[150px] h-[120px]"
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
          width={90}
          height={100}
          className="absolute top-0 left-16 z-10"
        />

        {/* Magnifying Glass */}
        <motion.div
          key={`${animatedKey}-glass`}
          initial={{ scale: 0, y: 0 }}
          animate={{ scale: [0, 1.5, 1], y: [0, -10, 0] }}
          transition={{ duration: 2 }}
          className="absolute top-10 -right-2 z-20"
        >
          <Image
            src="/menupages/tj-pancil/glass.svg"
            alt="Magnifying Glass"
            width={35}
            height={40}
          />
        </motion.div>

        {/* Hand */}
        <motion.div
          key={`${animatedKey}-hand`}
          initial={{ rotate: -45, x: 24, scale: 0 }}
          animate={{ rotate: 0, x: 0, scale: [0, 1.5, 1] }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute top-2/3 left-6"
        >
          <Image
            src="/menupages/tj-pancil/hand.svg"
            alt="Hand"
            width={60}
            height={72}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

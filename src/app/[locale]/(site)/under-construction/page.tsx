import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center w-full justify-center">
      <Image
        src="/images/misc/under-construction.png"
        alt="under-construction"
        width={400}
        height={400}
      />
    </div>
  );
};

export default page;

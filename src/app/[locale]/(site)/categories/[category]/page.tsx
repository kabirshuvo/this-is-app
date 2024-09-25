"use client";

import ThisIs from "@/components/page-components/category/ThisIs";
import WhichIs from "@/components/page-components/category/WhichIs";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = decodeURIComponent(params.category);

  return (
    <div className="container mx-auto">
      {/* <div className="flex items-start justify-between ">
        <h2 className="capitalize text-3xl lg:text-5xl text-center">
          {category}
        </h2>
      </div> */}

      <ThisIs params={params} />
      <WhichIs params={params} />
    </div>
  );
}

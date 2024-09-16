"use client";

import Link from "next/link";
import { Undo2 } from "lucide-react";
import ThisIs from "@/components/page-components/category/ThisIs";
import WhichIs from "@/components/page-components/category/WhichIs";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = decodeURIComponent(params.category);

  return (
    <div className="container mx-auto mt-10 p-2">
      <div className="flex items-start justify-between border-b border-csyellow">
        <Link href="/" className="flex gap-1">
          <Undo2 size={22} /> <span className="">Back</span>
        </Link>
        <h2 className="capitalize text-5xl text-center">{category}</h2>
        <div />
      </div>

      <ThisIs params={params} />
      <WhichIs params={params} />
    </div>
  );
}

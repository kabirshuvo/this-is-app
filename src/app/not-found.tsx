export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl text-center">This page is under construction</h1>
      <p className="text-center">Please come back later.</p>
       <Image
        src="/images/under-construction.gif"
        alt="under-construction"
        width={350}
        height={350}
      />
      <Link
        href="/"
        className="py-2 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 bg-green-700 text-yellow-300"
      >
        Take Me Home!
      </Link>
    </div>
  );
}

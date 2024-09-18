export const dynamic = "force-dynamic";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl mb-6 ">Uh-oh! Lost Again!</h1>
      <p className="text-3xl mb-6">
        Oops! This page ran away! Let&apos;s go home.
      </p>
      <div className="mt-8 animate-bounce">
        <span className="text-7xl">👇</span>
      </div>
      <Link
        href="/"
        className="py-2 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 bg-green-700 text-yellow-300"
      >
        Take Me Home!
      </Link>
    </div>
  );
}

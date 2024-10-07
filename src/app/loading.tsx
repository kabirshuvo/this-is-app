import React from "react";

export default function Loading() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="flex justify-center space-x-2">
        {["🐘", "🦒", "🦁", "🐯", "🐼"].map((animal, index) => (
          <span
            key={index}
            className="text-5xl md:text-7xl animate-bounce"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {animal}
          </span>
        ))}
      </div>
    </div>
  );
}

import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex flex-col items-center justify-center">
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

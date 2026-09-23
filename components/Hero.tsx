// Location: components/Hero.tsx
"use client";

import { ArrowDown } from "lucide-react";

export default function Hero() {
  const scrollToLibrary = () => {
    const section = document.getElementById("library");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
      <div className="bg-[#121418] border border-zinc-800/80 rounded-2xl p-8 md:p-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="flex-1 max-w-2xl">
          <span className="text-[#ccff00] text-xs font-extrabold tracking-widest uppercase mb-3 block">
            WORKOUT LIBRARY
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-[1.1] mb-4 font-sans">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          <button
            onClick={scrollToLibrary}
            className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-black px-6 py-3.5 rounded-lg text-xs uppercase tracking-wider flex items-center gap-2 transition-all transform active:scale-95"
          >
            <span>BROWSE WORKOUTS</span>
            <ArrowDown className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
            alt="FitLog Hero Gym Visual"
            className="w-full max-w-md h-auto object-contain rounded-xl drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
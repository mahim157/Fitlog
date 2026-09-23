
// Location: components/Hero.tsx
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#121418] border border-zinc-800/80 rounded-3xl p-8 md:p-12 my-6 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left Content */}
        <div className="flex-1 max-w-xl z-10">
          <span className="text-[#ccff00] text-xs font-bold tracking-widest uppercase mb-4 block">
            WORKOUT LIBRARY
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[1.05] mb-5">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-md">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="inline-block bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold px-6 py-3.5 rounded-lg text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-md shadow-[#ccff00]/10"
          >
            BROWSE WORKOUTS
          </Link>
        </div>

        {/* Right Image Container */}
        <div className="relative w-full lg:w-[480px] h-[300px] sm:h-[380px] flex items-center justify-center">
          <Image
            src="/banner.png"
            alt="Workout Gym Machine"
            fill
            priority
            className="object-contain object-right drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}
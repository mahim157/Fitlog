
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planList, savedList } = usePlan();

  return (
    <nav className="sticky top-0 z-50 bg-[#0d0f12]/90 backdrop-blur-md border-b border-zinc-800/60 px-4 sm:px-6 py-4 flex items-center justify-between">
      
      {/* Left Logo */}
      <Link href="/" prefetch={true} className="flex items-center gap-2 font-black text-xl tracking-wider text-white">
        <Image 
          src="/logo.png" 
          alt="FITLOG Logo" 
          width={32} 
          height={32} 
          className="object-contain"
        />
        <span className="font-extrabold uppercase">FITLOG</span>
      </Link>

      
      <div className="flex items-center gap-2 bg-zinc-900/80 p-1 rounded-full border border-zinc-800">
        <Link
          href="/"
          prefetch={true}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
            pathname === "/" ? "bg-[#ccff00] text-black" : "text-zinc-400 hover:text-white"
          }`}
        >
          Workouts
        </Link>
        <Link
          href="/my-plan"
          prefetch={true}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
            pathname === "/my-plan" ? "bg-[#ccff00] text-black" : "text-zinc-400 hover:text-white"
          }`}
        >
          My Plan
        </Link>
      </div>

      
      <div className="flex items-center gap-3">
        {/* Filled Pill Accent Badge */}
        <Link
          href="/my-plan"
          prefetch={true}
          className="bg-[#ccff00] text-black text-xs font-extrabold px-3.5 py-1.5 rounded-full flex items-center gap-2 hover:bg-[#b8e600] transition-colors"
        >
          <span>Plan</span>
          <span className="bg-black text-[#ccff00] rounded-full w-5 h-5 text-[11px] font-black flex items-center justify-center">
            {planList.length}
          </span>
        </Link>

        
        <Link
          href="/my-plan"
          prefetch={true}
          className="border border-zinc-700 bg-zinc-900/50 text-zinc-300 text-xs font-extrabold px-3.5 py-1.5 rounded-full flex items-center gap-2 hover:border-zinc-500 transition-colors"
        >
          <span>Saved</span>
          <span className="bg-zinc-800 text-zinc-300 rounded-full w-5 h-5 text-[11px] font-black flex items-center justify-center">
            {savedList.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}
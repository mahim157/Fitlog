// Location: app/not-found.tsx
import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <Dumbbell className="w-16 h-16 text-[#ccff00] mb-4 animate-bounce -rotate-45" />
      <h1 className="text-6xl font-black text-white uppercase tracking-wider">404</h1>
      <h2 className="text-xl font-bold text-zinc-400 mt-2 uppercase">LIFT NOT FOUND</h2>
      <p className="text-zinc-500 max-w-md mt-2 mb-8 text-xs">
        You wandered off the weight room floor. The routine you're looking for doesn't exist or was re-racked elsewhere.
      </p>
      <Link
        href="/"
        className="bg-[#ccff00] text-black font-black uppercase px-6 py-3 rounded-lg text-xs tracking-wide hover:bg-[#b8e600] transition-colors"
      >
        Return to Workout Library
      </Link>
    </div>
  );
}
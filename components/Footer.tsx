// Location: components/Footer.tsx
import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 bg-[#0d0f12] py-6 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white font-black">
          <Dumbbell className="w-5 h-5 text-[#ccff00] -rotate-45" />
          <span className="text-sm uppercase tracking-wider">FITLOG</span>
        </div>
        <p className="text-xs text-zinc-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}

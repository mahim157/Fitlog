
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0d0f12] border-t border-zinc-800/60 py-10 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo & Brand Info */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png" 
            alt="Fitlog Logo"
            width={36}
            height={36}
            className="object-contain"
          />
          <span className="font-extrabold text-lg tracking-wider text-white uppercase">
            FITLOG
          </span>
        </div>

        
        <div className="flex items-center gap-6 text-xs font-semibold text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">
            Workouts
          </Link>
          <Link href="/my-plan" className="hover:text-white transition-colors">
            My Plan
          </Link>
        </div>

        
        <p className="text-xs text-zinc-500">
          © {new Date().getFullYear()} Fitlog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
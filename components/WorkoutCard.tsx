import Link from "next/link";
import { Workout } from "@/types/workout";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link href={`/workout/${workout.id}`}>
      <div className="bg-[#121418] border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all group flex flex-col h-full">
        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg bg-zinc-900">
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 mb-2">
          {Array.isArray(workout?.category)
            ? workout.category.map((cat, i) => (
                <span
                  key={i}
                  className="bg-zinc-800 text-zinc-300 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))
            : workout?.category && (
                <span className="bg-zinc-800 text-zinc-300 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  {workout.category}
                </span>
              )}
        </div>

        <h3 className="font-black text-lg text-white uppercase tracking-wide group-hover:text-[#ccff00] transition-colors mb-1">
          {workout.name}
        </h3>

        <p className="text-zinc-500 text-xs mb-4 flex-1">
          {Array.isArray(workout?.equipment)
            ? workout.equipment.join(", ")
            : workout?.equipment || ""}
        </p>

        <div className="flex items-center justify-between text-xs text-zinc-400 pt-3 border-t border-zinc-800/80 font-medium">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>{workout.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-zinc-500" />
            <span>{workout.calories} kcal</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
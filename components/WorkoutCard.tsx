
"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

export interface Workout {
  id: number | string;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty?: string;
  duration: number;
  caloriesBurned: number;
  sets?: number;
  reps?: string;
  rating: number;
  description?: string;
  instructions?: string[];
}

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const muscleGroups = Array.isArray(workout.muscleGroups) ? workout.muscleGroups : [];

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group bg-[#111318] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
    >
      
      <div className="relative w-full h-48 sm:h-52 bg-zinc-900 overflow-hidden">
        <Image
          src={workout.image || "/banner.png"}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
        
          <div className="flex flex-wrap gap-2 mb-3">
            {muscleGroups.map((group, idx) => (
              <span
                key={idx}
                className="bg-[#ccff00] text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider"
              >
                {group}
              </span>
            ))}
          </div>

          
          <h3 className="text-white font-black text-lg uppercase tracking-tight line-clamp-1 group-hover:text-[#ccff00] transition-colors">
            {workout.name}
          </h3>

          
          <p className="text-zinc-500 text-xs font-medium mt-1 line-clamp-1">
            {workout.equipment}
          </p>
        </div>

        
        <div className="flex items-center gap-4 text-zinc-400 text-xs font-semibold mt-6 pt-4 border-t border-zinc-800/60">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-zinc-500" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <Star className="w-3.5 h-3.5 text-zinc-500 fill-zinc-500" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
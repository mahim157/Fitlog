

"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Plus, Bookmark } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { toast } from "sonner";

export interface Workout {
  id: string | number;
  name: string;
  description?: string;
  image?: string;
  equipment?: string;
  muscleGroups?: string[];
  duration: number;
  caloriesBurned: number;
  rating: number;
  difficulty?: string;
  sets?: number;
  reps?: string;
  instructions?: string[];
}

export default function WorkoutCard({ workout }: { workout: Workout }) {
  const { planList, savedList, addToPlan, addToSaved, isPlanFull } = usePlan();

  const isPlanned = planList.some((item) => String(item.id) === String(workout.id));
  const isSaved = savedList.some((item) => String(item.id) === String(workout.id));

  const handleAddToPlan = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isPlanned) {
      toast.info(`"${workout.name}" is already in today's plan.`);
      return;
    }
    const success = addToPlan(workout);
    if (success) {
      toast.success(`Added "${workout.name}" to Today's Plan!`);
    } else {
      toast.error("Cap reached! You can only add 5 lifts for today.");
    }
  };

  const handleAddToSaved = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSaved) {
      toast.info(`"${workout.name}" is already saved.`);
      return;
    }
    addToSaved(workout);
    toast.success(`Saved "${workout.name}" for later!`);
  };

  return (
    <div className="bg-[#111318] border border-zinc-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-zinc-700 transition-all group">
      <div>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-900 mb-4">
          <Image
            src={workout.image || "/banner.png"}
            alt={workout.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <h3 className="text-white font-black text-sm uppercase tracking-tight truncate">
          {workout.name}
        </h3>
        <p className="text-zinc-500 text-xs font-medium mt-0.5 truncate">
          {workout.equipment || "Standard Equipment"}
        </p>

        <div className="flex items-center gap-3 text-zinc-400 text-xs font-medium mt-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>{workout.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-zinc-500" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mt-5 pt-3 border-t border-zinc-800/60">
        <Link
          href={`/workout/${workout.id}`}
          className="text-zinc-400 hover:text-white text-xs font-bold transition-colors"
        >
          Details
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToSaved}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isSaved
                ? "bg-zinc-800 border-zinc-700 text-[#CCFF00]"
                : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white"
            }`}
            title="Save for later"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleAddToPlan}
            disabled={isPlanFull && !isPlanned}
            className={`font-black text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all cursor-pointer ${
              isPlanned
                ? "bg-zinc-800 text-zinc-400 cursor-not-allowed"
                : isPlanFull
                ? "bg-zinc-800 text-zinc-600 border border-zinc-700/50 cursor-not-allowed opacity-60"
                : "bg-[#CCFF00] hover:bg-[#b8e600] text-black"
            }`}
            title={isPlanFull && !isPlanned ? "Plan limit reached (5 lifts max)" : "Add to today's plan"}
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>{isPlanned ? "In Plan" : isPlanFull ? "Cap Reached" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
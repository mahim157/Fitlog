

"use client";

import { Calendar, Bookmark } from "lucide-react";
import { toast } from "sonner";
import { Workout } from "./WorkoutCard";
import { usePlan } from "@/context/PlanContext"; 

export default function DetailActions({ workout }: { workout: Workout }) {
  const { addToPlan, saveForLater } = usePlan();

  const handleAddToPlan = () => {
   
    addToPlan(workout);

    toast.success(`${workout.name} added to today's plan!`, {
      description: `${workout.duration} min • ${workout.caloriesBurned} kcal`,
    });
  };

  const handleSaveForLater = () => {
    
    saveForLater(workout);

    toast.info(`${workout.name} saved for later!`);
  };

  return (
    <div className="flex items-center gap-3 pt-4">
      <button
        onClick={handleAddToPlan}
        className="flex-1 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-extrabold px-5 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-md shadow-[#CCFF00]/10 cursor-pointer"
      >
        <Calendar className="w-4 h-4" />
        <span>Add to today's plan</span>
      </button>

      <button
        onClick={handleSaveForLater}
        className="bg-[#121418] hover:bg-zinc-800 border border-zinc-800 text-white font-bold px-5 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
      >
        <Bookmark className="w-4 h-4 text-zinc-400" />
        <span>Save for later</span>
      </button>
    </div>
  );
}
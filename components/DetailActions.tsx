
"use client";

import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/components/WorkoutCard";
import { toast } from "sonner";
import { Plus, Bookmark } from "lucide-react";

export default function DetailActions({ workout }: { workout: Workout }) {
  const { planList, savedList, addToPlan, addToSaved, isPlanFull } = usePlan();

  const isPlanned = planList.some((item) => String(item.id) === String(workout.id));
  const isSaved = savedList.some((item) => String(item.id) === String(workout.id));

  const handleAddToPlan = () => {
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

  const handleSaveForLater = () => {
    if (isSaved) {
      toast.info(`"${workout.name}" is already saved.`);
      return;
    }
    addToSaved(workout);
    toast.success(`Saved "${workout.name}" for later!`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-800/80">
      <button
        onClick={handleAddToPlan}
        disabled={isPlanFull && !isPlanned}
        className={`flex-1 font-black text-xs sm:text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
          isPlanned
            ? "bg-zinc-800 text-zinc-400 cursor-not-allowed"
            : isPlanFull
            ? "bg-zinc-800 text-zinc-600 border border-zinc-700/50 cursor-not-allowed opacity-60"
            : "bg-[#CCFF00] hover:bg-[#b8e600] text-black"
        }`}
      >
        <Plus className="w-4 h-4 stroke-[3]" />
        <span>{isPlanned ? "In Today's Plan" : isPlanFull ? "Plan Limit Reached (5 Max)" : "Add to Today's Plan"}</span>
      </button>

      <button
        onClick={handleSaveForLater}
        className={`px-6 py-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
          isSaved
            ? "bg-zinc-800 border-zinc-700 text-[#CCFF00]"
            : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800"
        }`}
      >
        <Bookmark className="w-4 h-4" />
        <span>{isSaved ? "Saved" : "Save for Later"}</span>
      </button>
    </div>
  );
}
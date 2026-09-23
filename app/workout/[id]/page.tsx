
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";
import { Loader2, Plus, Bookmark } from "lucide-react";

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToPlan, saveForLater } = usePlan();

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        const data = await res.json();
        setWorkout(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (id) fetchWorkout();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-[#ccff00] animate-spin" />
        <p className="text-xs text-zinc-500 font-bold uppercase">Loading Workout Details...</p>
      </div>
    );
  }

  if (!workout) {
    return <div className="text-center py-20 font-bold text-zinc-400">Workout not found.</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left Column - Visual Image */}
        <div className="bg-[#121418] border border-zinc-800 rounded-2xl overflow-hidden p-4">
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-[400px] md:h-[500px] object-cover rounded-xl"
          />
        </div>

        {/* Right Column - Specs & Details */}
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {Array.isArray(workout?.category)
              ? workout.category.map((cat, i) => (
                  <span key={i} className="bg-zinc-800 text-zinc-300 text-xs font-extrabold px-2.5 py-1 rounded uppercase tracking-wider">
                    {cat}
                  </span>
                ))
              : workout?.category && (
                  <span className="bg-zinc-800 text-zinc-300 text-xs font-extrabold px-2.5 py-1 rounded uppercase tracking-wider">
                    {workout.category}
                  </span>
                )}
          </div>

          <h1 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mb-3">
            {workout.name}
          </h1>

          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            {workout.description}
          </p>

          {/* Specs Panel */}
          <div className="bg-[#121418] border border-zinc-800 rounded-xl p-4 mb-6 space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
              <span className="text-zinc-500 font-bold uppercase">Equipment</span>
              <span className="text-zinc-200 font-semibold">
                {Array.isArray(workout?.equipment)
                  ? workout.equipment.join(", ")
                  : workout?.equipment || "N/A"}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
              <span className="text-zinc-500 font-bold uppercase">Duration</span>
              <span className="text-zinc-200 font-semibold">{workout.duration} min</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
              <span className="text-zinc-500 font-bold uppercase">Calories</span>
              <span className="text-zinc-200 font-semibold">{workout.calories} kcal</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-zinc-500 font-bold uppercase">Rating</span>
              <span className="text-zinc-200 font-semibold">⭐ {workout.rating}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-3">INSTRUCTIONS</h3>
            <ol className="space-y-2 text-xs text-zinc-400 list-decimal list-inside">
              {Array.isArray(workout?.instructions)
                ? workout.instructions.map((step, idx) => (
                    <li key={idx} className="leading-relaxed"><span className="text-zinc-200">{step}</span></li>
                  ))
                : workout?.instructions && (
                    <li className="leading-relaxed"><span className="text-zinc-200">{workout.instructions}</span></li>
                  )}
            </ol>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => addToPlan(workout)}
              className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Add to Today's Plan
            </button>
            <button
              onClick={() => saveForLater(workout)}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <Bookmark className="w-4 h-4" /> Save For Later
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
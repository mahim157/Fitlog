
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { Loader2, Plus, Bookmark } from "lucide-react";

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const [workout, setWorkout] = useState<any>(null);
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
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column - Big Image Card */}
        <div className="bg-[#121418] border border-zinc-800/80 rounded-2xl overflow-hidden p-2 shadow-2xl">
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-[380px] sm:h-[480px] object-cover rounded-xl"
          />
        </div>

        {/* Right Column - Content */}
        <div className="flex flex-col">
          {/* Workout Title */}
          <h1 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mb-2">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
            {workout.description || "A compound press that builds chest thickness, triceps, and pressing power from a stable bench."}
          </p>

          {/* Category Pills (Placed under Description like Figma) */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Array.isArray(workout?.category)
              ? workout.category.map((cat: string, i: number) => (
                  <span
                    key={i}
                    className="bg-[#ccff00] text-black text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider"
                  >
                    {cat}
                  </span>
                ))
              : workout?.category && (
                  <span className="bg-[#ccff00] text-black text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    {workout.category}
                  </span>
                )}
          </div>

          {/* Specs List Table */}
          <div className="bg-[#121418]/90 border border-zinc-800/80 rounded-xl px-5 py-2 mb-6 divide-y divide-zinc-800/60 text-xs">
            <div className="flex justify-between py-2.5">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">EQUIPMENT</span>
              <span className="text-zinc-200 font-semibold">
                {Array.isArray(workout?.equipment) ? workout.equipment.join(", ") : workout?.equipment || "Barbell, Bench"}
              </span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">DIFFICULTY</span>
              <span className="text-zinc-200 font-semibold">{workout.difficulty || "Intermediate"}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">SETS</span>
              <span className="text-zinc-200 font-semibold">{workout.sets || "4"}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">REPS</span>
              <span className="text-zinc-200 font-semibold">{workout.reps || "6-8"}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">DURATION</span>
              <span className="text-zinc-200 font-semibold">{workout.duration} min</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">CALORIES</span>
              <span className="text-zinc-200 font-semibold">{workout.calories} kcal</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">RATING</span>
              <span className="text-zinc-200 font-semibold">{workout.rating}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-3">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-2 text-xs text-zinc-400">
              {Array.isArray(workout?.instructions) ? (
                workout.instructions.map((step: string, idx: number) => (
                  <li key={idx} className="flex gap-2 leading-relaxed">
                    <span className="font-bold text-zinc-500">{idx + 1}.</span>
                    <span className="text-zinc-300">{step}</span>
                  </li>
                ))
              ) : (
                <li className="text-zinc-300">{workout?.instructions}</li>
              )}
            </ol>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <button
              onClick={() => addToPlan(workout)}
              className="flex-1 bg-[#ccff00] hover:bg-[#b8e600] text-black font-black px-5 py-3 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Add to today's plan
            </button>
            <button
              onClick={() => saveForLater(workout)}
              className="flex-1 bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-extrabold px-5 py-3 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <Bookmark className="w-4 h-4" /> Save for later
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
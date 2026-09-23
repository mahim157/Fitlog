// Location: app/my-plan/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { Dumbbell, Clock, Flame, Check, Trash2, ExternalLink } from "lucide-react";

export default function MyPlanPage() {
  const { planList, savedList, completedList, markAsDone, removeFromPlan, removeFromSaved } = usePlan();
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");

  const currentList = activeTab === "today" ? planList : savedList;

  const totalExercises = planList.length;
  const totalMinutes = planList.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const totalCalories = planList.reduce((acc, curr) => acc + (curr.calories || 0), 0);

  return (
    <main className="min-h-screen bg-[#090a0c] text-white max-w-7xl mx-auto px-4 md:px-8 py-12">
      <h1 className="text-4xl font-extrabold tracking-wider uppercase">MY PLAN</h1>
      <p className="text-zinc-400 text-xs mt-1">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        <div className="bg-[#121418] border border-zinc-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-bold text-zinc-500">Exercises</p>
            <p className="text-3xl font-black text-[#ccff00] mt-1">{totalExercises} <span className="text-xs text-zinc-600 font-normal">/ 5 max</span></p>
          </div>
          <Dumbbell className="w-8 h-8 text-zinc-800" />
        </div>

        <div className="bg-[#121418] border border-zinc-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-bold text-zinc-500">Total Minutes</p>
            <p className="text-3xl font-black text-white mt-1">{totalMinutes} <span className="text-xs text-zinc-600 font-normal">min</span></p>
          </div>
          <Clock className="w-8 h-8 text-zinc-800" />
        </div>

        <div className="bg-[#121418] border border-zinc-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-bold text-zinc-500">Est. Calories</p>
            <p className="text-3xl font-black text-white mt-1">{totalCalories} <span className="text-xs text-zinc-600 font-normal">kcal</span></p>
          </div>
          <Flame className="w-8 h-8 text-zinc-800" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 mb-8">
        <button
          onClick={() => setActiveTab("today")}
          className={`py-3 px-6 font-bold text-xs uppercase tracking-wider transition-colors border-b-2 ${
            activeTab === "today" ? "border-[#ccff00] text-[#ccff00]" : "border-transparent text-zinc-500 hover:text-white"
          }`}
        >
          Today's Plan ({planList.length})
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`py-3 px-6 font-bold text-xs uppercase tracking-wider transition-colors border-b-2 ${
            activeTab === "saved" ? "border-[#ccff00] text-[#ccff00]" : "border-transparent text-zinc-500 hover:text-white"
          }`}
        >
          Saved ({savedList.length})
        </button>
      </div>

      {/* Empty State vs List */}
      {currentList.length === 0 ? (
        <div className="text-center py-20 bg-[#121418]/50 border border-dashed border-zinc-800 rounded-2xl">
          <h3 className="text-2xl font-black text-zinc-300 uppercase">NOTHING HERE YET</h3>
          <p className="text-zinc-500 text-xs mt-2 mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/#library"
            className="bg-[#ccff00] text-black font-extrabold px-6 py-3 rounded-lg text-xs uppercase tracking-wide hover:bg-[#b8e600] transition-colors inline-block"
          >
            Go to Workouts
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {currentList.map((workout) => {
            const isDone = completedList.includes(workout.id);
            return (
              <div
                key={workout.id}
                className={`bg-[#121418] border ${
                  isDone ? "border-green-900/50 bg-green-950/10" : "border-zinc-800"
                } rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all`}
              >
                <div className="flex items-center gap-4">
                  <img src={workout.image} alt={workout.name} className="w-16 h-16 object-cover rounded-lg bg-zinc-900" />
                  <div>
                    <h4 className="font-extrabold text-base uppercase flex items-center gap-2">
                      {workout.name}
                      {isDone && <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-semibold">DONE</span>}
                    </h4>
                    
                    {/* Safe equipment render */}
                    <p className="text-xs text-zinc-500">
                      {Array.isArray(workout?.equipment)
                        ? workout.equipment.join(", ")
                        : workout?.equipment || "N/A"}
                    </p>

                    <div className="flex gap-4 text-xs text-zinc-400 mt-1">
                      <span>⏱️ {workout.duration} min</span>
                      <span>🔥 {workout.calories} kcal</span>
                      <span>⭐ {workout.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Details
                  </Link>

                  {activeTab === "today" && (
                    <button
                      onClick={() => markAsDone(workout.id)}
                      disabled={isDone}
                      className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1 ${
                        isDone
                          ? "bg-green-900/40 text-green-400 cursor-not-allowed"
                          : "bg-zinc-800 hover:bg-zinc-700 text-green-400"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" /> {isDone ? "Done" : "Mark as Done"}
                    </button>
                  )}

                  <button
                    onClick={() => (activeTab === "today" ? removeFromPlan(workout.id) : removeFromSaved(workout.id))}
                    className="p-2 bg-zinc-800 hover:bg-red-950 hover:text-red-400 text-zinc-400 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
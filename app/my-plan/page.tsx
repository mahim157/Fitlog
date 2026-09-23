
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Check, X, ChevronDown } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function MyPlanPage() {
  const { planList, savedList, removeFromPlan, removeFromSaved, addToPlan } = usePlan();
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");
  const [completedIds, setCompletedIds] = useState<Array<number | string>>([]);

  const toggleComplete = (id: number | string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const activeList = activeTab === "today" ? planList : savedList;

  const sortedList = [...activeList].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return a.caloriesBurned - b.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const totalExercises = planList.length;
  const totalMinutes = planList.reduce((acc, item) => acc + (Number(item.duration) || 0), 0);
  const totalCalories = planList.reduce((acc, item) => acc + (Number(item.caloriesBurned) || 0), 0);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase text-white tracking-wider">
          MY PLAN
        </h1>
        <p className="text-zinc-500 text-xs sm:text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="bg-[#111318] border border-zinc-800/80 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <p className="text-zinc-500 text-xs font-semibold">Exercises</p>
          <p className="text-4xl font-black text-[#CCFF00] mt-2">{totalExercises}</p>
        </div>
        <div>
          <p className="text-zinc-500 text-xs font-semibold">Minutes</p>
          <p className="text-4xl font-black text-white mt-2">{totalMinutes}</p>
        </div>
        <div>
          <p className="text-zinc-500 text-xs font-semibold">Calories</p>
          <p className="text-4xl font-black text-white mt-2">{totalCalories}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="bg-[#111318] border border-zinc-800/80 p-1 rounded-xl inline-flex gap-1">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === "today"
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === "saved"
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-zinc-500 text-xs font-medium">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="appearance-none bg-[#111318] border border-zinc-800 text-white text-xs font-semibold px-4 py-2 pr-8 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sortedList.length === 0 ? (
          <div className="bg-[#111318] border border-zinc-800/80 rounded-2xl p-12 text-center">
            <p className="text-zinc-500 text-sm font-medium">
              {activeTab === "today"
                ? "No lifts added for today yet."
                : "No saved workouts for later."}
            </p>
          </div>
        ) : (
          sortedList.map((item) => {
            const isCompleted = completedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-[#111318] border border-zinc-800/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-zinc-700 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0">
                    <Image
                      src={item.image || "/banner.png"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-white font-black text-sm uppercase tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-zinc-500 text-xs font-medium mt-0.5">
                      {item.equipment}
                    </p>

                    <div className="flex items-center gap-4 text-zinc-400 text-xs font-medium mt-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{item.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-[#CCFF00]" />
                        <span>{item.caloriesBurned} kcal</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <Link
                    href={`/workout/${item.id}`}
                    className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold text-xs px-4 py-2.5 rounded-full transition-colors"
                  >
                    View Details
                  </Link>

                  {activeTab === "today" ? (
                    <button
                      onClick={() => toggleComplete(item.id)}
                      className={`font-black text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                        isCompleted
                          ? "bg-zinc-800 text-zinc-400"
                          : "bg-[#CCFF00] hover:bg-[#b8e600] text-black"
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>{isCompleted ? "Done" : "Mark as Done"}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        addToPlan(item);
                        removeFromSaved(item.id);
                      }}
                      className="bg-[#CCFF00] hover:bg-[#b8e600] text-black font-black text-xs px-5 py-2.5 rounded-full cursor-pointer"
                    >
                      Add to Plan
                    </button>
                  )}

                  <button
                    onClick={() =>
                      activeTab === "today"
                        ? removeFromPlan(item.id)
                        : removeFromSaved(item.id)
                    }
                    className="text-zinc-600 hover:text-zinc-300 p-1.5 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
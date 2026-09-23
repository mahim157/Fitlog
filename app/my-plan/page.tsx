
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Check, X, ChevronDown, Search } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { toast } from "sonner";

export default function MyPlanPage() {
  const { planList, savedList, removeFromPlan, removeFromSaved, addToPlan, isPlanFull } = usePlan();
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");
  const [searchQuery, setSearchQuery] = useState("");
  const [completedIds, setCompletedIds] = useState<Array<number | string>>([]);

  const toggleComplete = (item: any) => {
    const isDone = completedIds.includes(item.id);
    if (isDone) {
      setCompletedIds((prev) => prev.filter((id) => id !== item.id));
      toast.info(`Marked "${item.name}" as incomplete.`);
    } else {
      setCompletedIds((prev) => [...prev, item.id]);
      toast.success(`Marked "${item.name}" as completed! 🔥`);
    }
  };

  const handleRemove = (item: any) => {
    if (activeTab === "today") {
      removeFromPlan(item.id);
      toast.error(`Removed "${item.name}" from Today's Plan.`);
    } else {
      removeFromSaved(item.id);
      toast.error(`Removed "${item.name}" from Saved workouts.`);
    }
  };

  const handleMoveToPlan = (item: any) => {
    const success = addToPlan(item);
    if (success) {
      removeFromSaved(item.id);
      toast.success(`Moved "${item.name}" to Today's Plan!`);
    } else {
      toast.error("Cap reached! You can only add 5 lifts for today.");
    }
  };

  const activeList = activeTab === "today" ? planList : savedList;

  const filteredList = activeList.filter((item) => {
    const query = searchQuery.toLowerCase();
    const matchesName = item.name.toLowerCase().includes(query);
    const matchesEquipment = item.equipment?.toLowerCase().includes(query);
    const matchesMuscle = item.muscleGroups?.some((group) =>
      group.toLowerCase().includes(query)
    );
    return matchesName || matchesEquipment || matchesMuscle;
  });

  const sortedList = [...filteredList].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return a.caloriesBurned - b.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const totalExercises = planList.length;
  const totalMinutes = planList.reduce((acc, item) => acc + (Number(item.duration) || 0), 0);
  const totalCalories = planList.reduce((acc, item) => acc + (Number(item.caloriesBurned) || 0), 0);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wider">
          MY PLAN
        </h1>
        <p className="text-zinc-500 text-xs sm:text-sm mt-1">
          Cap of five lifts for today ({totalExercises}/5 added). Finish them, then load more.
        </p>
      </div>

      <div className="bg-[#111318] border border-zinc-800/80 rounded-2xl p-4 sm:p-6 grid grid-cols-3 gap-3 sm:gap-6 text-center sm:text-left">
        <div>
          <p className="text-zinc-500 text-[10px] sm:text-xs font-semibold uppercase">Exercises</p>
          <p className="text-2xl sm:text-4xl font-black text-[#CCFF00] mt-1 sm:mt-2">{totalExercises}</p>
        </div>
        <div>
          <p className="text-zinc-500 text-[10px] sm:text-xs font-semibold uppercase">Minutes</p>
          <p className="text-2xl sm:text-4xl font-black text-white mt-1 sm:mt-2">{totalMinutes}</p>
        </div>
        <div>
          <p className="text-zinc-500 text-[10px] sm:text-xs font-semibold uppercase">Calories</p>
          <p className="text-2xl sm:text-4xl font-black text-white mt-1 sm:mt-2">{totalCalories}</p>
        </div>
      </div>

      {/* Filter, Search and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="bg-[#111318] border border-zinc-800/80 p-1 rounded-xl flex w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("today")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === "today"
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Today's Plan ({planList.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === "saved"
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Saved ({savedList.length})
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search plan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-48 bg-[#111318] border border-zinc-800 text-white text-xs rounded-xl pl-8 pr-3 py-2 outline-none focus:border-zinc-600 transition-colors"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center justify-end gap-2">
            <span className="text-zinc-500 text-xs font-medium shrink-0">Sort By</span>
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="w-full sm:w-auto appearance-none bg-[#111318] border border-zinc-800 text-white text-xs font-semibold px-3 sm:px-4 py-2 pr-8 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {sortedList.length === 0 ? (
          <div className="bg-[#111318] border border-zinc-800/80 rounded-2xl p-8 sm:p-12 text-center">
            <p className="text-zinc-500 text-xs sm:text-sm font-medium">
              {searchQuery
                ? `No entries found matching "${searchQuery}".`
                : activeTab === "today"
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
                className="bg-[#111318] border border-zinc-800/80 rounded-2xl p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-zinc-700 transition-all"
              >
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                  <div className="relative w-20 h-20 sm:w-28 sm:h-20 rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0">
                    <Image
                      src={item.image || "/banner.png"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-black text-xs sm:text-sm uppercase tracking-tight truncate">
                      {item.name}
                    </h3>
                    <p className="text-zinc-500 text-[11px] sm:text-xs font-medium mt-0.5 truncate">
                      {item.equipment}
                    </p>

                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-zinc-400 text-[11px] sm:text-xs font-medium mt-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-500" />
                        <span>{item.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#CCFF00]" />
                        <span>{item.caloriesBurned} kcal</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-500" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 sm:gap-3 border-t md:border-t-0 border-zinc-800/60 pt-3 md:pt-0">
                  <Link
                    href={`/workout/${item.id}`}
                    className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold text-[11px] sm:text-xs px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-colors text-center"
                  >
                    View Details
                  </Link>

                  {activeTab === "today" ? (
                    <button
                      onClick={() => toggleComplete(item)}
                      className={`font-black text-[11px] sm:text-xs px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                        isCompleted
                          ? "bg-zinc-800 text-zinc-400"
                          : "bg-[#CCFF00] hover:bg-[#b8e600] text-black"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                      <span>{isCompleted ? "Done" : "Mark as Done"}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMoveToPlan(item)}
                      disabled={isPlanFull}
                      className={`font-black text-[11px] sm:text-xs px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all cursor-pointer ${
                        isPlanFull
                          ? "bg-zinc-800 text-zinc-600 cursor-not-allowed opacity-60"
                          : "bg-[#CCFF00] hover:bg-[#b8e600] text-black"
                      }`}
                    >
                      {isPlanFull ? "Plan Full (5 Max)" : "Add to Plan"}
                    </button>
                  )}

                  <button
                    onClick={() => handleRemove(item)}
                    className="text-zinc-600 hover:text-zinc-300 p-1 sm:p-1.5 transition-colors cursor-pointer"
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
// Location: app/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/types/workout";
import { ChevronDown, Search, Loader2 } from "lucide-react";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        const data = await res.json();
        setWorkouts(data);
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  const filteredAndSortedWorkouts = useMemo(() => {
    return [...workouts]
      .filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.some((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        return a[sortBy] - b[sortBy];
      });
  }, [workouts, sortBy, searchQuery]);

  return (
    <main className="min-h-screen bg-[#090a0c] text-white pb-20">
      <Hero />

      <section id="library" className="max-w-7xl mx-auto px-4 md:px-8 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight uppercase">THE LIBRARY</h2>
            <p className="text-zinc-400 text-xs mt-1">Twelve lifts covering every major muscle group.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search workout or muscle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-900/90 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-xs text-zinc-200 focus:outline-none focus:border-[#ccff00]"
              />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "duration" | "calories" | "rating")}
                className="bg-zinc-900/90 border border-zinc-800 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-zinc-300 appearance-none cursor-pointer focus:outline-none focus:border-[#ccff00]"
              >
                <option value="duration">Sort by Duration</option>
                <option value="calories">Sort by Calories</option>
                <option value="rating">Sort by Rating</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-[#ccff00] animate-spin" />
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Loading Workouts...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
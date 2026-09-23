
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import WorkoutCard, { Workout } from "@/components/WorkoutCard";

export default function WorkoutLibrarySection({ workouts }: { workouts: Workout[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkouts = workouts.filter((workout) => {
    const query = searchQuery.toLowerCase();
    const matchesName = workout.name.toLowerCase().includes(query);
    const matchesEquipment = workout.equipment?.toLowerCase().includes(query);
    const matchesMuscle = workout.muscleGroups?.some((group) =>
      group.toLowerCase().includes(query)
    );
    return matchesName || matchesEquipment || matchesMuscle;
  });

  return (
    <section id="library" className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            THE LIBRARY
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, tag, muscle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111318] border border-zinc-800/80 focus:border-[#CCFF00] text-white text-xs rounded-xl pl-9 pr-4 py-2.5 outline-none transition-colors"
          />
        </div>
      </div>

      {filteredWorkouts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 sm:py-12 bg-[#111318] rounded-2xl border border-zinc-800 px-4">
          <p className="text-zinc-400 text-xs sm:text-sm font-medium">
            {searchQuery
              ? `No workouts found matching "${searchQuery}"`
              : "No workouts found or API endpoint is unavailable."}
          </p>
        </div>
      )}
    </section>
  );
}
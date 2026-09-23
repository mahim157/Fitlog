

import Image from "next/image";
import { notFound } from "next/navigation";
import { Workout } from "@/components/WorkoutCard";
import DetailActions from "@/components/DetailActions";

async function getWorkoutDetail(id: string): Promise<Workout | null> {
  const API_URLS = [
    "https://api.abcz.workers.dev/api/fitlog",
    "https://api.abcz.workers.dev/api/fitlog/",
    "https://api.abcz.workers.dev/api/fitlog/workouts",
  ];

  for (const url of API_URLS) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const workouts: Workout[] = Array.isArray(data)
          ? data
          : data.workouts || data.data || [];

        const match = workouts.find((item) => String(item.id) === String(id));
        if (match) return match;
      }
    } catch (e) {
      console.error(`Error fetching from ${url}:`, e);
    }
  }

  return null;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const workout = await getWorkoutDetail(resolvedParams.id);

  if (!workout) {
    notFound();
  }

  const muscleGroups = Array.isArray(workout.muscleGroups) ? workout.muscleGroups : [];
  const instructions = Array.isArray(workout.instructions) ? workout.instructions : [];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-12 items-start">
        
        {/* Left Side: Image (Aspect-video on mobile, aspect-square on desktop) */}
        <div className="relative w-full aspect-video sm:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800">
          <Image
            src={workout.image || "/banner.png"}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right Side: Info & Actions */}
        <div className="flex flex-col space-y-5 sm:space-y-6">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
              {workout.name}
            </h1>
            {workout.description && (
              <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">
                {workout.description}
              </p>
            )}

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
              {muscleGroups.map((group, idx) => (
                <span
                  key={idx}
                  className="bg-[#CCFF00] text-black text-[10px] sm:text-xs font-extrabold uppercase px-2.5 sm:px-3 py-1 rounded-full tracking-wider"
                >
                  {group}
                </span>
              ))}
            </div>
          </div>

          {/* Key-Value Table */}
          <div className="bg-[#121418] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 space-y-3 sm:space-y-3.5 text-xs sm:text-sm">
            <div className="flex justify-between items-center text-zinc-400 border-b border-zinc-800/60 pb-2.5">
              <span className="uppercase font-semibold text-zinc-500">EQUIPMENT</span>
              <span className="text-white font-medium">{workout.equipment}</span>
            </div>

            <div className="flex justify-between items-center text-zinc-400 border-b border-zinc-800/60 pb-2.5">
              <span className="uppercase font-semibold text-zinc-500">DIFFICULTY</span>
              <span className="text-white font-medium">{workout.difficulty || "Intermediate"}</span>
            </div>

            <div className="flex justify-between items-center text-zinc-400 border-b border-zinc-800/60 pb-2.5">
              <span className="uppercase font-semibold text-zinc-500">SETS</span>
              <span className="text-white font-medium">{workout.sets || 4}</span>
            </div>

            <div className="flex justify-between items-center text-zinc-400 border-b border-zinc-800/60 pb-2.5">
              <span className="uppercase font-semibold text-zinc-500">REPS</span>
              <span className="text-white font-medium">{workout.reps || "6-8"}</span>
            </div>

            <div className="flex justify-between items-center text-zinc-400 border-b border-zinc-800/60 pb-2.5">
              <span className="uppercase font-semibold text-zinc-500">DURATION</span>
              <span className="text-white font-medium">{workout.duration} min</span>
            </div>

            <div className="flex justify-between items-center text-zinc-400 border-b border-zinc-800/60 pb-2.5">
              <span className="uppercase font-semibold text-zinc-500">CALORIES</span>
              <span className="text-white font-medium">{workout.caloriesBurned} kcal</span>
            </div>

            <div className="flex justify-between items-center text-zinc-400 pt-0.5">
              <span className="uppercase font-semibold text-zinc-500">RATING</span>
              <span className="text-white font-medium">{workout.rating}</span>
            </div>
          </div>

          {/* Instructions List */}
          {instructions.length > 0 && (
            <div className="space-y-2.5 pt-1 sm:pt-2">
              <h2 className="text-white font-black uppercase text-xs sm:text-sm tracking-wider">
                INSTRUCTIONS
              </h2>
              <ol className="space-y-2 text-zinc-400 text-xs sm:text-sm list-decimal list-inside leading-relaxed">
                {instructions.map((step, idx) => (
                  <li key={idx} className="pl-1">
                    <span className="text-zinc-300">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Interactive Action Buttons Component */}
          <DetailActions workout={workout} />

        </div>
      </div>
    </main>
  );
}
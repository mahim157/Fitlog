
import Hero from "@/components/Hero";
import WorkoutLibrarySection from "@/components/WorkoutLibrarySection";
import { Workout } from "@/components/WorkoutCard";

async function getWorkouts(): Promise<Workout[]> {
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
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.workouts)) return data.workouts;
        if (data && Array.isArray(data.data)) return data.data;
      }
    } catch (e) {
      console.error(`Failed to fetch from ${url}:`, e);
    }
  }

  return [];
}

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-12">
      <Hero />
      <WorkoutLibrarySection workouts={workouts} />
    </main>
  );
}
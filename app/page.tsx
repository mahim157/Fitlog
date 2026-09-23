
import Hero from "@/components/Hero";
import WorkoutCard, { Workout } from "@/components/WorkoutCard";

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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      <Hero />

      <section id="library" className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            THE LIBRARY
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {workouts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#111318] rounded-2xl border border-zinc-800">
            <p className="text-zinc-400 text-sm font-medium">
              No workouts found or API endpoint is unavailable.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
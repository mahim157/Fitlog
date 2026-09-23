
export interface Workout {
  id: string;
  name: string;
  category: string[];
  equipment: string[];
  duration: number;
  calories: number;
  rating: number;
  description: string;
  instructions: string[];
  image: string;
}
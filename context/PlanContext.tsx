
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/components/WorkoutCard";

interface PlanContextType {
  planList: Workout[];
  savedList: Workout[];
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: string | number) => void;
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: string | number) => void;
  isPlanFull: boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [planList, setPlanList] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on initial render
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      if (storedPlan) setPlanList(JSON.parse(storedPlan));
      if (storedSaved) setSavedList(JSON.parse(storedSaved));
    } catch (e) {
      console.error("Failed to load from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage on state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_plan", JSON.stringify(planList));
    }
  }, [planList, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_saved", JSON.stringify(savedList));
    }
  }, [savedList, isLoaded]);

  const isPlanFull = planList.length >= 5;

  const addToPlan = (workout: Workout): boolean => {
    if (planList.length >= 5) {
      return false; // Cap reached
    }
    if (!planList.some((item) => String(item.id) === String(workout.id))) {
      setPlanList((prev) => [...prev, workout]);
    }
    return true;
  };

  const removeFromPlan = (id: string | number) => {
    setPlanList((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const addToSaved = (workout: Workout) => {
    if (!savedList.some((item) => String(item.id) === String(workout.id))) {
      setSavedList((prev) => [...prev, workout]);
    }
  };

  const removeFromSaved = (id: string | number) => {
    setSavedList((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  return (
    <PlanContext.Provider
      value={{
        planList,
        savedList,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        isPlanFull,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}
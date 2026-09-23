
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Workout } from "@/types/workout";

interface PlanContextType {
  planList: Workout[];
  savedList: Workout[];
  completedList: string[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  saveForLater: (workout: Workout) => void;
  removeFromSaved: (id: string) => void;
  markAsDone: (id: string) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [planList, setPlanList] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [completedList, setCompletedList] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const localPlan = localStorage.getItem("fitlog_plan");
    const localSaved = localStorage.getItem("fitlog_saved");
    const localCompleted = localStorage.getItem("fitlog_completed");

    if (localPlan) setPlanList(JSON.parse(localPlan));
    if (localSaved) setSavedList(JSON.parse(localSaved));
    if (localCompleted) setCompletedList(JSON.parse(localCompleted));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_plan", JSON.stringify(planList));
      localStorage.setItem("fitlog_saved", JSON.stringify(savedList));
      localStorage.setItem("fitlog_completed", JSON.stringify(completedList));
    }
  }, [planList, savedList, completedList, isLoaded]);

  const addToPlan = (workout: Workout) => {
    if (planList.length >= 5) {
      toast.error("Cap reached! Today's plan is limited to 5 lifts.");
      return;
    }
    if (planList.some((item) => item.id === workout.id)) {
      toast("This workout is already in today's plan!", { icon: "ℹ️" });
      return;
    }
    setPlanList((prev) => [...prev, workout]);
    toast.success(`"Added ${workout.name}" to Today's Plan!`);
  };

  const removeFromPlan = (id: string) => {
    setPlanList((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed workout from Today's Plan.");
  };

  const saveForLater = (workout: Workout) => {
    if (savedList.some((item) => item.id === workout.id)) {
      toast("Already saved for later!", { icon: "ℹ️" });
      return;
    }
    setSavedList((prev) => [...prev, workout]);
    toast.success(`"Saved ${workout.name}" for later!`);
  };

  const removeFromSaved = (id: string) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from Saved workouts.");
  };

  const markAsDone = (id: string) => {
    if (!completedList.includes(id)) {
      setCompletedList((prev) => [...prev, id]);
      toast.success("Lift marked as completed! Keep pushing 💪");
    }
  };

  return (
    <PlanContext.Provider
      value={{
        planList,
        savedList,
        completedList,
        addToPlan,
        removeFromPlan,
        saveForLater,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within a PlanProvider");
  return context;
};
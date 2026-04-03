"use client";

import { create } from 'zustand'

export interface UserProfile {
  name: string;
  dailyGoal: number;
  favorites?: string[]; // Array of Food Item IDs
}

export interface MealLog {
  id: string; // The Firestore generated ID
  name: string;
  carbs: number;
  mealType: string;
  unit: string;
  time: string;
  timestamp: string; 
}

interface AppState {
  currentUserUid: string | null;
  profile: UserProfile | null;
  logs: MealLog[];
  isAuthLoaded: boolean;
  setCurrentUserUid: (uid: string | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLogs: (logs: MealLog[]) => void;
  setAuthLoaded: (isLoaded: boolean) => void;
  clearState: () => void;
}

export const useStore = create<AppState>((set) => ({
  currentUserUid: null,
  profile: null,
  logs: [],
  isAuthLoaded: false,
  setCurrentUserUid: (uid) => set({ currentUserUid: uid }),
  setProfile: (profile) => set({ profile }),
  setLogs: (logs) => set({ logs }),
  setAuthLoaded: (isLoaded: boolean) => set({ isAuthLoaded: isLoaded }),
  clearState: () => set({ currentUserUid: null, profile: null, logs: [], isAuthLoaded: true }),
}))

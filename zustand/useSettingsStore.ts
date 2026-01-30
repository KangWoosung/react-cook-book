/*
2026-01-23 09:13:58



*/
"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SettingsStore = {
  animationsEnabled: boolean;
  darkModeEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  setDarkModeEnabled: (enabled: boolean) => void;
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      animationsEnabled: true,
      darkModeEnabled: false,
      setAnimationsEnabled: (enabled: boolean) =>
        set({ animationsEnabled: enabled }),
      setDarkModeEnabled: (enabled: boolean) =>
        set({ darkModeEnabled: enabled }),
    }),
    {
      name: "settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

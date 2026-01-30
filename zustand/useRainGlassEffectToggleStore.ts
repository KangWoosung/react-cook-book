/*
2026-01-27 12:19:13


*/


"use client";
import { create } from "zustand";

export type RainGlassEffectToggleStore = {
  rainyDayOn: boolean;
  rainDropFXOn: boolean;
  setRainyDayOn: (on: boolean) => void;
  setRainDropFXOn: (on: boolean) => void;
};

export const useRainGlassEffectToggleStore = create<RainGlassEffectToggleStore>((set) => ({
  rainyDayOn: false,
  rainDropFXOn: false,
  setRainyDayOn: (on: boolean) => set({ rainyDayOn: on }),
  setRainDropFXOn: (on: boolean) => set({ rainDropFXOn: on }),
}));

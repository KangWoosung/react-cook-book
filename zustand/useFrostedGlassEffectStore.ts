/*
2026-01-31 06:31:22


*/
'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';


interface FrostedGlassEffectState {
    maxCount: number;
    setMaxCount: (maxCount: number) => void;
    mouseInteraction: boolean;
    setMouseInteraction: (mouseInteraction: boolean) => void;
}

export const useFrostedGlassEffectStore = create<FrostedGlassEffectState>()(persist((set) => ({
    maxCount: 10000,
    setMaxCount: (maxCount: number) => set({ maxCount }),
        mouseInteraction: false,
        setMouseInteraction: (mouseInteraction: boolean) => set({ mouseInteraction }),
    }), {
        name: 'frosted-glass-effect-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
            maxCount: state.maxCount,
            mouseInteraction: state.mouseInteraction,
        }),
    }
))
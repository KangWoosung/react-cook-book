/*
2026-01-31 06:31:22


*/
'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';


interface FrostedGlassEffectState {
  letItSnow: boolean
  setLetItSnow: (letItSnow: boolean) => void
  cameraMoveAround: boolean
  setCameraMoveAround: (cameraMoveAround: boolean) => void
  maxCount: number
  setMaxCount: (maxCount: number) => void
  mouseInteraction: boolean
  setMouseInteraction: (mouseInteraction: boolean) => void
  // hue variation on/off
  hueVariation: boolean
  setHueVariation: (hueVariation: boolean) => void
  /** Snow 씬 배경: 색상(hex/rgb) 또는 이미지 URL. 라이트 모드 시 밝은 색 권장 */
  background: string
  setBackground: (background: string) => void
}

export const useFrostedGlassEffectStore = create<FrostedGlassEffectState>()(
  persist(
    (set) => ({
      letItSnow: false,
      setLetItSnow: (letItSnow: boolean) => set({ letItSnow }),
      cameraMoveAround: false,
      setCameraMoveAround: (cameraMoveAround: boolean) => set({ cameraMoveAround }),
      maxCount: 10000,
      setMaxCount: (maxCount: number) => set({ maxCount }),
      mouseInteraction: false,
      setMouseInteraction: (mouseInteraction: boolean) => set({ mouseInteraction }),
      background: '',
      setBackground: (background: string) => set({ background }),
      hueVariation: true,
      setHueVariation: (hueVariation: boolean) => set({ hueVariation }),
    }),
    {
      name: 'frosted-glass-effect-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        maxCount: state.maxCount,
        mouseInteraction: state.mouseInteraction,
        background: state.background,
        hueVariation: state.hueVariation,
      }),
    }
  )
)
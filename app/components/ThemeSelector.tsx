/*
2026-01-22 04:39:36
Inspired by Kevin Powell's video: https://www.youtube.com/watch?v=f_aqzyIDudI


*/
"use client";
import { useEffect, useCallback, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useSettingsStore } from "@/zustand/useSettingsStore";

const ThemeSelector = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Zustand Store
  const { darkModeEnabled, setDarkModeEnabled, animationsEnabled } =
    useSettingsStore();

  // Hydration 가드: 클라이언트에서만 실제 값 사용
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = (newTheme: "light" | "dark", e: React.MouseEvent) => {
    // Prevent multiple clicks during animation
    if (isDisabled) return;

    // If animations are disabled, skip animation and update immediately
    if (!animationsEnabled) {
      setDarkModeEnabled(newTheme === "dark");
      return;
    }

    // Apply circle mask animation when animations are enabled
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.style.setProperty("--x", x + "px");
    document.documentElement.style.setProperty("--y", y + "px");
    document.documentElement.style.setProperty("--r", endRadius + "px");

    setDarkModeEnabled(newTheme === "dark");

    // Disable cursor and pointer events for 0.5 seconds during animation
    setIsDisabled(true);
    document.body.style.cursor = "not-allowed";

    setTimeout(() => {
      setIsDisabled(false);
      document.body.style.cursor = "";
    }, 500);
  };

  const updateTheme = useCallback((currentTheme: "light" | "dark") => {
    // for css properties
    document.documentElement.style.removeProperty("--theme");
    document.documentElement.style.setProperty("--theme", currentTheme);
    // for tailwind classes
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(currentTheme);
  }, []);

  // Set theme on initial mount
  useEffect(() => {
    updateTheme(darkModeEnabled ? "dark" : "light");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Skip animation if animations are disabled
    if (!animationsEnabled) {
      updateTheme(darkModeEnabled ? "dark" : "light");
      return;
    }

    // for old browsers
    if (!document.startViewTransition) {
      updateTheme(darkModeEnabled ? "dark" : "light");
      return;
    }

    // Apply view transition animation when animations are enabled
    document.startViewTransition(() => {
      updateTheme(darkModeEnabled ? "dark" : "light");
    });
  }, [darkModeEnabled, updateTheme, animationsEnabled]);

  // Hydration mismatch 방지: 마운트 전에는 기본 UI 렌더링
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex gap-md h-full w-full items-center justify-center">
      <div
        className={`flex gap-md items-center justify-center rounded-full dark:bg-gray-800 bg-gray-200 p-2 ${
          isDisabled
            ? "cursor-not-allowed pointer-events-none opacity-50"
            : "cursor-pointer"
        }`}
      >
        {darkModeEnabled ? (
          <Moon onClick={(e) => toggleTheme("light", e)} />
        ) : (
          <Sun onClick={(e) => toggleTheme("dark", e)} />
        )}
      </div>
    </div>
  );
};

export default ThemeSelector;

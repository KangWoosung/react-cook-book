"use client";

import React, { useState, useRef, useEffect } from "react";
import { Settings } from "lucide-react";
import { useSettingsStore } from "@/zustand/useSettingsStore";

const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Zustand Store
  const {
    animationsEnabled,
    setAnimationsEnabled,
    darkModeEnabled,
    setDarkModeEnabled,
  } = useSettingsStore();

  // Hydration 가드: 클라이언트에서만 실제 값 사용
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 100);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleAnimations = () => {
    setAnimationsEnabled(!animationsEnabled);
  };

  return (
    <div className="relative p-4 border-0 border-red-500" ref={menuRef}>
      {/* Settings Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-full
        border border-solid border-black/[.3]  dark:border-white/[.5]
        transition-colors
        hover:border-transparent hover:bg-black/[.07] dark:hover:bg-white/[.2]
        "
        aria-label="Settings"
        suppressHydrationWarning
      >
        <Settings className="h-5 w-5" suppressHydrationWarning />
      </button>

      {/* Popup Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Settings
            </h3>

            {/* Accessibility Section */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase">
                Accessibility
              </h4>

              {/* Animations Switch */}
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="accessibility-toggle"
                  className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  Animations
                </label>
                <button
                  id="accessibility-toggle"
                  onClick={toggleAnimations}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    mounted && animationsEnabled
                      ? "bg-blue-600"
                      : "bg-gray-200 dark:bg-gray-600"
                  }`}
                  role="switch"
                  aria-checked={mounted ? animationsEnabled : true}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      mounted && animationsEnabled
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Appearance Section */}
            <div>
              <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase">
                Appearance
              </h4>

              {/* Dark Mode Switch */}
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="dark-mode-toggle"
                  className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  Dark Mode
                </label>
                <button
                  id="dark-mode-toggle"
                  onClick={() => setDarkModeEnabled(!darkModeEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    mounted && darkModeEnabled
                      ? "bg-blue-600"
                      : "bg-gray-200 dark:bg-gray-600"
                  }`}
                  role="switch"
                  aria-checked={mounted ? darkModeEnabled : false}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      mounted && darkModeEnabled
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;

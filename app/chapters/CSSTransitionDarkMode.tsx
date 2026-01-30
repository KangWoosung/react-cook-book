/*
2026-01-25 01:34:25

*/
'use client';
import React, { useState } from "react";
import LandoNorrisText from "../components/landoNorrisText/LandoNorrisText";
import ThemeSelector from "../components/ThemeSelector";
import { Button } from "@/components/ui/button";

const CSSTransitionDarkMode = () => {
  const [darkModeSelectorOn, setDarkModeSelectorOn] = useState(true);


  return (
    <div className="border-0 border-green-500 w-full p-0 mt-12">
      <h2 className="text-2xl font-bold">
        <LandoNorrisText hoverColor="firebrick">
          1. CSS Transition Dark Mode
        </LandoNorrisText>
      </h2>
      <div className="flex flex-row my-2 gap-4 w-full">
        <div className="flex-[2] min-w-0 border-0 border-red-500 p-4 gap-4 flex flex-col">
          <p className="text-lg font-light">ThemeSelector.tsx</p>
          <p
            className="font-light  text-sm opacity-70
            text-light-foreground dark:text-dark-foreground"
          >
            This Component is inspired by Kevin Powell&apos;s video: <br />
            <a
              href="https://www.youtube.com/watch?v=f_aqzyIDudI"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.youtube.com/watch?v=f_aqzyIDudI
            </a>
          </p>
          <p
            className="font-light  text-sm opacity-70
            text-light-foreground dark:text-dark-foreground"
          >
            *You need to be familiar with the way how React-Tailwind Dark Mode
            works.
          </p>
          <pre>
            Usage:
            <code className="block overflow-x-auto">
              {`
    <ThemeSelector />
              `}
            </code>
          </pre>

          <Button
            variant="outline"
            className={darkModeSelectorOn ? "rounded-full bg-purple-800 text-white" : "rounded-full"}
            onClick={() => {
              setDarkModeSelectorOn(!darkModeSelectorOn);
            }}
          >
            {darkModeSelectorOn ? "Hide Dark Mode Selector" : "Show Dark Mode Selector"}
          </Button>
        </div>
        <div className="tech-stacks-container flex-[3] min-w-0 items-center justify-center
				bg-gray-100 dark:bg-gray-800">
          {darkModeSelectorOn && <ThemeSelector />}
        </div>
      </div>
    </div>
  );
};

export default CSSTransitionDarkMode;

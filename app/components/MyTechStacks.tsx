"use client";
/*
import React, { Activity, useState } from "react";
import TechIcons from "./techIcons/TechIcons";
import "./MyTechStacks.css";
import { useSettingsStore } from "@/zustand/useSettingsStore";

const MyTechStacks = () => {
  const [showStackIcons, setShowStackIcons] = useState(false);

  // Zustand Store
  const { animationsEnabled } = useSettingsStore();

  const handleShowStackIcons = () => {
    setShowStackIcons(!showStackIcons);

    // Skip animation delay injection if animations are disabled
    if (!animationsEnabled) {
      // console.log('Animations disabled - skipping animation delay injection');
      return;
    }

    // Apply sequential animation delays when animations are enabled
    const children = document.querySelectorAll(".tech-icon-container");
    if (!children) return;
    // console.log('Found tech icons:', children.length);

    Array.from(children).forEach((child, index) => {
      const element = child as HTMLElement;
      element.style.setProperty("--animation-delay", `${index}`);
      // console.log(`Set animation-delay for icon ${index}`);
    });
  };

  return (
    <div className="flex flex-row my-2 gap-4 w-full" id="my-tech-stacks-wrapper">
      <div className="flex-[2] border-0 border-red-500 p-4 min-h-52 gap-4 flex flex-col">
        <div>
          <p className="text-lg font-light">
            MyTechStacks.tsx
            <br />
            TechIcons.tsx
          </p>

          <p
            className="font-light  text-sm opacity-70
            text-light-foreground dark:text-dark-foreground"
          >
            This Component mainly uses the resources from marwin1991&apos;s Repository: <br />
            <a
              href="https://github.com/marwin1991/profile-technology-icons"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/marwin1991/profile-technology-icons
            </a>{" "}
            <br /><br />
            Thanks to marwin1991 for the great work!
          </p>
            <br />
            <pre>
              Usage:
              <code>
                {`
	<TechIcons name="react"  />
	<TechIcons name="vite"  />
	<TechIcons name="next_js" invert={true}  />
	<TechIcons name="expo" invert={true}  />
                `}
              </code>
            </pre>
        </div>
        <button
          onClick={handleShowStackIcons}
          className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
        >
          Show Stack Icons
        </button>
      </div>
      <Activity mode={showStackIcons ? "visible" : "hidden"}>
        <div
          className={`tech-stacks-container flex-[3] p-4
				bg-gray-100 dark:bg-gray-800 ${!animationsEnabled ? "no-animations" : ""}`}
        >
          <TechIcons name="javascript" />
          <TechIcons name="typescript" />
          <TechIcons name="node_js" invert={true} />
          <TechIcons name="react" />
          <TechIcons name="vite" />
          <TechIcons name="next_js" invert={true} />
          <TechIcons name="expo" invert={true} />
          <TechIcons name="react_query" />
          <TechIcons name="zustand" />
          <TechIcons name="supabase" />
          <TechIcons name="postgresql" />
          <TechIcons name="sqlite" />
          <TechIcons name="drizzle" invert={true} />
          <TechIcons name="tailwind_css" />
          <TechIcons name="shadcn_ui" invert={true} />
          <TechIcons name="reanimated" invert={true} />
        </div>
      </Activity>
    </div>
  );
};

export default MyTechStacks;

*/

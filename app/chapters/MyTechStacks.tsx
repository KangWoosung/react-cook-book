/*
2026-01-25 01:38:05


*/
"use client";

import React, { Activity, useState } from "react";
import LandoNorrisText from "../components/landoNorrisText/LandoNorrisText";
import TechIcons from "../components/techIcons/TechIcons";
import { useSettingsStore } from "@/zustand/useSettingsStore";
import "./MyTechStacks.css";
import { Button } from "@/components/ui/button";

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
    <div className="border-0 border-yellow-500 w-full p-0 mt-12">
      <h2 className="text-2xl font-bold">
        <LandoNorrisText hoverColor="firebrick">
          3. My TECH STACKS
        </LandoNorrisText>
      </h2>
      <div
        className="flex flex-row my-2 gap-4 w-full"
        id="my-tech-stacks-wrapper"
      >
        <div className="flex-[2] min-w-0 border-0 border-red-500 p-4 min-h-52 gap-4 flex flex-col">
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
              This Component mainly uses the resources from marwin1991&apos;s
              Repository: <br />
              <a
                href="https://github.com/marwin1991/profile-technology-icons"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/marwin1991/profile-technology-icons
              </a>{" "}
              <br />
              <br />
              Thanks to marwin1991 for the great work!
            </p>
            <p
              className="font-light  text-sm opacity-70
            text-light-foreground dark:text-dark-foreground"
            >
              *Note: Marwin&apos;s Repository does not have all the icons you
              may need. If the icon you seek is not found in the repository,
              find the png icon somewhere in the web and add it to the
              /public/assets/png folder.(or your framework&apos;s reserved
              public folder) The icon format must be a png.
            </p>
            <br />
            <pre>
              Usage:
              <code className="block overflow-x-auto">
                {`
	<TechIcons name="react"  />
	<TechIcons name="vite"  />
	<TechIcons name="next_js" invert={true}  />
	<TechIcons name="expo" invert={true}  />
                `}
              </code>
            </pre>
          </div>
          <Button
            variant="outline"
            className={showStackIcons ? "rounded-full bg-purple-800 text-white" : "rounded-full"}
            onClick={() => {
              handleShowStackIcons();
            }}
          >
            {showStackIcons ? "Hide Stack Icons" : "Show Stack Icons"}
          </Button>
        </div>
        <div
          className={`tech-stacks-container flex-[3] min-w-0 lg:max-h-100 sm:max-h-160
            border-0 border-blue-500 p-4
				bg-gray-100 dark:bg-gray-800 ${!animationsEnabled ? "no-animations" : ""}`}
        >
          <Activity mode={showStackIcons ? "visible" : "hidden"}>
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
            <TechIcons name="webgl" />
          </Activity>
        </div>
      </div>
    </div>
  );
};

export default MyTechStacks;

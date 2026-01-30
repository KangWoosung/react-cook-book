/*
2026-01-22 03:53:59

Note!!
This Component basically uses the resources from the Repository: 
  https://github.com/marwin1991/profile-technology-icons
Thanks to marwin1991 for the great work!
Marvin's Repository does not have all the icons you may need.
So, if the icon you seek is not found in the Repository, find the png icon somewhere in the web 
 and add it to the /public/assets/png folder.(or your framework's reserved public folder)
The icon format must be a png.

*IMPORTANT* TechIcons.css file is also required.
It is located in the same directory as this file.

Usage:
<TechIcons name="javascript"  />
<TechIcons name="typescript"  />
<TechIcons name="expo" invert={true} />

Good Luck!

*/
// /app/components/TechIcons.tsx

"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import "./TechIcons.css";
import { useSettingsStore } from "@/zustand/useSettingsStore";

const TECH_ICONS_URL_PATH =
  "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/";
const DEFAULT_SIZE = 36;
const MARQUEE_THRESHOLD = 8; // If the name length is greater than this value, apply marquee

type TechIconsProps = {
  name: string;
  size?: number;
  invert?: boolean; // If true, the icon will be inverted in dark mode
} & React.HTMLAttributes<HTMLImageElement>;

const TechIcons = ({
  name,
  size = DEFAULT_SIZE,
  invert = false,
  ...props
}: TechIconsProps) => {
  const [techIconsSrc, setTechIconsSrc] = useState(
    `${TECH_ICONS_URL_PATH}${name}.png`
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLSpanElement>(null);
  const [needsMarquee, setNeedsMarquee] = useState(
    name.length > MARQUEE_THRESHOLD
  );

  // Zustand Store
  const { animationsEnabled } = useSettingsStore();

  const handleError = () => {
    // Change to /assets/png when 404
    setTechIconsSrc(`/assets/png/${name}.png`);
  };

  const nameRefCallback = (node: HTMLDivElement | null) => {
    nameRef.current = node;
    // Skip marquee check if animations are disabled
    if (!animationsEnabled) return;

    if (node && containerRef.current && !needsMarquee) {
      // After the DOM is mounted, measure the actual size
      // Get the actual width of the container and the text
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = node.scrollWidth;
      if (textWidth > containerWidth) {
        setNeedsMarquee(true);
      }
    }
  };

  const handleMouseEnter = () => {
    // Skip animation reset if animations are disabled
    if (!animationsEnabled) return;

    // Reset the marquee animation when hovering
    if (marqueeRef.current) {
      const element = marqueeRef.current;
      element.style.animation = "none";
      // Force a reflow to reset the animation
      void element.offsetWidth;
      element.style.animation = "";
    }
  };

  const displayName = name.replace(/_/g, " ");

  return (
    <div
      ref={containerRef}
      className={`tech-icon-container flex flex-row flex-wrap gap-2 my-2 mx-2 ${!animationsEnabled ? "no-animations" : ""}`}
      style={{ "--icon-size": `${size}px` } as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
    >
      <div className="tech-icon-wrapper">
        <Image
          height={size}
          src={techIconsSrc}
          width={size}
          alt={`${name} icon`}
          title={name}
          unoptimized // 이 속성으로 최적화 과정을 건너뜀
          onError={handleError}
          className={`${animationsEnabled ? "transition-all duration-300" : ""} ${invert ? "dark:invert" : ""}`}
          style={{ maxWidth: "100%", height: "auto", maxHeight: `${size}px` }}
          {...props}
        />
      </div>
      <div className="tech-icon-name" ref={nameRefCallback}>
        {animationsEnabled && needsMarquee ? (
          <span ref={marqueeRef} className="tech-icon-name-marquee">
            {displayName}
          </span>
        ) : (
          <span>{displayName}</span>
        )}
      </div>
    </div>
  );
};

export default TechIcons;

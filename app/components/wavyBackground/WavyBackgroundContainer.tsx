/*
2026-01-25 03:18:08

Note:
WavyBackgroundContainer renders the SVG animation within the parent element's restricted area.
You need to set overflow-hidden in the parent element to prevent the SVG animation from overflowing the parent element's area.

Usage:
<div className="overflow-hidden" style={{ width: '50%', height: '500px' }}>
    <WavyBackgroundContainer
        fillColors={fillColors}
        animationDuration={animationDuration}
        viewBox={viewBox}
        svgPaths={svgPaths}>
    {children}
    </WavyBackgroundContainer>
</div>
*/

"use client";
import React, { useEffect, useRef, useState } from "react";
import "./WavyBackgroundContainer.css";
const DEFAULT_FILL_COLORS = [
  "rgba(126, 34, 206, 1)",
  "rgba(148, 90, 198, 1)",
  "rgba(177, 134, 215, 1)",
];

const DEFAULT_VIEW_BOX = [1440, 560]; // width: 1440px, height: 560px
const DEFAULT_PATHS = [
  "M 0,37 C 72,79.4 216,235.8 360,249 C 504,262.2 576,103 720,103 C 864,103 936,244.6 1080,249 C 1224,253.4 1368,149.8 1440,125L1440 560L0 560z",
  "M 0,356 C 144,384.4 432,513 720,498 C 1008,483 1296,324.4 1440,281L1440 560L0 560z",
];

type WavyBackgroundContainerProps = {
  fillColors?: string[];
  animationDuration?: number;
  viewBox?: number[];
  svgPaths?: string[];
  children: React.ReactNode;
};

const WavyBackgroundContainer = ({
  fillColors = DEFAULT_FILL_COLORS,
  animationDuration = 20,
  viewBox = DEFAULT_VIEW_BOX,
  svgPaths = DEFAULT_PATHS,
  children,
}: WavyBackgroundContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only set the CSS variable for the current container
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.setProperty(
          "--animation-duration",
          `${animationDuration}s`
        );
      }
      return () => clearTimeout(timer);
    }, 150);
    return () => clearTimeout(timer);
  }, [animationDuration]);

  // Hydration mismatch 방지: 마운트 전에는 기본 UI 렌더링
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="relative overflow-hidden h-full">
      {/* <!-- Static Line Pattern SVG (Background) --> */}
      <svg
        className="wavy-background-svg absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        preserveAspectRatio="none"
        viewBox={`0 0 ${viewBox[0]} ${viewBox[1]}`}
      >
        <g mask="url(#SvgjsMask1059)" fill="none">
          <rect
            width={viewBox[0]}
            height={viewBox[1]}
            x="0"
            y="0"
            fill={fillColors[0]}
          ></rect>
          {svgPaths.map((path, index) => (
            <path key={index} d={path} fill={fillColors[index + 1]} />
          ))}
        </g>
        <defs>
          <mask id="SvgjsMask1059">
            <rect width={viewBox[0]} height={viewBox[1]} fill="#ffffff"></rect>
          </mask>
        </defs>
      </svg>

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default WavyBackgroundContainer;

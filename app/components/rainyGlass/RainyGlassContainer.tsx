/*
2026-01-26 02:41:40

This Component uses the good old rainyday.js library to create a rainy glass effect.
https://github.com/mubaidr/rainyday.js

Usage of rainyday.js:
function run() {
    var rainyDay = new RainyDay({
        image: 'background' // Target p element with ID, RainyDay.js will use backgorund image to simulate rain effects.
    });
    window.setTimeout(function () {
        // rainyDay.destroy()
    }, 1000)
}
or
function run() {
    var image = document.getElementById('background');
    image.onload = function () {
        var engine = new RainyDay({
            image: this,
            gravityAngle: Math.PI / 9
        });
        engine.trail = engine.TRAIL_SMUDGE;
        engine.rain([
            [1, 0, 1000],
            [3, 3, 1]
        ], 100);
    };
    image.crossOrigin = 'anonymous';
    image.src = 'http://i.imgur.com/VuX2Nf0.jpg';
    // hide info container
    document.getElementById('infobox').children[0].style.visibility = 'visible';
    setTimeout(function () {
        // remove inline style -otherwise the hover effect would not be effective
        document.getElementById('infobox').children[0].style.visibility = '';
    }, 5000);
}

*/
"use client";
import React, { useEffect, useRef, useState } from "react";
import RainyDay from "../../../utils/rainyday";

type RainyGlassContainerProps = {
  children: React.ReactNode;
  backgroundImage?: string;
  rainIntensity?: number;
  gravityAngle?: number;
  trailType?: "drops" | "smudge" | "none";
};

// Type definition for RainyDay instance (legacy library without TypeScript support)
/* eslint-disable @typescript-eslint/no-explicit-any */
interface RainyDayInstance {
  trail?: any;
  TRAIL_DROPS?: any;
  TRAIL_SMUDGE?: any;
  TRAIL_NONE?: any;
  rain: (drops: number[][], interval: number) => void;
  destroy: () => void;
  [key: string]: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const RainyGlassContainer = ({
  children,
  backgroundImage = "https://picsum.photos/800/600",
  rainIntensity = 50,
  gravityAngle = Math.PI / 2,
  trailType = "drops",
}: RainyGlassContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rainyDayRef = useRef<RainyDayInstance | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const container = containerRef.current;

    // Create a hidden image element to load the background
    const img = document.createElement("img");
    img.crossOrigin = "anonymous";

    img.onload = function () {
      try {
        // Initialize RainyDay with the container div (which has background-image)
        const engine = new RainyDay({
          image: container,
          parentElement: container,
          width: container.clientWidth,
          height: container.clientHeight,
          gravityAngle: gravityAngle,
          gravityAngleVariance: Math.PI / 16,
          blur: 10,
          opacity: 1,
          enableCollisions: true,
          fps: 30,
          position: "absolute",
          top: 0,
          left: 0,
        });

        // Set trail type
        if (trailType === "smudge") {
          engine.trail = engine.TRAIL_SMUDGE;
        } else if (trailType === "drops") {
          engine.trail = engine.TRAIL_DROPS;
        } else {
          engine.trail = engine.TRAIL_NONE;
        }

        // Start rain animation
        // Format: [[min size, max size, count]]
        engine.rain(
          [
            [1, 2, 200], // Small drops
            [3, 5, 100], // Medium drops
            [6, 8, 20], // Large drops
          ],
          rainIntensity
        );

        rainyDayRef.current = engine;
      } catch (error) {
        console.error("RainyDay initialization error:", error);
      }
    };

    img.onerror = function () {
      console.error("Failed to load background image:", backgroundImage);
    };

    img.src = backgroundImage;

    // Cleanup
    return () => {
      if (rainyDayRef.current && rainyDayRef.current.destroy) {
        try {
          rainyDayRef.current.destroy();
        } catch (error) {
          console.error("RainyDay cleanup error:", error);
        }
      }
    };
  }, [mounted, backgroundImage, rainIntensity, gravityAngle, trailType]);

  if (!mounted) return null;

  return (
    <div
      id="rainy-glass-container"
      ref={containerRef}
      className="rainy-glass-container-wrapper relative
            border-0 rounded-md flex-1 min-w-0 h-full overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Children rendered on top with z-index */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default RainyGlassContainer;

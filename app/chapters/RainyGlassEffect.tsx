/*
2026-01-26 02:41:40

Rainy Glass Effect using rainyday.js & raindrop-fx library
https://github.com/mubaidr/rainyday.js
https://github.com/SardineFish/raindrop-fx
*/
"use client";
import React, { useEffect, useState, useRef } from "react";
import RainyDayJSContainer from "../components/rainyGlass/RainyDayJSContainer";
import LandoNorrisText from "../components/landoNorrisText/LandoNorrisText";
import { Button } from "@/components/ui/button";
import RainDropFXContainer from "../components/rainyGlass/RainDropFXContainer";
import { useRainGlassEffectToggleStore } from "@/zustand/useRainGlassEffectToggleStore";


const RainyGlassEffect = () => {
  const { rainyDayOn, setRainyDayOn, rainDropFXOn, setRainDropFXOn } = useRainGlassEffectToggleStore();

  return (
    <div className="border-0 border-yellow-500 w-full p-0 mt-12">
      <h2 className="text-2xl font-bold">
        <LandoNorrisText hoverColor="firebrick">
          6. Rainy Glass Effect Containers
        </LandoNorrisText>
      </h2>
      <div className="flex flex-row my-2 gap-4 w-full max-lg:flex-col">
        <div
          className="flex-[2] min-w-0 border-0 border-red-500 p-4 gap-4
        flex flex-col"
        >
          <p className="text-lg font-light">
            RainyDayJSContainer.tsx,
            <br />
            RainDropFXContainer.tsx
          </p>
          <p
            className="font-light text-sm opacity-70
            text-light-foreground dark:text-dark-foreground"
          >
            *Note: RainyDayJSContainer uses the classic rainyday.js library
            while RainDropFXContainer uses the raindropfx library. Both are MIT
            licensed. <br />
            Both solutions will grind your CPU a little bit high because they
            are beautiful.
            <br />
            rainyday.js is very old -about 15 years- but still beautiful imo.
            and grind your CPU higher than RainDropFX.
            <br />
            RainDropFX is old enough too -about 10 years- and uses WebGL to render the rain effect.
            <br />
            If you want to dig deeper, check the code in the repository.
            <br />
            <a href="https://github.com/SardineFish/raindrop-fx" target="_blank" rel="noopener noreferrer">
              https://github.com/SardineFish/raindrop-fx
            </a>
            <br />
            <br />
            Keep the cons in your mind and monitor the CPU usage.
            <br />
            Use the one you like.
            <br />
          </p>

          <Button
            variant="outline"
            className={rainyDayOn ? "rounded-full bg-purple-800 dark:bg-purple-600 text-white dark:text-white" : "rounded-full"}
            onClick={() => {
              console.log("clicked");
              setRainyDayOn(!rainyDayOn);
            }}
          >
            {rainyDayOn ? "RainyDayJSContainer on" : "RainyDayJSContainer off"}
          </Button>
          <Button
            variant="outline"
            className={rainDropFXOn ? "rounded-full bg-purple-800 dark:bg-purple-600 text-white dark:text-white" : "rounded-full"}
            onClick={() => {
              console.log("clicked");
              setRainDropFXOn(!rainDropFXOn);
            }}
          >
            {rainDropFXOn ? "RainDropFXContainer on" : "RainDropFXContainer off"}
          </Button>


          <div className="flex flex-row gap-2">
            <pre>Usage:
              <code className="block overflow-x-auto">
                {`<RainyDayJSContainer
  backgroundImage="url(/assets/img/logo.jpg)
  options={{
    defaultRainDropSize: 3,
    defaultRainDropIntensity: 100,
    defaultFPS: 24,
  }} ">
  {children}
</RainyDayJSContainer>
                `}
              </code>
            </pre>
          </div>
        </div>

        <div
          className="rainy-glass-container-outer-wrapper relative
          border-0 rounded-md border-blue-500
          flex-[3] flex flex-row items-center justify-center gap-4 h-full
          min-w-0 overflow-hidden
          h-[500px] sm:h-[600px]"
        >
          <div className="w-full h-full flex-[2] min-w-0
          border-0 border-green-500 rounded-[150px] overflow-hidden">
            <RainyDayJSContainer
              backgroundImage="url(/assets/img/logo.jpg)"
              options={{
                defaultRainDropSize: 3,
                defaultRainDropVariance: 4,
                defaultRainDropVarianceRate: 1,
                defaultRainDropIntensity: 100,
                defaultGravityAngle: Math.PI / 2,
                defaultGravityThreshold: 1,
                defaultGravityAngleVariance: 0,
                defaultFPS: 24,
                defaultBackgroundBlur: 10,
              }}
            >
              <div className="relative z-10 h-full flex flex-col items-center justify-center
                 text-white gap-4 p-4">
                <h3 className="text-4xl font-bold drop-shadow-lg">
                  RainyDay.js
                </h3>
                <p className="text-md font-light p-4 bg-black/50 rounded-md">
                  For more options, check the code in the repository.
                  <br />
                  RainyDayJSContainer.tsx
                </p>
              </div>
            </RainyDayJSContainer>
          </div>

          <div className="w-full h-full flex-[2] min-w-0 rounded-[150px]
            border-0 border-yellow-500 overflow-hidden">

            <RainDropFXContainer backgroundImage="/assets/img/logo.jpg">
              <div className="relative z-10 h-full p-4 gap-2
                flex flex-col items-center justify-center text-white">
                <h3 className="text-4xl font-bold drop-shadow-lg">
                  RainDropFX
                </h3>
                <p className="text-l warning-text bg-red-400 p-2 rounded-md">
                  Important!! This component will not work when remounted!!<br />
                </p>
                <p className="text-l warning-text ">
                  This Library uses WebGL & canvas.<br />
                  The canvas must be unique and keep connected to the WebGL context.<br />
                  If React Component is unmounted, the canvas will be removed from the WebGL context for good.
                </p>
                <p className="text-l warning-text bg-red-400 p-2 rounded-md">
                  Do not conditionally render this component and remount it.<br />
                  Try to control the rain effect with the React State.
                </p>

              </div>
            </RainDropFXContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RainyGlassEffect;

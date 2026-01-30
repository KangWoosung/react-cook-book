/*
2026-01-25 01:51:58


*/

import React from "react";
import LandoNorrisText from "../components/landoNorrisText/LandoNorrisText";
import WavyBackgroundContainer from "../components/wavyBackground/WavyBackgroundContainer";

const WavyBackground = () => {
  const WAVY_BACKGROUND_FILL_COLORS1 = [
    "rgba(184, 134, 11, 1)", // Dark goldenrod
    "rgba(218, 165, 32, 1)", // Goldenrod
    "rgba(255, 215, 128, 1)", // Light gold
  ];
  const WAVY_BACKGROUND_FILL_COLORS2 = [
    "rgba(0, 105, 148, 1)", // Deep sea blue
    "rgba(0, 153, 204, 1)", // Sea blue
    "rgba(173, 216, 230, 1)", // Light aqua / sky blue
  ];

  return (
    <div className="border-0 border-yellow-500 w-full p-0 mt-12">
      <h2 className="text-2xl font-bold">
        <LandoNorrisText hoverColor="firebrick">
          5. Wavy Background Container
        </LandoNorrisText>
      </h2>
      <div className="flex flex-row my-2 gap-4 w-full">
        <div
          className="flex-[2] min-w-0 border-0 border-red-500 p-4 gap-4
        flex flex-col"
        >
          <p className="text-lg font-light">WavyBackground.tsx</p>
          <p
            className="font-light  text-sm opacity-70
            text-light-foreground dark:text-dark-foreground"
          >
            Note: WavyBackgroundContainer renders the SVG animation within the
            parent element&apos;s restricted area. You need to set
            overflow-hidden in the parent element to prevent the SVG animation
            from overflowing the parent element&apos;s area.
          </p>
          <pre>
            Usage:
            <code className="block overflow-x-auto">
              {`
<div className="relative flex-[2] min-w-0 overflow-hidden
h-[640px] sm:h-[640px] lg:h-[480px] ">
  <WavyBackgroundContainer
    animationDuration={20}>
    <div className="wavy-background-container-inner-wrapper relative h-full
    flex gap-4 flex-col items-center justify-center">
      <h3>Wavy Background</h3>
      <p>lorem ipsum dolor sit amet</p>
    </div>
  </WavyBackgroundContainer>
</div>
              `}
            </code>
          </pre>
        </div>
        <div
          className="tech-stacks-container flex-[3] min-w-0 flex flex-row gap-2
        max-lg:flex-col
        h-[640px] sm:h-[640px] lg:h-[480px]
        border-0 border-blue-500 overflow-hidden"
        >
          <div
            className="wavy-background-container-outer-wrapper relative
          border-0 rounded-md border-green-500 flex-1 min-w-0 h-full overflow-hidden"
          >
            <WavyBackgroundContainer
              fillColors={WAVY_BACKGROUND_FILL_COLORS1}
              animationDuration={20}
            >
              <div
                className="wavy-background-container-inner-wrapper relative h-full
              flex gap-4 flex-col items-center justify-center"
              >
                <div className="relative items-center justify-center ">
                  <h3>Wavy Background</h3>
                </div>
                <div className="relative">
                  <p>lorem ipsum dolor sit amet</p>
                  <p>lorem ipsum dolor sit amet</p>
                </div>
              </div>
            </WavyBackgroundContainer>
          </div>

          <div className="relative border-0 rounded-md border-green-500 flex-1 min-w-0 h-full overflow-hidden">
            <WavyBackgroundContainer
              fillColors={WAVY_BACKGROUND_FILL_COLORS2}
              animationDuration={6}
            >
              <div
                className="wavy-background-container-inner-wrapper relative h-full
              flex gap-4 flex-col items-center justify-center"
              >
                <div className="relative">
                  <h3>Wavy Background</h3>
                </div>
                <div className="relative">
                  <p>lorem ipsum dolor sit amet</p>
                </div>
                <div className="relative">
                  <p>lorem ipsum dolor sit amet</p>
                </div>
              </div>
            </WavyBackgroundContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WavyBackground;

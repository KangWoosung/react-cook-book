/*
2026-01-25 02:02:55


*/
'use client'
import React from "react";
import LandoNorrisText from "../components/landoNorrisText/LandoNorrisText";
import FrostedSnowGlassContainer from "../components/frostedGlass/FrostedSnowGlassContainer";
import FrostedGlassContainer from "../components/frostedGlass/FrostedGlassContainer";
import SnowFlakeContainer from "../components/frostedGlass/SnowFlakeContainer";
import { Button } from "@/components/ui/button";
import { useFrostedGlassEffectStore } from "@/zustand/useFrostedGlassEffectStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FrostedGlassEffect = () => {

  const { maxCount, setMaxCount, mouseInteraction, setMouseInteraction } = useFrostedGlassEffectStore();


  return (
    <div className="border-0 border-yellow-500 w-full p-0 mt-12">
      <h2 className="text-2xl font-bold">
        <LandoNorrisText hoverColor="firebrick">
          7. Frosted Glass Effect Containers
        </LandoNorrisText>
      </h2>
      <div className="flex flex-row my-2 gap-4 w-full">
        <div className="frosted-glass-index-container flex-[2] min-w-0 
        border-2 border-red-500 p-4 gap-4 flex flex-col gap-8 relative">
          <p className="text-lg font-light">WavyBackground.tsx</p>
          <p
            className="font-light  text-sm opacity-70
            text-light-foreground dark:text-dark-foreground"
          >
            This Component is inspired by Nils Binder&apos;s original work on
            Codepen.io: <br />
          </p>
          <div className="flex flex-col gap-4">
            <Label className="text-sm font-light">Max Count</Label>
            <Input
              type="number"
              value={maxCount.toString()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setMaxCount(Number(e.target.value));
              }}
            />
          </div>
          <div className="flex flex-row gap-4">
            <Button
              onClick={() => {
                setMouseInteraction(!mouseInteraction);
              }}
            >
              Mouse Interaction: {mouseInteraction ? "On" : "Off"}
            </Button>
          </div>
        </div>

        <div
          className="frosted-glass-container-outer-wrapper relative
          border-0 rounded-md border-blue-500
          flex-[3] grid grid-cols-2 gap-4 min-w-0
          min-h-[600px] content-start overflow-visible"
        >
          <div className="w-full h-full flex-[2] min-w-0 min-h-[600px]
          border-2 border-yellow-500 rounded-md   overflow-hidden">
            <FrostedGlassContainer>
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
                <h3 className="text-4xl font-bold">Frosted Glass Container</h3>
              </div>
            </FrostedGlassContainer>
          </div>
          <div className="w-full h-full flex-[2] min-w-0 min-h-[600px]
          border-2 border-green-500 rounded-md overflow-hidden">
            <FrostedSnowGlassContainer>
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
                <h3 className="text-4xl font-bold">Frosted Snow Glass Container</h3>
              </div>
            </FrostedSnowGlassContainer>
          </div>

          <div className="w-full h-full flex-[2] min-w-0 min-h-[600px]
          border-2 border-green-500 rounded-md overflow-hidden">
            <SnowFlakeContainer>
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
                <h3 className="text-4xl font-bold">Snow Flake Container</h3>
              </div>
            </SnowFlakeContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrostedGlassEffect;

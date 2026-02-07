/*
2026-01-25 02:02:55


*/
'use client'
import React, { useState } from "react";
import LandoNorrisText from "../components/landoNorrisText/LandoNorrisText";
import FrostedSnowGlassContainer from "../components/frostedGlass/FrostedSnowGlassContainer";
import FrostedGlassContainer from "../components/frostedGlass/FrostedGlassContainer";
import SnowFlakeContainer from "../components/frostedGlass/SnowFlakeContainer";
import { Button } from "@/components/ui/button";
import { useFrostedGlassEffectStore } from "@/zustand/useFrostedGlassEffectStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MedivalFantasyBookModel from "../models/MedivalFantasyBookModel";
import MedivalFantasyBook from "../components/medivalFantasyBook/MedivalFantasyBook";

const FrostedGlassEffect = () => {
  const [snowEffectWindowOn, setSnowEffectWindowOn] = useState(false);
  const [frostedWindowEffectWindowOn, setFrostedWindowEffectWindowOn] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('/assets/img/logo.jpg');
  const [cinematicRigInSnowCityOn, setCinematicRigInSnowCityOn] = useState(false);
  const [sunShiningCityOn, setSunShiningCityOn] = useState(false);
  const [moonLightingCityOn, setMoonLightingCityOn] = useState(false);

  const { maxCount, setMaxCount,
    mouseInteraction, setMouseInteraction,
    background, setBackground,
    hueVariation, setHueVariation,
    letItSnow, setLetItSnow,
    cameraMoveAround, setCameraMoveAround } =
    useFrostedGlassEffectStore();

  return (
    <div className="border-0 border-yellow-500 w-full p-0 mt-12">
      <h2 className="text-2xl font-bold">
        <LandoNorrisText hoverColor="firebrick">
          7. WebGL FX Containers
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
            This Component uses R3F WebGL. <br />
          </p>
          <div className="flex flex-row gap-4">
            <Button
              onClick={() => { setSnowEffectWindowOn(!snowEffectWindowOn); }}
            >
              SnowFlakes: {snowEffectWindowOn ? "On" : "Off"}
            </Button>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${snowEffectWindowOn
              ? "max-h-[500px] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4"
              }`}
          >
            <div className="flex flex-col gap-4 pt-1">
              <div className="flex flex-row gap-4">
                <Button
                  onClick={() => { setLetItSnow(!letItSnow); }}
                >
                  Let it snow: {letItSnow ? "On" : "Off"}
                </Button>
              </div>
              {/* <div className="flex flex-row gap-4">
                <Button
                  onClick={() => { setCameraMoveAround(!cameraMoveAround); }}
                >
                  Camera move around: {cameraMoveAround ? "On" : "Off"}
                </Button>
              </div> */}
              <div className="flex flex-row gap-4">
                <Button
                  onClick={() => { setMouseInteraction(!mouseInteraction); }}
                >
                  Mouse Interaction: {mouseInteraction ? "On" : "Off"}
                </Button>
              </div>
              <div className="flex flex-row gap-4">
                <Button
                  onClick={() => { setHueVariation(!hueVariation); }}
                >
                  Hue Variation: {hueVariation ? "On" : "Off"}
                </Button>
              </div>
              <div className="flex flex-col gap-4">
                <Label className="text-sm font-light">Max Snowflakes Count</Label>
                <Input
                  type="number"
                  value={maxCount.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setMaxCount(Number(e.target.value));
                  }}
                />
              </div>
              {/* <div className="flex flex-col gap-4">
                <Label className="text-sm font-light">
                  Snow 배경 (색상 hex/rgb 또는 이미지 URL, 라이트 모드 시 밝은 색 권장)
                </Label>
                <Input
                  type="text"
                  placeholder="#f8fafc 또는 /path/to/image.png"
                  value={background}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setBackground(e.target.value);
                  }}
                />
              </div> */}
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <Button
              onClick={() => { setCinematicRigInSnowCityOn(!cinematicRigInSnowCityOn); }}
            >
              Cinematic Rig in Snow: {cinematicRigInSnowCityOn ? "On" : "Off"}
            </Button>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${frostedWindowEffectWindowOn
              ? "max-h-[500px] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4"
              }`}
          >
            <div className="flex flex-col gap-4 pt-1">
              <div className="flex flex-row gap-4">
                <Button
                  onClick={() => { setMouseInteraction(!mouseInteraction); }}
                >
                  Mouse Interaction: {mouseInteraction ? "On" : "Off"}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <Button
              onClick={() => { setSunShiningCityOn(!sunShiningCityOn); }}
            >
              Sun Shining City: {frostedWindowEffectWindowOn ? "On" : "Off"}
            </Button>
          </div>
          <div className="flex flex-row gap-4">
            <Button
              onClick={() => { setMoonLightingCityOn(!moonLightingCityOn); }}
            >
              Moon Lighting City: {frostedWindowEffectWindowOn ? "On" : "Off"}
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
          border-2 border-green-500 rounded-md overflow-hidden">
            {snowEffectWindowOn ? (
              <SnowFlakeContainer background={backgroundImage}>
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
                  <h3 className="text-4xl font-bold">
                    <span className="text-shadow-xl shadow-black">
                      Snowflakes in City Container
                    </span>
                  </h3>
                  <p className="text-l warning-text bg-red-400 p-2 rounded-md">
                    This component can be conditionally rendered and remounted. <br />
                  </p>
                </div>
              </SnowFlakeContainer>
            ) : <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
              <h3 className="text-2xl font-bold">
                <span className="text-shadow-xl shadow-black">
                  Snowflakes in City
                </span>
              </h3>
            </div>}
          </div>

          <div className="w-full h-full flex-[2] min-w-0 min-h-[600px]
          border-2 border-yellow-500 rounded-md   overflow-hidden">
            {cinematicRigInSnowCityOn ? (
              <MedivalFantasyBook>
                {/* <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
                  <h3 className="text-4xl font-bold">Cinematic Rig in Snow City Container</h3>
                </div> */}
              </MedivalFantasyBook>
            ) :
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
                <h3 className="text-2xl font-bold">
                  <span className="text-shadow-xl shadow-black">
                    Cinematic Rig in Snow
                  </span>
                </h3>
              </div>}
          </div>

          <div className="w-full h-full flex-[2] min-w-0 min-h-[600px]
          border-2 border-green-500 rounded-md overflow-hidden">
            {sunShiningCityOn ? (
              <FrostedSnowGlassContainer>
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
                  <h3 className="text-2xl font-bold">Sun shining city w. butterflies</h3>
                </div>
              </FrostedSnowGlassContainer>
            ) :
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
                <h3 className="text-2xl font-bold">
                  <span className="text-shadow-xl shadow-black">
                    Sun shining city w. butterflies
                  </span>
                </h3>
              </div>}
          </div>

          <div className="w-full h-full flex-[2] min-w-0 min-h-[600px]
          border-2 border-yellow-500 rounded-md   overflow-hidden">
            {moonLightingCityOn ? (
              <FrostedGlassContainer>
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
                  <h3 className="text-2xl font-bold">Moon lighting city w. fireflies</h3>
                </div>
              </FrostedGlassContainer>
            ) :
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
                <h3 className="text-2xl font-bold">
                  <span className="text-shadow-xl shadow-black">
                    Moon lighting city w. fireflies
                  </span>
                </h3>
              </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrostedGlassEffect;

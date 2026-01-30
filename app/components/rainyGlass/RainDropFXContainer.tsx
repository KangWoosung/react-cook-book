/*
2026-01-28 04:30:13
Usage:
<RainDropFXContainer
  backgroundImage="url(/assets/img/logo.jpg)"
  options={{
    defaultSpawnInterval: [100, 200],
    defaultSpawnSize: [50, 100],
    defaultSpawnLimit: 100,
    defaultSlipRate: 0.5,
    defaultMotionInterval: [100, 200],
    defaultXShifting: [0.1, 0.2],
  }}>
  {children}
</RainDropFXContainer>

Official Options:
https://github.com/SardineFish/raindrop-fx
interface SimulationOptions
{
    spawnInterval: [number, number],
    /**
     * Random size range when spawn a new raindrop
     *
    spawnSize: [number, number],
    /**
     * Maximal amount of spawned raindrops.
     * Recommend less than 2000
     *
    spawnLimit: number,
    /**
     * Recommend in range (0..1), other value should be ok.
     *
    slipRate: number,
    /**
     * Describe how often a raindrop change its motion state
     *
    motionInterval: [number, number],
    /**
     * Random velocity x relative to velocity y.
     * Recommend in range (0..0.1)
     *
    xShifting: [number, number],
    /**
     * Relative size for collision check.
     * Recommend in range (0.6..1.2)
     *
    colliderSize: number,
    /**
     * Mass density of the slipping trail raindrop.
     * Recommend in range (0.1..0.3)
     *
     * A large value cause a raindrop quickly lose its size during slipping.
     *
    trailDropDensity: number,
    /**
     * Random size range of slipping trail drop.
     * Recommend in range (0.3..0.5)
     *
    trailDropSize: [number, number],
    /**
     * Random distance range between two slipping trail drop.
     * Recommend in range (20..40)
     *
    trailDistance: [number, number],
    /**
     * Vertical spread of a new spawned slipping trail drop.
     * Recommend in range (0.4..0.6)
     *
    trailSpread: number,
    /**
     * Spread rate when a new spawned raindrop hit the screen.
     * Recommend in range (0.4..0.7)
     *
    initialSpread: number,
    /**
     * Spread shrink rate per seconds.
     * Recommend in range (0.01..0.02)
     *
    shrinkRate: number,
    /**
     * Spread rate by velocity Y.
     * Recommend in range (0.2..0.4)
     *
     * Raindrop with higher fall speed looks more narrow.
     *
    velocitySpread: number,
    /**
     * Mass lose per second.
     * Recommend in range (10..30)
     *
    evaporate: number,
    /**
     * Gravity acceleration in pixels/s.
     * Recommend 2400
     *
    gravity: number,
}


2026-01-27 03:27:30
Ref:
const RaindropFX = require("raindrop-fx");

const canvas = document.querySelector("#canvas");
const rect = canvas.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;

const raindropFx = new RaindropFX({
    canvas: canvas,
    background: "path/to/background/image",
});

window.onresize = () =>
{
    const rect = canvas.getBoundingClientRect();
    raindropFx.resize(rect.width, rect.height);
}

raindropFx.start();

Problems....
WEBGL_lose_context() is like a destroy.
In the same <canvas> DOM node,
getContext("webgl") does not come back to life or comes back but the internal state is broken.
React does not "reuse" the canvas DOM when it is remounted.
That is the problem here.
This Component does not work when remounted.
Do not conditionally render this component and remount it.

*/

"use client";
import { useRainGlassEffectToggleStore } from "@/zustand/useRainGlassEffectToggleStore";
import RaindropFX from "raindrop-fx";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Range2 = [number, number];

const DEFAULT_SPAWN_INTERVAL: Range2 = [100, 200]; // Spawn interval in ms.
const DEFAULT_SPAWN_SIZE: Range2 = [50, 100]; // Spawn size in px.
const DEFAULT_SPAWN_LIMIT = 100; // Spawn limit.
const DEFAULT_SLIP_RATE = 0.5; // Slip rate.
const DEFAULT_MOTION_INTERVAL: Range2 = [100, 200]; // Motion interval in ms.
const DEFAULT_X_SHIFTING: Range2 = [0.1, 0.2]; // X shifting.
const DEFAULT_COLLIDER_SIZE = 0.8; // Collider size.
const DEFAULT_TRAIL_DROP_DENSITY = 0.2; // Trail drop density.
const DEFAULT_TRAIL_DROP_SIZE: Range2 = [0.3, 0.5]; // Trail drop size in px.
const DEFAULT_TRAIL_DISTANCE: Range2 = [20, 40]; // Trail distance in px.
const DEFAULT_TRAIL_SPREAD = 0.5; // Trail spread.
const DEFAULT_INITIAL_SPREAD = 0.5; // Initial spread.
const DEFAULT_SHRINK_RATE = 0.01; // Shrink rate.
const DEFAULT_VELOCITY_SPREAD = 0.3; // Velocity spread.
const DEFAULT_EVAPORATE = 10; // Evaporate.
const DEFAULT_GRAVITY = 2400; // Gravity.

type OptionsType = {
  defaultSpawnInterval?: Range2;
  defaultSpawnSize?: Range2;
  defaultSpawnLimit?: number;
  defaultSlipRate?: number;
  defaultMotionInterval?: Range2;
  defaultXShifting?: Range2;
  defaultColliderSize?: number;
  defaultTrailDropDensity?: number;
  defaultTrailDropSize?: Range2;
  defaultTrailDistance?: Range2;
  defaultTrailSpread?: number;
  defaultInitialSpread?: number;
  defaultShrinkRate?: number;
  defaultVelocitySpread?: number;
  defaultEvaporate?: number;
  defaultGravity?: number;
};
const DEFAULT_OPTIONS: OptionsType = {
  defaultSpawnInterval: DEFAULT_SPAWN_INTERVAL,
  defaultSpawnSize: DEFAULT_SPAWN_SIZE,
  defaultSpawnLimit: DEFAULT_SPAWN_LIMIT,
  defaultSlipRate: DEFAULT_SLIP_RATE,
  defaultMotionInterval: DEFAULT_MOTION_INTERVAL,
  defaultXShifting: DEFAULT_X_SHIFTING,
  defaultColliderSize: DEFAULT_COLLIDER_SIZE,
  defaultTrailDropDensity: DEFAULT_TRAIL_DROP_DENSITY,
  defaultTrailDropSize: DEFAULT_TRAIL_DROP_SIZE,
  defaultTrailDistance: DEFAULT_TRAIL_DISTANCE,
  defaultTrailSpread: DEFAULT_TRAIL_SPREAD,
  defaultInitialSpread: DEFAULT_INITIAL_SPREAD,
  defaultShrinkRate: DEFAULT_SHRINK_RATE,
  defaultVelocitySpread: DEFAULT_VELOCITY_SPREAD,
  defaultEvaporate: DEFAULT_EVAPORATE,
  defaultGravity: DEFAULT_GRAVITY,
};

type RainDropFXContainerProps = {
  backgroundImage: string;
  children: React.ReactNode;
  options?: OptionsType;
};

function RainDropFXContainer({ backgroundImage, children, options = DEFAULT_OPTIONS }: RainDropFXContainerProps) {
  const raindropfxOptions = useMemo(
    () => ({
      ...DEFAULT_OPTIONS,
      ...options,
    }),
    [options]
  );

  const rainDropFXRef = useRef<HTMLCanvasElement | null>(null);
  const raindropFxInstanceRef = useRef<RaindropFX | null>(null);
  const resizeHandlerRef = useRef<(() => void) | null>(null);
  const canvasKeyRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);
  const rainDropFXOn = useRainGlassEffectToggleStore((state) => state.rainDropFXOn);


  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    console.log("[RainDropFX] Mounted, initializing");

    const canvas = rainDropFXRef.current;
    if (!canvas) return;
    if (raindropFxInstanceRef.current) return;
    console.log("[RainDropFX] Canvas found, initializing");

    const initRaindropFX = async () => {
      try {
        // Canvas 크기 설정
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          console.warn("[RainDropFX] Canvas has zero size");
          return;
        }

        canvas.width = rect.width;
        canvas.height = rect.height;

        // 동적 import
        const RaindropFXModule = await import("raindrop-fx");
        const RaindropFX = RaindropFXModule.default;

        // 인스턴스 생성
        raindropFxInstanceRef.current = new RaindropFX({
          canvas: canvas,
          background: backgroundImage,
          ...raindropfxOptions,
        });

        // Resize 핸들러
        resizeHandlerRef.current = () => {
          if (raindropFxInstanceRef.current && canvas) {
            const newRect = canvas.getBoundingClientRect();
            canvas.width = newRect.width;
            canvas.height = newRect.height;
            raindropFxInstanceRef.current.resize(
              newRect.width,
              newRect.height
            );
          }
        };

        window.addEventListener("resize", resizeHandlerRef.current);
      } catch (error) {
        console.error("[RainDropFX] Initialization error:", error);
        raindropFxInstanceRef.current = null;
      }
    };

    initRaindropFX();

    // Cleanup
    return () => {
      // Resize 이벤트 제거
      if (resizeHandlerRef.current) {
        window.removeEventListener("resize", resizeHandlerRef.current);
        resizeHandlerRef.current = null;
      }

      // 인스턴스 정리
      if (raindropFxInstanceRef.current) {
        try {
          raindropFxInstanceRef.current.stop();
        } catch (error) {
          console.error("[RainDropFX] Cleanup error:", error);
        }
        raindropFxInstanceRef.current = null;
      }

      // Canvas key 증가 (리마운트 시 완전히 새로운 canvas DOM 생성)
      canvasKeyRef.current += 1;
    };
  }, [mounted, backgroundImage, raindropfxOptions]);

  useEffect(() => {
    if (!mounted) return;
    if (rainDropFXOn) {
      if (raindropFxInstanceRef.current) {
        raindropFxInstanceRef.current.start();
      }
    } else {
      if (raindropFxInstanceRef.current) {
        raindropFxInstanceRef.current.stop();
      }
    }
  }, [rainDropFXOn, mounted]);

  if (!mounted) return null;

  return (
    <div
      id="rainy-drop-fx-container"
      className="relative w-full h-full flex items-center justify-center"
    >
      <canvas
        key={`raindrop-canvas-${backgroundImage}-${canvasKeyRef.current}`}
        ref={rainDropFXRef}
        className="w-full h-full absolute inset-0"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export default RainDropFXContainer;


/*
2026-01-28 04:27:53
Usage:
<RainyDayJSContainer
  backgroundImage="url(/assets/img/logo.jpg)"
  options={{
    defaultRainDropSize: 3,
    defaultRainDropIntensity: 100,
    defaultFPS: 24,
    defaultRainDropVariance: 4,
    defaultRainDropVarianceRate: 1,
    defaultGravityAngle: Math.PI / 2,
    defaultGravityThreshold: 1,
    defaultGravityAngleVariance: 0,
    defaultBackgroundBlur: 10,
  }} >
  {children}
</RainyDayJSContainer>


2026-01-27 02:52:42
This component uses the classic rainyday.js library to simulate realistic rain drops
on glass.
The effect creates water droplets that fall, merge, and create beautiful refraction
patterns.

🔑 CPU Optimization Key Points:
Intersection Observer: Animation pauses when out of view.
Collision calculation, FPS, blur, etc. can be adjusted with constants.

Memory/CPU:
Memory: Maintains 100~200MB (normal)
CPU: Proportional to the number of drops
Out of view: CPU 0% (Intersection Observer)
*/

"use client";
import { useRainGlassEffectToggleStore } from "@/zustand/useRainGlassEffectToggleStore";
import React, { useEffect, useState, useRef } from "react";

const DEFAULT_RAIN_DROP_SIZE = 3; // Rain drop radius in px.
const DEFAULT_RAIN_DROP_VARIANCE = 4; // Rain drop radius variance in px: (min, max)
const DEFAULT_RAIN_DROP_VARIANCE_RATE = 1; // Variance rate
const DEFAULT_RAIN_DROP_INTENSITY = 100; // New drop in ms.
const DEFAULT_GRAVITY_ANGLE = Math.PI / 2; // Gravity angle in radians.
const DEFAULT_GRAVITY_THRESHOLD = 1; // Gravity threshold in px.
const DEFAULT_GRAVITY_ANGLE_VARIANCE = 0; // Gravity angle variance in radians.
const DEFAULT_FPS = 24; // Frames per second.
const BACKGROUND_BLUR = 10; // Background blur in px.

type OptionsType = {
  defaultRainDropSize?: number;
  defaultRainDropVariance?: number;
  defaultRainDropVarianceRate?: number;
  defaultRainDropIntensity?: number;
  defaultGravityAngle?: number;
  defaultGravityThreshold? : number;
  defaultGravityAngleVariance?: number;
  defaultFPS?: number;
  defaultBackgroundBlur?: number;
};

const DEFAULT_OPTIONS = {
  defaultRainDropSize: DEFAULT_RAIN_DROP_SIZE,
  defaultRainDropVariance: DEFAULT_RAIN_DROP_VARIANCE,
  defaultRainDropVarianceRate: DEFAULT_RAIN_DROP_VARIANCE_RATE,
  defaultRainDropIntensity: DEFAULT_RAIN_DROP_INTENSITY,
  defaultGravityAngle: DEFAULT_GRAVITY_ANGLE,
  defaultGravityThreshold: DEFAULT_GRAVITY_THRESHOLD,
  defaultGravityAngleVariance: DEFAULT_GRAVITY_ANGLE_VARIANCE,
  defaultFPS: DEFAULT_FPS,
  defaultBackgroundBlur: BACKGROUND_BLUR,
};

type RainyDayJSContainerProps = {
  backgroundImage: string;
  children: React.ReactNode;
  options?: OptionsType;
};

const RainyDayJSContainer = ({
  backgroundImage,
  children,
  options = DEFAULT_OPTIONS,
}: RainyDayJSContainerProps) => {
  const [mounted, setMounted] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const rainyDayOn = useRainGlassEffectToggleStore((state) => state.rainyDayOn);
  const rainyDayOnRef = useRef(rainyDayOn);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rainyDayRef = useRef<any>(null);
  const timeoutIdsRef = useRef<number[]>([]);
  const rainydayOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    rainyDayOnRef.current = rainyDayOn;
  }, [rainyDayOn]);

  const applyCoverCropToBackground = () => {
    const engine = rainyDayRef.current;
    if (!engine?.canvas || !engine?.img || !engine?.options) return;

    const imgW = engine.img.naturalWidth ?? engine.img.width;
    const imgH = engine.img.naturalHeight ?? engine.img.height;
    const canvasW = engine.canvas.width;
    const canvasH = engine.canvas.height;

    if (!imgW || !imgH || !canvasW || !canvasH) return;

    const imgAR = imgW / imgH;
    const canvasAR = canvasW / canvasH;

    // Center-crop to match canvas aspect ratio (CSS background-size: cover behavior)
    let sx = 0;
    let sy = 0;
    let sw = imgW;
    let sh = imgH;

    if (imgAR > canvasAR) {
      // Image is wider: crop left/right
      sh = imgH;
      sw = Math.round(imgH * canvasAR);
      sx = Math.round((imgW - sw) / 2);
      sy = 0;
    } else if (imgAR < canvasAR) {
      // Image is taller: crop top/bottom
      sw = imgW;
      sh = Math.round(imgW / canvasAR);
      sx = 0;
      sy = Math.round((imgH - sh) / 2);
    }

    engine.options.crop = [sx, sy, sw, sh];
    if (typeof engine.prepareBackground === "function") {
      engine.prepareBackground();
    }
  };

  // 🔥 Intersection Observer - 화면에 보일 때만 애니메이션
  useEffect(() => {
    if (!mounted || !initialized || !rainyDayRef.current) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (rainyDayRef.current) {
            if (entry.isIntersecting) {
              console.log("[RainyDay] Visible - resuming animation");
              if (rainyDayOnRef.current) {
                rainyDayRef.current.resume();
              }
            } else {
              console.log("[RainyDay] Hidden - pausing animation");
              rainyDayRef.current.pause(); // 일시정지
            }
          }
        });
      },
      { threshold: 0.1 } // 10% 보이면 활성화
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      console.log("[RainyDay] Observer disconnected");
    };
  }, [mounted, initialized]);

  // 🔥 RainyDay 인스턴스 초기화
  useEffect(() => {
    if (!mounted) return;

    // 🔥 이미 인스턴스가 있으면 초기화 스킵
    if (rainyDayRef.current) {
      console.log("RainyDay instance already exists, skipping initialization");
      return;
    }

    const surfaceEl = surfaceRef.current;
    if (!surfaceEl) return;

    console.log("[RainyDay] Starting initialization...");

    // 🔥 동적 import를 한 번만 실행
    let isCleanedUp = false;

    import("@/utils/rainyday")
      .then((RainyDayModule) => {
        if (isCleanedUp) {
          console.log(
            "[RainyDay] Cleanup called before initialization, aborting"
          );
          return;
        }

        const RainyDay = RainyDayModule.default;

        const rainyGlassContainer = surfaceEl;

        try {
          // ✅ div를 넘김 - rainyday.js가 background-image를 자동으로 로드
          rainyDayRef.current = new RainyDay({
            image: rainyGlassContainer,
            parentElement: rainyGlassContainer,
            opacity: 1,
            blur: rainydayOptions.defaultBackgroundBlur,
            enableCollisions: true,
            gravityAngle: rainydayOptions.defaultGravityAngle,
            gravityThreshold: rainydayOptions.defaultGravityThreshold,
            gravityAngleVariance: rainydayOptions.defaultGravityAngleVariance,
            fps: rainydayOptions.defaultFPS,
            position: "absolute",
            top: 0,
            left: 0,
            // sound: '/assets/sounds/rain.mp3'
          });
          rainyDayRef.current.pause();

          setInitialized(true);
          console.log("[RainyDay] Instance created:", rainyDayRef.current);

          // ⏳ rainyday.js의 내부 초기화 완료를 기다림 (비동기)
          const checkInitialized = () => {
            if (isCleanedUp) {
              console.log(
                "[RainyDay] Cleanup called during initialization check"
              );
              return;
            }

            if (rainyDayRef.current && rainyDayRef.current.canvas) {
              // ✅ 초기화 완료!
              console.log("[RainyDay] Canvas ready, starting rain animation");

              // 🔥 rainyday.js가 계산한 좌표를 강제로 재할당
              rainyDayRef.current.canvas.style.position = "absolute";
              rainyDayRef.current.canvas.style.top = "0";
              rainyDayRef.current.canvas.style.left = "0";
              // ✅ Keep canvas behind React children (rainyday.js sets z-index=99/100 by default)
              rainyDayRef.current.canvas.style.zIndex = "0";
              rainyDayRef.current.canvas.style.pointerEvents = "none";
              // rainyDayRef.current.canvas.style.width = "100%";
              // rainyDayRef.current.canvas.style.height = "100%";

              // imgSource가 있으면 (div를 넘긴 경우) 타겟 요소도 수정
              if (rainyDayRef.current.imgSource) {
                rainyDayRef.current.imgSource.style.position = "relative";
                rainyDayRef.current.imgSource.style.top = "0";
                rainyDayRef.current.imgSource.style.left = "0";
                rainyDayRef.current.imgSource.style.zIndex = "0";
              }

              // ✅ Prevent background stretching by applying a cover-style crop.
              // rainyday.js draws `img` into `canvas.width x canvas.height` using drawImage(),
              // so we must ensure options.crop matches the canvas aspect ratio.
              applyCoverCropToBackground();

              rainyDayRef.current.trail = rainyDayRef.current.TRAIL_DROPS;
              rainyDayRef.current.rain(
                [
                  [
                    rainydayOptions.defaultRainDropSize,
                    rainydayOptions.defaultRainDropVariance,
                    rainydayOptions.defaultRainDropVarianceRate,
                  ],
                ],
                rainydayOptions.defaultRainDropIntensity
              );

              // ✅ Store 상태에 맞춰 시작/일시정지 동기화
              if (!rainyDayOnRef.current) {
                rainyDayRef.current.pause();
              }

              console.log("[RainyDay] Rain animation started");
            } else {
              // ⏳ 아직 초기화 중 - 100ms 후 재시도
              const timeoutId = window.setTimeout(checkInitialized, 100);
              timeoutIdsRef.current.push(timeoutId);
            }
          };

          const initialTimeoutId = window.setTimeout(checkInitialized, 500);
          timeoutIdsRef.current.push(initialTimeoutId);
        } catch (error) {
          console.error("[RainyDay] Initialization error:", error);
        }
      })
      .catch((error) => {
        console.error("[RainyDay] Failed to load module:", error);
      });

    // 🔥 Cleanup 함수 - 확실한 정리
    return () => {
      console.log("[RainyDay] Cleanup started");
      isCleanedUp = true;

      // 모든 setTimeout 정리
      timeoutIdsRef.current.forEach((id) => {
        window.clearTimeout(id);
      });
      timeoutIdsRef.current = [];
      console.log("[RainyDay] All timeouts cleared");

      // RainyDay 인스턴스 정리
      if (rainyDayRef.current) {
        try {
          // 🔥 애니메이션 먼저 멈춤
          if (rainyDayRef.current.pause) {
            rainyDayRef.current.pause();
            console.log("[RainyDay] Animation paused");
          }

          // 🔥 인스턴스 파괴
          if (rainyDayRef.current.destroy) {
            rainyDayRef.current.destroy();
            console.log("[RainyDay] Instance destroyed");
          }
        } catch (error) {
          console.error("[RainyDay] Cleanup error:", error);
        }

        rainyDayRef.current = null;
        console.log("[RainyDay] Reference cleared");
      }

      setInitialized(false);
    };
  }, [mounted]);

  // 🔥 Memory usage monitoring (optional)
  useEffect(() => {
    if (!mounted) return;

    const checkMemory = () => {
      const canvases = document.querySelectorAll("canvas");
      // @ts-expect-error performance.memory is only available in Chrome
      if (performance.memory) {
        // @ts-expect-error Chrome only
        const usedMB = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
        // @ts-expect-error Chrome only
        const totalMB = (performance.memory.totalJSHeapSize / 1048576).toFixed(
          2
        );
        console.log(
          `[Memory] Canvas: ${canvases.length} | Used: ${usedMB}MB / ${totalMB}MB | RainyDay: ${rainyDayRef.current ? "alive" : "null"}`
        );
      } else {
        console.log(
          `[Memory] Canvas: ${canvases.length} | RainyDay: ${rainyDayRef.current ? "alive" : "null"}`
        );
      }
    };

    const interval = setInterval(checkMemory, 3000); // Check every 3 seconds

    return () => {
      clearInterval(interval);
      console.log("[Memory] Monitoring stopped");
    };
  }, [mounted]);

  // 🔥 RainyDay 애니메이션 제어
  useEffect(() => {
    if (!mounted || !initialized || !rainyDayRef.current) return;
    if (rainyDayOn) {
      rainyDayRef.current.resume();
    } else {
      rainyDayRef.current.pause();
    }
  }, [rainyDayOn, mounted, initialized]);

  if (!mounted) return null;

  return (
    <div
      id="rainydayjs-container"
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
    >
      {/* RainyDay surface (no border). Keep border on an outer wrapper if needed. */}
      <div
        ref={surfaceRef}
        className="absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default RainyDayJSContainer;

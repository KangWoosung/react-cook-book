/*
2026-01-28 07:12:07

Frosted Glass Container
*/

"use client";
import React, { useRef } from "react";
import { Canvas } from '@react-three/fiber'
import Particles from "./Particle";

type FrostedGlassContainerProps = {
  children: React.ReactNode;
};

const FrostedGlassContainer = ({ children }: FrostedGlassContainerProps) => {
  const mouse = useRef<[number, number]>([0, 0])
  const containerRef = useRef<HTMLDivElement | null>(null)
  return (
    <div className="w-full h-full flex-[2] min-w-0
    border-2 border-yellow-500 rounded-md relative overflow-hidden"
      ref={containerRef}
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) return
        mouse.current = [e.clientX - rect.left - rect.width / 2, e.clientY - rect.top - rect.height / 2]
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 120], fov: 65, near: 0.1, far: 5000 }}
        >
          {/* Make sure something is visible and lit */}
          <color attach="background" args={["#020617"]} />
          <ambientLight intensity={0.6} />
          <directionalLight color="white" position={[5, 5, 10]} intensity={1.2} />

          <Particles count={20} mouse={mouse} />
        </Canvas>
      </div>

      <div className="relative inset-0 w-full h-full z-10 border-0 border-blue-500">
        {children}
      </div>
    </div>
  );
};

export default FrostedGlassContainer;

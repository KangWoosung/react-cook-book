'use client'
import { Canvas } from '@react-three/fiber'
import React, { useState } from 'react'
import { SnowParticles } from './SnowParticles'
import { useFrostedGlassEffectStore } from '@/zustand/useFrostedGlassEffectStore';

type SnowFlakeContainerProps = {
  children: React.ReactNode;
  /** 눈발(파티클) 최대 개수 (기본 10000) */
  maxCount?: number;
};

const SnowFlakeContainer = ({ children }: SnowFlakeContainerProps) => {
  // const [maxCountState, setMaxCountState] = useState(10000);
  const maxCountState = useFrostedGlassEffectStore(state => state.maxCount);
  const mouseInteractionState = useFrostedGlassEffectStore(state => state.mouseInteraction);

  return (
    <div className="w-full h-full flex-[2] min-w-0
    border-2 border-yellow-500 rounded-md relative overflow-hidden">

      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <SnowParticles mouseInteraction={mouseInteractionState} maxCount={maxCountState} />
        </Canvas>
      </div>

      <div className="relative inset-0 w-full h-full z-10 border-0 border-blue-500">
        {children}
      </div>
    </div>
  )
}

export default SnowFlakeContainer

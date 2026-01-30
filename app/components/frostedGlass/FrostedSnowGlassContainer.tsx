/*
2026-01-28 07:14:40

Frosted Snow Glass Container

*/
// /components/frostedGlass/FrostedSnowGlassContainer.tsx
'use client';
import { SnowVikingMaterial } from '@/app/materials/SnowVikingMaterial';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react'

type FrostedSnowGlassContainerProps = {
  children: React.ReactNode;
};

const FrostedSnowGlassContainer = ({ children }: FrostedSnowGlassContainerProps) => {
  return (
    <div className="w-full h-full flex-[2] min-w-0
    border-2 border-yellow-500 rounded-md relative overflow-hidden">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{position: [0,0,5] }}>
          <ShaderPlane />
        </Canvas>
      </div>

      <div className="relative inset-0 w-full h-full z-10 border-0 border-blue-500">
        {children}
      </div>
    </div>
  )
}

export default FrostedSnowGlassContainer



function ShaderPlane() {
	const materialRef = useRef<InstanceType<typeof SnowVikingMaterial>>(null)
	const { size } =useThree()
	
	useFrame((state) => {
		if (!materialRef.current) return
		materialRef.current.iTime = state.clock.elapsedTime
		materialRef.current.iResolution.set(size.width, size.height, 1)
	})
	
	return (
		<mesh>
			<planeGeometry args={[5,5]} />
			<snowVikingMaterial ref={materialRef} />
		</mesh>
  )
}
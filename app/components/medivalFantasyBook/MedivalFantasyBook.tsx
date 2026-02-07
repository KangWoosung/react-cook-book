/*
2026-02-06 15:05:58


*/

"use client";
import { OrbitControls } from "@react-three/drei";
import MedivalFantasyBookModel from "../../models/MedivalFantasyBookModel";
import { Canvas } from '@react-three/fiber'
import React from 'react'

type MedivalFantasyBookProps = {
    children: React.ReactNode;
};

const MedivalFantasyBook = () => {
    return (
        <Canvas camera={{ position: [60, 50, 100] }}>
            <ambientLight intensity={0.5} />
            <directionalLight color="white" position={[1, 1, 1]} intensity={1.5} />
            <MedivalFantasyBookModel />
            <OrbitControls />
        </Canvas>
    )
}

export default MedivalFantasyBook



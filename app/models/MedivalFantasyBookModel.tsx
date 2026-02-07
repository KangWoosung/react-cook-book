/*
2026-02-06 15:09:50


*/

import { useGLTF } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo } from 'react'

/** GLB 내부 커스텀 타입(H3 등)을 R3F catalogue에 등록 */
// function extendUnknownTypes(scene: THREE.Object3D) {
//   const extended = new Set<string>()
//   scene.traverse((child) => {
//     const name = child.constructor.name
//     if (!name || name === 'Object3D') return
//     if (extended.has(name)) return
//     if (name in THREE) return
//     extended.add(name)
//     type Ctor = new (...args: unknown[]) => THREE.Object3D
//     extend({ [name]: child.constructor as Ctor })
//   })
// }

const MedivalFantasyBookModel = () => {
    const { scene } = useGLTF('/glb_models/medieval_fantasy_book.glb')
    //   useMemo(() => extendUnknownTypes(scene), [scene])

    return <primitive object={scene} />
}

export default MedivalFantasyBookModel


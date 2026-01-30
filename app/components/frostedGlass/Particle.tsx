import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
// import './style.css'

type ParticlesProps = {
  count: number
  mouse: React.MutableRefObject<[number, number]>
}

export default function Particles({ count, mouse }: ParticlesProps) {
  // `three` types are not available in this project, so keep refs loosely typed.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mesh = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const light = useRef<any>(null)
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width

  const dummy = useMemo(() => new THREE.Object3D(), [])
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    // Deterministic PRNG (avoids Math.random during render)
    const mulberry32 = (seed: number) => {
      let a = seed | 0
      return () => {
        a = (a + 0x6d2b79f5) | 0
        let t = Math.imul(a ^ (a >>> 15), 1 | a)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
      }
    }

    const temp = []
    for (let i = 0; i < count; i++) {
      const rnd = mulberry32(0xdecafbad ^ (count * 10000 + i))
      const t = rnd() * 100
      const factor = 20 + rnd() * 100
      const speed = 0.01 + rnd() / 200
      const xFactor = -50 + rnd() * 100
      const yFactor = -50 + rnd() * 100
      const zFactor = -50 + rnd() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])
  // The innards of this hook will run every frame
  useFrame(() => {
    if (!mesh.current || !light.current) return
    // Makes the light follow the mouse
    light.current.position.set(mouse.current[0] / aspect, -mouse.current[1] / aspect, 0)
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      const { factor, speed, xFactor, yFactor, zFactor } = particle
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      const t = (particle.t += speed / 2)
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      particle.mx += (mouse.current[0] - particle.mx) * 0.01
      particle.my += (mouse.current[1] * -1 - particle.my) * 0.01
      // Update the dummy object
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })
  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="lightblue" />
      <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
        <dodecahedronGeometry args={[0.35, 0]} />
        <meshPhongMaterial color="#c7d2fe" />
      </instancedMesh>
    </>
  )
}

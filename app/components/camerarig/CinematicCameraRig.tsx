/*
2026-02-05 17:19:25

Cinematic Camera Rig

*/
// /components/camerarig/CinematicCameraRig.tsx

import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"

type CinematicCameraRigProps = {
  targetRef: React.RefObject<THREE.Object3D>
}

export function CinematicCameraRig({ targetRef }: CinematicCameraRigProps) {
  const progress = useRef(0)

  // ===== 설정값 =====
  const orbitDuration = 3
  const travelDuration = 3
  const totalDuration = orbitDuration + travelDuration

  const radius = 5
  const height = 2

  // 목적지
  const destination = useMemo(
    () => new THREE.Vector3(5, 3, 0),
    []
  )

  // ===== spline 경로 =====
  const travelCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2, 5), // orbit 이탈지점 (예시)
      new THREE.Vector3(2, 4, 2), // 중간 포인트
      destination
    ])
  }, [])

  // ===== 임시 벡터 재사용 (성능) =====
  const tmpFocus = useMemo(() => new THREE.Vector3(), [])
  const tmpPos = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    const { camera } = state

    if (!targetRef.current) return

    progress.current += delta
    const tGlobal = progress.current

    const center = targetRef.current.position

    // =====================================
    // PHASE 1 — ORBIT
    // =====================================
    if (tGlobal < orbitDuration) {

      const t = tGlobal / orbitDuration
      const angle = t * Math.PI * 2

      // 원 궤도 운동
      const x = center.x + Math.cos(angle) * radius
      const z = center.z + Math.sin(angle) * radius

      camera.position.set(x, center.y + height, z)

      // 시선 spline 필요 없음
      camera.lookAt(center)

      return
    }

    // =====================================
    // PHASE 2 — SPLINE TRAVEL + 시선 spline
    // =====================================

    if (tGlobal < totalDuration) {

      // 궤도를 벗어난 이후의 운동시간/궤도이후 전체 운동시간
      const t = (tGlobal - orbitDuration) / travelDuration

      // ---------- 위치 spline ----------
      travelCurve.getPoint(t, tmpPos)
      camera.position.copy(tmpPos)

      // ---------- 시선 spline ----------
      // targetRef → destination 로 부드럽게 전환
      tmpFocus.lerpVectors(center, destination, easeInOut(t))
      camera.lookAt(tmpFocus)

      return
    }

    // =====================================
    // PHASE 3 — 목적지 정지 + targetRef 재주시
    // =====================================

    // 위치 고정
    camera.position.copy(destination)

    // destination → targetRef 로 시선 spline
    const tReturn = Math.min((tGlobal - totalDuration) / 2, 1)

    tmpFocus.lerpVectors(destination, center, easeInOut(tReturn))

    camera.lookAt(tmpFocus)
  })
}

// ===== easing 함수 =====
function easeInOut(t: number) {
  return t < 0.5
    ? 2 * t * t
    : 1 - Math.pow(-2 * t + 2, 2) / 2
}




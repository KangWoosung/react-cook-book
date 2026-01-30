import type { SnowVikingMaterial } from '@/app/materials/SnowVikingMaterial'
import type { ThreeElement } from '@react-three/fiber'

declare module '@react-three/fiber' {
  interface ThreeElements {
    snowVikingMaterial: ThreeElement<typeof SnowVikingMaterial>
  }
}

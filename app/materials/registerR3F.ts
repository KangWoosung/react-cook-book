// /materials/registerR3F.ts
/**
 * R3F 커스텀 객체(material 등)를 앱 진입 시점에 등록합니다.
 * Canvas가 마운트되기 전에 실행되어야 하므로 레이아웃에서 이 모듈을 import합니다.
 */
import { extend } from '@react-three/fiber'
import { SnowVikingMaterial } from '@/app/materials/SnowVikingMaterial'

extend({ SnowVikingMaterial })

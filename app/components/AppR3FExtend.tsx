// app/components/AppR3FExtend.tsx
/**
 * 레이아웃에서 사용하는 클라이언트 래퍼.
 * 모듈 로드 시 registerR3F가 실행되어 R3F catalogue에 커스텀 material이 등록됩니다.
 */

'use client'

import '@/app/materials/registerR3F'

export default function AppR3FExtend({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

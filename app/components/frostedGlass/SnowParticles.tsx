/*
2026-01-31 07:32:10

This file is a modified version of the original Three.js code into R3F.

Original Code from:
https://github.com/mrdoob/three.js/blob/master/examples/webgl_points_sprites.html

import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
let camera, scene, renderer, stats, parameters;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
const materials = [];
init();

function init() {
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.z = 1000;
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x000000, 0.0008 );
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const textureLoader = new THREE.TextureLoader();
  const assignSRGB = ( texture ) => {
    texture.colorSpace = THREE.SRGBColorSpace;
  };

  const sprite1 = textureLoader.load( 'textures/sprites/snowflake1.png', assignSRGB );
  const sprite2 = textureLoader.load( 'textures/sprites/snowflake2.png', assignSRGB );
  const sprite3 = textureLoader.load( 'textures/sprites/snowflake3.png', assignSRGB );
  const sprite4 = textureLoader.load( 'textures/sprites/snowflake4.png', assignSRGB );
  const sprite5 = textureLoader.load( 'textures/sprites/snowflake5.png', assignSRGB );

  for ( let i = 0; i < 10000; i ++ ) {
    const x = Math.random() * 2000 - 1000;
    const y = Math.random() * 2000 - 1000;
    const z = Math.random() * 2000 - 1000;
    vertices.push( x, y, z );
  }

  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
  parameters = [
    [[ 1.0, 0.2, 0.5 ], sprite2, 20 ],
    [[ 0.95, 0.1, 0.5 ], sprite3, 15 ],
    [[ 0.90, 0.05, 0.5 ], sprite1, 10 ],
    [[ 0.85, 0, 0.5 ], sprite5, 8 ],
    [[ 0.80, 0, 0.5 ], sprite4, 5 ]
  ];
  for ( let i = 0; i < parameters.length; i ++ ) {
    const color = parameters[ i ][ 0 ];
    const sprite = parameters[ i ][ 1 ];
    const size = parameters[ i ][ 2 ];
    materials[ i ] = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } );
    materials[ i ].color.setHSL( color[ 0 ], color[ 1 ], color[ 2 ], THREE.SRGBColorSpace );
    const particles = new THREE.Points( geometry, materials[ i ] );
    particles.rotation.x = Math.random() * 6;
    particles.rotation.y = Math.random() * 6;
    particles.rotation.z = Math.random() * 6;
    scene.add( particles );
  }

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setAnimationLoop( animate );
  document.body.appendChild( renderer.domElement );
  stats = new Stats();
  document.body.appendChild( stats.dom );
  const gui = new GUI();
  const params = {
    texture: true
  };
  gui.add( params, 'texture' ).onChange( function ( value ) {
    for ( let i = 0; i < materials.length; i ++ ) {
      materials[ i ].map = ( value === true ) ? parameters[ i ][ 1 ] : null;
      materials[ i ].needsUpdate = true;
    }
  } );
  gui.open();
  document.body.style.touchAction = 'none';
  document.body.addEventListener( 'pointermove', onPointerMove );
  window.addEventListener( 'resize', onWindowResize );
}
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
function onPointerMove( event ) {
  if ( event.isPrimary === false ) return;
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}
function animate() {
  render();
  stats.update();
}
function render() {
  const time = Date.now() * 0.00005;
  camera.position.x += ( mouseX - camera.position.x ) * 0.05;
  camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
  camera.lookAt( scene.position );
  for ( let i = 0; i < scene.children.length; i ++ ) {
    const object = scene.children[ i ];
    if ( object instanceof THREE.Points ) {
      object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
    }
  }
  for ( let i = 0; i < materials.length; i ++ ) {
    const color = parameters[ i ][ 0 ];
    const h = ( 360 * ( color[ 0 ] + time ) % 360 ) / 360;
    materials[ i ].color.setHSL( h, color[ 1 ], color[ 2 ], THREE.SRGBColorSpace );
  }
  renderer.render( scene, camera );
}

*/
import { useRef, useMemo, useLayoutEffect, useEffect } from "react"
import * as THREE from 'three'
import type { Texture } from 'three'
import { useFrame, useLoader } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { TextureLoader } from 'three'

type SnowLayerParam = [[number, number, number], Texture, number, [number, number, number]]

type SnowParticlesProps = {
  /** 캔버스 위에서만 마우스에 따라 카메라가 반응하도록 on/off (기본 true, 현재 보류) */
  mouseInteraction?: boolean
  /** 눈발(파티클) 최대 개수 (기본 10000) */
  maxCount?: number
}

export function SnowParticles({ mouseInteraction = true, maxCount = 10000 }: SnowParticlesProps) {
  const groupRef = useRef<THREE.Group>(undefined)
  const materialsRef = useRef<THREE.PointsMaterial[]>([])
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  // 오리지널: mouseX = event.clientX - windowHalfX, mouseY = event.clientY - windowHalfY
  const mouseRef = useRef({ x: 0, y: 0 })

  const textures = useLoader(TextureLoader, [
    '/assets/textures/sprites/snowflake1.png',
    '/assets/textures/sprites/snowflake2.png',
    '/assets/textures/sprites/snowflake3.png',
    '/assets/textures/sprites/snowflake4.png',
    '/assets/textures/sprites/snowflake5.png',
  ])

  // deterministic PRNG (same seed → same vertices, no impure Math.random during render)
  const geometry = useMemo(() => {
    const mulberry32 = (seed: number) => {
      let a = seed | 0
      return () => {
        a = (a + 0x6d2b79f5) | 0
        let t = Math.imul(a ^ (a >>> 15), 1 | a)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
      }
    }
    const rnd = mulberry32(0x9e3779b9)
    const g = new THREE.BufferGeometry()
    const vertices: number[] = []

    for (let i = 0; i < maxCount; i++) {
      vertices.push(
        rnd() * 2000 - 1000,
        rnd() * 2000 - 1000,
        rnd() * 2000 - 1000
      )
    }

    g.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    )
    return g
  }, [maxCount])

  const parameters = useMemo((): SnowLayerParam[] => {
    const mulberry32 = (seed: number) => {
      let a = seed | 0
      return () => {
        a = (a + 0x6d2b79f5) | 0
        let t = Math.imul(a ^ (a >>> 15), 1 | a)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
      }
    }
    const rnd = mulberry32(0x7f4a7c15)
    return [
      [[1.0, 0.2, 0.5], textures[1], 20, [rnd() * 6, rnd() * 6, rnd() * 6]],
      [[0.95, 0.1, 0.5], textures[2], 15, [rnd() * 6, rnd() * 6, rnd() * 6]],
      [[0.9, 0.05, 0.5], textures[0], 10, [rnd() * 6, rnd() * 6, rnd() * 6]],
      [[0.85, 0, 0.5], textures[4], 8, [rnd() * 6, rnd() * 6, rnd() * 6]],
      [[0.8, 0, 0.5], textures[3], 5, [rnd() * 6, rnd() * 6, rnd() * 6]],
    ]
  }, [textures])

  const materials = useMemo(() => parameters.map(([color, texture, size]) => {
    const mat = new THREE.PointsMaterial({
      size,
      map: texture,
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    })
    mat.color.setHSL(color[0], color[1], color[2])
    return mat
  }), [parameters])

  useLayoutEffect(() => {
    materialsRef.current = materials
  }, [materials])

  // 오리지널: document.body.addEventListener('pointermove', onPointerMove)
  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (event.isPrimary === false) return
      const windowHalfX = window.innerWidth / 2
      const windowHalfY = window.innerHeight / 2
      mouseRef.current.x = event.clientX - windowHalfX
      mouseRef.current.y = event.clientY - windowHalfY
    }
    document.body.addEventListener("pointermove", onPointerMove)
    return () => document.body.removeEventListener("pointermove", onPointerMove)
  }, [])

  useFrame((state) => {
    // 오리지널: const time = Date.now() * 0.00005
    const time = state.clock.elapsedTime * 0.05

    // 오리지널: camera.position.x += (mouseX - camera.position.x) * 0.05
    const cam = cameraRef.current
    if (cam && mouseInteraction) {
      const { x: mouseX, y: mouseY } = mouseRef.current
      cam.position.x += (mouseX - cam.position.x) * 0.05
      cam.position.y += (-mouseY - cam.position.y) * 0.05
      cam.lookAt(0, 0, 0)
    }

    // 오리지널: object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1))
    groupRef.current?.children.forEach((obj, i) => {
      if (obj instanceof THREE.Points) {
        obj.rotation.y = time * (i < 4 ? i + 1 : -(i + 1))
      }
    })

    // 오리지널: h = (360 * (color[0] + time) % 360) / 360
    materialsRef.current.forEach((mat, i) => {
      const color = parameters[i][0]
      const h = ((color[0] + time) * 360) % 360 / 360
      mat.color.setHSL(h, color[1], color[2])
    })
  })

  return (
    <group ref={groupRef}>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 1000]} />
      {parameters.map(([, , , rotation], i) => (
        <points
          key={i}
          geometry={geometry}
          material={materials[i]}
          rotation={rotation}
        />
      ))}
    </group>
  )
}

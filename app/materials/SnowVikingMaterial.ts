// app/materials/SnowVikingMaterial.ts
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'


export const SnowVikingMaterial = shaderMaterial(
  {
    iTime: 0,
    iResolution: new THREE.Vector3(),
    iMouse: new THREE.Vector4(),
  },
  // vertex shader
  `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // fragment shader
  `
  precision highp float;

  uniform float iTime;
  uniform vec3 iResolution;
  uniform vec4 iMouse;

  varying vec2 vUv;

  // ===== Snow Mode =====
  #define LIGHT_SNOW
  // #define BLIZZARD

  #ifdef LIGHT_SNOW
    #define LAYERS 50
    #define DEPTH .5
    #define WIDTH .3
    #define SPEED .6
  #else
    #define LAYERS 200
    #define DEPTH .1
    #define WIDTH .8
    #define SPEED 1.5
  #endif

  void main() {
    vec2 fragCoord = vUv * iResolution.xy;

    const mat3 p = mat3(
      13.323122,23.5112,21.71123,
      21.1212,28.7312,11.9312,
      21.8112,14.7212,61.3934
    );

    vec2 uv =
      iMouse.xy / iResolution.xy +
      vec2(1.0, iResolution.y / iResolution.x) *
      fragCoord / iResolution.xy;

    vec3 acc = vec3(0.0);
    float dof = 5.0 * sin(iTime * 0.1);

    for (int i = 0; i < LAYERS; i++) {
      float fi = float(i);

      vec2 q = uv * (1.0 + fi * DEPTH);
      q += vec2(
        q.y * (WIDTH * mod(fi * 7.238917, 1.0) - WIDTH * 0.5),
        SPEED * iTime / (1.0 + fi * DEPTH * 0.03)
      );

      vec3 n = vec3(floor(q), 31.189 + fi);
      vec3 m = floor(n) * 0.00001 + fract(n);
      vec3 mp = (31415.9 + m) / fract(p * m);
      vec3 r = fract(mp);

      vec2 s = abs(mod(q, 1.0) - 0.5 + 0.9 * r.xy - 0.45);
      s += 0.01 * abs(2.0 * fract(10.0 * q.yx) - 1.0);

      float d = 0.6 * max(s.x - s.y, s.x + s.y)
              + max(s.x, s.y)
              - 0.01;

      float edge = 0.005 + 0.05 * min(0.5 * abs(fi - 5.0 - dof), 1.0);

      acc += vec3(
        smoothstep(edge, -edge, d) *
        (r.x / (1.0 + 0.02 * fi * DEPTH))
      );
    }

    gl_FragColor = vec4(acc, 1.0);
  }
  `
)

// 등록은 app/materials/registerR3F.ts 에서 앱 진입 시 한 번만 수행합니다.

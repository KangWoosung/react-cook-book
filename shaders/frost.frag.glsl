// frost.frag.glsl
precision highp float;

uniform float iTime;
uniform vec3 iResolution;

uniform sampler2D iChannel0; // background
uniform sampler2D iChannel1; // frost noise
uniform sampler2D iChannel2; // ice spread mask

varying vec2 vUv;

#define FROSTYNESS 0.5
//#define RANDNERF 2.5

float rand(vec2 uv) {
#ifdef RANDNERF
  uv = floor(uv * pow(10.0, RANDNERF)) / pow(10.0, RANDNERF);
#endif

  float a = dot(uv, vec2(92., 80.));
  float b = dot(uv, vec2(41., 62.));
  float x = sin(a) + cos(b) * 51.;
  return fract(x);
}

void main() {
  vec2 fragCoord = vUv * iResolution.xy;
  vec2 uv = fragCoord / iResolution.xy;

  float progress = fract(iTime / 4.0);

  vec4 frost = texture2D(iChannel1, uv);
  float icespread = texture2D(iChannel2, uv).r;

  vec2 rnd = vec2(
    rand(uv + frost.r * 0.05),
    rand(uv + frost.b * 0.05)
  );

  float size = mix(progress, sqrt(progress), 0.5);
  size = size * 1.12 + 0.0000001;

  vec2 lens = vec2(size, pow(size, 4.0) / 2.0);
  float dist = distance(uv, vec2(0.5));
  float vignette = pow(1.0 - smoothstep(lens.x, lens.y, dist), 2.0);

  rnd *= frost.rg * vignette * FROSTYNESS;
  rnd *= 1.0 - floor(vignette);

  vec4 regular = texture2D(iChannel0, uv);
  vec4 frozen = texture2D(iChannel0, uv + rnd);
  frozen *= vec4(0.9, 0.9, 1.1, 1.0);

  gl_FragColor = mix(
    frozen,
    regular,
    smoothstep(icespread, 1.0, pow(vignette, 2.0))
  );
}

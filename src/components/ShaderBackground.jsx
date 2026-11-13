import { useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════════════════════════════
   SHADER TUNING — the animated backdrop (after davidecarusio.it).
   ═══════════════════════════════════════════════════════════════════════════ */
const SHADER = {
  speed: 0.045, //      how fast the light drifts. 0 = frozen.
  scale: 1.15, //       size of the flowing shapes. Higher = smaller, busier.
  warp: 2.6, //         how much the field swirls into itself.
  streak: 0.07, //      brightness of the soft light streaks.
  mouseGlow: 0.045, //  glow that follows the cursor. 0 = off.
  resolution: 0.5, //   render scale. The field is soft, so half-res is invisible and cheap.
  // palette (sRGB 0–1): base paper + three tints that bleed through it
  paper: [0.957, 0.953, 0.969],
  lavender: [0.875, 0.862, 0.955],
  mint: [0.89, 0.952, 0.925],
  cream: [0.985, 0.94, 0.895],
}
const GRAIN_OPACITY = 0.16 // film grain over everything. 0 = off.

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_scale, u_warp, u_streak, u_glow;
uniform vec3 u_paper, u_lav, u_mint, u_cream;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.02 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = uv * vec2(aspect, 1.0) * u_scale;
  float t = u_time;

  // domain-warped fbm: noise fed back into itself gives slow, silky folds
  vec2 q = vec2(fbm(p + t), fbm(p - t + 5.2));
  vec2 r = vec2(fbm(p + u_warp * q + vec2(1.7, 9.2) + t * 1.3),
                fbm(p + u_warp * q + vec2(8.3, 2.8) - t));
  float f = fbm(p + u_warp * r);

  vec3 col = u_paper;
  col = mix(col, u_lav,   smoothstep(0.25, 0.85, r.x) * 0.55);
  col = mix(col, u_mint,  smoothstep(0.35, 0.90, q.y) * 0.35);
  col = mix(col, u_cream, smoothstep(0.40, 0.90, r.y) * 0.45);

  // soft light streaks where the field crests
  col += smoothstep(0.55, 0.82, f) * u_streak;

  // cursor glow
  vec2 m = u_mouse * vec2(aspect, 1.0) * u_scale;
  col += u_glow * exp(-3.0 * dot(p - m, p - m));

  // gentle vignette
  col *= 1.0 - 0.05 * length(uv - 0.5);
  gl_FragColor = vec4(col, 1.0);
}
`

// Static fine-grain noise tile, laid over the canvas like film grain.
const GRAIN = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
     <filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter>
     <rect width='100%' height='100%' filter='url(#g)'/>
   </svg>`,
)}`

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn('[ShaderBackground]', gl.getShaderInfoLog(s))
    return null
  }
  return s
}

/**
 * Fixed full-viewport animated backdrop: a domain-warped noise field rendered
 * in a WebGL fragment shader, drifting slowly and following the cursor, with a
 * film-grain layer on top. Falls back to the flat paper colour if WebGL is
 * unavailable, and holds a single still frame for prefers-reduced-motion.
 */
export default function ShaderBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl', { antialias: false, alpha: false })
    if (!gl || gl.isContextLost()) return

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return
    const prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    // one full-screen triangle
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = (n) => gl.getUniformLocation(prog, n)
    const uRes = u('u_res')
    const uTime = u('u_time')
    const uMouse = u('u_mouse')
    gl.uniform1f(u('u_scale'), SHADER.scale)
    gl.uniform1f(u('u_warp'), SHADER.warp)
    gl.uniform1f(u('u_streak'), SHADER.streak)
    gl.uniform1f(u('u_glow'), SHADER.mouseGlow)
    gl.uniform3fv(u('u_paper'), SHADER.paper)
    gl.uniform3fv(u('u_lav'), SHADER.lavender)
    gl.uniform3fv(u('u_mint'), SHADER.mint)
    gl.uniform3fv(u('u_cream'), SHADER.cream)

    const resize = () => {
      const s = SHADER.resolution * Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(window.innerWidth * s))
      canvas.height = Math.max(1, Math.round(window.innerHeight * s))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    // cursor target (0–1, origin bottom-left like gl_FragCoord), eased each frame
    const target = { x: 0.7, y: 0.6 }
    const mouse = { ...target }
    const onMove = (e) => {
      target.x = e.clientX / window.innerWidth
      target.y = 1 - e.clientY / window.innerHeight
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const start = performance.now()
    let raf = 0
    const frame = (now) => {
      mouse.x += (target.x - mouse.x) * 0.04
      mouse.y += (target.y - mouse.y) * 0.04
      gl.uniform1f(uTime, ((now - start) / 1000) * SHADER.speed + 10)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!still) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      // Free GPU objects but keep the context alive: React dev mode re-runs
      // this effect on the same <canvas>, and a lost context can't be reused.
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-paper">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{ backgroundImage: `url("${GRAIN}")`, opacity: GRAIN_OPACITY }}
      />
    </div>
  )
}

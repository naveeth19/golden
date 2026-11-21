"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight 3D firework layer in raw WebGL (no library, ~4 KB).
 * Bursts are placed at different depths and drawn through a perspective
 * camera that drifts with the pointer, so the sparks have real parallax.
 * Pauses when off-screen or when the tab is hidden.
 */

const VERT = `
attribute vec3 a_pos; attribute vec3 a_col; attribute float a_alpha; attribute float a_size;
uniform vec3 u_cam; uniform float u_aspect; uniform float u_f; uniform float u_px;
varying vec3 v_col; varying float v_alpha;
void main(){
  vec3 p = a_pos - u_cam;
  float z = -p.z;
  if (z < 0.5) { gl_Position = vec4(2.0, 2.0, 0.0, 1.0); gl_PointSize = 0.0; return; }
  gl_Position = vec4(p.x * u_f / u_aspect, p.y * u_f, 0.0, z);
  gl_PointSize = max(1.0, a_size * u_px / z);
  v_col = a_col; v_alpha = a_alpha;
}`;

const FRAG = `
precision mediump float;
varying vec3 v_col; varying float v_alpha;
void main(){
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float core = exp(-d * d * 7.0);
  float halo = exp(-d * d * 2.2) * 0.35;
  float a = (core + halo) * v_alpha;
  gl_FragColor = vec4(v_col * a, a);
}`;

const PALETTE: [number, number, number][] = [
  [0.92, 0.84, 0.64], // champagne light
  [0.85, 0.72, 0.44], // champagne
  [1.0, 0.96, 0.86], // warm white
  [0.98, 0.88, 0.6], // gold
  [0.88, 0.25, 0.35], // crimson light (rare)
];

type Shell = { x: number; y: number; z: number; vy: number; ty: number; t: number };

export default function FireworksCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false, powerPreference: "low-power" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const small = window.innerWidth < 768;
    const CAP = small ? 2600 : 6000;
    const STRIDE = 8; // pos3 col3 alpha size
    const data = new Float32Array(CAP * STRIDE);
    // simulation arrays
    const vel = new Float32Array(CAP * 3);
    const life = new Float32Array(CAP);
    const maxLife = new Float32Array(CAP);
    const glint = new Uint8Array(CAP);
    let count = 0;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, data.byteLength, gl.DYNAMIC_DRAW);
    const attr = (name: string, size: number, offset: number) => {
      const loc = gl.getAttribLocation(prog, name);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, STRIDE * 4, offset * 4);
    };
    attr("a_pos", 3, 0);
    attr("a_col", 3, 3);
    attr("a_alpha", 1, 6);
    attr("a_size", 1, 7);
    const uCam = gl.getUniformLocation(prog, "u_cam");
    const uAspect = gl.getUniformLocation(prog, "u_aspect");
    const uF = gl.getUniformLocation(prog, "u_f");
    const uPx = gl.getUniformLocation(prog, "u_px");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.clearColor(0, 0, 0, 0);

    const F = 1 / Math.tan((50 * Math.PI) / 180 / 2);
    let W = 0, H = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uAspect, W / Math.max(1, H));
      gl.uniform1f(uF, F);
      gl.uniform1f(uPx, H * dpr * 0.055);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const spawnParticle = (x: number, y: number, z: number, vx: number, vy: number, vz: number, c: [number, number, number], l: number, size: number, tw = 0) => {
      if (count >= CAP) return;
      const i = count++;
      const o = i * STRIDE;
      data[o] = x; data[o + 1] = y; data[o + 2] = z;
      data[o + 3] = c[0]; data[o + 4] = c[1]; data[o + 5] = c[2];
      data[o + 6] = 1; data[o + 7] = size;
      vel[i * 3] = vx; vel[i * 3 + 1] = vy; vel[i * 3 + 2] = vz;
      life[i] = l; maxLife[i] = l; glint[i] = tw;
    };

    const burst = (x: number, y: number, z: number) => {
      const n = small ? 140 + Math.random() * 60 : 240 + Math.random() * 140;
      const speed = 3.2 + Math.random() * 2.4;
      const main = PALETTE[Math.random() < 0.12 ? 4 : Math.floor(Math.random() * 4)];
      const ring = Math.random() < 0.25;
      for (let k = 0; k < n; k++) {
        // uniform sphere (or ring) direction
        const u = Math.random() * 2 - 1;
        const th = Math.random() * Math.PI * 2;
        const r = Math.sqrt(1 - u * u);
        const dx = r * Math.cos(th), dz = r * Math.sin(th);
        let dy = u;
        if (ring) { dy *= 0.12; }
        const s = speed * (0.82 + Math.random() * 0.25);
        const c = Math.random() < 0.18 ? PALETTE[2] : main;
        spawnParticle(x, y, z, dx * s, dy * s, dz * s, c, 1.6 + Math.random() * 1.2, 0.9 + Math.random() * 0.7, Math.random() < 0.3 ? 1 : 0);
      }
    };

    const shells: Shell[] = [];
    const launch = () => {
      const side = Math.random() < 0.5 ? -1 : 1;
      const x = side * (2 + Math.random() * 9);
      const z = -4 - Math.random() * 12;
      shells.push({ x, y: -6, z, vy: 11 + Math.random() * 3, ty: 2.5 + Math.random() * 5, t: 0 });
    };

    const cam = { x: 0, y: 1.5 };
    const target = { x: 0, y: 1.5 };
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2.2;
      target.y = 1.5 - (e.clientY / window.innerHeight - 0.5) * 1.2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }, { threshold: 0 });
    io.observe(canvas);
    const onVis = () => { if (!document.hidden) start(); };
    document.addEventListener("visibilitychange", onVis);

    let raf = 0, last = 0, nextLaunch = 0.2, running = false;
    const G = -2.6, DRAG = 0.985;

    const frame = (now: number) => {
      if (!visible || document.hidden) { running = false; return; }
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.033, (now - last) / 1000 || 0.016);
      last = now;

      nextLaunch -= dt;
      if (nextLaunch <= 0) { launch(); nextLaunch = 0.55 + Math.random() * 1.1; }

      // shells (rising trails)
      for (let s = shells.length - 1; s >= 0; s--) {
        const sh = shells[s];
        sh.y += sh.vy * dt; sh.vy *= 0.985; sh.t += dt;
        if (Math.random() < 0.9) spawnParticle(sh.x + (Math.random() - 0.5) * 0.05, sh.y, sh.z, 0, -0.6, 0, PALETTE[1], 0.45, 0.55);
        if (sh.y >= sh.ty) { burst(sh.x, sh.y, sh.z); shells.splice(s, 1); }
      }

      // particles
      const drag = Math.pow(DRAG, dt * 60);
      for (let i = 0; i < count; i++) {
        life[i] -= dt;
        if (life[i] <= 0) {
          // swap-remove
          const j = --count;
          if (i !== j) {
            data.copyWithin(i * STRIDE, j * STRIDE, j * STRIDE + STRIDE);
            vel[i * 3] = vel[j * 3]; vel[i * 3 + 1] = vel[j * 3 + 1]; vel[i * 3 + 2] = vel[j * 3 + 2];
            life[i] = life[j]; maxLife[i] = maxLife[j]; glint[i] = glint[j];
            i--;
          }
          continue;
        }
        const v = i * 3, o = i * STRIDE;
        vel[v] *= drag; vel[v + 1] = vel[v + 1] * drag + G * dt; vel[v + 2] *= drag;
        data[o] += vel[v] * dt; data[o + 1] += vel[v + 1] * dt; data[o + 2] += vel[v + 2] * dt;
        const k = life[i] / maxLife[i];
        let a = k < 0.6 ? k / 0.6 : 1;
        if (glint[i] && k < 0.5) a *= 0.4 + 0.6 * Math.abs(Math.sin(now * 0.03 + i));
        data[o + 6] = a * 0.95;
      }

      cam.x += (target.x - cam.x) * 0.04;
      cam.y += (target.y - cam.y) * 0.04;
      gl.uniform3f(uCam, cam.x, cam.y, 10);

      gl.clear(gl.COLOR_BUFFER_BIT);
      if (count > 0) {
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, data.subarray(0, count * STRIDE));
        gl.drawArrays(gl.POINTS, 0, count);
      }
    };

    function start() {
      if (running || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}

import { useEffect, useRef } from "react";

/**
 * 3D Starfield Canvas Animation
 * Faithful recreation of the 3D Star Canvas from sanidhyy/space-portfolio:
 * - 5,000 stars distributed in a 3D sphere (radius 1.2)
 * - Group rotation tilted at Math.PI / 4
 * - Continuous dual-axis rotation: rotX -= delta / 10, rotY -= delta / 15
 * - Size attenuation and twinkle with perspective projection
 * - Smooth interactive mouse parallax
 * - Occasional cosmic shooting stars
 */
export function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check WebGL support
    const gl =
      canvas.getContext("webgl", { alpha: true, antialias: true }) ||
      canvas.getContext("experimental-webgl", { alpha: true, antialias: true }) as WebGLRenderingContext | null;

    let animationFrameId: number;
    let lastTime = performance.now();

    // 3D rotation state (matching sanidhyy/space-portfolio)
    let rotX = 0;
    let rotY = 0;
    const baseTiltZ = Math.PI / 4;

    // Mouse parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetMouseX = (e.clientX / innerWidth - 0.5) * 0.35;
      targetMouseY = (e.clientY / innerHeight - 0.5) * 0.35;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Shooting stars state
    interface ShootingStar {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      length: number;
      life: number;
      maxLife: number;
      size: number;
    }
    const shootingStars: ShootingStar[] = [];
    let nextShootingStarTime = performance.now() + 2000;

    // If WebGL is supported, use GPU-accelerated shaders
    if (gl) {
      const vsSource = `
        attribute vec3 aPosition;
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aPhase;

        uniform mat4 uProjection;
        uniform mat4 uModelView;
        uniform float uTime;
        uniform float uPixelRatio;

        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec4 mvPosition = uModelView * vec4(aPosition, 1.0);
          gl_Position = uProjection * mvPosition;

          float twinkle = 0.4 + 0.35 * sin(uTime * 2.5 + aPhase);
          float depthScale = 1.0 / max(0.18, -mvPosition.z);
          
          gl_PointSize = clamp(aSize * uPixelRatio * depthScale * 1.35, 1.0, 7.5);
          vColor = aColor;
          vAlpha = twinkle * clamp(depthScale * 0.55, 0.15, 0.65);
        }
      `;

      const fsSource = `
        precision mediump float;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float distSq = dot(coord, coord);
          if (distSq > 0.25) discard;
          
          float glow = 1.0 - smoothstep(0.0, 0.25, distSq);
          gl_FragColor = vec4(vColor, vAlpha * glow);
        }
      `;

      function compileShader(source: string, type: number): WebGLShader | null {
        if (!gl) return null;
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      }

      const vs = compileShader(vsSource, gl.VERTEX_SHADER);
      const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
      const program = gl.createProgram();

      if (vs && fs && program) {
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        // Generate 5,000 stars distributed inside a 3D sphere of radius 1.2
        const count = 5000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const phases = new Float32Array(count);

        for (let i = 0; i < count; i++) {
          const u = Math.random();
          const r = Math.cbrt(u) * 1.2;
          const theta = Math.random() * 2 * Math.PI;
          const phi = Math.acos(2 * Math.random() - 1);

          positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          positions[i * 3 + 2] = r * Math.cos(phi);

          // Subtle space palette: brilliant whites, soft emerald cyans, cosmic lilacs
          const colorRand = Math.random();
          if (colorRand > 0.85) {
            colors[i * 3] = 0.55;
            colors[i * 3 + 1] = 0.98;
            colors[i * 3 + 2] = 0.75;
          } else if (colorRand > 0.65) {
            colors[i * 3] = 0.75;
            colors[i * 3 + 1] = 0.82;
            colors[i * 3 + 2] = 1.0;
          } else {
            colors[i * 3] = 1.0;
            colors[i * 3 + 1] = 1.0;
            colors[i * 3 + 2] = 1.0;
          }

          sizes[i] = 1.0 + Math.random() * 2.0;
          phases[i] = Math.random() * Math.PI * 2;
        }

        const createBuffer = (data: Float32Array) => {
          const buf = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, buf);
          gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
          return buf;
        };

        const posBuffer = createBuffer(positions);
        const colBuffer = createBuffer(colors);
        const sizeBuffer = createBuffer(sizes);
        const phaseBuffer = createBuffer(phases);

        const aPosition = gl.getAttribLocation(program, "aPosition");
        const aColor = gl.getAttribLocation(program, "aColor");
        const aSize = gl.getAttribLocation(program, "aSize");
        const aPhase = gl.getAttribLocation(program, "aPhase");

        const uProjection = gl.getUniformLocation(program, "uProjection");
        const uModelView = gl.getUniformLocation(program, "uModelView");
        const uTime = gl.getUniformLocation(program, "uTime");
        const uPixelRatio = gl.getUniformLocation(program, "uPixelRatio");

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE); // Additive blending for vivid starlight glow

        const resize = () => {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const w = window.innerWidth;
          const h = window.innerHeight;
          if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
            canvas.width = w * dpr;
            canvas.height = h * dpr;
          }
          gl.viewport(0, 0, canvas.width, canvas.height);
        };

        window.addEventListener("resize", resize, { passive: true });
        resize();

        // 4x4 matrix helpers
        const createPerspective = (fov: number, aspect: number, near: number, far: number) => {
          const f = 1.0 / Math.tan(fov / 2);
          const nf = 1 / (near - far);
          return new Float32Array([
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (far + near) * nf, -1,
            0, 0, 2 * far * near * nf, 0,
          ]);
        };

        const render = (now: number) => {
          if (document.hidden) {
            animationFrameId = requestAnimationFrame(render);
            return;
          }

          const delta = Math.min((now - lastTime) / 1000, 0.1);
          lastTime = now;

          // Rotation delta identical to sanidhyy/space-portfolio:
          // ref.current.rotation.x -= delta / 10;
          // ref.current.rotation.y -= delta / 15;
          rotX -= delta / 10;
          rotY -= delta / 15;

          // Smooth mouse parallax lerp
          currentMouseX += (targetMouseX - currentMouseX) * 0.05;
          currentMouseY += (targetMouseY - currentMouseY) * 0.05;

          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);

          gl.useProgram(program);

          const aspect = canvas.width / canvas.height;
          const projMatrix = createPerspective((60 * Math.PI) / 180, aspect, 0.1, 10.0);

          // Combined ModelView matrix:
          // Camera at [0, 0, 1] looking at [0, 0, 0]
          // Group tilt [0, 0, Math.PI / 4], plus rotX, rotY, and mouse tilt
          const cz = Math.cos(baseTiltZ);
          const sz = Math.sin(baseTiltZ);
          const cx = Math.cos(rotX + currentMouseY);
          const sx = Math.sin(rotX + currentMouseY);
          const cy = Math.cos(rotY + currentMouseX);
          const sy = Math.sin(rotY + currentMouseX);

          // R = Rz * Ry * Rx
          // m00..m15
          const m00 = cz * cy + sz * sx * sy;
          const m01 = sz * cx;
          const m02 = -cz * sy + sz * sx * cy;
          const m04 = -sz * cy + cz * sx * sy;
          const m05 = cz * cx;
          const m06 = sz * sy + cz * sx * cy;
          const m08 = cx * sy;
          const m09 = -sx;
          const m10 = cx * cy;

          // Camera translation by -1 in Z
          const modelView = new Float32Array([
            m00, m01, m02, 0,
            m04, m05, m06, 0,
            m08, m09, m10, 0,
            0, 0, -1.0, 1,
          ]);

          gl.uniformMatrix4fv(uProjection, false, projMatrix);
          gl.uniformMatrix4fv(uModelView, false, modelView);
          gl.uniform1f(uTime, now * 0.001);
          gl.uniform1f(uPixelRatio, Math.min(window.devicePixelRatio || 1, 2));

          gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
          gl.enableVertexAttribArray(aPosition);
          gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);

          gl.bindBuffer(gl.ARRAY_BUFFER, colBuffer);
          gl.enableVertexAttribArray(aColor);
          gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);

          gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
          gl.enableVertexAttribArray(aSize);
          gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);

          gl.bindBuffer(gl.ARRAY_BUFFER, phaseBuffer);
          gl.enableVertexAttribArray(aPhase);
          gl.vertexAttribPointer(aPhase, 1, gl.FLOAT, false, 0, 0);

          gl.drawArrays(gl.POINTS, 0, count);

          animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
          cancelAnimationFrame(animationFrameId);
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("resize", resize);
          if (posBuffer) gl.deleteBuffer(posBuffer);
          if (colBuffer) gl.deleteBuffer(colBuffer);
          if (sizeBuffer) gl.deleteBuffer(sizeBuffer);
          if (phaseBuffer) gl.deleteBuffer(phaseBuffer);
          if (vs) gl.deleteShader(vs);
          if (fs) gl.deleteShader(fs);
          if (program) gl.deleteProgram(program);
        };
      }
    }

    // High performance 2D Canvas Fallback in case WebGL is unavailable
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = 1800;
    const stars: { x: number; y: number; z: number; size: number; phase: number; color: string }[] = [];
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const r = Math.cbrt(u) * 1.2;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      stars.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        size: 0.8 + Math.random() * 1.6,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.8 ? "#63f59a" : Math.random() > 0.6 ? "#a78bfa" : "#ffffff",
      });
    }

    const resizeFallback = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeFallback, { passive: true });
    resizeFallback();

    const render2D = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      rotX -= delta / 10;
      rotY -= delta / 15;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const fov = Math.min(canvas.width, canvas.height) * 0.9;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        // 3D rotations
        const x1 = s.x * cosY - s.z * sinY;
        const z1 = s.x * sinY + s.z * cosY;
        const y2 = s.y * cosX - z1 * sinX;
        const z2 = s.y * sinX + z1 * cosX + 1.2;

        if (z2 <= 0.05) continue;
        const scale = fov / z2;
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        if (px < 0 || px > canvas.width || py < 0 || py > canvas.height) continue;

        const twinkle = 0.5 + 0.5 * Math.sin(now * 0.003 + s.phase);
        const radius = Math.max(0.6, (s.size * scale) / 500);

        ctx.fillStyle = s.color;
        ctx.globalAlpha = twinkle * Math.min(0.55, 0.6 / z2);
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render2D);
    };

    animationFrameId = requestAnimationFrame(render2D);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resizeFallback);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="stars-canvas-wrapper"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        opacity: 0.62,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}

export default StarBackground;

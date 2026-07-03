import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import SocialIcon from "./SocialIcon";
import useReducedMotion from "../lib/useReducedMotion";

const ROLES = ["Software Engineer", "Full-Stack Developer", ".NET Core Specialist", "Multi-Tenant SaaS Architect"];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/umairsattar142", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/umair-sattar-90917623b", icon: "linkedin" },
  { label: "Email", href: "mailto:usattar307@gmail.com", icon: "email" },
];

const reveal = (index, reduced) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 34 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 1, delay: 0.15 + index * 0.11, ease: [0.16, 1, 0.3, 1] },
      };

const Hero = () => {
  const canvasRef = useRef(null);
  const typedRef = useRef(null);
  const caretRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let w = canvas.clientWidth || window.innerWidth;
    let h = canvas.clientHeight || window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05060a, 0.055);
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 9;

    const N = reduced ? 1400 : 4400;
    const geo = new THREE.BufferGeometry();
    const basePos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const c1 = new THREE.Color(0x38e1ff);
    const c2 = new THREE.Color(0xa78bfa);
    for (let i = 0; i < N; i++) {
      const r = 3 + Math.pow(Math.random(), 0.6) * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      basePos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      basePos[i * 3 + 1] = r * Math.cos(phi) * 0.62;
      basePos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      const c = c1.clone().lerp(c2, Math.random());
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    const pos = new Float32Array(basePos);
    const displacement = new Float32Array(N * 3);
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const shapes = [];
    for (let i = 0; i < 3; i++) {
      const g = new THREE.IcosahedronGeometry(0.75 + i * 0.32, 0);
      const m = new THREE.MeshBasicMaterial({
        color: i % 2 ? 0xa78bfa : 0x38e1ff,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      });
      const mesh = new THREE.Mesh(g, m);
      // Visible area at z≈0 with fov 60 and camera.z 9: half-height ≈ 5.2.
      const spawnH = 4.6;
      const spawnW = spawnH * (w / h);
      mesh.position.set((Math.random() - 0.5) * 2 * spawnW * 0.8, (Math.random() - 0.5) * 2 * spawnH * 0.8, (i - 1) * 0.6);
      mesh.userData.vel = new THREE.Vector3((Math.random() - 0.5) * 0.024, (Math.random() - 0.5) * 0.024, 0);
      mesh.userData.impulse = new THREE.Vector3();
      scene.add(mesh);
      shapes.push(mesh);
    }

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const invMatrix = new THREE.Matrix4();
    const localOrigin = new THREE.Vector3();
    const localDir = new THREE.Vector3();
    // Angular radius (radians) around the click ray — using the on-screen angle
    // instead of world distance keeps the cleared hole the same visual size at
    // every depth, so far particles can't peek through the middle of it.
    const ANGULAR_RADIUS = 0.24;
    const PUSH_PER_DEPTH = 1.1;

    const shapeOffset = new THREE.Vector3();
    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      // Listener lives on window so clicks over the hero text also work —
      // but ignore clicks outside the hero section itself.
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);

      // Shove the big wireframe shapes away from the click ray too.
      for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i];
        shapeOffset.copy(s.position).sub(raycaster.ray.origin);
        const along = shapeOffset.dot(raycaster.ray.direction);
        if (along <= 0) continue;
        shapeOffset.addScaledVector(raycaster.ray.direction, -along); // perpendicular part
        const dist = shapeOffset.length();
        const angular = dist / Math.max(along, 0.5);
        if (angular < ANGULAR_RADIUS * 2.2) {
          if (dist < 0.0001) shapeOffset.set(Math.random() - 0.5, Math.random() - 0.5, 0);
          shapeOffset.normalize();
          shapeOffset.z *= 0.2; // keep them from flying into the camera
          const strength = (1 - angular / (ANGULAR_RADIUS * 2.2)) * 0.22 * Math.min(along, 14) * 0.35;
          s.userData.impulse.addScaledVector(shapeOffset, Math.max(strength, 0.12));
        }
      }

      // Work in the points object's local space (it rotates over time).
      invMatrix.copy(points.matrixWorld).invert();
      localOrigin.copy(raycaster.ray.origin).applyMatrix4(invMatrix);
      localDir.copy(raycaster.ray.direction).transformDirection(invMatrix).normalize();

      // Push every particle whose distance from the click ray is small —
      // clears a visible tunnel through the whole cloud, not just one point.
      for (let i = 0; i < N; i++) {
        const px = basePos[i * 3] + displacement[i * 3];
        const py = basePos[i * 3 + 1] + displacement[i * 3 + 1];
        const pz = basePos[i * 3 + 2] + displacement[i * 3 + 2];
        const vx = px - localOrigin.x;
        const vy = py - localOrigin.y;
        const vz = pz - localOrigin.z;
        const t = vx * localDir.x + vy * localDir.y + vz * localDir.z;
        if (t < 0) continue;
        const cx = localOrigin.x + localDir.x * t;
        const cy = localOrigin.y + localDir.y * t;
        const cz = localOrigin.z + localDir.z * t;
        let dx = px - cx;
        let dy = py - cy;
        let dz = pz - cz;
        let dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 0.0001) {
          // Particle exactly on the ray — pick a random sideways direction.
          dx = Math.random() - 0.5;
          dy = Math.random() - 0.5;
          dz = Math.random() - 0.5;
          dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
        const angular = dist / Math.max(t, 0.5);
        if (angular < ANGULAR_RADIUS) {
          const falloff = 1 - angular / ANGULAR_RADIUS;
          // Far particles need a bigger world-space shove to leave the same
          // on-screen hole, so the push scales with depth along the ray.
          const push = (falloff * falloff + 0.25) * PUSH_PER_DEPTH * Math.min(t, 16) * ANGULAR_RADIUS * 2;
          displacement[i * 3] += (dx / dist) * push;
          displacement[i * 3 + 1] += (dy / dist) * push;
          displacement[i * 3 + 2] += (dz / dist) * push;
        }
      }
    };
    window.addEventListener("click", onClick);

    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const clock = new THREE.Clock();
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.045;
      points.rotation.x = Math.sin(t * 0.12) * 0.12;
      const boundH = 4.8;
      const boundW = boundH * camera.aspect;
      for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i];
        s.rotation.x = t * (0.2 + i * 0.1);
        s.rotation.y = t * (0.16 + i * 0.07);
        s.position.add(s.userData.vel);
        s.position.addScaledVector(s.userData.impulse, 1);
        s.userData.impulse.multiplyScalar(0.94);
        // Bounce off the edges of the visible area so they roam the whole screen.
        if (s.position.x > boundW || s.position.x < -boundW) {
          s.userData.vel.x *= -1;
          s.userData.impulse.x *= -0.5;
          s.position.x = THREE.MathUtils.clamp(s.position.x, -boundW, boundW);
        }
        if (s.position.y > boundH || s.position.y < -boundH) {
          s.userData.vel.y *= -1;
          s.userData.impulse.y *= -0.5;
          s.position.y = THREE.MathUtils.clamp(s.position.y, -boundH, boundH);
        }
      }
      camera.position.x += (mouse.x * 2.4 - camera.position.x) * 0.045;
      camera.position.y += (-mouse.y * 1.8 - camera.position.y) * 0.045;
      camera.position.z = 9 + Math.min(scrollY, 900) * 0.0045;
      camera.lookAt(0, 0, 0);

      let displaced = false;
      for (let i = 0; i < displacement.length; i++) {
        if (displacement[i] !== 0) {
          displaced = true;
          displacement[i] *= 0.965;
          if (Math.abs(displacement[i]) < 0.0005) displacement[i] = 0;
        }
        pos[i] = basePos[i] + displacement[i];
      }
      if (displaced) geo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("click", onClick);
      geo.dispose();
      mat.dispose();
      shapes.forEach((s) => {
        s.geometry.dispose();
        s.material.dispose();
      });
      renderer.dispose();
    };
  }, [reduced]);

  useEffect(() => {
    const el = typedRef.current;
    const caret = caretRef.current;
    if (!el) return undefined;

    if (reduced) {
      el.textContent = ROLES[0];
      return undefined;
    }

    let caretInterval;
    if (caret) {
      let visible = true;
      caretInterval = setInterval(() => {
        visible = !visible;
        caret.style.opacity = visible ? "1" : "0";
      }, 500);
    }

    let w = 0;
    let c = 0;
    let deleting = false;
    let timeoutId;
    const tick = () => {
      const word = ROLES[w];
      if (!deleting) {
        c++;
        if (c > word.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1400);
          return;
        }
      } else {
        c--;
        if (c < 0) {
          deleting = false;
          w = (w + 1) % ROLES.length;
          c = 0;
        }
      }
      el.textContent = word.substring(0, Math.max(c, 0));
      timeoutId = setTimeout(tick, deleting ? 45 : 90);
    };
    tick();

    return () => {
      clearTimeout(timeoutId);
      clearInterval(caretInterval);
    };
  }, [reduced]);

  return (
    <section
      id="home"
      className="relative z-[1] min-h-screen flex flex-col justify-center items-center text-center"
      style={{ padding: "120px clamp(20px,6vw,64px) 60px" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      <div className="relative z-[2]" style={{ maxWidth: 1000 }}>
        <motion.div
          {...reveal(0, reduced)}
          className="inline-flex items-center font-mono uppercase text-[9px] sm:text-xs tracking-[0.15em] sm:tracking-[0.28em] px-3 sm:px-4 py-1.5 sm:py-2"
          style={{
            gap: 9,
            color: "#38e1ff",
            border: "1px solid rgba(56,225,255,0.28)",
            background: "rgba(56,225,255,0.06)",
            borderRadius: 100,
            backdropFilter: "blur(6px)",
            maxWidth: "100%",
            whiteSpace: "nowrap",
          }}
        >
          <span
            className="animate-floaty flex-shrink-0"
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#38e1ff",
              boxShadow: "0 0 10px #38e1ff",
            }}
          />
          Available for work
        </motion.div>

        <motion.h1
          {...reveal(1, reduced)}
          className="font-display font-bold"
          style={{
            fontSize: "clamp(44px,9vw,120px)",
            lineHeight: 0.98,
            letterSpacing: "-0.03em",
            margin: "26px 0 0",
          }}
        >
          Umair Sattar
        </motion.h1>

        <motion.div
          {...reveal(2, reduced)}
          className="font-display font-semibold animate-gradMove"
          style={{
            fontSize: "clamp(22px,4.4vw,54px)",
            lineHeight: 1.05,
            marginTop: 6,
            backgroundImage: "linear-gradient(90deg,#38e1ff,#a78bfa,#38e1ff)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            minHeight: "1.1em",
          }}
        >
          <span ref={typedRef} />
          <span ref={caretRef} style={{ color: "#a78bfa", WebkitTextFillColor: "#a78bfa", fontWeight: 300 }}>
            |
          </span>
        </motion.div>

        <motion.p
          {...reveal(3, reduced)}
          style={{
            maxWidth: 620,
            margin: "26px auto 0",
            color: "#9aa3b7",
            fontSize: "clamp(15px,1.8vw,19px)",
            lineHeight: 1.7,
          }}
        >
          I architect scalable, multi-tenant applications end to end — from clean API design and system
          architecture to performant, cinematic interfaces.
        </motion.p>

        <motion.div
          {...reveal(4, reduced)}
          className="flex flex-wrap justify-center"
          style={{ gap: 16, marginTop: 38 }}
        >
          <Magnetic>
            <a
              href="#work"
              className="font-display font-semibold inline-flex items-center text-sm sm:text-base px-5 sm:px-[30px] py-3 sm:py-[15px]"
              style={{
                textDecoration: "none",
                gap: 10,
                color: "#05060a",
                background: "linear-gradient(135deg,#38e1ff,#a78bfa)",
                borderRadius: 12,
                boxShadow: "0 8px 40px rgba(56,225,255,0.4)",
              }}
            >
              View my work →
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="mailto:usattar307@gmail.com"
              className="font-display font-semibold inline-flex items-center text-sm sm:text-base px-5 sm:px-[30px] py-3 sm:py-[15px]"
              style={{
                textDecoration: "none",
                gap: 10,
                color: "#e7ecf3",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                backdropFilter: "blur(10px)",
              }}
            >
              Get in touch
            </a>
          </Magnetic>
        </motion.div>

        <motion.div {...reveal(5, reduced)} className="flex justify-center" style={{ gap: 14, marginTop: 34 }}>
          {SOCIALS.map((s) => (
            <Magnetic key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="animate-floaty hover:text-accent-cyan hover:border-[rgba(56,225,255,0.6)] hover:shadow-[0_0_22px_rgba(56,225,255,0.3)] hover:-translate-y-1"
                style={{
                  animationDuration: "4s",
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  color: "#c4ccdb",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(8px)",
                  transition: "all .3s",
                }}
              >
                <SocialIcon name={s.icon} />
              </a>
            </Magnetic>
          ))}
        </motion.div>
      </div>

      <div
        className="absolute flex flex-col items-center z-[2]"
        style={{ bottom: 30, left: "50%", transform: "translateX(-50%)", gap: 8 }}
      >
        <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.25em", color: "#5b6478" }}>
          Scroll
        </span>
        <span
          className="animate-pulseCue"
          style={{ width: 1, height: 34, background: "linear-gradient(#38e1ff,transparent)" }}
        />
      </div>
    </section>
  );
};

export default Hero;

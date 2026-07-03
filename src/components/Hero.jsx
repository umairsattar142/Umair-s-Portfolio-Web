import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import useReducedMotion from "../lib/useReducedMotion";

const ROLES = ["Software Engineer", "Full-Stack Developer", ".NET Core Specialist", "Multi-Tenant SaaS Architect"];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/umairsattar142", short: "GH" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/umair-sattar-90917623b", short: "IN" },
  { label: "Email", href: "mailto:usattar307@gmail.com", short: "@" },
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
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const c1 = new THREE.Color(0x38e1ff);
    const c2 = new THREE.Color(0xa78bfa);
    for (let i = 0; i < N; i++) {
      const r = 3 + Math.pow(Math.random(), 0.6) * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi) * 0.62;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      const c = c1.clone().lerp(c2, Math.random());
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
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
      mesh.position.set((i - 1) * 3.4, Math.sin(i) * 1.4, i * 0.4 - 0.5);
      scene.add(mesh);
      shapes.push(mesh);
    }

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

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
      for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i];
        s.rotation.x = t * (0.2 + i * 0.1);
        s.rotation.y = t * (0.16 + i * 0.07);
        s.position.y = Math.sin(t * 0.55 + i) * 1.25;
      }
      camera.position.x += (mouse.x * 2.4 - camera.position.x) * 0.045;
      camera.position.y += (-mouse.y * 1.8 - camera.position.y) * 0.045;
      camera.position.z = 9 + Math.min(scrollY, 900) * 0.0045;
      camera.lookAt(0, 0, 0);
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
                className="font-mono animate-floaty"
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
                  fontSize: 13,
                  fontWeight: 500,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(8px)",
                  transition: "all .3s",
                }}
              >
                {s.short}
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

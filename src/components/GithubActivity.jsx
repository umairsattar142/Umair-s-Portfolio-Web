import { useMemo } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../lib/motionVariants";
import useReducedMotion from "../lib/useReducedMotion";

const COLS = 53;
const ROWS = 7;
const COLORS = [
  "rgba(255,255,255,0.05)",
  "rgba(56,225,255,0.22)",
  "rgba(56,225,255,0.45)",
  "rgba(56,225,255,0.7)",
  "#38e1ff",
];

const levelFor = () => {
  const r = Math.random();
  if (r < 0.4) return 0;
  if (r < 0.65) return 1;
  if (r < 0.83) return 2;
  if (r < 0.94) return 3;
  return 4;
};

const GithubActivity = () => {
  const reduced = useReducedMotion();
  const cells = useMemo(() => Array.from({ length: COLS * ROWS }, () => levelFor()), []);

  return (
    <section
      id="activity"
      className="relative z-[1]"
      style={{ maxWidth: 1240, margin: "0 auto", padding: "100px clamp(20px,6vw,64px)" }}
    >
      <motion.div
        {...fadeUp(reduced, 0)}
        className="font-mono uppercase"
        style={{ fontSize: 12, letterSpacing: "0.3em", color: "#38e1ff", marginBottom: 18 }}
      >
        09 — Activity
      </motion.div>
      <motion.div
        {...fadeUp(reduced, 0.06)}
        className="flex flex-wrap items-end justify-between"
        style={{ gap: 16, marginBottom: 30 }}
      >
        <h2 className="font-display font-semibold" style={{ fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-0.02em", margin: 0 }}>
          Always shipping.
        </h2>
        <a
          href="https://github.com/umairsattar142"
          target="_blank"
          rel="noopener noreferrer"
          className="font-display font-semibold"
          style={{ textDecoration: "none", fontSize: 14, color: "#38e1ff" }}
        >
          github.com/umairsattar142 →
        </a>
      </motion.div>

      <motion.div
        {...fadeUp(reduced, 0.12)}
        style={{
          border: "1px solid rgba(255,255,255,0.09)",
          background: "rgba(255,255,255,0.025)",
          borderRadius: 20,
          padding: 26,
          backdropFilter: "blur(10px)",
          overflowX: "auto",
        }}
      >
        <div
          className="grid"
          style={{
            gridAutoFlow: "column",
            gridTemplateRows: "repeat(7,1fr)",
            gap: 4,
            minWidth: 640,
          }}
        >
          {cells.map((lvl, i) => (
            <div
              key={i}
              className="transition-transform duration-200 hover:scale-[1.35]"
              style={{ width: 11, height: 11, borderRadius: 3, background: COLORS[lvl] }}
            />
          ))}
        </div>
        <div
          className="flex items-center font-mono"
          style={{ gap: 8, marginTop: 18, fontSize: 11, color: "#7b8398" }}
        >
          Less
          {COLORS.map((c) => (
            <span key={c} style={{ width: 11, height: 11, borderRadius: 3, background: c }} />
          ))}
          More
        </div>
      </motion.div>
    </section>
  );
};

export default GithubActivity;

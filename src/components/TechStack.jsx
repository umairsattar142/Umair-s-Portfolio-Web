import { motion } from "framer-motion";
import { fadeUp } from "../lib/motionVariants";
import useReducedMotion from "../lib/useReducedMotion";

const TECH = [
  "C#", ".NET Core", "React.js", "Next.js", "Angular", "Node.js", "FastAPI", "PostgreSQL", "MongoDB",
  "SQL Server", "Redux", "SignalR", "AWS S3", "Docker", "Hangfire", "MediatR", "Git", "Solidity",
];

const TechStack = () => {
  const reduced = useReducedMotion();

  return (
    <section
      id="stack"
      className="relative z-[1]"
      style={{ maxWidth: 1240, margin: "0 auto", padding: "100px clamp(20px,6vw,64px)" }}
    >
      <motion.div
        {...fadeUp(reduced, 0)}
        className="font-mono uppercase"
        style={{ fontSize: 12, letterSpacing: "0.3em", color: "#38e1ff", marginBottom: 18 }}
      >
        05 — Tech Stack
      </motion.div>
      <motion.h2
        {...fadeUp(reduced, 0.08)}
        className="font-display font-semibold"
        style={{ fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-0.02em", margin: "0 0 40px" }}
      >
        The daily toolkit.
      </motion.h2>

      <motion.div
        {...fadeUp(reduced, 0.14)}
        className="grid"
        style={{ gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 14 }}
      >
        {TECH.map((t) => (
          <div
            key={t}
            className="flex items-center transition-all duration-300 hover:border-[rgba(56,225,255,0.45)] hover:bg-[rgba(56,225,255,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,225,255,0.14)]"
            style={{
              gap: 12,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.025)",
              borderRadius: 14,
              padding: "16px 18px",
              animation: reduced ? "none" : "floaty 5s ease-in-out infinite",
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#38e1ff,#a78bfa)",
                boxShadow: "0 0 10px rgba(56,225,255,0.6)",
                flexShrink: 0,
              }}
            />
            <span className="font-display font-medium" style={{ fontSize: 14.5, color: "#d3dae7" }}>
              {t}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default TechStack;

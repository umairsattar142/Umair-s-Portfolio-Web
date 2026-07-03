import { motion } from "framer-motion";
import { fadeUp } from "../lib/motionVariants";
import useReducedMotion from "../lib/useReducedMotion";

const CERTS = [
  { title: "BS in Computer Science", by: "FAST NUCES · Aug 2020 – Dec 2024" },
  { title: "CSS, JavaScript & Python — Complete Course", by: "Udemy" },
  { title: "Git: Become an Expert in Git & GitHub", by: "Udemy" },
];

const Certifications = () => {
  const reduced = useReducedMotion();

  return (
    <section
      id="certs"
      className="relative z-[1]"
      style={{ maxWidth: 1240, margin: "0 auto", padding: "100px clamp(20px,6vw,64px)" }}
    >
      <motion.div
        {...fadeUp(reduced, 0)}
        className="font-mono uppercase"
        style={{ fontSize: 12, letterSpacing: "0.3em", color: "#38e1ff", marginBottom: 18 }}
      >
        07 — Credentials
      </motion.div>
      <motion.h2
        {...fadeUp(reduced, 0.08)}
        className="font-display font-semibold"
        style={{ fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-0.02em", margin: "0 0 40px" }}
      >
        Education &amp; certifications.
      </motion.h2>

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
        {CERTS.map((c, i) => (
          <motion.div
            key={c.title}
            {...fadeUp(reduced, 0.1 + i * 0.06)}
            className="flex items-start transition-colors duration-300 hover:border-[rgba(56,225,255,0.4)]"
            style={{
              gap: 16,
              border: "1px solid rgba(255,255,255,0.09)",
              background: "rgba(255,255,255,0.025)",
              borderRadius: 16,
              padding: 22,
            }}
          >
            <span
              className="font-mono"
              style={{
                width: 40,
                height: 40,
                flexShrink: 0,
                borderRadius: 11,
                background: "linear-gradient(135deg,rgba(56,225,255,0.2),rgba(167,139,250,0.2))",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                color: "#38e1ff",
              }}
            >
              ✦
            </span>
            <div>
              <div className="font-display font-semibold" style={{ fontSize: 15.5, lineHeight: 1.35 }}>
                {c.title}
              </div>
              <div className="font-mono" style={{ fontSize: 12, color: "#7b8398", marginTop: 6 }}>
                {c.by}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        {...fadeUp(reduced, 0.28)}
        className="font-mono"
        style={{ fontSize: 12, color: "#7b8398", marginTop: 24 }}
      >
        Languages: English (Proficient) · Urdu (Native)
      </motion.div>
    </section>
  );
};

export default Certifications;

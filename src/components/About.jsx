import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import Counter from "./Counter";
import useReducedMotion from "../lib/useReducedMotion";
import { fadeUp } from "../lib/motionVariants";

const STATS = [
  { num: 2, suffix: "+", label: "Years shipping production software" },
  { num: 40, suffix: "%", label: "Faster average API response times" },
  { num: 70, suffix: "%", label: "Reduction in bulk upload failures" },
  { num: 3, suffix: "", label: "Teams & companies delivered for" },
];

const About = () => {
  const reduced = useReducedMotion();

  return (
    <section
      id="about"
      className="relative z-[1]"
      style={{ maxWidth: 1240, margin: "0 auto", padding: "120px clamp(20px,6vw,64px)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr]" style={{ gap: 50 }}>
        <div>
          <motion.div
            {...fadeUp(reduced, 0)}
            className="font-mono uppercase"
            style={{ fontSize: 12, letterSpacing: "0.3em", color: "#38e1ff", marginBottom: 20 }}
          >
            01 — About
          </motion.div>
          <motion.h2
            {...fadeUp(reduced, 0.08)}
            className="font-display font-semibold"
            style={{ fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.15, letterSpacing: "-0.02em", margin: 0 }}
          >
            Software Engineer obsessed with <span style={{ color: "#38e1ff" }}>scalable systems</span> and{" "}
            <span style={{ color: "#a78bfa" }}>details that feel alive.</span>
          </motion.h2>
          <motion.p
            {...fadeUp(reduced, 0.16)}
            style={{ color: "#9aa3b7", fontSize: 17, lineHeight: 1.8, marginTop: 26, maxWidth: 640 }}
          >
            I&apos;m a Software Engineer with 2 years of experience across the full development lifecycle — system
            design, API development, deployment and optimization. I&apos;ve shipped multi-tenant SaaS platforms
            with .NET Core, React and PostgreSQL, and I love turning complex problems into fast, reliable,
            beautifully engineered products.
          </motion.p>
        </div>

        <motion.div {...fadeUp(reduced, 0.1)} className="grid grid-cols-2" style={{ gap: 16 }}>
          {STATS.map((st) => (
            <TiltCard
              key={st.label}
              style={{
                border: "1px solid rgba(255,255,255,0.09)",
                background: "rgba(255,255,255,0.03)",
                borderRadius: 18,
                padding: "26px 22px",
                backdropFilter: "blur(12px)",
                overflow: "hidden",
              }}
            >
              <div
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(34px,5vw,52px)",
                  lineHeight: 1,
                  backgroundImage: "linear-gradient(135deg,#38e1ff,#a78bfa)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                <Counter value={st.num} suffix={st.suffix} />
              </div>
              <div style={{ color: "#9aa3b7", fontSize: 13, marginTop: 12, lineHeight: 1.4 }}>{st.label}</div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;

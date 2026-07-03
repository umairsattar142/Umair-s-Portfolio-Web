import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import { fadeUp } from "../lib/motionVariants";
import useReducedMotion from "../lib/useReducedMotion";

const SERVICES = [
  {
    n: "01",
    title: "Full-Stack Product Engineering",
    desc: "End-to-end delivery — from system design and API architecture to a polished, responsive interface that ships fast.",
  },
  {
    n: "02",
    title: "Scalable Backend Architecture",
    desc: "Clean Architecture, CQRS and SOLID backends built for multi-tenant scale, security and long-term maintainability.",
  },
  {
    n: "03",
    title: "Performance Optimization",
    desc: "Query tuning, pagination and caching strategies that cut response times and failure rates measurably.",
  },
  {
    n: "04",
    title: "Cloud & DevOps Integration",
    desc: "AWS S3, Azure DevOps, Hangfire background jobs and pipelines wired for reliable, repeatable shipping.",
  },
];

const Services = () => {
  const reduced = useReducedMotion();

  return (
    <section
      id="services"
      className="relative z-[1]"
      style={{ maxWidth: 1240, margin: "0 auto", padding: "100px clamp(20px,6vw,64px)" }}
    >
      <motion.div
        {...fadeUp(reduced, 0)}
        className="font-mono uppercase"
        style={{ fontSize: 12, letterSpacing: "0.3em", color: "#38e1ff", marginBottom: 18 }}
      >
        06 — Services
      </motion.div>
      <motion.h2
        {...fadeUp(reduced, 0.08)}
        className="font-display font-semibold"
        style={{ fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-0.02em", margin: "0 0 40px" }}
      >
        How I can help.
      </motion.h2>

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
        {SERVICES.map((sv, i) => (
          <motion.div key={sv.n} {...fadeUp(reduced, 0.1 + i * 0.06)}>
            <TiltCard
              className="group transition-shadow duration-500 hover:shadow-[0_18px_45px_rgba(56,225,255,0.16)]"
              style={{
                border: "1px solid rgba(255,255,255,0.09)",
                background: "rgba(255,255,255,0.025)",
                borderRadius: 20,
                padding: "30px 26px",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                className="font-display font-bold inline-block origin-left transition-all duration-500 ease-out [-webkit-text-stroke:1px_rgba(167,139,250,0.5)] group-hover:scale-110 group-hover:[-webkit-text-stroke:1px_rgba(56,225,255,0.9)]"
                style={{ fontSize: 15, color: "transparent", letterSpacing: "0.05em" }}
              >
                {sv.n}
              </div>
              <h3
                className="font-display font-semibold transition-colors duration-300 group-hover:text-accent-cyan"
                style={{ fontSize: 20, margin: "16px 0 8px", lineHeight: 1.25 }}
              >
                {sv.title}
              </h3>
              <div
                className="w-6 group-hover:w-12 transition-all duration-500 ease-out"
                style={{
                  height: 2,
                  marginBottom: 12,
                  background: "linear-gradient(90deg,#38e1ff,#a78bfa)",
                  borderRadius: 2,
                }}
              />
              <p style={{ color: "#9aa3b7", fontSize: 14.5, lineHeight: 1.65, margin: 0 }}>{sv.desc}</p>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;

import { motion } from "framer-motion";
import Constellation from "./Constellation";
import { fadeUp } from "../lib/motionVariants";
import useReducedMotion from "../lib/useReducedMotion";

const SKILL_GROUPS = [
  { title: "Languages", items: ["C#", "JavaScript", "Python"] },
  { title: "Backend", items: ["ASP.NET Core", "EF Core", "LINQ", "Node.js", "Express", "FastAPI", "MediatR", "Hangfire"] },
  { title: "Frontend", items: ["React.js", "Next.js", "Angular", "Redux", "SignalR"] },
  { title: "Databases", items: ["SQL Server", "PostgreSQL", "MongoDB", "MySQL"] },
  { title: "Cloud & Tools", items: ["Azure DevOps", "AWS S3", "Git", "Docker", "ClosedXML"] },
  {
    title: "Practices",
    items: ["Clean Architecture", "Modular Monolith", "SOLID Principles", "Unit Testing", "Integration Testing", "Agile/Scrum"],
  },
  {
    title: "Soft Skills",
    items: ["Collaboration", "Leadership", "Communication", "Problem Solving", "Adaptability"],
  },
];

const SKILL_NODES = [
  "C#", ".NET Core", "React", "Next.js", "Angular", "Node.js", "Express", "FastAPI", "Python", "EF Core", "LINQ",
  "MediatR", "Redux", "SignalR", "Hangfire", "PostgreSQL", "MongoDB", "SQL Server", "MySQL", "AWS S3",
  "Azure DevOps", "Docker", "Git", "JavaScript", "CQRS",
];

const Skills = () => {
  const reduced = useReducedMotion();

  return (
    <section
      id="skills"
      className="relative z-[1]"
      style={{ maxWidth: 1240, margin: "0 auto", padding: "100px clamp(20px,6vw,64px)" }}
    >
      <motion.div
        {...fadeUp(reduced, 0)}
        className="font-mono uppercase"
        style={{ fontSize: 12, letterSpacing: "0.3em", color: "#38e1ff", marginBottom: 18 }}
      >
        02 — Capabilities
      </motion.div>
      <motion.h2
        {...fadeUp(reduced, 0.08)}
        className="font-display font-semibold"
        style={{ fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-0.02em", margin: "0 0 8px" }}
      >
        A constellation of tools.
      </motion.h2>
      <motion.p {...fadeUp(reduced, 0.14)} style={{ color: "#9aa3b7", fontSize: 16, maxWidth: 560, margin: "0 0 34px" }}>
        Move your cursor through the network — everything I build with, connected.
      </motion.p>

      <motion.div
        {...fadeUp(reduced, 0.18)}
        className="relative"
        style={{
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 22,
          overflow: "hidden",
          background: "rgba(255,255,255,0.02)",
          height: "clamp(320px,46vw,460px)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Constellation nodes={SKILL_NODES} />
      </motion.div>

      <motion.div {...fadeUp(reduced, 0.22)} className="flex flex-wrap" style={{ gap: 22, marginTop: 34 }}>
        {SKILL_GROUPS.map((g) => (
          <div key={g.title} style={{ flex: 1, minWidth: 180 }}>
            <div
              className="font-mono uppercase"
              style={{ fontSize: 11, letterSpacing: "0.2em", color: "#a78bfa", marginBottom: 12 }}
            >
              {g.title}
            </div>
            <div className="flex flex-wrap" style={{ gap: 8 }}>
              {g.items.map((item) => (
                <span
                  key={item}
                  style={{
                    fontSize: 13,
                    color: "#c4ccdb",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.03)",
                    padding: "6px 12px",
                    borderRadius: 8,
                    transition: "all .3s",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;

import { motion } from "framer-motion";
import { fadeUp } from "../lib/motionVariants";
import useReducedMotion from "../lib/useReducedMotion";

const TIMELINE = [
  {
    role: "Software Engineer",
    company: "VaporVM",
    period: "Jan 2025 — Present",
    points: [
      "Architected and delivered scalable multi-tenant applications, owning the full development lifecycle from system design and API development to deployment and optimization using .NET Core, React.js, PostgreSQL, and MongoDB.",
      "Designed and optimized RESTful APIs with efficient data pagination and query optimization, improving average response times by 40%.",
      "Implemented Role-Based Access Control (RBAC) with claims-based authorization to provide module- and tenant-level permissions.",
      "Built an expiry-notification service with Hangfire for scheduled and recurring reminders, improving on-time renewals.",
      "Enhanced bulk asset upload with row-level validation, error reporting, and data parsing, reducing upload failures by 70%.",
      "Integrated AWS S3 for file storage, Hangfire for scheduled notifications, and third-party services for video calling and AI assistance.",
      "Improved application performance by 30% through efficient front-end and back-end optimization strategies.",
      "Ensured quality with unit, integration, and performance testing; collaborated in Agile sprints and performed code reviews.",
    ],
    tags: [".NET Core", "React.js", "PostgreSQL", "MongoDB", "Hangfire", "AWS S3"],
  },
  {
    role: "Associate Software Engineer",
    company: "VentureDive",
    period: "Jun 2024 — Jan 2025",
    points: [
      "Developed and maintained backend APIs using ASP.NET Core and Entity Framework Core, following Clean Architecture and SOLID principles.",
      "Designed and implemented backend services using Python (FastAPI), handling database schema design, query optimization, and scalable API development.",
      "Built responsive frontend components using React.js and Next.js, integrating with RESTful APIs for seamless data flow.",
      "Worked with SQL Server and PostgreSQL databases for designing schemas, writing optimized queries, and managing migrations.",
      "Created RESTful APIs with Node.js and Express.js, integrating frontend-backend communication with a focus on data security via HTTPS and API keys.",
      "Implemented state management using Redux and developed reusable, modular frontend code using JavaScript, CSS, and HTML.",
      "Conducted unit and integration testing to ensure code quality and reliability across multiple modules.",
      "Collaborated with cross-functional teams in Agile sprints, participating in code reviews and sprint planning.",
    ],
    tags: ["ASP.NET Core", "FastAPI", "Next.js", "Redux", "Node.js"],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "INTERNNCRAFT",
    period: "Feb 2024 — Apr 2024",
    points: [
      "Gained hands-on experience in full-stack development using .NET Core, React.js, and MongoDB.",
      "Successfully completed two comprehensive web design and development projects, applying Clean Architecture and responsive UI principles.",
      "Integrated and optimized API endpoints, reducing latency in data retrieval and improving performance on key pages.",
      "Developed and optimized robust back-end solutions in .NET Core to support seamless application functionality.",
    ],
    tags: [".NET Core", "React.js", "MongoDB"],
  },
];

const Experience = () => {
  const reduced = useReducedMotion();

  return (
    <section
      id="experience"
      className="relative z-[1]"
      style={{ maxWidth: 1000, margin: "0 auto", padding: "100px clamp(20px,6vw,64px)" }}
    >
      <motion.div
        {...fadeUp(reduced, 0)}
        className="font-mono uppercase"
        style={{ fontSize: 12, letterSpacing: "0.3em", color: "#38e1ff", marginBottom: 18 }}
      >
        03 — Trajectory
      </motion.div>
      <motion.h2
        {...fadeUp(reduced, 0.08)}
        className="font-display font-semibold"
        style={{ fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-0.02em", margin: "0 0 46px" }}
      >
        Experience timeline.
      </motion.h2>

      <div className="relative" style={{ paddingLeft: 34 }}>
        <div
          className="absolute"
          style={{ left: 7, top: 6, bottom: 6, width: 2, background: "linear-gradient(#38e1ff,#a78bfa,transparent)" }}
        />
        {TIMELINE.map((job, i) => (
          <motion.div key={job.role} {...fadeUp(reduced, 0.1 + i * 0.08)} className="relative" style={{ marginBottom: 40 }}>
            <span
              className="absolute"
              style={{
                left: -34,
                top: 4,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#05060a",
                border: "2px solid #38e1ff",
                boxShadow: "0 0 16px rgba(56,225,255,0.6)",
              }}
            />
            <div className="flex flex-wrap justify-between items-baseline" style={{ gap: 8 }}>
              <h3 className="font-display font-semibold" style={{ fontSize: 21, margin: 0 }}>
                {job.role} <span style={{ color: "#38e1ff" }}>· {job.company}</span>
              </h3>
              <span className="font-mono" style={{ fontSize: 12, color: "#7b8398" }}>
                {job.period}
              </span>
            </div>
            <ul className="flex flex-col" style={{ margin: "14px 0 0", padding: 0, listStyle: "none", gap: 9 }}>
              {job.points.map((p) => (
                <li key={p} className="relative" style={{ paddingLeft: 20, color: "#9aa3b7", fontSize: 15, lineHeight: 1.6 }}>
                  <span
                    className="absolute"
                    style={{ left: 0, top: 9, width: 6, height: 6, borderRadius: "50%", background: "#a78bfa" }}
                  />
                  {p}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap" style={{ gap: 7, marginTop: 14 }}>
              {job.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    color: "#7b8398",
                    border: "1px solid rgba(255,255,255,0.09)",
                    padding: "4px 9px",
                    borderRadius: 6,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;

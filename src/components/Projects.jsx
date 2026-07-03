import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import { fadeUp } from "../lib/motionVariants";
import useReducedMotion from "../lib/useReducedMotion";
import itamImage from "../images/itam-login.png";
import vhawkImage from "../images/vhawk-login.png";
import rarefindsImage from "../images/rarefinds-app.png";

const PROJECTS = [
  {
    name: "IT Asset Management System",
    tag: "ITAM · Multi-tenant SaaS",
    desc: "A multi-tenant platform for IT asset tracking and lifecycle management with RBAC and tenant-level data isolation, bulk export/import with row-level validation, and automated expiry notifications via Hangfire.",
    stack: [".NET Core", "React.js", "PostgreSQL", "MongoDB", "Hangfire", "AWS S3", "ClosedXML"],
    cta: "Case study",
    href: "https://github.com/umairsattar142",
    image: itamImage,
  },
  {
    name: "VHAWK — Vulnerability Platform",
    tag: "Security · Vulnerability assessment tool",
    desc: "A vulnerability assessment tool with filterable dashboards across severity, CVE, status and affected assets — built on modular Clean Architecture with CQRS (MediatR) and polyglot persistence, with AWS S3, Dyte and Claude AI integrations.",
    stack: [".NET Core", "EF Core", "MediatR", "MongoDB", "PostgreSQL", "Hangfire", "AWS S3", "Docker"],
    cta: "Learn more",
    href: "https://github.com/umairsattar142",
    image: vhawkImage,
  },
  {
    name: "RareFinds — Blockchain Marketplace",
    tag: "Web3 · Final Year Project",
    desc: "A blockchain-based auction marketplace using smart contracts and escrow-based payments to ensure secure, transparent transactions across web and mobile.",
    stack: ["React.js", "React Native", "Solidity", "Web3.js"],
    cta: "View repo",
    href: "https://github.com/umairsattar142/rarefindsFyp",
    image: rarefindsImage,
  },
];

const Projects = () => {
  const reduced = useReducedMotion();

  return (
    <section
      id="work"
      className="relative z-[1]"
      style={{ maxWidth: 1240, margin: "0 auto", padding: "100px clamp(20px,6vw,64px)" }}
    >
      <motion.div
        {...fadeUp(reduced, 0)}
        className="font-mono uppercase"
        style={{ fontSize: 12, letterSpacing: "0.3em", color: "#38e1ff", marginBottom: 18 }}
      >
        04 — Selected Work
      </motion.div>
      <motion.h2
        {...fadeUp(reduced, 0.08)}
        className="font-display font-semibold"
        style={{ fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-0.02em", margin: "0 0 40px" }}
      >
        Featured projects.
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 26 }}>
        {PROJECTS.map((pr, i) => (
          <motion.div key={pr.name} {...fadeUp(reduced, 0.1 + i * 0.08)}>
            <TiltCard
              style={{
                border: "1px solid rgba(255,255,255,0.09)",
                background: "rgba(255,255,255,0.025)",
                borderRadius: 22,
                padding: 0,
                overflow: "hidden",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="relative"
                style={{
                  height: 190,
                  overflow: "hidden",
                  background: "linear-gradient(135deg,rgba(56,225,255,0.12),rgba(167,139,250,0.12))",
                }}
              >
                <img
                  src={pr.image}
                  alt={`${pr.name} preview`}
                  className="absolute inset-0 w-full h-full"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg,rgba(5,6,10,0) 55%,rgba(5,6,10,0.55) 100%)" }}
                />
                <div
                  className="absolute font-mono uppercase"
                  style={{
                    top: 16,
                    left: 18,
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    color: "#c4ccdb",
                    background: "rgba(5,6,10,0.5)",
                    padding: "5px 11px",
                    borderRadius: 100,
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {pr.tag}
                </div>
              </div>
              <div style={{ padding: "26px 26px 28px" }}>
                <h3 className="font-display font-semibold" style={{ fontSize: 23, margin: "0 0 10px" }}>
                  {pr.name}
                </h3>
                <p style={{ color: "#9aa3b7", fontSize: 14.5, lineHeight: 1.65, margin: "0 0 18px" }}>{pr.desc}</p>
                <div className="flex flex-wrap" style={{ gap: 7, marginBottom: 20 }}>
                  {pr.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono"
                      style={{
                        fontSize: 11,
                        color: "#8b93a7",
                        border: "1px solid rgba(255,255,255,0.1)",
                        padding: "4px 9px",
                        borderRadius: 6,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href={pr.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-semibold inline-flex items-center"
                  style={{ textDecoration: "none", gap: 8, fontSize: 14, color: "#38e1ff", transition: "gap .3s" }}
                >
                  {pr.cta} →
                </a>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

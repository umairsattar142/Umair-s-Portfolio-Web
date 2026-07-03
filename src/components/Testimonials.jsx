import { useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../lib/motionVariants";
import useReducedMotion from "../lib/useReducedMotion";

const TESTIMONIALS = [
  {
    quote:
      "Umair owns problems end to end. He redesigned our asset-upload pipeline and cut failures dramatically — reliable, fast, and thoughtfully architected.",
    name: "Engineering Lead",
    role: "VaporVM",
    initials: "VM",
  },
  {
    quote:
      "One of the most adaptable engineers I have worked with. He picks up new stacks in days and ships production-grade code with real care.",
    name: "Team Lead",
    role: "VentureDive",
    initials: "VD",
  },
  {
    quote:
      "Clean architecture, sharp API design, and an eye for performance. Umair consistently delivers work that raises the bar for the whole team.",
    name: "Senior Engineer",
    role: "Peer Review",
    initials: "SE",
  },
];

const LOOP = TESTIMONIALS.concat(TESTIMONIALS);

const Testimonials = () => {
  const trackRef = useRef(null);
  const reduced = useReducedMotion();

  const pause = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const resume = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return (
    <section id="voices" className="relative z-[1]" style={{ padding: "100px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 clamp(20px,6vw,64px)" }}>
        <motion.div
          {...fadeUp(reduced, 0)}
          className="font-mono uppercase"
          style={{ fontSize: 12, letterSpacing: "0.3em", color: "#38e1ff", marginBottom: 18 }}
        >
          08 — Voices
        </motion.div>
        <motion.h2
          {...fadeUp(reduced, 0.08)}
          className="font-display font-semibold"
          style={{ fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-0.02em", margin: "0 0 40px" }}
        >
          What teammates say.
        </motion.h2>
      </div>

      <div
        className="relative"
        style={{
          maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
          WebkitMaskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
        }}
      >
        <div
          ref={trackRef}
          className={reduced ? "flex" : "flex animate-marquee"}
          style={{ gap: 20, width: "max-content", padding: "0 20px" }}
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          {LOOP.map((tm, i) => (
            <div
              key={`${tm.name}-${i}`}
              style={{
                width: 380,
                flexShrink: 0,
                border: "1px solid rgba(255,255,255,0.09)",
                background: "rgba(255,255,255,0.025)",
                borderRadius: 18,
                padding: 26,
                backdropFilter: "blur(10px)",
              }}
            >
              <p style={{ color: "#d3dae7", fontSize: 15, lineHeight: 1.7, margin: "0 0 20px", fontStyle: "italic" }}>
                &quot;{tm.quote}&quot;
              </p>
              <div className="flex items-center" style={{ gap: 12 }}>
                <span
                  className="font-display font-bold"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#38e1ff,#a78bfa)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#05060a",
                    fontSize: 14,
                  }}
                >
                  {tm.initials}
                </span>
                <div>
                  <div className="font-display font-semibold" style={{ fontSize: 14 }}>
                    {tm.name}
                  </div>
                  <div className="font-mono" style={{ fontSize: 11, color: "#7b8398" }}>
                    {tm.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import { useRef } from "react";
import useReducedMotion from "../lib/useReducedMotion";

const TiltCard = ({ children, className = "", style = {}, glowColor = "rgba(56,225,255,0.16)" }) => {
  const ref = useRef(null);
  const glowRef = useRef(null);
  const reduced = useReducedMotion();

  const handleMouseMove = (e) => {
    if (reduced) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateZ(6px)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(420px circle at ${(px + 0.5) * 100}% ${
        (py + 0.5) * 100
      }%, ${glowColor}, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
    if (glowRef.current) glowRef.current.style.background = "transparent";
  };

  return (
    <div
      ref={ref}
      data-tilt
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        position: "relative",
        height: "100%",
        boxSizing: "border-box",
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "transform .3s",
        ...style,
      }}
    >
      <div
        ref={glowRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", transition: "background .2s" }}
      />
      <div style={{ position: "relative", height: "100%" }}>{children}</div>
    </div>
  );
};

export default TiltCard;

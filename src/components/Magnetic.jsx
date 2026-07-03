import { useEffect, useRef } from "react";

const Magnetic = ({ children, strengthX = 0.3, strengthY = 0.45, className = "", style = {} }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return undefined;

    const mv = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * strengthX}px,${y * strengthY}px)`;
    };
    const lv = () => {
      el.style.transform = "translate(0,0)";
    };
    el.addEventListener("mousemove", mv);
    el.addEventListener("mouseleave", lv);
    return () => {
      el.removeEventListener("mousemove", mv);
      el.removeEventListener("mouseleave", lv);
    };
  }, [strengthX, strengthY]);

  return (
    <span
      ref={ref}
      data-magnetic
      className={className}
      style={{ display: "inline-block", transition: "transform .3s cubic-bezier(.2,.8,.2,1)", ...style }}
    >
      {children}
    </span>
  );
};

export default Magnetic;

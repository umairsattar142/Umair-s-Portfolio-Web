import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../lib/useReducedMotion";

const Counter = ({ value, suffix = "", duration = 1500 }) => {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (reduced) {
      setDisplay(value);
      return undefined;
    }

    let raf;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const t0 = performance.now();
          const step = (t) => {
            let p = Math.min((t - t0) / duration, 1);
            p = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(p * value));
            if (p < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration, reduced]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

export default Counter;

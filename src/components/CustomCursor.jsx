import { useEffect } from "react";

const HOVER_SELECTOR = "a,button,[data-tilt],[data-magnetic],input,textarea";

const CustomCursor = () => {
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return undefined;

    const dot = document.createElement("div");
    const ring = document.createElement("div");
    Object.assign(dot.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: "#38e1ff",
      pointerEvents: "none",
      zIndex: "99999",
      transform: "translate(-50%,-50%)",
      transition: "width .2s,height .2s,opacity .3s",
      boxShadow: "0 0 10px #38e1ff",
    });
    Object.assign(ring.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      border: "1px solid rgba(56,225,255,0.6)",
      pointerEvents: "none",
      zIndex: "99998",
      transform: "translate(-50%,-50%)",
      transition: "width .25s,height .25s,border-color .25s,background .25s",
      boxShadow: "0 0 22px rgba(56,225,255,0.22)",
    });
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.documentElement.style.cursor = "none";

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let mx = rx;
    let my = ry;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    };
    window.addEventListener("mousemove", move);

    let raf;
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      raf = requestAnimationFrame(loop);
    };
    loop();

    const over = (e) => {
      if (e.target.closest && e.target.closest(HOVER_SELECTOR)) {
        ring.style.width = "58px";
        ring.style.height = "58px";
        ring.style.background = "rgba(167,139,250,0.08)";
        ring.style.borderColor = "rgba(167,139,250,0.8)";
      }
    };
    const out = (e) => {
      if (e.target.closest && e.target.closest(HOVER_SELECTOR)) {
        ring.style.width = "36px";
        ring.style.height = "36px";
        ring.style.background = "transparent";
        ring.style.borderColor = "rgba(56,225,255,0.6)";
      }
    };
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.documentElement.style.cursor = "";
      cancelAnimationFrame(raf);
      dot.remove();
      ring.remove();
    };
  }, []);

  return null;
};

export default CustomCursor;

import { useEffect, useRef } from "react";
import useReducedMotion from "../lib/useReducedMotion";

const Constellation = ({ nodes }) => {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio, 2);
    let W = 0;
    let H = 0;
    const dots = [];

    const resize = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();

    for (let i = 0; i < nodes.length; i++) {
      dots.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        label: nodes[i],
        r: 2 + Math.random() * 2,
      });
    }

    const mouse = { x: -999, y: -999 };
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);

    let raf;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < dots.length; i++) {
        const n = dots[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 8 || n.x > W - 8) n.vx *= -1;
        if (n.y < 8 || n.y > H - 8) n.vy *= -1;
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 148) {
            const o = (1 - d / 148) * 0.32;
            ctx.strokeStyle = `rgba(120,175,255,${o})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < dots.length; i++) {
        const n = dots[i];
        const dm = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const near = dm < 130;
        ctx.beginPath();
        ctx.fillStyle = near ? "#a78bfa" : "#38e1ff";
        ctx.shadowColor = near ? "#a78bfa" : "#38e1ff";
        ctx.shadowBlur = near ? 18 : 7;
        ctx.arc(n.x, n.y, near ? n.r + 1.6 : n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = near ? "rgba(255,255,255,0.95)" : "rgba(200,215,235,0.5)";
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.fillText(n.label, n.x + 9, n.y - 8);
      }
    };

    if (reduced) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [nodes, reduced]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default Constellation;

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "./lenisInstance";

export default function useLenis(reduced) {
  useEffect(() => {
    if (reduced) return undefined;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 1 });
    setLenis(lenis);

    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced]);
}

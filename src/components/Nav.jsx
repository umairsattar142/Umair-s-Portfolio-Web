import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
import { getLenis } from "../lib/lenisInstance";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
];

const scrollToHash = (e, href) => {
  const target = document.querySelector(href);
  if (!target) return;
  e.preventDefault();
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(target, { offset: -10, duration: 1.2 });
  else window.scrollTo({ top: target.offsetTop - 10, behavior: "smooth" });
};

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled(y > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[900] flex items-center justify-between border-b px-4 sm:px-6 md:px-[clamp(20px,5vw,64px)] py-3 sm:py-[18px]"
      style={{
        background: scrolled ? "rgba(8,10,16,0.72)" : "transparent",
        borderColor: scrolled ? "rgba(255,255,255,0.08)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
        transition: "background .4s,border-color .4s,backdrop-filter .4s",
      }}
    >
      <a
        href="#home"
        onClick={(e) => scrollToHash(e, "#home")}
        className="flex items-center gap-2 sm:gap-[11px] no-underline"
        style={{ color: "#e7ecf3", textDecoration: "none" }}
      >
        <span
          className="font-display font-bold flex items-center justify-center flex-shrink-0"
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            background: "linear-gradient(135deg,#38e1ff,#a78bfa)",
            color: "#05060a",
            boxShadow: "0 0 22px rgba(56,225,255,0.45)",
          }}
        >
          U
        </span>
        <span
          className="font-display font-semibold hidden sm:inline whitespace-nowrap"
          style={{ letterSpacing: "0.02em", fontSize: 16 }}
        >
          Umair Sattar
        </span>
      </a>

      <div className="flex items-center gap-2 sm:gap-1.5">
        <div className="hidden md:flex" style={{ gap: 4 }}>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => scrollToHash(e, l.href)}
              className="transition-colors hover:!text-fg"
              style={{
                textDecoration: "none",
                color: "#9aa3b7",
                fontSize: 14,
                padding: "8px 14px",
                borderRadius: 8,
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <Magnetic>
          <a
            href="#contact"
            onClick={(e) => scrollToHash(e, "#contact")}
            className="font-display font-semibold inline-flex items-center whitespace-nowrap text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5"
            style={{
              textDecoration: "none",
              gap: 8,
              color: "#05060a",
              background: "linear-gradient(135deg,#38e1ff,#a78bfa)",
              borderRadius: 10,
              boxShadow: "0 0 24px rgba(56,225,255,0.35)",
            }}
          >
            Let&apos;s talk
          </a>
        </Magnetic>
      </div>
    </nav>
  );
};

export default Nav;

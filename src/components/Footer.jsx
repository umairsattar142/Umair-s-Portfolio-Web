const SOCIALS = [
  { label: "GitHub", href: "https://github.com/umairsattar142" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/umair-sattar-90917623b" },
  { label: "Email", href: "mailto:usattar307@gmail.com" },
];

const Footer = () => (
  <footer
    className="relative z-[1] flex flex-wrap items-center justify-between"
    style={{
      borderTop: "1px solid rgba(255,255,255,0.07)",
      padding: "40px clamp(20px,6vw,64px)",
      gap: 16,
      maxWidth: 1400,
      margin: "0 auto",
    }}
  >
    <div className="flex items-center" style={{ gap: 11 }}>
      <span
        className="font-display font-bold"
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: "linear-gradient(135deg,#38e1ff,#a78bfa)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#05060a",
          fontSize: 14,
        }}
      >
        U
      </span>
      <span className="font-mono" style={{ fontSize: 12, color: "#7b8398" }}>
        © 2026 Umair Sattar · Built with obsessive detail
      </span>
    </div>
    <div className="flex" style={{ gap: 20 }}>
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono transition-colors hover:!text-accent-cyan"
          style={{ textDecoration: "none", fontSize: 12, color: "#9aa3b7" }}
        >
          {s.label}
        </a>
      ))}
    </div>
  </footer>
);

export default Footer;

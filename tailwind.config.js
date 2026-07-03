/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
      extend: {
        colors: {
          ink: "#05060a",
          fg: "#e7ecf3",
          muted: "#9aa3b7",
          dim: "#7b8398",
          accent: {
            cyan: "#38e1ff",
            violet: "#a78bfa",
          },
        },
        fontFamily: {
          display: ["'Space Grotesk'", "system-ui", "sans-serif"],
          body: ["'Sora'", "system-ui", "sans-serif"],
          mono: ["'JetBrains Mono'", "monospace"],
        },
        keyframes: {
          gradMove: { to: { backgroundPosition: "200% center" } },
          auroraA: {
            "0%,100%": { transform: "translate(-10%,-10%) scale(1)" },
            "50%": { transform: "translate(15%,10%) scale(1.25)" },
          },
          auroraB: {
            "0%,100%": { transform: "translate(10%,5%) scale(1.1)" },
            "50%": { transform: "translate(-12%,-8%) scale(0.9)" },
          },
          floaty: {
            "0%,100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-14px)" },
          },
          pulseCue: {
            "0%,100%": { opacity: 0.3, transform: "translateY(0)" },
            "50%": { opacity: 1, transform: "translateY(8px)" },
          },
          marq: { to: { transform: "translateX(-50%)" } },
        },
        animation: {
          gradMove: "gradMove 6s linear infinite",
          auroraA: "auroraA 18s ease-in-out infinite",
          auroraB: "auroraB 22s ease-in-out infinite",
          floaty: "floaty 2s ease-in-out infinite",
          pulseCue: "pulseCue 1.8s ease-in-out infinite",
          marquee: "marq 40s linear infinite",
        },
      },
    },
    plugins: [],
  };

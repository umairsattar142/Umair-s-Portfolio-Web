const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div
      className="absolute rounded-full animate-auroraA"
      style={{
        top: "-20%",
        left: "-10%",
        width: "70vw",
        height: "70vw",
        background: "radial-gradient(circle,rgba(56,225,255,0.16),transparent 62%)",
        filter: "blur(30px)",
      }}
    />
    <div
      className="absolute rounded-full animate-auroraB"
      style={{
        bottom: "-25%",
        right: "-15%",
        width: "75vw",
        height: "75vw",
        background: "radial-gradient(circle,rgba(167,139,250,0.16),transparent 62%)",
        filter: "blur(30px)",
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(circle at 50% 35%,#000 0%,transparent 78%)",
        WebkitMaskImage: "radial-gradient(circle at 50% 35%,#000 0%,transparent 78%)",
      }}
    />
    <div
      className="absolute inset-0"
      style={{ background: "radial-gradient(circle at 50% 0%,rgba(5,6,10,0) 40%,#05060a 92%)" }}
    />
  </div>
);

export default AmbientBackground;

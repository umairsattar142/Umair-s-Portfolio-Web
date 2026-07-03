export const fadeUp = (reduced, delay = 0) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 44 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
      };

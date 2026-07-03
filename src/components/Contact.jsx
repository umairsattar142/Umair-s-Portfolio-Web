import { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import { fadeUp } from "../lib/motionVariants";
import useReducedMotion from "../lib/useReducedMotion";

const SERVICE_ID = "service_z9gxrgb";
const TEMPLATE_ID = "template_p5s27qq";
const PUBLIC_KEY = "4DDf4SfBvIbbVjB_Y";

const fieldStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 10,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#e7ecf3",
  fontSize: 14.5,
  outline: "none",
};

const Contact = () => {
  const reduced = useReducedMotion();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        setResult({ success: true, message: "Thank you! Your message has been sent." });
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch(() => {
        setResult({ success: false, message: "Something went wrong. Please try again." });
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setResult(null), 5000);
      });
  };

  return (
    <section
      id="contact"
      className="relative z-[1] text-center"
      style={{ maxWidth: 1240, margin: "0 auto", padding: "110px clamp(20px,6vw,64px)" }}
    >
      <motion.div
        {...fadeUp(reduced, 0)}
        className="font-mono uppercase"
        style={{ fontSize: 12, letterSpacing: "0.3em", color: "#38e1ff", marginBottom: 22 }}
      >
        10 — Contact
      </motion.div>
      <motion.h2
        {...fadeUp(reduced, 0.08)}
        className="font-display font-bold"
        style={{ fontSize: "clamp(38px,7vw,88px)", lineHeight: 1, letterSpacing: "-0.03em", margin: 0 }}
      >
        Let&apos;s build
        <br />
        something{" "}
        <span
          style={{
            backgroundImage: "linear-gradient(90deg,#38e1ff,#a78bfa)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          unforgettable.
        </span>
      </motion.h2>
      <motion.p
        {...fadeUp(reduced, 0.16)}
        style={{ color: "#9aa3b7", fontSize: 18, margin: "28px auto 40px", maxWidth: 520, lineHeight: 1.7 }}
      >
        Have a role, a product, or an idea? I&apos;m open to opportunities and collaborations.
      </motion.p>
      <motion.div {...fadeUp(reduced, 0.22)} className="flex flex-wrap justify-center" style={{ gap: 16 }}>
        <Magnetic>
          <a
            href="mailto:usattar307@gmail.com"
            className="font-display font-semibold inline-flex items-center"
            style={{
              textDecoration: "none",
              gap: 10,
              fontSize: 17,
              color: "#05060a",
              background: "linear-gradient(135deg,#38e1ff,#a78bfa)",
              padding: "17px 36px",
              borderRadius: 13,
              boxShadow: "0 10px 50px rgba(56,225,255,0.4)",
            }}
          >
            usattar307@gmail.com
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href="tel:+923057362141"
            className="font-display font-semibold inline-flex items-center"
            style={{
              textDecoration: "none",
              gap: 10,
              fontSize: 17,
              color: "#e7ecf3",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "17px 36px",
              borderRadius: 13,
              backdropFilter: "blur(10px)",
            }}
          >
            +92 305 7362141
          </a>
        </Magnetic>
      </motion.div>

      <motion.form
        {...fadeUp(reduced, 0.28)}
        onSubmit={handleSubmit}
        className="text-left"
        style={{
          maxWidth: 560,
          margin: "56px auto 0",
          border: "1px solid rgba(255,255,255,0.09)",
          background: "rgba(255,255,255,0.025)",
          borderRadius: 20,
          padding: 30,
          backdropFilter: "blur(10px)",
        }}
      >
        <h3 className="font-display font-semibold" style={{ fontSize: 18, margin: "0 0 20px" }}>
          Or send a message directly
        </h3>

        {result && (
          <div
            style={{
              marginBottom: 18,
              padding: "12px 14px",
              borderRadius: 10,
              fontSize: 13.5,
              color: result.success ? "#7ef7c6" : "#ff9b9b",
              background: result.success ? "rgba(56,225,150,0.08)" : "rgba(255,80,80,0.08)",
              border: `1px solid ${result.success ? "rgba(56,225,150,0.3)" : "rgba(255,80,80,0.3)"}`,
            }}
          >
            {result.message}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 14, marginBottom: 14 }}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            style={fieldStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            style={fieldStyle}
          />
        </div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          style={{ ...fieldStyle, marginBottom: 14 }}
        />
        <textarea
          name="message"
          placeholder="Your message..."
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          style={{ ...fieldStyle, marginBottom: 20, resize: "vertical" }}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="font-display font-semibold w-full"
          style={{
            padding: "14px 20px",
            borderRadius: 12,
            border: "none",
            cursor: isSubmitting ? "default" : "pointer",
            color: "#05060a",
            background: isSubmitting ? "rgba(255,255,255,0.15)" : "linear-gradient(135deg,#38e1ff,#a78bfa)",
            fontSize: 15,
          }}
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </motion.form>
    </section>
  );
};

export default Contact;

import { useEffect } from "react";
import useLenis from "../lib/useLenis";
import useReducedMotion from "../lib/useReducedMotion";
import AmbientBackground from "../components/AmbientBackground";
import ScrollProgress from "../components/ScrollProgress";
import CustomCursor from "../components/CustomCursor";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import TechStack from "../components/TechStack";
import Services from "../components/Services";
import Certifications from "../components/Certifications";
import Testimonials from "../components/Testimonials";
import GithubActivity from "../components/GithubActivity";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Portfolio = () => {
  const reduced = useReducedMotion();
  useLenis(reduced);

  useEffect(() => {
    if (!window.location.hash) return undefined;
    const t = setTimeout(() => {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
    }, 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden font-body" style={{ background: "#05060a", color: "#e7ecf3" }}>
      <AmbientBackground />
      <ScrollProgress />
      <CustomCursor />
      <Nav />

      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <TechStack />
      <Services />
      <Certifications />
      <Testimonials />
      <GithubActivity />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;

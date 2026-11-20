import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { StarBackground } from "./components/space/StarBackground";
import {
  About,
  Achievements,
  CareerDirection,
  CodePresence,
  Competitions,
  Contact,
  Contributions,
  CoreConcepts,
  Education,
  Footer,
  Hero,
  Projects,
  Skills,
} from "./components/Sections";

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("portfolio-theme");
    return saved === "light" ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <StarBackground />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar
        theme={theme}
        onThemeToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <main id="main-content">
        <Hero />
        <About />
        <Education />
        <Skills />
        <CoreConcepts />
        <Projects />
        <Competitions />
        <Contributions />
        <Achievements />
        <CodePresence />
        <CareerDirection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

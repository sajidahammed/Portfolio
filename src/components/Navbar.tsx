import { useEffect, useState } from "react";
import { navItems } from "../data";
import { Icon } from "./Icon";

type Props = {
  theme: "dark" | "light";
  onThemeToggle: () => void;
};

export function Navbar({ theme, onThemeToggle }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="nav-wrap">
      <nav className="navbar" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={() => setOpen(false)}>
          <span className="brand-mark">&lt;S/&gt;</span>
          <span>Sajid Ahammed</span>
        </a>
        <div className={`nav-links ${open ? "is-open" : ""}`}>
          {navItems.map(([label, id]) => (
            <a
              key={id}
              className={active === id ? "active" : ""}
              href={`#${id}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="icon-button theme-toggle"
            onClick={onThemeToggle}
            type="button"
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
          </button>
          <button
            aria-expanded={open}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="icon-button menu-button"
            onClick={() => setOpen(!open)}
            type="button"
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </nav>
    </header>
  );
}

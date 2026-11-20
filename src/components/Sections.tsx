import { type FormEvent, useState } from "react";
import { competitions, concepts, projects, skillGroups } from "../data";
import { Icon } from "./Icon";

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-header" data-reveal>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function SocialLinks({ labeled = false }: { labeled?: boolean }) {
  return (
    <div className={`social-links ${labeled ? "labeled" : ""}`}>
      <a
        aria-label="GitHub profile"
        href="https://github.com/sajidahammed"
        rel="noreferrer"
        target="_blank"
      >
        <Icon name="github" />
        {labeled && <span>GitHub</span>}
      </a>
      <button aria-label="LinkedIn profile, link coming soon" title="LinkedIn link coming soon" type="button">
        <Icon name="linkedin" />
        {labeled && <span>LinkedIn</span>}
      </button>
      <a aria-label="Email Sajid" href="mailto:sajid19024@gmail.com">
        <Icon name="mail" />
        {labeled && <span>Email</span>}
      </a>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid-pattern" />
      <div className="hero-copy" data-reveal>
        <div className="availability"><span /> Open to learning & collaboration</div>
        <p className="hello">Hello, I&apos;m</p>
        <h1>Md Sajid<br /><span>Ahammed.</span></h1>
        <p className="hero-role">CSE Student <i /> Aspiring Backend Software Engineer</p>
        <p className="hero-tagline">Building strong foundations in code, algorithms, and software engineering.</p>
        <p className="hero-intro">
          Computer Science and Engineering student at Daffodil International University,
          passionate about programming, problem solving, and building software through strong
          computer science fundamentals.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#projects">
            View My Projects <Icon name="arrow" size={18} />
          </a>
          <a className="button secondary" href="#contact">
            Contact Me <Icon name="mail" size={18} />
          </a>
        </div>
        <SocialLinks />
      </div>

      <div className="portrait-stage" data-reveal>
        <div className="orbit orbit-one"><span /></div>
        <div className="orbit orbit-two"><span /></div>
        <div className="orbit orbit-three" />
        <span className="particle p1" />
        <span className="particle p2" />
        <span className="particle p3" />
        <span className="particle p4" />
        <span className="code-particle cp1">&lt;/&gt;</span>
        <span className="code-particle cp2">{`{ }`}</span>
        <div className="portrait-frame">
          <img
            alt="Md Sajid Ahammed"
            className="portrait-photo"
            fetchPriority="high"
            src={`${import.meta.env.BASE_URL}assets/main-image.jpeg?v=2`}
          />
        </div>
        <div className="floating-code-card">
          <div className="code-dots"><i /><i /><i /></div>
          <code><b>const</b> goal = <em>&quot;backend&quot;</em>;</code>
          <code><b>while</b> (learning) grow();</code>
        </div>
      </div>

      <a className="scroll-cue" href="#about">
        <span>Scroll to explore</span><i />
      </a>
    </section>
  );
}

export function About() {
  const details = [
    ["Name", "Md Sajid Ahammed"],
    ["Role", "CSE Student"],
    ["University", "Daffodil International University"],
    ["Department", "Computer Science & Engineering"],
    ["Semester", "5th Semester / 2nd Year"],
    ["Location", "Savar, Dhaka"],
    ["Career Goal", "Backend Software Engineer"],
  ];
  return (
    <section className="section" id="about">
      <div className="container about-layout">
        <div className="about-copy" data-reveal>
          <span className="eyebrow">01 / About</span>
          <h2>Focused on the fundamentals.<br /><span>Building for the future.</span></h2>
          <p className="lead">
            I&apos;m a Computer Science and Engineering student currently studying in the 5th
            semester at Daffodil International University.
          </p>
          <p>
            I&apos;m passionate about programming and the core ideas that make software reliable:
            data structures, algorithms, object-oriented programming, and methodical problem
            solving. Every project is an opportunity to turn theory into something that works.
          </p>
          <p>
            My long-term goal is to become a professional Backend Software Engineer—building
            systems that are thoughtful, maintainable, and grounded in strong computer science.
          </p>
        </div>
        <div className="info-card" data-reveal>
          <div className="card-topline">
            <span>PROFILE.JSON</span><span className="status-dot">Active learner</span>
          </div>
          <dl>
            {details.map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt><dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section className="section compact-section" id="education">
      <div className="container">
        <SectionHeader
          eyebrow="02 / Education"
          title="The academic foundation"
          description="Learning the principles that sit behind good software engineering."
        />
        <div className="education-card" data-reveal>
          <div className="education-year"><span>Current</span><b>2024—</b></div>
          <div className="timeline-marker"><i /></div>
          <div className="education-content">
            <div className="education-icon"><Icon name="graduation" size={25} /></div>
            <div>
              <h3>Daffodil International University</h3>
              <p>Department of Computer Science and Engineering</p>
              <div className="meta-row">
                <span>5th Semester</span><span>2nd Year</span><span><Icon name="map" size={15} /> Savar, Dhaka</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section className="section tinted-section" id="skills">
      <div className="container">
        <SectionHeader
          eyebrow="03 / Technical toolkit"
          title="Skills I’m building with"
          description="A practical toolkit growing through coursework, independent practice, and collaborative projects."
        />
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <article className={`skill-card skill-${index + 1}`} data-reveal key={group.title}>
              <div className="skill-icon"><Icon name={group.icon} /></div>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <div className="tag-list">
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CoreConcepts() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <section className="section concepts-section">
      <div className="container">
        <SectionHeader
          eyebrow="04 / Foundations"
          title="Core concepts I work with"
          description="Core concepts I’m developing strong expertise in—one problem, pattern, and project at a time."
        />
        <div className="concept-grid">
          {concepts.map((concept) => {
            const isOpen = expanded === concept.title;
            return (
              <article className={`concept-card ${isOpen ? "expanded" : ""}`} data-reveal key={concept.title}>
                <span className="concept-number">{concept.number}</span>
                <h3>{concept.title}</h3>
                <p>{concept.summary}</p>
                <div className="concept-detail" aria-hidden={!isOpen}>{concept.detail}</div>
                <button
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : concept.title)}
                  type="button"
                >
                  {isOpen ? "Show less" : "Explore concept"} <Icon name="arrow" size={17} />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  const filters = ["All", "C", "C++", "Java", "Academic", "Personal"] as const;
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = projects.filter(
    (project) => filter === "All" || project.technology === filter || project.type === filter,
  );
  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <div className="projects-heading" data-reveal>
          <div>
            <span className="eyebrow">05 / Selected work</span>
            <h2>Featured Projects</h2>
            <p>Academic and personal console applications where concepts become working code.</p>
          </div>
          <div className="filters" aria-label="Filter projects">
            {filters.map((item) => (
              <button
                aria-pressed={filter === item}
                className={filter === item ? "active" : ""}
                key={item}
                onClick={() => setFilter(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="projects-grid">
          {visible.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className="project-index">0{projects.indexOf(project) + 1}</div>
              <div className="project-card-head">
                <span className={`project-badge ${project.status === "In Development" ? "running" : ""}`}>
                  {project.label}
                </span>
                <span className="project-tech">{project.technology}</span>
              </div>
              <div className="project-preview">
                <img
                  alt={`${project.title} preview`}
                  src={`${import.meta.env.BASE_URL}assets/projects/${project.image}`}
                />
              </div>
              <h3>{project.title}</h3>
              <p className="project-purpose">{project.purpose} · Console application</p>
              <p>{project.description}</p>
              <div className="tag-list project-tags">
                {project.concepts.map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="project-footer">
                <span className="project-status"><i />{project.status}</span>
                {project.github ? (
                  <a href={project.github} rel="noreferrer" target="_blank">
                    View repository <Icon name="external" size={17} />
                  </a>
                ) : (
                  <span className="repo-pending">Repository coming later</span>
                )}
              </div>
            </article>
          ))}
          {!visible.length && <p>No projects in this category yet.</p>}
        </div>
      </div>
    </section>
  );
}

export function Competitions() {
  return (
    <section className="section" id="competitions">
      <div className="container">
        <SectionHeader
          eyebrow="06 / Experiences"
          title="Competitions & Participation"
          description="Showing up, testing my thinking, and learning in a competitive environment."
        />
        <div className="competition-list">
          {competitions.map((item) => (
            <article className="competition-card" data-reveal key={item.title}>
              <span className="semester-number">{item.semester}</span>
              <div className="competition-icon"><Icon name={item.icon} /></div>
              <div>
                <span>{item.period}</span>
                <h3>{item.title}</h3>
                <p>{item.type} · Participation experience</p>
              </div>
              <Icon className="competition-arrow" name="arrow" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contributions() {
  const items = [
    ["Group Projects", "Collaborating with teammates to design, develop and present academic software projects.", "code"],
    ["Group Presentations", "Working with team members to research topics, prepare content and deliver presentations.", "people"],
    ["Laboratory Work", "Participating in collaborative lab tasks involving programming, problem solving and technical implementation.", "terminal"],
  ] as const;
  return (
    <section className="section collaboration-section" id="contributions">
      <div className="container">
        <div className="collaboration-layout">
          <div data-reveal>
            <span className="eyebrow">07 / Collaboration</span>
            <h2>Good work gets better<br />when it&apos;s shared.</h2>
            <p>
              Beyond individual programming practice, I have contributed to collaborative academic
              work through group presentations, software projects and laboratory activities.
            </p>
            <blockquote>
              “I believe good software is not only about writing code — it is also about communication,
              collaboration and contributing effectively to a team.”
            </blockquote>
          </div>
          <div className="contribution-stack">
            {items.map(([title, description, icon], index) => (
              <article data-reveal key={title}>
                <span>0{index + 1}</span>
                <div className="contribution-icon"><Icon name={icon} /></div>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Achievements() {
  return (
    <section className="section" id="achievements">
      <div className="container">
        <SectionHeader
          eyebrow="08 / Beyond the classroom"
          title="Achievements & Activities"
          description="Participation, service, and experiences that keep learning connected to the wider community."
        />
        <div className="achievement-grid">
          <article className="achievement-card" data-reveal>
            <div className="achievement-icon"><Icon name="award" size={28} /></div>
            <span>Participation</span>
            <h3>National Olympiad Participation</h3>
            <p>Participated in a national-level olympiad program involving students from different educational levels across Bangladesh.</p>
          </article>
          <article className="achievement-card" data-reveal>
            <div className="achievement-icon"><Icon name="people" size={28} /></div>
            <span>Volunteering</span>
            <h3>Math Olympiad Volunteer</h3>
            <p>Volunteered in a Math Olympiad event and contributed to the organization and support of the competition.</p>
          </article>
          <div className="certificate-placeholder" data-reveal>
            <Icon name="award" size={34} />
            <h3>Certificate gallery</h3>
            <p>A future-ready space for verified certificates and event documentation.</p>
            <span>Coming soon</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CodePresence() {
  return (
    <section className="section compact-section">
      <div className="container">
        <div className="github-card" data-reveal>
          <div className="github-watermark"><Icon name="github" size={240} /></div>
          <div className="github-icon"><Icon name="github" size={34} /></div>
          <div className="github-copy">
            <span className="eyebrow">My Code & Development</span>
            <h2>Learning in public, one repository at a time.</h2>
            <p>
              My GitHub is home to academic projects and programming practice in C, C++, and Java.
              Explore the code and follow the journey as I continue building.
            </p>
          </div>
          <a className="button light-button" href="https://github.com/sajidahammed" rel="noreferrer" target="_blank">
            View GitHub Profile <Icon name="external" size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function CareerDirection() {
  const steps = ["CS Fundamentals", "Problem Solving", "Data Structures & Algorithms", "Backend Development", "Software Engineering"];
  return (
    <section className="section career-section">
      <div className="container">
        <SectionHeader
          eyebrow="09 / The direction"
          title="What I’m working toward"
          description="My goal is to grow into a strong Backend Software Engineer by building deeper knowledge in algorithms, data structures, software architecture and backend development."
        />
        <div className="career-path" data-reveal>
          {steps.map((step, index) => (
            <div className="career-step" key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
              {index < steps.length - 1 && <Icon name="chevron" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) return;
    setSubmitted(true);
  }
  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-layout">
        <div className="contact-copy" data-reveal>
          <span className="eyebrow">10 / Contact</span>
          <h2>Let&apos;s build a<br /><span>connection.</span></h2>
          <p>Have a project idea, collaboration opportunity, or simply want to connect? Feel free to reach out.</p>
          <div className="contact-details">
            <a href="mailto:sajid19024@gmail.com">
              <span><Icon name="mail" /></span><div><small>Email</small><strong>sajid19024@gmail.com</strong></div>
            </a>
            <a href="https://github.com/sajidahammed" rel="noreferrer" target="_blank">
              <span><Icon name="github" /></span><div><small>GitHub</small><strong>@sajidahammed</strong></div>
            </a>
            <div>
              <span><Icon name="linkedin" /></span><div><small>LinkedIn</small><strong>Link coming soon</strong></div>
            </div>
          </div>
        </div>
        <form className="contact-form" data-reveal onSubmit={handleSubmit}>
          <div className="form-row">
            <label>YOUR NAME<input name="name" placeholder="How should I address you?" required /></label>
            <label>YOUR EMAIL<input name="email" placeholder="you@example.com" required type="email" /></label>
          </div>
          <label>YOUR MESSAGE<textarea minLength={10} name="message" placeholder="Tell me what you have in mind..." required rows={6} /></label>
          <button className="button primary" type="submit">Send Message <Icon name="arrow" size={18} /></button>
          <p className="form-note" role="status">
            {submitted
              ? "Thanks! This demo form is not connected to a mail service yet—please email me directly."
              : "This form is a UI preview. No message service is connected yet."}
          </p>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <div><strong>Md Sajid Ahammed</strong><span>CSE Student | Aspiring Backend Software Engineer</span></div>
        <SocialLinks />
        <p>© 2026 Md Sajid Ahammed. All rights reserved.</p>
      </div>
    </footer>
  );
}

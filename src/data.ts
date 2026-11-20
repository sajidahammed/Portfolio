export type IconName =
  | "arrow"
  | "award"
  | "briefcase"
  | "check"
  | "chevron"
  | "code"
  | "download"
  | "external"
  | "figma"
  | "github"
  | "graduation"
  | "layers"
  | "linkedin"
  | "mail"
  | "map"
  | "math"
  | "menu"
  | "moon"
  | "people"
  | "terminal"
  | "tools"
  | "sun"
  | "x";

export const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Competitions", "competitions"],
  ["Contributions", "contributions"],
  ["Achievements", "achievements"],
  ["Contact", "contact"],
] as const;

export const skillGroups = [
  {
    title: "Programming",
    icon: "terminal" as IconName,
    description: "Languages used across academic and practice projects.",
    skills: ["C", "C++", "Java"],
  },
  {
    title: "Web Foundations",
    icon: "code" as IconName,
    description: "Core technologies for structuring and styling the web.",
    skills: ["HTML", "CSS"],
  },
  {
    title: "CS Fundamentals",
    icon: "layers" as IconName,
    description: "The foundations behind clear, efficient software.",
    skills: ["Data Structures", "Algorithms", "OOP", "Problem Solving"],
  },
  {
    title: "Development Tools",
    icon: "tools" as IconName,
    description: "Tools used to write, manage, and collaborate on code.",
    skills: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Code::Blocks", "Antigravity"],
  },
  {
    title: "Design & Productivity",
    icon: "figma" as IconName,
    description: "Visual tools for planning, presenting, and communicating ideas.",
    skills: ["Figma", "Canva"],
  },
];

export const concepts = [
  {
    number: "01",
    title: "Data Structures",
    summary:
      "Working with fundamental data structures and understanding how data can be efficiently organized, stored and accessed.",
    detail: "Exploring arrays, linked structures, stacks, queues, trees, and graphs through coursework and projects.",
  },
  {
    number: "02",
    title: "Algorithms",
    summary:
      "Understanding algorithmic thinking, searching, sorting, graph-based problems and computational problem solving.",
    detail: "Comparing approaches and learning to reason about correctness, efficiency, and trade-offs.",
  },
  {
    number: "03",
    title: "Object-Oriented Programming",
    summary:
      "Applying classes, objects, encapsulation, inheritance and other OOP principles while developing Java applications.",
    detail: "Building maintainable console applications with clear responsibilities and reusable objects.",
  },
  {
    number: "04",
    title: "Problem Solving",
    summary:
      "Breaking down programming problems into logical steps and developing efficient solutions using programming fundamentals.",
    detail: "Practicing decomposition, edge-case analysis, debugging, and step-by-step solution design.",
  },
];

export type Project = {
  title: string;
  technology: "C" | "C++" | "Java";
  type: "Academic" | "Personal";
  label: string;
  purpose: string;
  description: string;
  concepts: string[];
  github?: string;
  status: string;
};

export const projects: Project[] = [
  {
    title: "Smart Route Planner",
    technology: "C++",
    type: "Academic",
    label: "Academic Project",
    purpose: "Algorithm Course",
    status: "Completed",
    github: "https://github.com/IfratulRian/Route-with-cpp",
    description:
      "A console-based route planning application developed to explore graph algorithms and efficient path finding. It works with route information to determine suitable paths using algorithmic techniques.",
    concepts: ["Graph", "Searching", "Path finding", "Binary Search", "Algorithm design", "C++"],
  },
  {
    title: "Blood Donation Management System",
    technology: "C",
    type: "Academic",
    label: "Academic Project",
    purpose: "Data Structures Course",
    status: "Completed",
    github: "https://github.com/sajidahammed/Blood-donation-by-c/tree/main",
    description:
      "A console-based blood donation management system developed in C to practice fundamental data structure concepts and organize donor-related information through programming logic.",
    concepts: ["Data Structures", "Data management", "Searching", "C programming", "Problem solving"],
  },
  {
    title: "Hospital Management System",
    technology: "Java",
    type: "Academic",
    label: "Running Project",
    purpose: "Object-Oriented Programming",
    status: "In Development",
    description:
      "A Java-based console application designed to represent basic hospital management operations while applying object-oriented programming principles.",
    concepts: ["Java", "OOP", "Classes", "Objects", "Encapsulation", "Object-oriented design"],
  },
  {
    title: "Smart Calculator",
    technology: "C",
    type: "Personal",
    label: "Personal Project",
    purpose: "Personal Practice Project",
    status: "Completed",
    github: "https://github.com/IfratulRian/Calculator-by-normal-c",
    description:
      "A lightweight console-based calculator developed in C to implement arithmetic operations and strengthen fundamental programming and problem-solving skills.",
    concepts: ["C", "Functions", "Conditional logic", "Arithmetic operations", "Problem solving"],
  },
];

export const competitions = [
  {
    semester: "02",
    title: "DIU Takeoff Programming Contest",
    period: "2nd Semester",
    type: "Programming Contest",
    icon: "code" as IconName,
  },
  {
    semester: "01",
    title: "DIU Math Olympiad",
    period: "1st Semester",
    type: "Mathematics Competition",
    icon: "math" as IconName,
  },
  {
    semester: "04",
    title: "DIU Unlock the Algorithm",
    period: "4th Semester",
    type: "Algorithm / Programming Competition",
    icon: "layers" as IconName,
  },
];

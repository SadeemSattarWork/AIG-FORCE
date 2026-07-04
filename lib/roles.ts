export type Role = {
  slug: string;
  title: string;
  domainSlug: string;
  domainName: string;
  posted: string;
  payMin: number;
  payMax: number;
  roleType: string;
  location: string;
  skills: string[];
  summary: string;
  scope: string[];
  qualifications: string[];
};

const PAY_MIN = 20;
const PAY_MAX = 40;

/* Shared boilerplate reused across every role's long copy. Kept here so a
   single edit updates the whole board. */
export const ABOUT_AIG =
  "AIG Force is an AI-native recruitment platform that connects companies with rigorously vetted domain experts. Our automated pipeline runs the full hiring process, from résumé screening through structured AI interviews, so specialists reach the right teams faster. As our global expert network grows, we are building the human expertise layer behind frontier work.";

function scopeFor(field: string): string[] {
  return [
    `Review, evaluate, and produce high-quality work on advanced ${field} problems spanning theory and practice.`,
    `Develop detailed, well-structured analyses, documentation, and deliverables across a range of ${field} topics.`,
    `Assess the accuracy, clarity, and rigor of ${field} outputs, providing actionable feedback for improvement.`,
    `Create and annotate high-quality, domain-specific material to inform training and benchmarking.`,
    "Document technical methodologies and communicate complex ideas clearly in written and verbal formats.",
    `Collaborate with a remote team of subject matter experts across diverse ${field} disciplines.`,
  ];
}

function qualsFor(field: string, degree: string): string[] {
  return [
    `BSc, MSc, or PhD in ${degree}, or a closely related field.`,
    "Demonstrated experience authoring research papers, technical reports, or professional documentation.",
    `Proficiency translating complex ${field} concepts for both technical and non-technical audiences.`,
    "Strong written and verbal communication skills, with an emphasis on clarity and precision.",
    `Familiarity with current trends, open problems, or applications in ${field} and related fields.`,
    "Capability to work independently and manage deliverables in a fully remote engagement.",
  ];
}

/* All roles are posted on the same board date; the site treats "posted" as a
   display string, so no runtime date call is needed. */
const POSTED = "Jul 2, 2026";

type Seed = {
  slug: string;
  title: string;
  domainSlug: string;
  domainName: string;
  field: string;
  degree: string;
  skills: string[];
};

const seeds: Seed[] = [
  {
    slug: "mathematics-expert",
    title: "Mathematics Expert",
    domainSlug: "biology",
    domainName: "STEM",
    field: "mathematics",
    degree: "Mathematics or Applied Mathematics",
    skills: [
      "advanced mathematics",
      "mathematical proof writing",
      "technical report writing",
      "data annotation",
      "mathematical problem-solving",
      "clarity in written and verbal communication",
      "reviewing mathematical reasoning",
      "collaborative remote teamwork",
      "translating complex concepts for varied audiences",
      "independent work and self-management",
    ],
  },
  {
    slug: "physics-expert",
    title: "Physics Expert",
    domainSlug: "biology",
    domainName: "STEM",
    field: "physics",
    degree: "Physics or Applied Physics",
    skills: [
      "physics domain expertise",
      "data analysis",
      "experimental design",
      "technical report writing",
      "mathematical modeling",
      "reviewing scientific reasoning",
      "collaborative remote teamwork",
      "independent work and self-management",
    ],
  },
  {
    slug: "chemistry-expert",
    title: "Chemistry Expert",
    domainSlug: "biology",
    domainName: "STEM",
    field: "chemistry",
    degree: "Chemistry or Chemical Engineering",
    skills: [
      "chemistry domain expertise",
      "experimental write-ups",
      "technical analysis",
      "data annotation",
      "reviewing scientific reasoning",
      "clarity in written and verbal communication",
      "collaborative remote teamwork",
    ],
  },
  {
    slug: "biology-expert",
    title: "Biology Expert",
    domainSlug: "biology",
    domainName: "Biology & Life Sciences",
    field: "biology",
    degree: "Biology, Molecular Biology, or Life Sciences",
    skills: [
      "scientific writing",
      "biological data analysis",
      "academic research",
      "data annotation",
      "reviewing scientific reasoning",
      "clarity in written and verbal communication",
      "independent work and self-management",
    ],
  },
  {
    slug: "computer-science-specialist",
    title: "Computer Science Specialist",
    domainSlug: "software-engineering",
    domainName: "Software Engineering",
    field: "computer science",
    degree: "Computer Science or Software Engineering",
    skills: [
      "technical writing",
      "system design",
      "algorithms",
      "data structures",
      "code review",
      "reviewing technical reasoning",
      "collaborative remote teamwork",
      "independent work and self-management",
      "clarity in written and verbal communication",
      "problem decomposition",
      "translating complex concepts for varied audiences",
    ],
  },
  {
    slug: "software-engineering-expert",
    title: "Software Engineering Expert",
    domainSlug: "software-engineering",
    domainName: "Software Engineering",
    field: "software engineering",
    degree: "Computer Science or Software Engineering",
    skills: [
      "full-stack development",
      "system design",
      "code review",
      "technical documentation",
      "debugging and analysis",
      "collaborative remote teamwork",
      "independent work and self-management",
    ],
  },
  {
    slug: "machine-learning-expert",
    title: "Machine Learning Expert",
    domainSlug: "software-engineering",
    domainName: "Software Engineering",
    field: "machine learning",
    degree: "Computer Science, Machine Learning, or a related field",
    skills: [
      "machine learning",
      "model evaluation",
      "data annotation",
      "technical writing",
      "reviewing model outputs",
      "experimental design",
      "collaborative remote teamwork",
    ],
  },
  {
    slug: "engineering-expert",
    title: "Engineering Expert",
    domainSlug: "software-engineering",
    domainName: "Engineering",
    field: "engineering",
    degree: "Engineering or a closely related field",
    skills: [
      "engineering documentation analysis",
      "technical report writing",
      "written and verbal communication",
      "data annotation",
      "reviewing technical reasoning",
      "collaborative remote teamwork",
    ],
  },
  {
    slug: "legal-expert",
    title: "Legal Expert",
    domainSlug: "legal",
    domainName: "Legal & Compliance",
    field: "law",
    degree: "Law (JD, LLB, or LLM) or a related field",
    skills: [
      "legal research",
      "legal writing",
      "contract analysis",
      "regulatory compliance",
      "reviewing legal reasoning",
      "clarity in written and verbal communication",
      "independent work and self-management",
    ],
  },
  {
    slug: "medical-expert",
    title: "Medical Expert",
    domainSlug: "medical",
    domainName: "Medical & Healthcare",
    field: "medicine",
    degree: "Medicine (MD, MBBS) or a related clinical field",
    skills: [
      "clinical knowledge",
      "medical writing",
      "literature review",
      "data annotation",
      "reviewing medical reasoning",
      "clarity in written and verbal communication",
      "collaborative remote teamwork",
    ],
  },
  {
    slug: "finance-expert",
    title: "Finance Expert",
    domainSlug: "finance",
    domainName: "Finance & Economics",
    field: "finance",
    degree: "Finance, Economics, or a quantitative field",
    skills: [
      "financial analysis",
      "quantitative reasoning",
      "financial modeling",
      "technical report writing",
      "reviewing quantitative reasoning",
      "clarity in written and verbal communication",
      "independent work and self-management",
    ],
  },
  {
    slug: "economics-expert",
    title: "Economics Expert",
    domainSlug: "finance",
    domainName: "Finance & Economics",
    field: "economics",
    degree: "Economics or a quantitative social science",
    skills: [
      "economic analysis",
      "data analysis",
      "academic research",
      "technical writing",
      "reviewing quantitative reasoning",
      "collaborative remote teamwork",
    ],
  },
];

export const roles: Role[] = seeds.map((seed) => ({
  slug: seed.slug,
  title: seed.title,
  domainSlug: seed.domainSlug,
  domainName: seed.domainName,
  posted: POSTED,
  payMin: PAY_MIN,
  payMax: PAY_MAX,
  roleType: "Contractor",
  location: "Remote",
  skills: seed.skills,
  summary: `AIG Force is engaging ${seed.title}s to contribute to high-impact projects that apply real-world expertise to advanced AI systems. Your work will shape how models learn, reason, and perform through high-quality, real-world input. No prior experience in AI is required; your domain knowledge is what matters.`,
  scope: scopeFor(seed.field),
  qualifications: qualsFor(seed.field, seed.degree),
}));

export function getRoleBySlug(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug);
}

export function formatPay(role: Pick<Role, "payMin" | "payMax">): string {
  return `$${role.payMin}-${role.payMax}/h`;
}

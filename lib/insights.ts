export type Insight = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
};

export const insights: Insight[] = [
  {
    slug: "end-of-the-first-round-phone-screen",
    title: "The end of the first-round phone screen",
    date: "21 May 2026",
    tag: "AI interviews",
    excerpt:
      "Structured AI interviews are replacing the least reliable step in hiring. Here's what changes for candidates and hiring managers — and what stays human.",
  },
  {
    slug: "what-an-ai-interviewer-actually-measures",
    title: "What an AI interviewer actually measures",
    date: "15 May 2026",
    tag: "AI interviews",
    excerpt:
      "Inside the rubric: how role-specific questions, calibrated scoring, and bias checks turn a conversation into evidence.",
  },
  {
    slug: "hiring-globally-without-the-compliance-headache",
    title: "Hiring globally without the compliance headache",
    date: "11 May 2026",
    tag: "Global talent",
    excerpt:
      "Sixty countries, one process. What to know before engaging experts across borders — and what your platform should handle for you.",
  },
  {
    slug: "five-mistakes-companies-make-hiring-specialists",
    title: "Five mistakes companies make when hiring specialists",
    date: "4 May 2026",
    tag: "Hiring ops",
    excerpt:
      "Generalist playbooks fail for deep-domain roles. The most common traps — and how evidence-based screening avoids them.",
  },
  {
    slug: "resume-parsing-is-solved-ranking-isnt",
    title: "Résumé parsing is a solved problem. Ranking isn't.",
    date: "28 Apr 2026",
    tag: "Hiring ops",
    excerpt:
      "Extracting skills from a PDF is table stakes. Weighing them against a real brief is where an ATS earns its keep.",
  },
];

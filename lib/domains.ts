export type Domain = {
  slug: string;
  name: string;
  icon: string;
  description: string;
  longDescription: string;
  specializations: string[];
  relatedSlugs: string[];
};

export const domains: Domain[] = [
  {
    slug: "biology",
    name: "Biology & Life Sciences",
    icon: "Dna",
    description: "Genomics, biotech, and life science experts driving the next wave of biological discovery.",
    longDescription:
      "Our biology and life sciences experts span molecular biology, genomics, bioinformatics, bioengineering, and drug discovery. Whether you need a PhD-level researcher for a biotech startup or a regulatory affairs specialist for an established pharma company, AIG Force connects you with the right talent.",
    specializations: [
      "Molecular Biology",
      "Genomics & Sequencing",
      "Bioinformatics",
      "Drug Discovery",
      "Bioengineering",
      "Immunology",
      "Cell Biology",
      "Neuroscience",
      "Regulatory Affairs",
      "Clinical Research",
      "Biochemistry",
      "Synthetic Biology",
    ],
    relatedSlugs: ["medical", "software-engineering"],
  },
  {
    slug: "software-engineering",
    name: "Software Engineering",
    icon: "Code2",
    description: "Elite engineers across full-stack, systems, ML, and infrastructure with proven track records.",
    longDescription:
      "From distributed systems architects to ML engineers, our software engineering talent pool covers the full technical spectrum. We vet for depth, not breadth, ensuring every engineer we place has demonstrable expertise in their chosen domain and a track record of high-impact delivery.",
    specializations: [
      "Full-Stack Development",
      "Systems Engineering",
      "Machine Learning & AI",
      "Cloud Infrastructure",
      "DevOps & Platform Engineering",
      "Mobile Development",
      "Distributed Systems",
      "Security Engineering",
      "Data Engineering",
      "Compiler & Language Design",
      "Embedded Systems",
      "Blockchain & Web3",
    ],
    relatedSlugs: ["finance", "biology"],
  },
  {
    slug: "legal",
    name: "Legal & Compliance",
    icon: "Scale",
    description: "Specialized attorneys, compliance officers, and legal advisors across corporate and regulatory law.",
    longDescription:
      "AIG Force places legal professionals with deep domain expertise across corporate law, IP, regulatory compliance, and international trade. Our network includes practicing attorneys, general counsels, compliance officers, and legal operations specialists who have advised leading companies across regulated industries.",
    specializations: [
      "Corporate Law",
      "Intellectual Property",
      "Regulatory Compliance",
      "Contract Law",
      "Employment Law",
      "Data Privacy & GDPR",
      "Mergers & Acquisitions",
      "International Trade Law",
      "Litigation Support",
      "Legal Operations",
      "Securities Law",
      "Tax Law",
    ],
    relatedSlugs: ["finance", "medical"],
  },
  {
    slug: "medical",
    name: "Medical & Healthcare",
    icon: "Stethoscope",
    description: "Clinicians, medical researchers, and healthcare strategists bridging medicine and industry.",
    longDescription:
      "Our medical and healthcare experts include board-certified physicians, clinical researchers, medical writers, health economists, and healthcare technology specialists. We connect healthcare companies with the clinical expertise needed to develop, validate, and commercialize medical innovations.",
    specializations: [
      "Clinical Medicine",
      "Medical Writing & Affairs",
      "Health Economics",
      "Clinical Trial Design",
      "Pharmacovigilance",
      "Healthcare Technology",
      "Medical Devices",
      "Telemedicine",
      "Public Health",
      "Pathology",
      "Radiology & Imaging",
      "Epidemiology",
    ],
    relatedSlugs: ["biology", "legal"],
  },
  {
    slug: "finance",
    name: "Finance & Economics",
    icon: "TrendingUp",
    description: "Quantitative analysts, investment professionals, and economists shaping financial strategy.",
    longDescription:
      "From quant researchers and portfolio managers to corporate finance advisors and macroeconomic strategists, AIG Force provides access to elite financial talent. Our experts have worked at top-tier investment banks, hedge funds, central banks, and consulting firms globally.",
    specializations: [
      "Investment Banking",
      "Quantitative Finance",
      "Portfolio Management",
      "Risk Management",
      "Corporate Finance",
      "Financial Modeling",
      "Private Equity",
      "Venture Capital",
      "Macroeconomics",
      "Derivatives & Structured Products",
      "Financial Regulation",
      "ESG & Sustainable Finance",
    ],
    relatedSlugs: ["legal", "software-engineering"],
  },
];

export function getDomainBySlug(slug: string): Domain | undefined {
  return domains.find((d) => d.slug === slug);
}

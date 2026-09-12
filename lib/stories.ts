export type Story = {
  initials: string;
  name: string;
  field: string;
  country: string;
  quote: string;
};

/* PLACEHOLDER quotes so the layout can be reviewed. Replace every entry with
   a real expert's words and permission before launch. */
export const stories: Story[] = [
  {
    initials: "RK",
    name: "Rachel K.",
    field: "Genomics",
    country: "Canada",
    quote:
      "One structured interview and I was matched to work that actually used my PhD. No recruiter screens, no repeating my CV.",
  },
  {
    initials: "AO",
    name: "Adebayo O.",
    field: "Distributed systems",
    country: "Nigeria",
    quote:
      "The scorecard told me exactly where I was strong. I have never had that from a hiring process before.",
  },
  {
    initials: "MS",
    name: "Mei S.",
    field: "Corporate law",
    country: "Singapore",
    quote:
      "I set my own hours and the work is real: reviewing reasoning, not filling forms. Paid on time, every time.",
  },
];

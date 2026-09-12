export type InsightSection = {
  /** Omitted for the opening paragraphs, which run under the title. */
  heading?: string;
  paragraphs: string[];
};

export type Insight = {
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  readTime: string;
  sections: InsightSection[];
};

export const insights: Insight[] = [
  {
    slug: "end-of-the-first-round-phone-screen",
    title: "The end of the first-round phone screen",
    tag: "AI interviews",
    readTime: "5 min",
    excerpt:
      "Structured AI interviews are replacing the least reliable step in hiring. Here's what changes for candidates and hiring managers, and what stays human.",
    sections: [
      {
        paragraphs: [
          "The first-round phone screen was never designed to find the best candidate. It was designed to make a pile of two hundred résumés small enough for a hiring manager to look at. A recruiter, twenty minutes, a handful of questions read from a sheet, and a gut feeling at the end. It survived for decades because it was cheap, not because it was good.",
          "That trade is no longer necessary. Structured AI interviews can do the filtering job properly, at any hour, for every applicant, against the same criteria. What follows is what that changes for the people being interviewed and for the people doing the hiring, and what it deliberately leaves alone.",
        ],
      },
      {
        heading: "What the phone screen actually measured",
        paragraphs: [
          "Ask anyone who has run hundreds of screens and they will tell you the truth: it tested whether the candidate picked up, whether they sounded confident, and whether the recruiter liked them. Domain depth rarely came into it, because the person asking the questions usually could not evaluate the answers.",
          "That is not a criticism of recruiters. A generalist cannot be expected to judge a molecular biologist's account of a failed assay, or an engineer's reasoning about consensus under a network partition. So the screen measured proxies instead: fluency, enthusiasm, the ability to summarise a CV out loud. Good people fail those proxies all the time. Weak candidates pass them.",
        ],
      },
      {
        heading: "What replaces it",
        paragraphs: [
          "A structured interview starts from the brief, not from a template. The role's requirements become a rubric; the rubric becomes a set of questions specific to that domain and that seniority. Every applicant gets the same core questions, with adaptive follow-ups when an answer is thin or interesting.",
          "Candidates take it when they are ready, in their own time zone, without a calendar negotiation. The interviewer never gets tired, never has a bad afternoon, and never forgets to ask the fourth question. Every answer is scored against written criteria, with the evidence attached.",
        ],
      },
      {
        heading: "What changes for candidates",
        paragraphs: [
          "Three things, mostly. There is no scheduling. There is no repeating your résumé to someone who has it open in front of them. And you are evaluated on what you know rather than on how you sound at nine in the morning.",
          "You also get something the phone screen never gave anyone: a record. A scorecard shows where you were strong and where you were not. Even a rejection tells you something useful.",
        ],
      },
      {
        heading: "What changes for hiring managers",
        paragraphs: [
          "The first human conversation now happens with people who are already known to be capable. That alone shifts the loop from filtering to choosing. Every candidate arrives with comparable evidence, scored on identical criteria, so the committee argues about substance rather than about which interviewer asked the harder questions.",
          "It is also faster. The screening stage that took two weeks of calendar wrangling takes forty-eight hours, because it no longer waits for anyone's diary.",
        ],
      },
      {
        heading: "What stays human",
        paragraphs: [
          "The decision. The final interview. The judgement about whether this person will work well with that team, on this problem, under these constraints. None of that is being automated, and we would be suspicious of anyone who claimed it should be.",
          "The point of removing the phone screen is not to remove people from hiring. It is to make sure the people in the room spend their attention on the part only they can do.",
        ],
      },
    ],
  },
  {
    slug: "what-an-ai-interviewer-actually-measures",
    title: "What an AI interviewer actually measures",
    tag: "AI interviews",
    readTime: "6 min",
    excerpt:
      "Inside the rubric: how role-specific questions, calibrated scoring, and bias checks turn a conversation into evidence.",
    sections: [
      {
        paragraphs: [
          "The reasonable fear about AI interviews is that a black box is grading candidates on something nobody can see. That fear is worth taking seriously, because it describes a real failure mode. It is also, in a well-built system, the opposite of what happens. An AI interviewer measures what it has been told to measure, and nothing else. The work is in deciding what that should be.",
          "Here is how ours decides, in the order the decisions get made.",
        ],
      },
      {
        heading: "The rubric comes first",
        paragraphs: [
          "Before a single question is written, the role has a brief, and the brief becomes a rubric: the specific capabilities this role needs, weighted by how much they matter. A regulatory affairs specialist and a bioinformatician both sit in life sciences, but their rubrics share almost nothing.",
          "That rubric is written and reviewed by people who understand the field. It is the contract for the whole interview. If a capability is not on it, the interview does not score it.",
        ],
      },
      {
        heading: "Questions are built for the role, not the industry",
        paragraphs: [
          "Each rubric item produces questions designed to surface evidence for that item. They are not trivia. They ask candidates to reason through situations from the actual work: a design trade-off, a failed experiment, a contract clause with a hidden risk.",
          "Because the questions come from the rubric, two candidates for the same role answer the same core set. Because they come from the role, candidates for different roles do not.",
        ],
      },
      {
        heading: "Follow-ups adapt, scoring does not",
        paragraphs: [
          "A good human interviewer probes. If an answer is vague, they ask what happened next; if it is strong, they push on the hardest part. The interviewer does the same, choosing follow-ups based on the answer it just heard.",
          "What does not adapt is the scoring. Every answer is graded against the same written criteria, anchored with examples of what a weak, adequate and strong response looks like. Calibration means a seven for one candidate means the same thing as a seven for another.",
        ],
      },
      {
        heading: "What it deliberately ignores",
        paragraphs: [
          "Accent. Name. Where someone studied. Gaps in a timeline. Whether they used the word 'leverage'. The system is instructed not to weigh any of it, and the scorecard makes it possible to check that it did not, because every score points to the evidence behind it.",
          "This is the part a phone screen could never offer. A human's first impression is formed in seconds and is almost impossible to audit afterwards. A scored transcript can be read by anyone.",
        ],
      },
      {
        heading: "What comes out the other end",
        paragraphs: [
          "Not a number. A scorecard: a score per rubric item, the quoted evidence that justified it, and a short summary of where the candidate was strongest and weakest. Hiring managers read it in minutes, and can disagree with it, because the reasoning is on the page.",
        ],
      },
      {
        heading: "What it does not measure",
        paragraphs: [
          "Whether you will enjoy working with this person. Whether they will thrive under this particular manager. Whether they are the right bet for where the team is going. Those are judgements, and they belong to the people making the hire. The interviewer's job is to make sure those people are choosing between candidates who can actually do the work.",
        ],
      },
    ],
  },
  {
    slug: "hiring-globally-without-the-compliance-headache",
    title: "Hiring globally without the compliance headache",
    tag: "Global talent",
    readTime: "5 min",
    excerpt:
      "Sixty countries, one process. What to know before engaging experts across borders, and what your platform should handle for you.",
    sections: [
      {
        paragraphs: [
          "The best person for a specialist role is, increasingly, not in your city and quite possibly not in your country. That is good news for the quality of your hire and bad news for whoever has to make the engagement legal, paid and secure. The paperwork does not scale as neatly as the talent pool.",
          "None of it is unsolvable. Most of it comes down to four questions, asked in the right order, before anyone signs anything.",
        ],
      },
      {
        heading: "Where it actually goes wrong",
        paragraphs: [
          "Misclassification is the classic one: treating someone as a contractor when the local rules say they are an employee. Then tax, and who is responsible for it. Then intellectual property, because an assignment clause that works at home may not survive a different jurisdiction. Then payment: currency, fees, and the very practical matter of whether the money arrives. And underneath all of it, data protection, because a résumé and an interview transcript are personal data wherever they travel.",
          "Each of these is a known problem with a known answer. The failures happen when they are discovered late.",
        ],
      },
      {
        heading: "Settle the model before you settle the person",
        paragraphs: [
          "Decide the engagement model first. Independent contractor, employer of record, or a direct hire through a local entity. Each has a cost, a speed and a set of obligations, and the right choice depends on the length and nature of the work, not on which one is easiest this week.",
          "Then decide who owns what is produced, in writing, in a form that holds in the expert's jurisdiction. Then how payment flows. Then where data lives and who can see it.",
        ],
      },
      {
        heading: "What a platform should carry for you",
        paragraphs: [
          "This is the part that should not be your problem. Verification of identity and right to work. Vetting of credentials. Consistent contract terms that have already been adapted for the countries involved. A single process whether the expert is in Lagos, Lahore or Lisbon.",
          "We operate across more than sixty countries because the process is the same in each. The rules differ; the way we handle them does not.",
        ],
      },
      {
        heading: "What you still own",
        paragraphs: [
          "The brief. The decision. The relationship with the person doing the work. A platform can make the engagement clean and the introduction fast, but it should not sit between you and your expert once you have chosen them.",
          "That is a deliberate choice on our part. We are here to make the hard part disappear, not to become a permanent layer in the middle.",
        ],
      },
    ],
  },
  {
    slug: "five-mistakes-companies-make-hiring-specialists",
    title: "Five mistakes companies make when hiring specialists",
    tag: "Hiring ops",
    readTime: "5 min",
    excerpt:
      "Generalist playbooks fail for deep-domain roles. The most common traps, and how evidence-based screening avoids them.",
    sections: [
      {
        paragraphs: [
          "Most hiring playbooks were written for roles where a good generalist can evaluate a good candidate. They break the moment the role requires depth the interviewer does not have. These are the failures we see most often, and what evidence-based screening does about each.",
        ],
      },
      {
        heading: "1. Using a generalist to judge a specialist",
        paragraphs: [
          "A recruiter who cannot tell a strong answer from a fluent one will, in good faith, hire the fluent one. This is not a competence problem; it is a structural one. The evaluation has to be done by someone, or something, that understands the field.",
          "Our rubrics are written by domain experts and every interview is scored against them. The person reading the scorecard does not need to be a specialist, because the specialist's judgement is already in the criteria.",
        ],
      },
      {
        heading: "2. Screening on keywords",
        paragraphs: [
          "The deepest people in a field rarely optimise their résumé. They are busy doing the work. Keyword filters reward the candidates who studied the job posting, not the ones who could do the job.",
          "Résumé screening should weigh evidence of depth against the actual brief: what was built, what was published, what the candidate was responsible for, and how recently. Parsing is easy. Ranking is the part that matters.",
        ],
      },
      {
        heading: "3. Letting the interview loop drift",
        paragraphs: [
          "Four interviewers, four sets of questions, four private impressions, and a debrief where the loudest voice wins. Nobody in that room has comparable evidence, so the decision comes down to who argued best.",
          "One rubric, one set of core questions, one scoring scale. The debate can then be about the candidate rather than about the process.",
        ],
      },
      {
        heading: "4. Mistaking confidence for competence",
        paragraphs: [
          "Specialist work is full of people who are quietly excellent and less full of people who are loudly so. Interviews that reward performance will systematically miss the former.",
          "Structured questions that ask for reasoning, and scoring that looks for evidence rather than delivery, correct for this. So does removing the phone screen, which was mostly a test of delivery.",
        ],
      },
      {
        heading: "5. Taking six weeks",
        paragraphs: [
          "Specialists have options. A process that takes six weeks from application to offer will lose the strongest candidates somewhere around week three, usually without telling you why.",
          "The screening stage does not need to take that long. With the interview available on demand and scoring automated, a ranked shortlist in forty-eight hours is a normal outcome rather than a heroic one. The time you save is spent where it counts: talking to the finalists.",
        ],
      },
    ],
  },
  {
    slug: "resume-parsing-is-solved-ranking-isnt",
    title: "Résumé parsing is a solved problem. Ranking isn't.",
    tag: "Hiring ops",
    readTime: "4 min",
    excerpt:
      "Extracting skills from a PDF is table stakes. Weighing them against a real brief is where an ATS earns its keep.",
    sections: [
      {
        paragraphs: [
          "Every applicant tracking system can pull a list of skills out of a PDF. It has been able to for years. If a vendor leads with parsing accuracy, they are describing the part of the problem that stopped being hard a long time ago.",
          "The hard part starts after parsing. You have three hundred structured profiles. Which ten should a human read first?",
        ],
      },
      {
        heading: "Why keyword matching fails",
        paragraphs: [
          "A profile that mentions distributed systems once, in a bullet about a course, matches the same keyword as one from someone who has spent eight years designing them. A synonym the posting did not use scores zero. A capability that was central to the candidate's last role but phrased differently is invisible.",
          "Keyword matching measures overlap between two documents. It does not measure whether the person can do the job.",
        ],
      },
      {
        heading: "What ranking should actually weigh",
        paragraphs: [
          "Depth: not whether a skill appears, but how much evidence supports it. Relevance: how closely that evidence maps to this brief, not to the field in general. Recency: a capability exercised last year counts for more than one from a decade ago. Trajectory: whether the candidate's responsibility has been growing.",
          "Each of those needs a weight, and the weights come from the brief. A role that needs a safe pair of hands and a role that needs a pioneer should rank the same pool differently.",
        ],
      },
      {
        heading: "Ranking against the brief, not the industry",
        paragraphs: [
          "The brief is the anchor. Before screening starts, it is translated into weighted criteria: what is essential, what is valuable, what is nice to have. Every application is scored against those criteria, with the evidence recorded, and the ranking follows from the scores.",
          "That means the same candidate can rank first for one role and outside the top fifty for a similar-sounding one. That is not inconsistency. That is the system doing its job.",
        ],
      },
      {
        heading: "Why a person still reads the top of the list",
        paragraphs: [
          "Because ranking narrows; it does not decide. The purpose of a good ranking is to make sure the ten profiles a human reads are the ten worth reading. The purpose of a bad one is, apparently, to save the human from reading anything, which is how strong candidates disappear.",
          "We rank so that your attention lands in the right place. What you do with it is still up to you.",
        ],
      },
    ],
  },
];

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

/** Stable anchor id for a section heading, shared by the page and the nav. */
export function headingAnchor(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

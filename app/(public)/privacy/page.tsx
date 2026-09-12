import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/shared/LegalDoc";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & Cookies",
  description:
    "How AIG Force collects, uses, shares and protects personal data, including résumés, enquiry details and AI-assisted assessment, and the rights you hold under UK GDPR.",
};

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    paras: [
      "AIG Force is a recruitment platform that connects companies with vetted domain experts across biology, software engineering, law, medicine and finance. This notice explains what we do with personal data when you browse this site, send us an enquiry, or apply to join our expert network.",
      "For the purposes of UK data protection law, AIG Force is the data controller for the personal data described here. If you do not agree with how we handle data, please do not submit it to us.",
    ],
  },
  {
    heading: "Information we collect",
    paras: [
      "We only collect what we need. Almost all of it is information you type into one of our two forms.",
    ],
    bullets: [
      {
        term: "Enquiries",
        text: "When you use the contact form we collect your name, email address, company name (optional), the domain you are interested in, and the content of your message.",
      },
      {
        term: "Applications",
        text: "When you apply for a role we collect your first and last name, email address, phone number and country dialling code, your LinkedIn profile URL if you choose to give it, and the résumé you attach.",
      },
      {
        term: "Your résumé",
        text: "A résumé typically contains work history, education, skills and qualifications. Please do not include information you would rather not share, such as your date of birth, marital status, health information or a photograph. None of it is required.",
      },
      {
        term: "Assessment data",
        text: "If you progress through our pipeline, we generate and hold screening scores, structured interview responses and the resulting scorecard, together with your stated rate expectations and availability.",
      },
      {
        term: "Interview recordings and images",
        text: "Where you take a structured interview with us, we record and transcribe it, and we may capture still images from it. Recordings are used to score the interview consistently and to review a result if you contest it. Where we produce a profile photograph from an interview still, we will tell you and you may decline.",
      },
      {
        term: "Account information",
        text: "If you create an account with us, we hold your credentials and authentication data, including verification codes we send by SMS or email.",
      },
      {
        term: "Technical data",
        text: "Our hosting provider records standard server logs, including IP address, browser type, device and operating system, pages requested and how you move through the site. Where you grant permission, we may also process approximate location.",
      },
    ],
  },
  {
    heading: "Information from other sources",
    paras: [
      "Some information reaches us from somewhere other than you. We only use it where we have a lawful basis to do so, and you can ask us at any time what we hold and where it came from.",
    ],
    bullets: [
      {
        term: "Professional profiles",
        text: "Where you give us a LinkedIn, GitHub or similar URL, or where your professional profile is public, we may review it to verify the experience you have claimed.",
      },
      {
        term: "References and background checks",
        text: "Where a role requires it and you have consented, we may obtain references or commission a background or right-to-work check through a specialist provider.",
      },
      {
        term: "Public professional records",
        text: "Publicly available registers relevant to your field, such as professional licensing or regulatory registers, where verifying a credential is necessary for a role.",
      },
      {
        term: "Hiring companies",
        text: "Feedback from a Client on an interview or engagement you took part in.",
      },
    ],
  },
  {
    heading: "How we use your information",
    bullets: [
      { text: "To reply to your enquiry and provide the services you ask for." },
      { text: "To assess your application and match you with roles that fit your expertise." },
      { text: "To introduce shortlisted candidates to the companies hiring through us." },
      { text: "To operate, secure and improve the platform, and to prevent fraud and abuse." },
      { text: "To record, transcribe and score structured interviews, and to review a result if you contest it." },
      { text: "To produce a profile photograph from an interview still, where you have not declined." },
      { text: "To send transactional SMS and email for account authentication, security and interview scheduling." },
      { text: "To send you updates you have asked for, which you can stop at any time." },
      { text: "To meet our legal and regulatory obligations." },
    ],
  },
  {
    heading: "Our lawful bases",
    paras: [
      "Under UK GDPR we must have a lawful basis for each use of your data. We rely on the following.",
    ],
    bullets: [
      {
        term: "Steps prior to a contract",
        text: "Processing your application so we can put you forward for work.",
      },
      {
        term: "Legitimate interests",
        text: "Responding to enquiries, running and securing the platform, and maintaining our expert network, balanced against your rights and freedoms.",
      },
      {
        term: "Consent",
        text: "Optional communications, and any non-essential cookies we may introduce. You can withdraw consent at any time.",
      },
      {
        term: "Legal obligation",
        text: "Where the law requires us to retain or disclose information.",
      },
    ],
  },
  {
    heading: "AI-assisted assessment",
    paras: [
      "Our pipeline uses automated tools to screen résumés and to conduct structured, role-specific interviews, scoring every candidate against the same rubric. We are explicit about this because it affects you.",
      "These tools inform our decisions; they do not replace them. A person reviews the outcome before any candidate is rejected or put forward, so you are not subject to a decision based solely on automated processing. You may ask us to explain an assessment, ask for a human review, or contest the outcome using the contact details below.",
    ],
  },
  {
    heading: "Who we share it with",
    bullets: [
      {
        term: "Hiring companies",
        text: "If you are shortlisted for a role, we share your profile, résumé and scorecard with the company hiring for it. We do this to place you, which is the purpose you applied for.",
      },
      {
        term: "Service providers",
        text: "We use a small number of processors to run the site, including a hosting provider and an email delivery provider that carries form submissions to our inbox. They act on our instructions and may not use your data for their own purposes.",
      },
      {
        term: "Legal and safety",
        text: "Where we are required to disclose information by law, or need to establish, exercise or defend legal claims.",
      },
      {
        term: "Business transfers",
        text: "If AIG Force is involved in a merger, acquisition or sale of assets, data may transfer as part of that transaction. We will tell you before it becomes subject to a different privacy notice.",
      },
    ],
    paras: ["We do not sell your personal data, and we never have."],
  },
  {
    heading: "Cookies and similar technologies",
    paras: [
      "Cookies are small files placed on your device. We group ours into three categories, and under the UK Privacy and Electronic Communications Regulations we may only set the second and third with your consent.",
    ],
    bullets: [
      {
        term: "Strictly necessary",
        text: "Required for the site to work: keeping your session, remembering form state and protecting submissions against cross-site request forgery. These are always on and need no consent.",
      },
      {
        term: "Analytics",
        text: "Help us understand how the site is used, which pages are read and where people drop out, so we can improve it. Set only with your consent.",
      },
      {
        term: "Marketing",
        text: "Used to measure campaigns and show relevant content off our own site. Set only with your consent.",
      },
    ],
    parasAfter: [
      "At the time of writing this site sets strictly necessary cookies only. Before any analytics or marketing cookie is set we will ask through a consent banner, and you can change or withdraw that choice at any time from the same banner.",
      "You can also block or delete cookies in your browser settings. Blocking strictly necessary cookies will stop parts of the site working, including the contact and application forms.",
      "We do not sell cookie data, and we do not use cookies to make decisions about your application.",
    ],
  },
  {
    heading: "Your rights",
    paras: [
      "You have the following rights over your personal data. Exercising them is free, and we will respond within one month.",
    ],
    bullets: [
      { term: "Access", text: "Ask for a copy of the personal data we hold about you." },
      { term: "Rectification", text: "Ask us to correct data that is inaccurate or incomplete." },
      { term: "Erasure", text: "Ask us to delete your data where we have no continuing reason to keep it." },
      { term: "Restriction", text: "Ask us to pause processing while a concern is resolved." },
      { term: "Portability", text: "Ask for your data in a portable, machine-readable format." },
      { term: "Objection", text: "Object to processing we carry out under legitimate interests." },
      { term: "Withdraw consent", text: "Withdraw consent at any time, without affecting processing already carried out." },
    ],
  },
  {
    heading: "How we protect it",
    paras: [
      "We apply technical and organisational measures appropriate to the data we hold, including encryption in transit, access controls limiting who can see applications, and validation on every submission we accept.",
      "No method of transmission or storage is completely secure. We cannot guarantee absolute security, but we will notify you and the relevant regulator where a breach is likely to result in a risk to your rights.",
    ],
  },
  {
    heading: "How long we keep it",
    bullets: [
      { term: "Enquiries", text: "Kept for up to 24 months from your last contact with us, then deleted." },
      { term: "Applications and résumés", text: "Kept for up to 24 months so we can consider you for other roles that match your expertise. Ask us to delete yours sooner and we will." },
      { term: "Placed candidates", text: "Kept for as long as the engagement lasts and for six years afterwards, to meet contractual and tax obligations." },
      { term: "Server logs", text: "Kept for a short retention window for security and diagnostics." },
    ],
  },
  {
    heading: "International transfers",
    paras: [
      "We operate across more than 60 countries, so your data may be transferred outside the UK, for example to a hiring company in another country, or to a service provider hosting data abroad.",
      "Where we transfer personal data outside the UK, we rely on UK adequacy regulations or on the International Data Transfer Agreement or Addendum, together with appropriate additional safeguards.",
    ],
  },
  {
    heading: "Children",
    paras: [
      "This platform is intended for professionals and is not directed at children. We do not knowingly collect data from anyone under 16. If you believe a child has submitted information to us, contact us and we will delete it.",
    ],
  },
  {
    heading: "Changes to this notice",
    paras: [
      "We may update this notice to reflect changes in our practices or the law. The revision date at the top always shows the current version, and we will tell you directly about material changes where we can.",
    ],
  },
  {
    heading: "Contact and complaints",
    paras: [
      `To exercise any right, or to ask a question about this notice, email ${SUPPORT_EMAIL}.`,
      "If you are not satisfied with our response, you can complain to the Information Commissioner's Office at ico.org.uk. If you are in the EU, you may complain to your local supervisory authority.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalDoc
      title={
        <>
          Privacy &amp; <em>cookies.</em>
        </>
      }
      updated="11 September 2026"
      intro="What we collect when you contact us or apply through AIG Force, what we do with it, who sees it, and the control you keep over it."
      sections={sections}
    />
  );
}

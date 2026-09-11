import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/shared/LegalDoc";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing use of the AIG Force platform by experts and by companies hiring through our network.",
};

const sections: LegalSection[] = [
  {
    heading: "These terms",
    paras: [
      "These terms form an agreement between you and AIG Force. They apply when you browse this site, submit an enquiry, or apply to join our expert network.",
      "Where you apply for work through us, you are an \"Expert\". Where a company engages an Expert through us, it is a \"Client\". By using the platform you confirm you accept these terms. If you do not accept them, please do not use the platform.",
    ],
  },
  {
    heading: "Using the platform",
    bullets: [
      { text: "You must be at least 16 years old and legally able to enter into this agreement." },
      { text: "You agree to give accurate, current and complete information, and to keep it up to date." },
      { text: "You are responsible for anything done through your submissions, and for the security of any credentials we issue you." },
      { text: "You must not misuse the platform: no scraping, no attempts to access other people's data, no automated submissions, no uploading malicious files, and no unlawful content." },
      { text: "You confirm you hold the right to work in the jurisdictions in which you offer to provide services." },
    ],
  },
  {
    heading: "Applications and vetting",
    paras: [
      "Applying does not guarantee acceptance into the network, an introduction to a Client, an interview or an engagement. We accept Experts at our discretion and may decline or remove anyone from the network.",
      "You confirm that everything in your application, including your résumé and the qualifications and experience you claim, is true and your own. Misrepresentation is grounds for immediate removal, and for withdrawal from any engagement arranged through us.",
    ],
  },
  {
    heading: "AI-assisted assessment",
    paras: [
      "Our pipeline uses automated screening and structured, role-specific AI interviews, scoring every candidate against the same rubric. By applying you agree to be assessed this way, and you agree that we may record and transcribe the interview for that purpose.",
      "Assessment outputs inform our decisions and are reviewed by a person before any candidate is rejected or put forward. You may request a human review or contest an outcome — see our privacy notice for how.",
    ],
  },
  {
    heading: "Introductions and non-circumvention",
    paras: [
      "AIG Force invests in building and maintaining its relationships with Clients, and those relationships are the value we provide. Where we introduce you to a Client, whether directly or indirectly, that introduction is made in confidence.",
      "For 24 months from the date of an introduction, you agree not to provide services to that Client — whether paid or unpaid, directly or through any other company, agency or intermediary — without our prior written consent. Consent will not be unreasonably withheld, and we will normally agree where a fair transfer fee is settled.",
      "This restriction protects our legitimate business interests and goes no further than necessary. A breach is a material breach of this agreement and may result in a claim for the fees we would have earned.",
    ],
  },
  {
    heading: "Compensation and negotiation",
    paras: [
      "Rates and compensation for work sourced through AIG Force are agreed through AIG Force. You agree not to negotiate rates for an introduced engagement directly with a Client outside the platform.",
      "This keeps rates transparent and consistent across the network, and it is how we can quote Clients reliably. Rates shown on a role listing are the range for that role; the agreed figure for a particular engagement is confirmed in writing and any change is processed through us.",
    ],
  },
  {
    heading: "Engagement status",
    paras: [
      "Nothing in these terms creates a contract of employment between you and AIG Force, nor a partnership, joint venture or agency relationship. Experts engage as independent contractors.",
      "Unless we agree otherwise in writing, you are responsible for your own tax, national insurance or equivalent contributions, and for any insurance, licences or registrations your work requires.",
    ],
  },
  {
    heading: "Your content",
    paras: [
      "You keep ownership of everything you submit, including your résumé and any work samples. You grant us a non-exclusive, worldwide licence to store, process and share that material with Clients for the purpose of considering you for engagements, and to hold it for the period set out in our privacy notice.",
      "You confirm that what you submit is yours to share and does not infringe anyone else's rights or breach an obligation of confidence you owe to someone else.",
    ],
  },
  {
    heading: "Confidentiality",
    paras: [
      "Through the platform you may receive confidential information about AIG Force or a Client, including briefs, role details, unpublished business information and the identity of Clients themselves.",
      "You agree to keep that information confidential, to use it only in connection with the engagement it relates to, and not to disclose it to anyone without consent. This obligation continues after your engagement with us ends.",
    ],
  },
  {
    heading: "Availability and changes to the service",
    paras: [
      "We aim to keep the platform available, but we do not guarantee uninterrupted or error-free access. We may suspend, withdraw or change any part of the service, and may restrict availability, without liability to you.",
      "Content on this site is provided for general information. Statistics and timelines we publish describe typical outcomes and are not a promise of a particular result.",
    ],
  },
  {
    heading: "Intellectual property",
    paras: [
      "The platform, its content, branding and the design of our assessment process belong to AIG Force or our licensors and are protected by intellectual property law. You may use the site for its intended purpose; you may not copy, republish or build a competing service from it.",
    ],
  },
  {
    heading: "Liability",
    paras: [
      "Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud or fraudulent misrepresentation, or for any liability that cannot lawfully be limited.",
      "Subject to that, we are not liable for loss of profit, loss of business, loss of opportunity or any indirect or consequential loss, and our total liability arising from your use of the platform is limited to the fees we have received in connection with your engagement in the 12 months before the claim.",
      "AIG Force introduces Experts to Clients. We are not a party to the engagement between an Expert and a Client and are not responsible for either party's performance under it.",
    ],
  },
  {
    heading: "Suspension and termination",
    paras: [
      "You may stop using the platform at any time and ask us to remove your profile. We may suspend or terminate your access where you breach these terms, where your information proves inaccurate, or where we reasonably suspect misuse.",
      "The sections on non-circumvention, confidentiality, your content, liability and governing law survive termination.",
    ],
  },
  {
    heading: "Changes to these terms",
    paras: [
      "We may update these terms as the service and the law change. The revision date at the top always shows the current version, and where a change materially affects you we will make reasonable efforts to tell you directly or through a notice on the platform.",
      "Continuing to use the platform after a change takes effect means you accept the revised terms. If you do not accept them, please stop using the platform.",
    ],
  },
  {
    heading: "Governing law",
    paras: [
      "These terms and any dispute arising from them are governed by the laws of England and Wales, and the courts of England and Wales have exclusive jurisdiction. This does not remove any protection available to you under the mandatory law of the country where you live.",
    ],
  },
  {
    heading: "Contact",
    paras: [
      `Questions about these terms, or a request for consent under the non-circumvention section, should go to ${SUPPORT_EMAIL}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalDoc
      title={
        <>
          Terms of <em>service.</em>
        </>
      }
      updated="11 September 2026"
      intro="The terms on which experts and companies use the AIG Force platform, including how introductions, rates and confidentiality work."
      sections={sections}
    />
  );
}

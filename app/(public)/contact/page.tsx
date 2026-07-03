import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Get in Touch",
  description:
    "Reach out to AIG Force. Whether you're looking to hire a domain expert or join our network as a specialist, we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <section className="bg-white min-h-screen px-6 pt-40 pb-24">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
          Get in Touch
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-[#111111] tracking-tight mb-4">Contact Us</h1>
        <p className="text-[#555555] mb-2">
          Fill in the form below or reach us directly at{" "}
          <a href="mailto:support@aigforce.com" className="text-accent hover:text-accent-hover underline underline-offset-4 transition-colors">
            support@aigforce.com
          </a>
        </p>
        <p className="text-[#AAAAAA] text-sm mb-12">We typically respond within one business day.</p>
        <ContactForm />
      </div>
    </section>
  );
}

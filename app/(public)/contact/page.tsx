import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Get in Touch",
  description:
    "Reach out to AIG Force. Whether you're looking to hire a domain expert or join our network as a specialist, we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-bone px-6 pt-40 pb-16 md:pt-48 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow text-blue mb-8">Contact</p>
          <h1 className="display text-ink text-4xl md:text-6xl lg:text-7xl max-w-3xl">
            Let&apos;s <em>talk.</em>
          </h1>
        </div>
      </section>

      <section className="bg-paper px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-8">

          {/* Contact details — machine voice */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32 space-y-10">
              <div>
                <p className="eyebrow text-muted mb-4">Email</p>
                <a
                  href="mailto:support@aigforce.com"
                  className="text-ink text-lg hover:text-blue transition-colors"
                >
                  support@aigforce.com
                </a>
              </div>
              <div>
                <p className="eyebrow text-muted mb-4">Response time</p>
                <p className="machine text-blue">reply_within · 1 business day</p>
              </div>
              <div>
                <p className="eyebrow text-muted mb-4">Coverage</p>
                <p className="machine text-muted">
                  60+ countries
                  <br />
                  5 domains
                  <br />
                  remote-first
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:block md:col-span-1" />

          {/* Form */}
          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

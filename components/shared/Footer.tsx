import Link from "next/link";
import { Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/shared/LinkedInIcon";
import { domains } from "@/lib/domains";

const solutionsLinks = [
  { href: "/for-companies", label: "For Companies" },
  { href: "/for-experts", label: "For Experts" },
  { href: "/supported-countries", label: "Global Coverage" },
  { href: "/#pipeline", label: "How It Works" },
];

const companyLinks = [
  { href: "/experts", label: "The Network" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">

        {/* Wordmark lockup — the logo art is dark-on-transparent, so the
            footer carries a white text lockup instead */}
        <Link href="/" className="inline-flex items-baseline gap-2 mb-16 group">
          <span className="w-2.5 h-2.5 rounded-full bg-wire self-center" aria-hidden="true" />
          <span className="text-2xl font-bold tracking-tight text-white">
            AiG
          </span>
          <span className="display text-2xl italic text-wire group-hover:text-white transition-colors">
            Force
          </span>
        </Link>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-20">
          {/* Solutions */}
          <div>
            <h3 className="eyebrow text-white/40 mb-6">Solutions</h3>
            <ul className="space-y-3.5">
              {solutionsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div>
            <h3 className="eyebrow text-white/40 mb-6">Expertise</h3>
            <ul className="space-y-3.5">
              {domains.map((domain) => (
                <li key={domain.slug}>
                  <Link
                    href={`/experts/${domain.slug}`}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {domain.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="eyebrow text-white/40 mb-6">Company</h3>
            <ul className="space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Machine stamp — the platform's quiet self-description */}
          <div className="md:text-right md:flex md:flex-col md:items-end md:justify-between">
            <p className="machine text-white/40">
              aig_force
              <br />
              ai-native recruitment
              <br />
              60+ countries · 5 domains
              <br />
              avg_match · 48h
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-xs text-white/40">
            © 2026 AIG Force. All rights reserved.
          </p>

          <div className="flex items-center gap-8">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-white/40 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <a
              href="mailto:support@aigforce.com"
              aria-label="Email AIG Force"
              className="text-white/60 hover:text-white transition-colors"
            >
              <Mail size={16} strokeWidth={1.8} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AIG Force on LinkedIn"
              className="text-white/60 hover:text-white transition-colors"
            >
              <LinkedInIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { domains } from "@/lib/domains";
import { SUPPORT_EMAIL } from "@/lib/site";

const solutionsLinks = [
  { href: "/for-companies", label: "For Companies" },
  { href: "/for-experts", label: "For Experts" },
  { href: "/for-experts/roles", label: "Opportunities" },
  { href: "/supported-countries", label: "Global Coverage" },
];

const companyLinks = [
  { href: "/experts", label: "The Network" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">

        {/* Light-on-dark twin of the mark, generated from public/logo.png */}
        <Link href="/" className="inline-block mb-16">
          <Image
            src="/logo-light.png"
            alt="AIG Force"
            width={193}
            height={95}
            className="h-11 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
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

          <div className="md:text-right md:flex md:flex-col md:items-end md:justify-between">
            <p className="text-sm text-white/40 leading-relaxed max-w-[16rem] md:ml-auto">
              Intelligent hiring for a changing workforce. Vetted experts in
              five domains, across 60+ countries.
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

          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-flex items-center gap-2.5 text-white/60 hover:text-white transition-colors"
          >
            <Mail size={16} strokeWidth={1.8} />
            <span className="text-xs">{SUPPORT_EMAIL}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";

const expertLinks = [
  { href: "/experts/biology", label: "Biology" },
  { href: "/experts/software-engineering", label: "Software Engineering" },
  { href: "/experts/legal", label: "Legal" },
  { href: "/experts/medical", label: "Medical" },
  { href: "/experts/finance", label: "Finance" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/for-companies", label: "For Companies" },
  { href: "/for-experts", label: "For Experts" },
  { href: "/supported-countries", label: "Supported Countries" },
];

const legalLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="bg-[#F5F5F5] border-t border-[#E8E8E8]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="AIG Force"
                width={180}
                height={180}
                className="h-[180px] w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[#555555] leading-relaxed max-w-xs">
              The platform for hiring elite domain experts across science, law, medicine, and technology.
            </p>
          </div>

          {/* Experts */}
          <div>
            <h3 className="text-[#111111] text-xs font-semibold mb-4 uppercase tracking-wider">
              Experts
            </h3>
            <ul className="space-y-3">
              {expertLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#555555] hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[#111111] text-xs font-semibold mb-4 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#555555] hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[#111111] text-xs font-semibold mb-4 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#555555] hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E8E8E8] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#555555]">
          <p>© 2025 AIG Force. All rights reserved.</p>
          <a href="mailto:support@aigforce.com" className="hover:text-accent transition-colors">
            support@aigforce.com
          </a>
        </div>
      </div>
    </footer>
  );
}

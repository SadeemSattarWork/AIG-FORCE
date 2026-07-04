"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/shared/LinkedInIcon";
import { cn } from "@/lib/utils";
import { domains } from "@/lib/domains";

type MenuKey = "solutions" | "expertise" | null;

const solutionsLinks = [
  { href: "/for-companies", label: "For Companies" },
  { href: "/for-experts", label: "For Experts" },
  { href: "/for-experts/roles", label: "Opportunities" },
  { href: "/supported-countries", label: "Global Coverage" },
];

const flatLinks = [
  { href: "/#pipeline", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<MenuKey>(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLabel =
    "eyebrow text-ink hover:text-blue transition-colors inline-flex items-center gap-1.5 py-2";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-hairline">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-10">

        {/* Logo */}
        <Link href="/" className="shrink-0" onClick={() => setMenuOpen(false)}>
          <Image
            src="/logo.png"
            alt="AIG Force"
            width={193}
            height={95}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Primary nav */}
        <div className="hidden lg:flex items-center gap-8 flex-1">
          {/* Solutions dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("solutions")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className={navLabel}
              aria-expanded={openDropdown === "solutions"}
              onClick={() =>
                setOpenDropdown(openDropdown === "solutions" ? null : "solutions")
              }
            >
              Solutions
              <ChevronDown
                size={12}
                className={cn(
                  "transition-transform duration-200",
                  openDropdown === "solutions" && "rotate-180"
                )}
              />
            </button>
            {openDropdown === "solutions" && (
              <div className="absolute top-full left-0 pt-2 w-56">
                <div className="bg-white border border-hairline shadow-[0_16px_40px_rgba(14,14,18,0.08)] py-2">
                  {solutionsLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-5 py-2.5 text-sm text-ink hover:text-blue hover:bg-bone transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Expertise dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("expertise")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className={navLabel}
              aria-expanded={openDropdown === "expertise"}
              onClick={() =>
                setOpenDropdown(openDropdown === "expertise" ? null : "expertise")
              }
            >
              Expertise
              <ChevronDown
                size={12}
                className={cn(
                  "transition-transform duration-200",
                  openDropdown === "expertise" && "rotate-180"
                )}
              />
            </button>
            {openDropdown === "expertise" && (
              <div className="absolute top-full left-0 pt-2 w-64">
                <div className="bg-white border border-hairline shadow-[0_16px_40px_rgba(14,14,18,0.08)] py-2">
                  {domains.map((domain) => (
                    <Link
                      key={domain.slug}
                      href={`/experts/${domain.slug}`}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-5 py-2.5 text-sm text-ink hover:text-blue hover:bg-bone transition-colors"
                    >
                      {domain.name}
                    </Link>
                  ))}
                  <div className="border-t border-hairline mt-2 pt-2">
                    <Link
                      href="/experts"
                      onClick={() => setOpenDropdown(null)}
                      className="block px-5 py-2.5 text-sm font-semibold text-blue hover:bg-bone transition-colors"
                    >
                      All expertise →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {flatLinks.map((link) => (
            <Link key={link.href} href={link.href} className={navLabel}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right cluster — contact + channels */}
        <div className="hidden lg:flex items-center gap-6 shrink-0">
          <Link href="/contact" className={navLabel}>
            Contact
          </Link>
          <span className="w-px h-4 bg-hairline" aria-hidden="true" />
          <a
            href="mailto:support@aigforce.com"
            aria-label="Email AIG Force"
            className="text-ink hover:text-blue transition-colors"
          >
            <Mail size={15} strokeWidth={1.8} />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AIG Force on LinkedIn"
            className="text-ink hover:text-blue transition-colors"
          >
            <LinkedInIcon size={15} />
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="flex-1 flex justify-end lg:hidden">
          <button
            className="text-ink p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white z-40 overflow-y-auto px-6 pt-8 pb-16">
          <p className="eyebrow text-muted mb-4">Solutions</p>
          <div className="flex flex-col border-b border-hairline pb-6 mb-6">
            {solutionsLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="display text-2xl text-ink py-2.5 hover:text-blue transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="eyebrow text-muted mb-4">Expertise</p>
          <div className="flex flex-col border-b border-hairline pb-6 mb-6">
            {domains.map((domain) => (
              <Link
                key={domain.slug}
                href={`/experts/${domain.slug}`}
                onClick={() => setMenuOpen(false)}
                className="text-base text-ink py-2 hover:text-blue transition-colors"
              >
                {domain.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-1 mb-10">
            {flatLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="display text-2xl text-ink py-2.5 hover:text-blue transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="arrow-link text-blue"
          >
            Contact us <span className="arrow">↗</span>
          </Link>
        </div>
      )}
    </header>
  );
}

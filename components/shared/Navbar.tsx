"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/experts", label: "Experts" },
  { href: "/for-companies", label: "For Companies" },
  { href: "/for-experts", label: "For Experts" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-visible",
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-[#E8E8E8]"
          : "bg-white border-b border-[#E8E8E8]"
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center overflow-visible">

        {/* Logo — left */}
        <div className="flex-1 flex items-center">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image
              src="/logo.png"
              alt="AIG Force"
              width={180}
              height={180}
              className="h-[180px] w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Nav links — centered */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#111111] hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Contact CTA — right */}
        <div className="flex-1 hidden md:flex items-center justify-end">
          <Link
            href="/contact"
            className="text-sm font-medium px-4 py-2 rounded-md bg-accent text-white hover:bg-accent-hover transition-colors leading-none"
          >
            Contact →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="flex-1 flex justify-end md:hidden">
          <button
            className="text-[#111111] p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-white z-40 flex flex-col px-6 pt-8 gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold text-[#111111] hover:text-accent transition-colors border-b border-[#E8E8E8] pb-4"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 text-center text-base font-medium px-6 py-3 rounded-md bg-accent text-white hover:bg-accent-hover transition-colors"
          >
            Contact →
          </Link>
        </div>
      )}
    </header>
  );
}

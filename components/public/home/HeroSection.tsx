"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

type HeroSectionProps = {
  heading: string;
  sub: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA: { label: string; href: string };
};

export function HeroSection({ heading, sub, primaryCTA, secondaryCTA }: HeroSectionProps) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Seamless loop — restart immediately when ended to avoid any black frame
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const restart = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    // Start just before the end to crossfade back seamlessly
    const checkNearEnd = () => {
      if (video.duration && video.currentTime >= video.duration - 0.1) {
        video.currentTime = 0;
      }
    };

    video.addEventListener("ended", restart);
    video.addEventListener("timeupdate", checkNearEnd);

    return () => {
      video.removeEventListener("ended", restart);
      video.removeEventListener("timeupdate", checkNearEnd);
    };
  }, []);

  const fadeUp = reduce
    ? {}
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ willChange: "transform" }}
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient scrim — dark only at top/bottom edges where text lives, clear in the middle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.55) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center pt-24">
        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)" }}
        >
          {heading}
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.7)" }}
        >
          {sub}
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href={primaryCTA.href}
            className="px-7 py-3.5 rounded-md bg-accent text-white font-medium hover:bg-accent-hover transition-colors text-sm w-full sm:w-auto text-center"
          >
            {primaryCTA.label}
          </Link>
          <Link
            href={secondaryCTA.href}
            className="px-7 py-3.5 rounded-md border border-white/30 text-white font-medium hover:border-white/60 hover:bg-white/10 transition-colors text-sm w-full sm:w-auto text-center backdrop-blur-sm"
          >
            {secondaryCTA.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

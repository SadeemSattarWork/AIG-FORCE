"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
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

  const lineReveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: "110%" },
          animate: { y: "0%" },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  const fadeIn = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.8, delay, ease: "easeOut" as const },
        };

  return (
    <section className="relative mt-20 min-h-[calc(100vh-5rem)] flex bg-ink overflow-hidden">

      {/* Background video — hidden for reduced-motion users, ink fallback shows */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Scrim — heavier at the base where the headline sits */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(14,14,18,0.25) 0%, rgba(14,14,18,0.10) 45%, rgba(14,14,18,0.62) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content — anchored low-left, editorial */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-20 md:pb-28">
        <motion.p {...fadeIn(0.15)} className="eyebrow text-white/70 mb-6">
          Intelligent recruitment, résumé to offer
        </motion.p>

        <h1 className="display text-white text-5xl md:text-7xl lg:text-8xl max-w-5xl mb-10">
          <span className="block overflow-hidden pb-1">
            <motion.span {...lineReveal(0.2)} className="block">
              Intelligent hiring
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span {...lineReveal(0.32)} className="block">
              for a <em>changing</em> workforce.
            </motion.span>
          </span>
        </h1>

        <motion.div
          {...fadeIn(0.75)}
          className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12"
        >
          <Link href="/contact" className="arrow-link text-white">
            Start hiring <span className="arrow">↗</span>
          </Link>
          <Link
            href="/for-experts/roles"
            className="arrow-link text-white/60 hover:text-white transition-colors"
          >
            Join as an expert <span className="arrow">↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

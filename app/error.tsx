"use client";

import Link from "next/link";
import { useEffect } from "react";
import { SUPPORT_EMAIL } from "@/lib/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-bone px-6 pt-40 pb-24 md:pt-48 md:pb-32 min-h-[70vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <p className="machine text-muted mb-8">Something went wrong</p>
        <h1 className="display text-ink text-4xl md:text-6xl lg:text-7xl max-w-3xl mb-8">
          We hit an <em>error.</em>
        </h1>
        <p className="text-muted text-base md:text-lg max-w-xl leading-relaxed mb-14">
          Try again, and if it keeps happening let us know at{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-blue hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
        <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
          <button onClick={reset} className="arrow-link text-blue cursor-pointer">
            Try again <span className="arrow">↗</span>
          </button>
          <Link href="/" className="arrow-link text-muted hover:text-ink transition-colors">
            Back to home <span className="arrow">↗</span>
          </Link>
        </div>
        {error.digest && (
          <p className="machine text-muted/60 mt-14">Reference: {error.digest}</p>
        )}
      </div>
    </section>
  );
}

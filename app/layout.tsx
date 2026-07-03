import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: {
    default: "AIG Force | Domain Expert Recruitment",
    template: "%s | AIG Force",
  },
  description:
    "AIG Force connects companies with rigorously vetted domain experts in Biology, Software Engineering, Legal, Medical, and Finance. Hire elite specialists within 48 hours.",
  metadataBase: new URL("https://aigforce.com"),
  keywords: [
    "domain expert recruitment",
    "hire specialists",
    "biology experts",
    "software engineering recruitment",
    "legal experts",
    "medical experts",
    "finance experts",
    "expert network",
  ],
  authors: [{ name: "AIG Force", url: "https://aigforce.com" }],
  creator: "AIG Force",
  publisher: "AIG Force",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aigforce.com",
    siteName: "AIG Force",
    title: "AIG Force | Domain Expert Recruitment",
    description:
      "Connect with elite domain experts in Biology, Software Engineering, Legal, Medical, and Finance.",
    images: [{ url: "/logo.png", width: 500, height: 500, alt: "AIG Force" }],
  },
  twitter: {
    card: "summary",
    title: "AIG Force | Domain Expert Recruitment",
    description:
      "Connect with elite domain experts in Biology, Software Engineering, Legal, Medical, and Finance.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Rajdhani } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { siteConfig } from "@/data/portfolio";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.canonicalUrl),
  title: "Kapil Jangid | AI Driven Full Stack Developer",
  description:
    "Portfolio of Kapil Jangid, an AI driven full stack developer and Computer Science student building intelligent products, scalable software and practical technology solutions.",
  keywords: [
    "Kapil Jangid",
    "AI Developer",
    "Full Stack Developer",
    "Generative AI",
    "Portfolio",
    "Ahmedabad",
  ],
  authors: [{ name: "Kapil Jangid", url: siteConfig.canonicalUrl }],
  creator: "Kapil Jangid",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteConfig.canonicalUrl,
    siteName: "Kapil Jangid Portfolio",
    title: "Kapil Jangid | AI Driven Full Stack Developer",
    description:
      "Portfolio of Kapil Jangid, an AI driven full stack developer and Computer Science student building intelligent products, scalable software and practical technology solutions.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Kapil Jangid — AI Driven Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kapil Jangid | AI Driven Full Stack Developer",
    description:
      "Portfolio of Kapil Jangid, an AI driven full stack developer building intelligent products and scalable software.",
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.title,
  email: siteConfig.email,
  url: siteConfig.canonicalUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/kapil31jangid",
    "https://www.linkedin.com/in/kapil31jangid",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${rajdhani.variable} ${jetbrains.variable} h-full scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full bg-bg-primary text-text-primary antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-cyan focus:px-4 focus:py-2 focus:text-bg-primary"
        >
          Skip to main content
        </a>
        <CursorGlow />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

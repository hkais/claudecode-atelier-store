import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";

// Neutral grotesk for all UI and body copy.
const sans = Geist({
  variable: "--font-sans-ui",
  subsets: ["latin"],
});

// Old-style serif reserved for editorial display type (type-display, type-h1…h3).
const serif = Cormorant_Garamond({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: { default: "Atelier Store", template: "%s | Atelier Store" },
  description: "Atelier Store",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

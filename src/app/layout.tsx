import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Vahe Muradyan — Animation Portfolio",
  description: "Animation portfolio — character design, drawing, and film.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${syne.variable} ${outfit.variable} antialiased`}>
        <div className="page-atmosphere" aria-hidden />
        <div className="page-grain" aria-hidden />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

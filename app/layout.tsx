import type { ReactNode } from "react";
import { Baloo_2, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ArcadeHeader } from "@/components/ArcadeHeader";
import { BottomNav } from "@/components/BottomNav";

const displayFont = Baloo_2({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"]
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"]
});

const numberFont = Space_Mono({
  subsets: ["latin"],
  variable: "--font-number",
  weight: ["400", "700"]
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${numberFont.variable}`}
    >
      <head>
        <meta name="base:app_id" content="69c9f07354fba99e37410fe5" />
        <meta
          name="talentapp:project_verification"
          content="f1ea6957fcb813f8d96e24f26d5863d816539fc6b3120542739bea26fbd39bed2ecc3d888060177383a4f00fbd05225e9e13ab4f7cb7a1e90134290c1c4f3a82"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#ff66c4" />
      </head>
      <body>
        <Providers>
          <div className="app-shell">
            <div className="bg-orb bg-orb-one" />
            <div className="bg-orb bg-orb-two" />
            <div className="grid-noise" />
            <ArcadeHeader />
            <main className="page-frame">{children}</main>
            <BottomNav />
          </div>
        </Providers>
      </body>
    </html>
  );
}

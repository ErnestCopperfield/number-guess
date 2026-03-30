import type { ReactNode } from "react";
import { Baloo_2, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ArcadeHeader } from "@/components/ArcadeHeader";
import { BottomNav } from "@/components/BottomNav";
import {
  APP_DESCRIPTION,
  APP_ICON_URL,
  APP_OG_URL,
  APP_SPLASH_URL,
  APP_TITLE,
  SITE_URL
} from "@/lib/site";
import { BASE_APP_ID } from "@/lib/base-app";

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

const miniAppMeta = JSON.stringify({
  version: "next",
  imageUrl: APP_OG_URL,
  button: {
    title: "Open App",
    action: {
      type: "launch_miniapp",
      url: SITE_URL
    }
  }
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${numberFont.variable}`}
    >
      <head>
        <title>{APP_TITLE}</title>
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="base:app_id" content={BASE_APP_ID} />
        <meta
          name="talentapp:project_verification"
          content="f1ea6957fcb813f8d96e24f26d5863d816539fc6b3120542739bea26fbd39bed2ecc3d888060177383a4f00fbd05225e9e13ab4f7cb7a1e90134290c1c4f3a82"
        />
        <meta name="fc:miniapp" content={miniAppMeta} />
        <meta property="og:title" content={APP_TITLE} />
        <meta property="og:description" content={APP_DESCRIPTION} />
        <meta property="og:image" content={APP_OG_URL} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={APP_TITLE} />
        <meta name="twitter:description" content={APP_DESCRIPTION} />
        <meta name="twitter:image" content={APP_OG_URL} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#ff66c4" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" href={APP_ICON_URL} />
        <link rel="apple-touch-icon" href={APP_ICON_URL} />
        <link rel="preload" as="image" href={APP_SPLASH_URL} />
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


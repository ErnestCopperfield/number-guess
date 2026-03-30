import { NextResponse } from "next/server";
import { BASE_APP_ID, BASE_BUILDER_CODE } from "@/lib/base-app";
import {
  APP_DESCRIPTION,
  APP_ICON_URL,
  APP_NAME,
  APP_OG_URL,
  APP_SPLASH_URL,
  APP_TAGLINE,
  APP_TITLE,
  SITE_URL
} from "@/lib/site";

export function GET() {
  const header = process.env.NEXT_PUBLIC_BASE_ACCOUNT_ASSOC_HEADER;
  const payload = process.env.NEXT_PUBLIC_BASE_ACCOUNT_ASSOC_PAYLOAD;
  const signature = process.env.NEXT_PUBLIC_BASE_ACCOUNT_ASSOC_SIGNATURE;
  const ownerAddress = process.env.NEXT_PUBLIC_BASE_OWNER_ADDRESS;

  const manifest = {
    accountAssociation:
      header && payload && signature
        ? { header, payload, signature }
        : undefined,
    miniapp: {
      version: "1",
      name: APP_NAME,
      homeUrl: SITE_URL,
      iconUrl: APP_ICON_URL,
      splashImageUrl: APP_SPLASH_URL,
      splashBackgroundColor: "#f8fbff",
      subtitle: APP_TAGLINE,
      description: APP_DESCRIPTION,
      primaryCategory: "games",
      tags: ["games", "numbers", "base", "arcade"],
      heroImageUrl: APP_OG_URL,
      tagline: APP_TAGLINE,
      ogTitle: APP_TITLE,
      ogDescription: APP_DESCRIPTION,
      ogImageUrl: APP_OG_URL,
      buttonTitle: "Open app",
      noindex: false,
      imageUrl: APP_OG_URL,
      splashScreenColor: "#f8fbff",
      webhookUrl: undefined,
      baseBuilder: {
        allowedAddresses: ownerAddress ? [ownerAddress] : undefined,
        appId: BASE_APP_ID,
        builderCode: BASE_BUILDER_CODE
      }
    }
  };

  return NextResponse.json(manifest, {
    headers: {
      "Cache-Control": "public, max-age=300"
    }
  });
}


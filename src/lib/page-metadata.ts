import type { Metadata } from "next";

export const siteUrl = "https://viloljoshi.github.io/Rivertyapplication-";
export const siteName = "Riverty Risk Decisioning Evolution Lab";
export const siteDescription =
  "An independent product concept for governing change across a real-time credit and fraud decisioning platform.";

export function buildPageMetadata(
  title: string,
  description: string,
  path = ""
): Metadata {
  const canonical = `${siteUrl}${path ? `/${path}` : ""}/`;
  const socialTitle = title === siteName ? title : `${title} | ${siteName}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName,
      type: "website",
      locale: "en_GB",
      images: [
        {
          url: `${siteUrl}/og-card.png`,
          width: 1200,
          height: 630,
          alt: "Riverty Risk Decisioning Evolution Lab product concept",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [`${siteUrl}/og-card.png`],
    },
  };
}

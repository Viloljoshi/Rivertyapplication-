import type { Metadata, Viewport } from "next";
import "@fontsource-variable/instrument-sans";
import { AppShell } from "@/components/app-shell";
import {
  buildPageMetadata,
  siteDescription,
  siteName,
  siteUrl,
} from "@/lib/page-metadata";
import "./globals.css";

const defaults = buildPageMetadata(siteName, siteDescription);

export const metadata: Metadata = {
  ...defaults,
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  applicationName: siteName,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f3f1f0",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body><AppShell>{children}</AppShell></body>
    </html>
  );
}

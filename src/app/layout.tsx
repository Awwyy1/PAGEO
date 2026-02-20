// Root layout — applies global styles, font, and providers to all pages
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Allme — All your links, one page",
  description:
    "Create a beautiful page with all your links. Share it with the world. allme.site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

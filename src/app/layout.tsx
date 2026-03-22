// Root layout — applies global styles, font, and providers to all pages
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Allme — All your links, one page",
    template: "%s",
  },
  description:
    "Create a beautiful link-in-bio page in seconds. Share all your important links with a single URL. allme.site",
  metadataBase: new URL("https://allme.site"),
  openGraph: {
    type: "website",
    siteName: "Allme",
    title: "Allme — All your links, one page",
    description:
      "Create a beautiful link-in-bio page in seconds. Share all your important links with a single URL.",
    url: "https://allme.site",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allme — All your links, one page",
    description:
      "Create a beautiful link-in-bio page in seconds. Share all your important links with a single URL.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", type: "image/png", sizes: "2000x2000" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vyprf49drh");`}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}

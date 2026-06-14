import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Luxsun Energy India | Premium Solar Solutions",
  description: "Desh Ka Solar. Leading the Way in Sustainable Energy Solutions. Get premium On-Grid, Off-Grid, and Hybrid Solar installations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="premium-noise">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-63TCHS3R0C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-63TCHS3R0C');
          `}
        </Script>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

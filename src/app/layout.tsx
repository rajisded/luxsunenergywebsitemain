import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}

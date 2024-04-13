import Footer from "@/components/Footer";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photography | Shiori Ueda",
  description: "Shiori's digital photo album",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="G-HD5WRPKN72" />
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}

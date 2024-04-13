import Footer from "@/components/Footer";
import { noto_sans, noto_sans_jp } from "@/components/fonts";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import "./globals.css";

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
      <body className={`${noto_sans.className} ${noto_sans_jp.className}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}

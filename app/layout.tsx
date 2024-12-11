import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Otel Rezervasyon",
  description:
    "En iyi otelleri kolayca bulun ve rezervasyon yapın! Güvenilir ve kullanıcı dostu platformumuz, size en uygun otel seçeneklerini sunar. Şimdi keşfedin ve tatilinizi planlayın.",
  keywords:
    "otel rezervasyon, online otel rezervasyon, uygun otel bulma, en iyi oteller, güvenli otel rezervasyon, tatil planlama, otel fiyatları karşılaştırma, otel bul",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-100`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

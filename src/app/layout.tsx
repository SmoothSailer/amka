import type { Metadata } from "next";
import { Barlow_Condensed, Instrument_Sans } from "next/font/google";
import { Providers } from "@/providers/query-client";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-heading",
  weight: ["300", "400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amka — Wake Up. Train. Nairobi's Gym Platform.",
  description:
    "Amka is the fitness platform East African gyms plug into. Members download one app, find their gym by code or location, and get a fully personalized training and nutrition experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${instrumentSans.variable} antialiased`}
    >
      <body className="min-h-screen overflow-x-hidden cursor-none">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

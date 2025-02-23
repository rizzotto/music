import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rizz Music",
  description: "Chill with the vibe!",
  openGraph: {
    title: "Rizz Music",
    description: "Chill with the vibe!",
    images: [
      {
        url: "public/images/metadata.png",
        width: 1200,
        height: 630,
        alt: "Rizz Music Cover",
      },
    ],
    type: "website",
    siteName: "Rizz Music",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeepPR | AI Code Reviewer",
  description: "Serverless AI PR Reviewer powered by AWS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-zinc-950 text-zinc-50"}>
                  <Navbar />
          {children}
              </body>
    </html>
  );
}

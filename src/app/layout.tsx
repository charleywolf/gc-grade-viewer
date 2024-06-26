import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import clsx from "clsx";
import { getViews } from "./utils/getViews";

export const revalidate = 600;
// export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Google Classroom Grade Viewer",
  description: "Created for Scarsdale High School",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const views = await getViews();
  return (
    <html lang="en">
      <body className={clsx(inter.className, "bg-slate-900 text-white")}>
        <Navbar />
        {children}
        <Analytics />
        <Footer views={views} />
      </body>
    </html>
  );
}

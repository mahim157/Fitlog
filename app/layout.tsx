
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitLog",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0c] text-white antialiased min-h-screen flex flex-col justify-between`}>
        <PlanProvider>
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
          <Footer />
          <Toaster position="top-right" theme="dark" richColors />
        </PlanProvider>
      </body>
    </html>
  );
}
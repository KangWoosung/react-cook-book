import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/style.css";
import SettingsMenu from "./components/SettingsMenu";
import RainCanvasRoot from "./components/RainCanvasRoot";
import AppR3FExtend from "./components/AppR3FExtend";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KangWoosung&apos;s React Cook Book",
  description:
    "KangWoosung&apos;s React Cook Book showcasing CSS transitions, animations, and tech stacks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <header className="w-full py-8 px-16 border-b flex flex-row items-center justify-between">
          <h1 className="text-4xl font-bold">
            KangWoosung&apos;s React Cook Book
          </h1>
          <div className="flex flex-row items-center gap-4">
            <SettingsMenu />
          </div>
        </header>
        <main className="flex-1 w-full max-w-6xl mx-auto flex flex-col items-center py-16 px-16 sm:items-start">
          <AppR3FExtend>{children}</AppR3FExtend>
        </main>
        <footer className="w-full py-8 px-16 border-t bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
            <p className="font-light">
              © 2026 KangWoosung&apos;s React Cook Book.
              <br />
              MIT License.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

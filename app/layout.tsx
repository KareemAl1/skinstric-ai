import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skinstric",
  description: "AI Skincare",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full">
        {children}
      </body>
    </html>
  );
}
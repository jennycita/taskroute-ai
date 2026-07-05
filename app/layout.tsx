import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskRoute AI",
  description: "Find the best AI platform, model, effort level, and workspace for your task."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

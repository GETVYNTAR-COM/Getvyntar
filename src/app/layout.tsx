import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vyntar Local SEO - AI-Powered Citation Building",
  description:
    "AI-powered citation building for UK agencies. Automate local SEO with smart citation management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

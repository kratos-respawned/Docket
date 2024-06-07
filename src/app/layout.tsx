import { cn } from "@/lib/utils";
import "./globals.css";
import "./prosemirror.css";
import type { Metadata } from "next";
import { Yeseva_One } from "next/font/google";
import { Montserrat } from "next/font/google";
const yeserva = Yeseva_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-yeserva",
});
const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  title: "Docket",
  metadataBase: new URL(defaultUrl),
  description: "A simple note taking app",
  keywords: "notes, note taking, note taking app, docket",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(montserrat.className, yeserva.variable,montserrat.variable)}>
        {children}
      </body>
    </html>
  );
}

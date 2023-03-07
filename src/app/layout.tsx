
import "./globals.css";
import { Yeseva_One } from "next/font/google"
import { Montserrat } from "next/font/google"
const yeserva = Yeseva_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-yeserva",
})
const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <body className={`divider overflow-clip ${yeserva.variable} ${montserrat.variable} bg-nblack text-slate-100`}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jsdairsystems.com"),
  title: {
    default: "JSD Air Systems — HVAC, climatización y fabricación industrial",
    template: "%s | JSD Air Systems",
  },
  description:
    "Más de 60 años diseñando, instalando y dando mantenimiento a sistemas HVAC industriales y comerciales. Chillers, ductería, tuberías de agua helada, fabricación metálica y CNC en Monterrey.",
  keywords: [
    "HVAC industrial",
    "HVAC comercial",
    "climatización industrial",
    "fabricación de ductos metálicos",
    "tuberías de agua helada",
    "mantenimiento HVAC",
    "fabricación metálica",
    "CNC láser plasma",
    "redilas trailas",
    "Monterrey",
    "Guadalupe Nuevo León",
  ],
  authors: [{ name: "JSD Air Systems" }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://jsdairsystems.com",
    siteName: "JSD Air Systems",
    title: "JSD Air Systems — HVAC, climatización y fabricación industrial",
    description:
      "60+ años en ingeniería, instalación, mantenimiento y fabricación HVAC industrial y comercial.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${poppins.variable} ${openSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 pb-24 lg:pb-0">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}

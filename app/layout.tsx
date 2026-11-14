import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import DemlabAI from "@/components/DemlabAI";
import CookieBanner from "@/components/CookieBanner";
import { Analytics } from "@vercel/analytics/next";

const SITE_TITLE = "DEMLAB | Zanaat, Fermantasyon & Ekstraksiyon Laboratuvarı";
const SITE_DESCRIPTION =
  "Özel fermantasyon prosesleriniz, biyokimyasal reaksiyonlar ve botanik ekstraksiyonlar için yüksek saflıkta %96'lık laboratuvar çözeltileri ve zanaat hammaddeleri.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.demlab.com.tr"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.demlab.com.tr",
    siteName: "DEMLAB",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/hero-plate.jpg",
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/hero-plate.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className="min-h-screen flex flex-col text-[#f7ede2] antialiased selection:bg-[#e59840] selection:text-black">
        <CartProvider>
          <Header />
          <CartDrawer />
          <div className="flex-1">{children}</div>
          <DemlabAI />
          <CookieBanner />
          <Footer />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}

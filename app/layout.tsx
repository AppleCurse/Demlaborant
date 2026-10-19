import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "DEMLAB | Zanaat, Fermantasyon & Ekstraksiyon Laboratuvarı",
  description:
    "Özel fermantasyon prosesleriniz, biyokimyasal reaksiyonlar ve botanik ekstraksiyonlar için yüksek saflıkta %96'lık laboratuvar çözeltileri ve zanaat hammaddeleri.",
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
          <WhatsAppButton />
          <CookieBanner />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

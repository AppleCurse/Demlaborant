"use client";

import Link from "next/link";
import { useState } from "react";
import { Shield, Phone, Mail, Menu, X, ChevronRight, FlaskConical, ShoppingBag, Truck, Sparkles } from "lucide-react";
import { companyInfo } from "@/data/company";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  const navigation = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Çözelti Ürünleri", href: "/products" },
    { name: "Dozaj & Seyreltme Hesaplayıcı", href: "/calculator" },
    { name: "Sevkiyat Takibi", href: "/tracking" },
    { name: "TDS / Analiz Belgeleri", href: "/documents" },
    { name: "Atölye & Hakkımızda", href: "/about" },
    { name: "İletişim & Teklif", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#1c100a]/95 backdrop-blur-md border-b border-[#e59840]/25 text-[#f7ede2]">
      {/* Üst Bilgi Barı - Meşe & Bakır Tonları */}
      <div className="bg-[#0e0704] text-[#cfb095] text-xs py-2 px-4 sm:px-8 border-b border-[#2d190e]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#e59840]" />
              <span className="font-medium text-[#f0e2d3]">Özel Fermantasyon Çözeltilerinde Mühürlü Ambalaj & Hızlı Sevkiyat</span>
            </span>
            <span className="hidden md:inline-block text-[#4a2b19]">|</span>
            <span className="hidden md:flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#d8892f]" />
              <span>%100 Analitik Saflık & Parti Bazlı Analiz Sertifikası (CoA)</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-1 hover:text-[#f3bd68] transition">
              <Phone className="w-3 h-3 text-[#e59840]" />
              <span>{companyInfo.phone}</span>
            </a>
            <span className="text-[#4a2b19]">|</span>
            <a href={`mailto:${companyInfo.salesEmail}`} className="flex items-center gap-1 hover:text-[#f3bd68] transition">
              <Mail className="w-3 h-3 text-[#e59840]" />
              <span>{companyInfo.salesEmail}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Ana Menü Çubuğu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* DEMLAB Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#d8892f] via-[#9e591b] to-[#512708] flex items-center justify-center text-white shadow-lg shadow-[#d8892f]/20 border border-[#f5b86e]/35 group-hover:scale-105 transition-transform">
            <FlaskConical className="w-6 h-6 text-[#fff2db]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-wider text-white block leading-none font-serif">
                DEM<span className="text-[#e59840]">LAB</span>
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#f3bd68] bg-[#e59840]/20 px-1.5 py-0.5 rounded border border-[#e59840]/40">
                ZANAAT SERİSİ
              </span>
            </div>
            <span className="text-[10px] tracking-widest uppercase text-[#bfa085] font-medium block mt-1">
              Fermantasyon & Ekstraksiyon Laboratuvarı
            </span>
          </div>
        </Link>

        {/* Desktop Navigasyon */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wide text-[#dec4ae]">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-[#f3bd68] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#e59840] after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Sepet & Teklif */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-[#2a170d] hover:bg-[#382012] text-[#f7ede2] border border-[#e59840]/30 text-xs font-bold px-3.5 py-2.5 rounded-xl transition shadow-inner"
            aria-label="Sepeti Görüntüle"
          >
            <ShoppingBag className="w-4 h-4 text-[#e59840]" />
            <span className="hidden sm:inline">Sepetim</span>
            {totalItems > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#d8892f] text-white text-[10px] flex items-center justify-center font-bold animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-[#d8892f] to-[#b3691d] hover:from-[#e59840] hover:to-[#c67825] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-[#d8892f]/20 border border-[#ffd59c]/30 transition active:scale-[0.98]"
          >
            <span>Özel Teklif</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobil Menü Butonu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#dec4ae] hover:bg-[#2a170d] transition"
            aria-label="Menü"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#e59840]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobil Menü */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#180e08] border-t border-[#e59840]/20 px-4 py-4 space-y-3 shadow-2xl">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-[#f0ded0] hover:bg-[#28160d] hover:text-[#f3bd68] transition"
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#2a170d] text-[#f7ede2] border border-[#e59840]/30 font-semibold py-2.5 rounded-lg text-sm"
            >
              <ShoppingBag className="w-4 h-4 text-[#e59840]" />
              <span>Sepetimi Görüntüle ({totalItems})</span>
            </button>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center block bg-gradient-to-r from-[#d8892f] to-[#b3691d] text-white font-bold py-2.5 rounded-lg text-sm"
            >
              Özel Fermantasyon Teklifi Al
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

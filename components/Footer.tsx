"use client";

import Link from "next/link";
import { FlaskConical, MapPin, Phone, Mail, FileCheck, ShieldAlert, Award, Sparkles } from "lucide-react";
import { companyInfo } from "@/data/company";

export default function Footer() {
  return (
    <footer className="bg-[#120804] text-[#cfb29a] text-sm border-t border-[#3e2315]">
      {/* Üst Bilgi Rozetleri */}
      <div className="border-b border-[#28150c] py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 bg-[#1d1009]/90 p-4 rounded-xl border border-[#3e2315]">
            <div className="p-2.5 rounded-lg bg-[#3a2012] text-[#e59840]">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[#fef5ec] font-bold text-sm font-serif">Onaylı Analiz & TDS Belgeleri</h4>
              <p className="text-xs text-[#a98f7b] mt-0.5">Tüm parti çözeltileri analiz sertifikalı ve akredite test onaylıdır.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#1d1009]/90 p-4 rounded-xl border border-[#3e2315]">
            <div className="p-2.5 rounded-lg bg-[#3a2012] text-[#e59840]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[#fef5ec] font-bold text-sm font-serif">Mühürlü Emniyetli Sevkiyat</h4>
              <p className="text-xs text-[#a98f7b] mt-0.5">5L, 10L ve 20L kaplarda sızdırmaz kilitli kapak ve güvenli getirim.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#1d1009]/90 p-4 rounded-xl border border-[#3e2315]">
            <div className="p-2.5 rounded-lg bg-[#3a2012] text-[#e59840]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[#fef5ec] font-bold text-sm font-serif">Zanaat & Fermantasyon Güvencesi</h4>
              <p className="text-xs text-[#a98f7b] mt-0.5">Meşe fıçılama, botanik ekstraksiyon ve yüksek saflık standardı.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ana Footer Alanı */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Şirket Künyesi */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2.5 text-white font-bold text-lg font-serif">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#d8892f] to-[#783e10] flex items-center justify-center text-white border border-[#f5b86e]/30 shadow">
              <FlaskConical className="w-5 h-5" />
            </div>
            <span className="tracking-wider">DEM<span className="text-[#e59840]">LAB</span></span>
          </div>
          <p className="text-xs text-[#b89b83] leading-relaxed">
            Özel fermantasyon prosesleriniz, biyokimyasal kültürler ve botanik ekstraksiyonlar için yüksek saflıkta çözelti ve zanaat laboratuvar ortağınız.
          </p>
          <div className="text-xs space-y-1 text-[#8f745e] pt-2 border-t border-[#2d180d]">
            <div><strong className="text-[#c5a992]">Vergi Dairesi:</strong> {companyInfo.taxOffice}</div>
            <div><strong className="text-[#c5a992]">VKN:</strong> {companyInfo.taxNumber}</div>
            <div><strong className="text-[#c5a992]">MERSİS:</strong> {companyInfo.mersisNo}</div>
          </div>
        </div>

        {/* Hızlı Bağlantılar */}
        <div>
          <h4 className="text-[#fdf6ed] font-bold mb-4 text-xs tracking-widest uppercase font-serif text-[#e59840]">Koleksiyon & Hizmetler</h4>
          <ul className="space-y-2.5 text-xs text-[#c6ab95]">
            <li>
              <Link href="/products" className="hover:text-[#f3bd68] transition">Çözelti Ürünleri</Link>
            </li>
            <li>
              <Link href="/calculator" className="hover:text-[#f3bd68] transition">Dozaj & Seyreltme Hesaplayıcı</Link>
            </li>
            <li>
              <Link href="/documents" className="hover:text-[#f3bd68] transition">Teknik Analiz Formları (CoA / TDS)</Link>
            </li>
            <li>
              <Link href="/tracking" className="hover:text-[#f3bd68] transition">Canlı Sevkiyat Takibi</Link>
            </li>
          </ul>
        </div>

        {/* Kurumsal */}
        <div>
          <h4 className="text-[#fdf6ed] font-bold mb-4 text-xs tracking-widest uppercase font-serif text-[#e59840]">Kurumsal</h4>
          <ul className="space-y-2.5 text-xs text-[#c6ab95]">
            <li>
              <Link href="/about" className="hover:text-[#f3bd68] transition">Hakkımızda & Atölye</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#f3bd68] transition">Özel Teklif & İletişim</Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-[#f3bd68] transition">KVKK Aydınlatma Metni</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#f3bd68] transition">Teslimat & Güvenlik Şartları</Link>
            </li>
          </ul>
        </div>

        {/* İletişim & Konum */}
        <div className="space-y-3">
          <h4 className="text-[#fdf6ed] font-bold mb-4 text-xs tracking-widest uppercase font-serif text-[#e59840]">Atölye & İletişim</h4>
          <div className="flex items-start gap-2.5 text-xs text-[#c6ab95]">
            <MapPin className="w-4 h-4 text-[#e59840] shrink-0 mt-0.5" />
            <span>{companyInfo.address}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#c6ab95]">
            <Phone className="w-4 h-4 text-[#e59840] shrink-0" />
            <a href={`tel:${companyInfo.phone}`} className="hover:text-[#f3bd68] transition">{companyInfo.phone}</a>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#c6ab95]">
            <Mail className="w-4 h-4 text-[#e59840] shrink-0" />
            <a href={`mailto:${companyInfo.email}`} className="hover:text-[#f3bd68] transition">{companyInfo.email}</a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#28150c] py-5 text-center text-xs text-[#8f745e]">
        © {new Date().getFullYear()} DEMLAB Zanaat & Fermantasyon Laboratuvarı. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}

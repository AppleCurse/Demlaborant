"use client";

import { useState, useEffect } from "react";
import { Cookie, Check, X } from "lucide-react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("demlab_cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("demlab_cookie_consent", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-4 sm:p-6 bg-[#170e08]/95 text-amber-100 backdrop-blur-md border-t border-amber-900/50 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Cookie className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200/80 leading-relaxed max-w-3xl">
            Sitemizde sepet deneyimini korumak, siparişlerinizi güvenle tamamlamak ve fermantasyon çözelti hesaplama araçlarını çalıştırmak için zorunlu çerezler kullanılmaktadır. Detaylı bilgi için{" "}
            <Link href="/privacy" className="text-amber-400 underline hover:text-amber-300">
              KVKK & Çerez Aydınlatma Metnimizi
            </Link>{" "}
            inceleyebilirsiniz.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={accept}
            className="w-full sm:w-auto btn-amber text-xs font-bold px-5 py-2.5 rounded-xl transition"
          >
            Kabul Ediyorum
          </button>
        </div>
      </div>
    </div>
  );
}

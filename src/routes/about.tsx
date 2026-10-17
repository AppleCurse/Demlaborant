import { createFileRoute } from "@tanstack/react-router";
import { companyInfo } from "@/demlab/data/company";
import { ShieldCheck, Award, FlaskConical, Users, CheckCircle2, Sparkles, Flame, Boxes } from "lucide-react";


function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-16">
      {/* Giriş & Hikaye */}
      <section className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#e59840]">
          DEMLAB Manifestosu
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#fff5ea] font-serif leading-tight">
          Zanaat Fermantasyonu, Meşe Dokusu ve Analitik Saflık
        </h1>
        <p className="text-sm sm:text-base text-[#d8c2ad] leading-relaxed pt-2">
          {companyInfo.name}, zanaatkarların, biyoteknoloji atölyelerinin ve özel fermantasyon meraklılarının en yüksek saflıkta çözeltilere güvenle ulaşabilmesi amacıyla kurulmuştur.
        </p>
        <p className="text-xs sm:text-sm text-[#baa08a] leading-relaxed">
          Geleneksel meşe fıçı dinlendirme tekniklerinden modern analitik ekstraksiyonlara kadar her damlada stabiliteyi, tortusuzluğu ve doğru alkol derecesini garanti ediyoruz. Gaz kromatografisi (GC) ile test edilmiş lot sertifikaları ve emniyet kilitli mühürlü ambalajlarla teslimat sağlıyoruz.
        </p>
      </section>

      {/* Rakamlarla & Değerlerimiz */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="oak-card p-6 rounded-2xl text-center">
          <div className="text-3xl sm:text-4xl font-extrabold text-[#f3bd68] font-mono">%96.0</div>
          <div className="text-xs font-bold text-[#fef5ec] font-serif mt-2">Analitik Saflık</div>
          <div className="text-[11px] text-[#937b67] mt-1">Parti bazlı CoA raporları</div>
        </div>
        <div className="oak-card p-6 rounded-2xl text-center">
          <div className="text-3xl sm:text-4xl font-extrabold text-[#f3bd68] font-mono">Meşe</div>
          <div className="text-xs font-bold text-[#fef5ec] font-serif mt-2">Fıçı Uyumluluğu</div>
          <div className="text-[11px] text-[#937b67] mt-1">Tanen & vanilin dengesi</div>
        </div>
        <div className="oak-card p-6 rounded-2xl text-center">
          <div className="text-3xl sm:text-4xl font-extrabold text-[#f3bd68] font-mono">5L - 20L</div>
          <div className="text-xs font-bold text-[#fef5ec] font-serif mt-2">Mühürlü Ambalaj</div>
          <div className="text-[11px] text-[#937b67] mt-1">Emniyet kilitli HDPE kaplar</div>
        </div>
        <div className="oak-card p-6 rounded-2xl text-center">
          <div className="text-3xl sm:text-4xl font-extrabold text-[#f3bd68] font-mono">81 İl</div>
          <div className="text-xs font-bold text-[#fef5ec] font-serif mt-2">Hızlı Teslimat</div>
          <div className="text-[11px] text-[#937b67] mt-1">Mühürlü kapıya getirim</div>
        </div>
      </section>

      {/* Kalite Politikamız ve Altyapı */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="oak-card rounded-3xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#2c170d] text-[#e59840] border border-[#e59840]/30 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#fef5ec] font-serif">Zanaat & Saflık Politikamız</h2>
          <p className="text-xs sm:text-sm text-[#c6ad97] leading-relaxed">
            Fermantasyon ve maserasyon işlemlerinde kullanılan çözeltinin saflığı, nihai ürünün kokusunu, berraklığını ve aromasını doğrudan belirler. DEMLAB olarak ürünlerimizde istenmeyen yan kokuları, ağır metalleri ve uçucu kalıntıları sıfıra indiriyoruz.
          </p>
          <ul className="space-y-2 text-xs text-[#d6bda7] pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#e59840]" />
              <span>Gaz Kromatografisi (GC) ile partiler arası tam tutarlılık</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#e59840]" />
              <span>Gıda ve kozmetik uyumlu birinci sınıf mühürlü bidonlar</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#e59840]" />
              <span>Fıçı maserasyonlarında doğal aromatik profil güvencesi</span>
            </li>
          </ul>
        </div>

        <div className="oak-card rounded-3xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#2c170d] text-[#e59840] border border-[#e59840]/30 flex items-center justify-center">
            <FlaskConical className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#fef5ec] font-serif">Atölye ve Teknik Kadro</h2>
          <p className="text-xs sm:text-sm text-[#c6ad97] leading-relaxed">
            Kadıköy merkezli atölyemizde kimya mühendislerimiz ve fermantasyon uzmanlarımız, her müşterimizin reçetesine ve fıçı hacmine uygun doğru dozajı belirlemesinde aktif teknik danışmanlık sunar.
          </p>
          <div className="p-4 bg-[#180d07] rounded-xl border border-[#3e2315] text-xs text-[#baa08a] space-y-1">
            <strong className="text-[#f3bd68] block">Atölye İletişim Hattı:</strong>
            <p>Sorularınız veya özel siparişleriniz için WhatsApp ve telefon hattımız haftanın 6 günü aktiftir.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [] }),
  component: AboutPage,
});

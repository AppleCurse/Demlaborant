import { companyInfo } from "@/data/company";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni & Gizlilik Politikası | DEMLAB",
  description: "6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca aydınlatma metni ve kurumsal gizlilik politikası.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Yasal Bilgilendirme</span>
        <h1 className="text-2xl sm:text-4xl font-black text-amber-100 mt-1 amber-title">
          KVKK Aydınlatma Metni ve Gizlilik Politikası
        </h1>
        <p className="text-xs text-amber-200/60 mt-2">
          Son Güncelleme: 2026 | DEMLAB Zanaat & Fermantasyon Laboratuvarı A.Ş.
        </p>
      </div>

      <div className="oak-card rounded-3xl p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-amber-100/80 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-amber-200">1. Veri Sorumlusu</h2>
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, veri sorumlusu sıfatıyla <strong>{companyInfo.name}</strong> (&quot;DEMLAB&quot;) olarak, elde ettiğimiz kurumsal ve kişisel verileri aşağıda açıklanan çerçevede mevzuata uygun olarak işlemekteyiz.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-amber-200">2. Kişisel Verilerin İşlenme Amacı</h2>
          <p>Web sitemiz üzerinden toplanan kişisel veriler (Yetkili adı, telefon, kurumsal e-posta, şirket bilgileri):</p>
          <ul className="list-disc pl-5 space-y-1 text-amber-200/70">
            <li>Talep ettiğiniz ürünler ve zanaat çözeltileri için proforma teklif ve teknik şartname hazırlanması,</li>
            <li>Güvenlik Bilgi Formu (GBF/SDS) ve Analiz Sertifikası (CoA) iletimi,</li>
            <li>Sipariş teyidi, faturalandırma ve gizli ambalajlı sevkiyat takibi,</li>
            <li>Teknik danışmanlık taleplerinin karşılanması amaçlarıyla işlenmektedir.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-amber-200">3. Kimyasal Takip ve Yasal Şeffaflık</h2>
          <p>
            Kimya ve laboratuvar sektörüne ilişkin tabi olunan mevzuatlar uyarınca tüm parti analiz ve saflık sertifikaları yasal mercilerin denetimlerine ibraz edilmek üzere arşivlenir.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-amber-200">4. Verilerin Aktarılması</h2>
          <p>
            Toplanan bilgiler, üçüncü taraflara ticari veya reklam amaçlı satılmaz veya pazarlanmaz. Yalnızca teslimatın gerçekleştirilebilmesi amacıyla anlaşmalı lojistik/kargo firmalarına aktarılabilir.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-amber-200">5. KVKK Madde 11 Kapsamındaki Haklarınız</h2>
          <p>
            Veri sahipleri, diledikleri zaman <strong>{companyInfo.email}</strong> adresi üzerinden veri sorumlusuna başvurarak verilerinin işlenip işlenmediğini öğrenme, silinmesini veya düzeltilmesini talep etme hakkına sahiptir.
          </p>
        </section>
      </div>
    </main>
  );
}

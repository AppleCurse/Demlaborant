# DEMLAB — Zanaat & Laboratuvar Kimyasalları

Zanaat, fermantasyon ve botanik ekstraksiyon laboratuvarı için geliştirilmiş modern Next.js e-ticaret ve sipariş platformu.

## Özellikler

- **Next.js 16 (App Router)** & **Turbopack**
- **Tailwind CSS v4** ile tasarlanmış masif meşe ve amber lüks tema
- **Akredite Analitik Saflık & Reaktif Derecesi** (%96 Özel Fermantasyon Çözeltileri)
- **Parti Bazlı Bağımsız Analiz Sertifikası (CoA)** sorgulama sistemi (`/api/coa`)
- **İstanbul İçi Hızlı Motokurye & İlçe Bazlı ETA Hesaplama**
- **Drizzle ORM & PostgreSQL** veri tabanı entegrasyonu
- **Sepet ve Kapıda Ödeme / Havale** sipariş akışı

## Kurulum ve Geliştirme

```bash
npm install
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak görüntüleyebilirsiniz.

## Dağıtım (Vercel)

Proje Vercel ile tam uyumludur. Sıfır yapılandırma ile otomatik olarak dağıtılır.
İsteğe bağlı olarak PostgreSQL bağlantısı için `DATABASE_URL` ortam değişkenini ekleyebilirsiniz.

# DEMLAB — Zanaat & Laboratuvar Kimyasalları

Next.js 16 App Router ile geliştirilmiş ürün kataloğu, sepet, sipariş, teklif ve sipariş takip uygulaması.

## Özellikler

- Next.js 16, React 19, Tailwind CSS 4 ve TypeScript
- PostgreSQL ve Drizzle ORM
- Sunucu tarafında katalog fiyatı doğrulamalı, çok ürünlü sipariş kaydı
- Kapıda kart/nakit, havale ve kurumsal ödeme seçenekleri
- Sipariş numarası ve telefonla gerçek sipariş takibi
- Veritabanına kaydedilen kurumsal teklif talepleri
- Parti analiz sorgulama ve WhatsApp üzerinden güncel belge talebi

## Kurulum

```bash
npm install
cp .env.example .env.local
# .env.local içindeki DATABASE_URL değerini düzenleyin
npm run db:migrate
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışır. Ürün ve sepet sayfaları veritabanı olmadan görüntülenebilir; sipariş, takip, teklif ve analiz API'leri PostgreSQL bağlantısı gerektirir.

## Kontroller

```bash
npm run typecheck
npm run lint
npm run build
```

Veritabanı şeması değiştiğinde:

```bash
npm run db:generate
npm run db:migrate
```

## Dağıtım (Vercel)

Projeyi Vercel'e bağlayın ve `DATABASE_URL` ortam değişkenini Production/Preview ortamlarına ekleyin. İlk kurulumda `drizzle/0000_pale_stone_men.sql` migration'ını veritabanına uygulayın veya `npm run db:migrate` komutunu çalıştırın.

## İletişim

- Telefon / WhatsApp: +90 530 016 94 23
- Facebook: https://www.facebook.com/profile.php?id=61596232029684

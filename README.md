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
- Supabase Auth + yetkili e-posta listesiyle korunan yönetim paneli
- Sipariş ve teklif durum yönetimi; müşteri takip ekranına anlık yansıma
- Yönetici tarafından yüklenen gerçek CoA/SDS/TDS PDF'lerini lot numarasıyla sunma
- Vercel AI Gateway model destekli, model erişilemediğinde yerel kurallara dönen sesli asistan
- Ambalaj/fiyat içeren WhatsApp hızlı sipariş bağlantıları
- Vercel Analytics ile sepet, ödeme, satın alma ve WhatsApp satış olayları

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

Projeyi Vercel'e bağlayın ve `.env.example` içindeki değişkenleri Production/Preview ortamlarına ekleyin. `SUPABASE_SERVICE_ROLE_KEY` yalnızca sunucuda PDF yüklemek için kullanılır; istemciye gönderilmez. `ADMIN_EMAILS` dışındaki Supabase kullanıcıları yönetim API'lerine erişemez. Yeni kullanıcı kaydı Supabase Auth'ta kapalı tutulmalıdır.

AI asistan Vercel üzerinde AI Gateway OIDC kimliğini kullanır; `AI_MODEL` ile model değiştirilebilir. Vercel dışında model çağrısı için `AI_GATEWAY_API_KEY` gerekir. Anahtar/model erişimi yoksa asistan güvenli yerel ürün yanıtlarını kullanmaya devam eder.

Migration'ları `npm run db:migrate` ile uygulayın. Migration sonrasında uygulama rolüne tablo/sequence yetkileri verin; canlı Supabase kurulumunda sunucu rolü RLS atlamalı, anon kullanıcılar için RLS açık kalmalıdır. `documents` Storage bucket'ı yalnızca herkese açık müşteri PDF'leri içindir; yönetim dışı yüklemeler servis rolü olmadan yapılamaz.

## İletişim

- Telefon / WhatsApp: +90 530 016 94 23
- Facebook: https://www.facebook.com/profile.php?id=61596232029684

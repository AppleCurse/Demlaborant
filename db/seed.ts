import { db } from "@/db";
import { districts, lots, packages } from "@/db/schema";

/** Idempotent reference-data seeding. Each table is checked separately and any
 *  missing row is inserted with `onConflictDoNothing`, so a partially applied
 *  seed heals itself on the next request instead of being skipped forever. */
let seeded: Promise<void> | null = null;

const PACKAGE_SEED = [
  {
    id: "pkg-5l",
    volume: 5,
    price: 1750,
    title: "5 Litre",
    badge: "Giriş / Deneme Boyu",
    isPopular: false,
    courierEligible: false,
    description:
      "Kompakt atölye ve laboratuvar çalışmaları için optimize edilmiş sızdırmaz HDPE ambalaj.",
  },
  {
    id: "pkg-10l",
    volume: 10,
    price: 3000,
    title: "10 Litre",
    badge: "EN ÇOK SATAN • İSTANBUL MOTOKURYE",
    isPopular: true,
    courierEligible: true,
    description:
      "Hızlı tüketime uygun, İstanbul içinde aynı gün kapıya motokurye teslimatına özel hacim.",
  },
  {
    id: "pkg-20l",
    volume: 20,
    price: 5500,
    title: "20 Litre",
    badge: "MAKSİMUM TASARRUF",
    isPopular: false,
    courierEligible: false,
    description:
      "Büyük ölçekli ekstraksiyon ve zanaatkar dinlendirmeler için endüstriyel takviyeli bidon.",
  },
];

const DISTRICT_SEED = [
  { name: "Kadıköy", etaMin: 45, etaMax: 60, note: "Zanaat Vadisi çıkışlı" },
  { name: "Beşiktaş", etaMin: 60, etaMax: 75, note: "Boğaz hattı" },
  { name: "Şişli", etaMin: 60, etaMax: 80, note: "Merkez trafik bandı" },
  { name: "Üsküdar", etaMin: 50, etaMax: 65, note: "Sahil hattı" },
  { name: "Bakırköy", etaMin: 75, etaMax: 90, note: "E-5 batı" },
  { name: "Beylikdüzü", etaMin: 90, etaMax: 120, note: "Uç batı hattı" },
  { name: "Pendik", etaMin: 60, etaMax: 80, note: "Anadolu yakası doğu" },
  { name: "Sarıyer", etaMin: 75, etaMax: 95, note: "Kuzey orman hattı" },
];

const LOT_SEED = [
  {
    lotCode: "DLM-96-2026-B4",
    abv: "%96.22",
    residue: "< 0.0005%",
    volatileAcidity: "< 12 ppm",
    heavyMetals: "Tespit Edilemedi",
    testDate: "2026-10",
    method: "Akredite Spektrometre + Gaz Kromatografisi",
  },
  {
    lotCode: "DLM-96-2026-A2",
    abv: "%96.08",
    residue: "< 0.0006%",
    volatileAcidity: "< 11 ppm",
    heavyMetals: "Tespit Edilemedi",
    testDate: "2026-08",
    method: "Akredite Spektrometre + Gaz Kromatografisi",
  },
  {
    lotCode: "DLM-96-2025-C7",
    abv: "%96.41",
    residue: "< 0.0004%",
    volatileAcidity: "< 9 ppm",
    heavyMetals: "Tespit Edilemedi",
    testDate: "2025-12",
    method: "Akredite Spektrometre + Titrimetrik Analiz",
  },
];

async function apply() {
  const [pkgRows, districtRows, lotRows] = await Promise.all([
    db.select().from(packages),
    db.select().from(districts),
    db.select().from(lots),
  ]);

  if (pkgRows.length < PACKAGE_SEED.length) {
    await db.insert(packages).values(PACKAGE_SEED).onConflictDoNothing();
  }
  if (districtRows.length < DISTRICT_SEED.length) {
    await db.insert(districts).values(DISTRICT_SEED).onConflictDoNothing();
  }
  if (lotRows.length < LOT_SEED.length) {
    await db.insert(lots).values(LOT_SEED).onConflictDoNothing();
  }
}

export function ensureSeeded(): Promise<void> {
  if (!seeded) {
    seeded = apply().catch((err) => {
      seeded = null;
      throw err;
    });
  }
  return seeded;
}

/** Last-resort self heal: force a fresh seed pass (used when a lookup misses). */
export async function reseed(): Promise<void> {
  seeded = null;
  await ensureSeeded();
}

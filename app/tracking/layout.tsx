import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sipariş & Kargo Takip | DEMLAB",
  description:
    "DEMLAB sipariş numaranız ve telefon numaranızla sevkiyat, kurye ve teslimat durumunu anlık olarak sorgulayın.",
  alternates: {
    canonical: "/tracking",
  },
  openGraph: {
    title: "Sipariş & Kargo Takip | DEMLAB",
    description:
      "DEMLAB sipariş numaranız ve telefon numaranızla sevkiyat, kurye ve teslimat durumunu anlık olarak sorgulayın.",
    url: "/tracking",
  },
};

export default function TrackingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

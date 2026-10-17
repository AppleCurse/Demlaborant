import { createFileRoute } from "@tanstack/react-router";
import DemlabLanding from "@/components/demlab/DemlabLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DemlaB — %96 Analitik Saflıkta Laboratuvar Çözeltisi" },
      {
        name: "description",
        content:
          "Zanaat fermantasyonları, botanik ekstraksiyonlar ve laboratuvar reaksiyonları için parti analiz sertifikalı, mühürlü sevkiyatlı %96 çözelti.",
      },
      { property: "og:title", content: "DemlaB — %96 Analitik Saflıkta Laboratuvar Çözeltisi" },
      { property: "og:description", content: "Parti sertifikalı %96 çözelti, İstanbul içi aynı gün motokurye." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="paper-theme">
      <DemlabLanding />
    </div>
  );
}

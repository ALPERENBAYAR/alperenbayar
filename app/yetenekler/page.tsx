import AnimatedCard from "../../components/AnimatedCard";

const skills = [
  {
    tag: "Yazılım",
    title: "Modern web & backend",
    text: "React/Next.js arayüzleri, .NET tabanlı servisler; performans ve ölçek odaklı geliştirme.",
    href: "/yetenekler/modern-web-backend",
  },
  {
    tag: "Dijital Pazarlama",
    title: "Google Ads + Ölçüm",
    text: "Search/PMax, GA4 & Tag Manager, CRO mantığıyla dönüşüm optimizasyonu.",
    href: "/yetenekler/google-ads-olcum",
  },
  {
    tag: "Otomasyon & AI",
    title: "n8n akışları",
    text: "Lead akışları, raporlama, etiketleme, bildirim ve yapay zeka destekli otomasyonlar.",
    href: "/yetenekler/n8n-akislari",
  },
  {
    tag: "SEO",
    title: "Teknik + içerik",
    text: "Site içi optimizasyon, anahtar kelime analizi, dönüşüm odaklı içerik planı.",
    href: "/yetenekler/teknik-icerik-seo",
  },
  {
    tag: "Mobil",
    title: "Flutter uygulamaları",
    text: "Çoklu platform mobil projeler; API entegrasyonlu, temiz mimaride ekranlar.",
    href: "/yetenekler/flutter-uygulamalari",
  },
  {
    tag: "Veri",
    title: "Analitik & raporlama",
    text: "KPI takibi, dashboard'lar, deney tasarımı ve aksiyon odaklı raporlama.",
    href: "/yetenekler/analitik-raporlama",
  },
];

export default function YeteneklerPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-14 space-y-10">
      <header className="space-y-3">
        <p className="text-sm text-white/60">Yetenekler</p>
        <h1 className="text-4xl font-bold">Veriye dayalı üretim</h1>
        <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
          Yazılım, SEO, reklam ve otomasyonu birlikte kullanarak ölçülebilir, ölçeklenebilir
          çıktılar üretiyorum.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <AnimatedCard
            key={skill.title}
            tag={skill.tag}
            title={skill.title}
            text={skill.text}
            href={skill.href}
          />
        ))}
      </div>
    </main>
  );
}

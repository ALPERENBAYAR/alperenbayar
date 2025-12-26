import AnimatedCard from "../../components/AnimatedCard";

export default function HakkimdaPage() {
  return (
    <main className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-10 min-h-screen">
      <div className="pointer-events-none absolute inset-x-[-160px] inset-y-[-120px] -z-10 bg-[radial-gradient(1200px_600px_at_20%_20%,rgba(99,102,241,0.12),transparent),radial-gradient(900px_500px_at_80%_10%,rgba(236,72,153,0.10),transparent),radial-gradient(900px_500px_at_50%_90%,rgba(34,197,94,0.07),transparent),linear-gradient(180deg,#0e1220,#0b0f17)]" />

      <header className="space-y-3">
        <p className="text-sm text-white/60">Hakkımda</p>
        <h1 className="text-4xl font-bold">Teknik + pazarlama hibriti</h1>
        <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
          Bilgisayar Mühendisliği 4. sınıf öğrencisiyim. Google Ads, Meta Ads, SEO, n8n
          otomasyonları, JavaScript, .NET, React.js ve Flutter ile veriye dayalı, ölçülebilir
          çözümler üretiyorum.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
        <AnimatedCard
          tag="SEO"
          title="Teknik + içerik"
          text="Teknik SEO, site içi optimizasyon, anahtar kelime analizi ve dönüşüm odaklı içerik yapıları."
        />
        <AnimatedCard
          tag="Reklam"
          title="Performans odaklı"
          text="Google Ads & Meta Ads kampanya kurgusu, performans takibi, optimizasyon ve raporlama."
        />
        <AnimatedCard
          tag="Otomasyon"
          title="n8n + AI"
          text="Yazılım ve pazarlama süreçlerini entegre eden otomasyon akışları, ölçülebilir çıktılar."
        />
      </div>
    </main>
  );
}

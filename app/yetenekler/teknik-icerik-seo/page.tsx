import AnimatedButton from "../../../components/AnimatedButton";

export default function TeknikIcerikSeo() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-14 space-y-10">
      <header className="space-y-3">
        <p className="text-sm text-white/60">SEO · Teknik + içerik</p>
        <h1 className="text-4xl font-bold">Teknik SEO ve içerik optimizasyonu</h1>
        <p className="text-lg text-white/70 leading-relaxed">
          Site içi optimizasyon, anahtar kelime analizi ve dönüşüm odaklı içerik planları
          oluşturuyorum. Teknik tarafta performans iyileştirmeleri ve hatasız tarama için
          kontrol listeleri uyguluyorum.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Öne çıkan çalışmalar</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card
            title="Teknik SEO denetimi"
            text="PageSpeed, Core Web Vitals, robots.txt, sitemap, schema markup ve dahili linkleme denetimleri."
          />
          <Card
            title="İçerik mimarisi"
            text="Keyword araştırması, konu kümeleri, landing sayfa planları ve CTA yapılarıyla dönüşüme dönük içerik."
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Teknik vurgu</h3>
        <ul className="space-y-2 text-white/70 list-disc list-inside">
          <li>Schema ve meta etiketleri; hreflang ve canonical düzeni.</li>
          <li>Site haritası, kırık link/redirect kontrolü, taranabilirlik.</li>
          <li>İçerik KPI’ları: trafik, dönüşüm, scroll ve etkileşim metrikleri.</li>
        </ul>
      </section>

      <div className="flex gap-3">
        <AnimatedButton href="/projeler">Projeleri gör</AnimatedButton>
        <AnimatedButton variant="ghost" href="/iletisim">
          İletişime geç
        </AnimatedButton>
      </div>
    </main>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl p-5 bg-black/50 border border-white/10 shadow-lg shadow-black/30">
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-white/70 leading-relaxed">{text}</p>
    </div>
  );
}

import AnimatedButton from "../../../components/AnimatedButton";

export default function GoogleAdsOlcum() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-14 space-y-10">
      <header className="space-y-3">
        <p className="text-sm text-white/60">Dijital Pazarlama · Google Ads + Ölçüm</p>
        <h1 className="text-4xl font-bold">Search/PMax stratejisi ve ölçümleme</h1>
        <p className="text-lg text-white/70 leading-relaxed">
          Search/PMax kampanyalarını GA4 & Tag Manager ile ölçüp CRO mantığıyla optimize
          ediyorum. Bütçe kurgusu, anahtar kelime analizi ve veri bazlı iterasyonlarla
          dönüşüm odaklı yapı kuruyorum.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Öne çıkan çalışmalar</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card
            title="Lead odaklı PMax"
            text="Form/lead toplama için mikro/makro hedef tanımı; Tag Manager ile event ve conversion setup, GA4 raporlaması."
          />
          <Card
            title="E-ticaret optimizasyonu"
            text="Ürün feed düzeni, negatif keyword listeleri, kampanya segmentasyonu ve haftalık optimizasyon ritmi."
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Teknik vurgu</h3>
        <ul className="space-y-2 text-white/70 list-disc list-inside">
          <li>GA4 event & conversion kurulumları, server-side izleme fikrinde deneyim.</li>
          <li>Tag Manager ile form, click, scroll, timer tetikleyicileri.</li>
          <li>CRO: sayfa hızı, içerik hiyerarşisi, A/B denemeleri.</li>
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

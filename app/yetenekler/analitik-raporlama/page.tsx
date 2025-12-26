import AnimatedButton from "../../../components/AnimatedButton";

export default function AnalitikRaporlama() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-14 space-y-10">
      <header className="space-y-3">
        <p className="text-sm text-white/60">Veri · Analitik & raporlama</p>
        <h1 className="text-4xl font-bold">KPI takibi ve aksiyon odaklı raporlar</h1>
        <p className="text-lg text-white/70 leading-relaxed">
          KPI takibi, dashboard’lar ve deney tasarımlarıyla karar vericilere net aksiyon
          önerileri sunuyorum. Veri toplama ve görselleştirme zincirini kurup düzenli
          raporlama ritmi oluşturuyorum.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Öne çıkan çalışmalar</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card
            title="Performans dashboard"
            text="GA4 + reklam + CRM verilerini tek ekranda; kanal/cihaz/segment kırılımlarıyla aksiyonable raporlar."
          />
          <Card
            title="Deney ve testler"
            text="Hipotez -> deney -> ölçüm döngüsü; varyasyon takibi, anlamlılık kontrolü ve iyileştirme backlog’u."
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Teknik vurgu</h3>
        <ul className="space-y-2 text-white/70 list-disc list-inside">
          <li>Veri toplama zinciri: event planı, kaynak eşleştirme, ETL adımları.</li>
          <li>Görselleştirme: etkileşimli grafikler, segment ve tarih filtreleri.</li>
          <li>Raporlama ritmi: haftalık/aylık özetler, alerting ve bildirimler.</li>
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

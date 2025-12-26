import AnimatedButton from "../../../components/AnimatedButton";

export default function ModernWebBackend() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-14 space-y-10">
      <header className="space-y-3">
        <p className="text-sm text-white/60">Yazılım · Modern web & backend</p>
        <h1 className="text-4xl font-bold">React/Next.js + .NET ile tam yığın</h1>
        <p className="text-lg text-white/70 leading-relaxed">
          Performanslı React/Next.js arayüzleri ve .NET tabanlı servisler geliştiriyorum.
          Tasarım sistemleri, API sözleşmeleri ve veri modeli kurgularıyla uçtan uca ürün
          geliştirme yapıyorum.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Öne çıkan çalışmalar</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card
            title="Panel & stok yönetimi"
            text="Next.js + .NET API; ürün/stoğu izleme, raporlama, rol bazlı panel. SSR, ISR ve caching ile hızlı dashboard."
          />
          <Card
            title="Banka hesap akışları"
            text="ASP.NET MVC ile kullanıcı/hesap/işlem mimarisi; token bazlı güvenlik ve logging. Frontend’de component driven yaklaşım."
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Teknik vurgu</h3>
        <ul className="space-y-2 text-white/70 list-disc list-inside">
          <li>Next.js App Router, server actions, edge-friendly tasarım.</li>
          <li>.NET API, CQRS benzeri ayrışma, EF Core ile sağlam veri modeli.</li>
          <li>Performans: caching, sıkıştırma, Lighthouse/UX optimizasyonu.</li>
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

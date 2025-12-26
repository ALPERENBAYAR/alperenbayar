import AnimatedButton from "../../../components/AnimatedButton";

export default function FlutterUygulamalari() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-14 space-y-10">
      <header className="space-y-3">
        <p className="text-sm text-white/60">Mobil · Flutter uygulamaları</p>
        <h1 className="text-4xl font-bold">Çoklu platform temiz mimari</h1>
        <p className="text-lg text-white/70 leading-relaxed">
          Flutter ile iOS/Android odaklı uygulamalar geliştiriyorum. Temiz mimari, state
          management ve API entegrasyonlarını odakta tutarak ölçeklenebilir ekranlar
          oluşturuyorum.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Öne çıkan çalışmalar</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card
            title="FitAdvisor"
            text="Mobil odaklı takip sistemi; Firebase/REST entegrasyonlu, offline-first düşünülmüş ekranlar."
          />
          <Card
            title="Servis uygulaması"
            text="Kullanıcı oturumu, bildirim, harita/konum ve randevu modülleri; CI/CD ile hızlı yayın."
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Teknik vurgu</h3>
        <ul className="space-y-2 text-white/70 list-disc list-inside">
          <li>State management (Provider/Bloc benzeri), responsive UI kitleri.</li>
          <li>REST/Firebase entegrasyonları, auth ve güvenli depolama.</li>
          <li>Test ve yayın: flavor yönetimi, crash/analytics entegrasyonları.</li>
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

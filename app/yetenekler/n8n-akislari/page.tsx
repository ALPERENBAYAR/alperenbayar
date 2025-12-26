import AnimatedButton from "../../../components/AnimatedButton";

export default function N8nAkislari() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-14 space-y-10">
      <header className="space-y-3">
        <p className="text-sm text-white/60">Otomasyon & AI · n8n akışları</p>
        <h1 className="text-4xl font-bold">Lead, bildirim ve raporlama otomasyonları</h1>
        <p className="text-lg text-white/70 leading-relaxed">
          n8n ile yazılım ve pazarlama süreçlerini otomatikleştiriyorum. Lead akışları,
          etiketleme, bildirim, raporlama ve yapay zeka destekli sınıflandırma senaryoları
          kurguluyorum.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Öne çıkan çalışmalar</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card
            title="Lead pipeline"
            text="Form entegrasyonları, CRM push, e-posta/SMS bildirimleri ve haftalık özet raporlar."
          />
          <Card
            title="AI etiketleme"
            text="LLM ile lead sınıflandırma, önceliklendirme ve kanal bazlı yönlendirme; retry & logging katmanlarıyla."
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Teknik vurgu</h3>
        <ul className="space-y-2 text-white/70 list-disc list-inside">
          <li>Webhook, cron, queue tabanlı akış tasarımı.</li>
          <li>n8n + REST/GraphQL entegrasyonları, secret management.</li>
          <li>Monitoring: hata bildirimleri, retry politikaları, step bazlı logging.</li>
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

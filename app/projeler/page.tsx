import AnimatedCard from "../../components/AnimatedCard";

const projects = [
  {
    tag: ".NET / SQL",
    title: "Stok Takip Otomasyonu",
    text: "Ürün/stoğu izleme, raporlama ve panel yapısı; iş akışlarını sadeleştiren sistem.",
    image: "/projects/stoktakip.png",
  },
  {
    tag: "ASP.NET MVC",
    title: "Bankacılık Sistemi",
    text: "Kullanıcı-hesap-işlem mimarisi, güvenli akışlar ve rol bazlı ekranlar.",
    image: "/projects/bank.png",
  },
  {
    tag: "Flutter / Firebase",
    title: "FitAdvisor",
    text: "Mobil odaklı takip sistemi, veri katmanı ve otomasyonlu analiz akışları.",
    image: "/projects/fitadvisor.png",
  },
  {
    tag: "Mobil",
    title: "Alsat Mobil Uygulaması",
    text: "Al/sat süreçleri için mobil deneyim; API entegrasyonu, güvenli oturum ve bildirimler.",
    image: "/projects/automation.png",
  },
];

const automations = [
  {
    tag: "n8n + API",
    title: "YouTube video dönüştürme",
    text: "Planlı tetikleme ile video linki çekip dönüştürüyorum; dosyayı kaydedip Telegram/Drive’a gönderiyorum.",
  },
  {
    tag: "GA4 / Sheets",
    title: "Müşteri raporlama otomasyonu",
    text: "Sheets ve GA4/Ads verilerini çekip HTML rapor üretiyor, çıktıyı e-posta ile paylaşıyorum.",
  },
  {
    tag: "Apify + n8n",
    title: "İlandan e-posta çekme",
    text: "Apify actor + filtreleme ile ilanlardan müşteri e-postalarını topluyor, temizleyip CRM’e aktarıyorum.",
  },
];

export default function ProjelerPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-14 space-y-10">
      <header className="space-y-3">
        <p className="text-sm text-white/60">Projeler</p>
        <h1 className="text-4xl font-bold">Ölçeklenebilir çözümler</h1>
        <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
          Backend’den mobil uygulamaya, reklam ve otomasyon akışlarına uzanan seçili çalışmalar.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Ürün & Uygulamalar</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <AnimatedCard
              key={project.title}
              tag={project.tag}
              title={project.title}
              text={project.text}
              image={project.image}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Otomasyonlar</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {automations.map((flow) => (
            <AnimatedCard
              key={flow.title}
              tag={flow.tag}
              title={flow.title}
              text={flow.text}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

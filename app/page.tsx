import Image from "next/image";
import Link from "next/link";
import AnimatedButton from "../components/AnimatedButton";
import AnimatedCard from "../components/AnimatedCard";
import TechSlider from "../components/TechSlider";
import ProjectsSlider from "../components/ProjectsSlider";

const skills = [
  {
    tag: "Yazılım",
    title: "Modern web & backend",
    text: "React/Next.js arayüzleri, .NET tabanlı servisler; performans ve ölçek odaklı geliştirme.",
  },
  {
    tag: "Dijital Pazarlama",
    title: "Google Ads + Ölçüm",
    text: "Search/PMax kurgusu, GA4 & Tag Manager, CRO mantığıyla optimize kampanyalar.",
  },
  {
    tag: "Otomasyon & AI",
    title: "n8n ile akıllı süreçler",
    text: "Lead akışları, raporlama, etiketleme, bildirim ve yapay zeka destekli otomasyonlar.",
  },
];

export default function Home() {
  return (
    <main className="relative z-[1] max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-12">
      <div className="pointer-events-none fixed inset-0 z-0 [mask-image:radial-gradient(circle_at_50%_20%,rgba(0,0,0,0.8),transparent)]">
        <div className="absolute -top-10 -left-16 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* HERO */}
      <section className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/70">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            Şu an aktif: Yazılım + Pazarlama + Otomasyon projeleri
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
            Yazılım, Dijital Pazarlama ve Otomasyonla
            <span className="text-white/70"> ölçeklenebilir büyüme</span>
          </h1>

          <p className="text-lg text-white/70 max-w-xl leading-relaxed text-balance">
            Bilgisayar Mühendisliği 4. sınıf öğrencisiyim. Google Ads, Meta Ads, SEO,
            n8n otomasyonları, JavaScript, .NET, React.js ve Flutter ile veriye dayalı,
            ölçülebilir çözümler üretiyorum.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/iletisim" aria-label="İletişim için e-posta gönder">
              <AnimatedButton>Benimle İletişime Geç</AnimatedButton>
            </Link>
            <Link href="/projeler" aria-label="Projelerimi görüntüle">
              <AnimatedButton variant="ghost">Projelerimi Gör</AnimatedButton>
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
            <Image
              src="/images/alperen.jpg"
              alt="Alperen Bayar portre fotoğrafı"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 240px, 320px"
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="hakkimda" className="space-y-6 mt-24 lg:mt-32">
        <SectionTitle
          title="Kısaca ben"
          subtitle="Teknik bilgi + pazarlama stratejisini birleştiriyorum."
        />
        <div className="rounded-2xl p-6 bg-black/50 border border-white/10 shadow-lg shadow-black/30">
          <p className="text-white/70 leading-relaxed text-balance">
            Teknik SEO, site içi optimizasyon, anahtar kelime analizi ve dönüşüm odaklı
            içerik yapıları konusunda deneyimliyim. Dijital reklamlarda performans takibi,
            optimizasyon ve raporlama süreçlerini yönetiyorum. React.js ile web, Flutter ile
            mobil, JavaScript ve .NET tabanlı sistemler geliştiriyorum; n8n ile otomasyon
            kurarak yazılım ve pazarlamayı entegre ediyorum.
          </p>
        </div>
      </section>

      {/* SKILLS */}
      <section id="yetenekler" className="space-y-6">
        <SectionTitle title="Neler yapıyorum?" subtitle="3 ana alanda net değer üretiyorum." />
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {skills.map((item) => (
            <AnimatedCard
              key={item.title}
              tag={item.tag}
              title={item.title}
              text={item.text}
            />
          ))}
        </div>
      </section>

      {/* TECH SLIDER */}
      <TechSlider />

      {/* PROJECTS SLIDER */}
      <section id="projeler" className="space-y-6">

        <ProjectsSlider />
      </section>

      {/* CONTACT */}
      <section id="iletisim" className="space-y-4 mb-10">
        <div className="rounded-3xl p-8 bg-gradient-to-b from-white/10 to-white/5 border border-white/10">
          <h2 className="text-2xl font-bold">İletişim</h2>
          <p className="text-white/70 mt-2 max-w-2xl">
            Proje, iş birliği veya danışmanlık için mesaj bırakabilirsin.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="mailto:info@alperenbayar.com" aria-label="E-posta gönder">
              <AnimatedButton>
                <MailIcon />
                E-posta Gönder
              </AnimatedButton>
            </Link>
            <Link
              href="https://github.com/ALPERENBAYAR"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profilini aç"
            >
              <AnimatedButton variant="ghost">
                <GithubIcon />
                GitHub
              </AnimatedButton>
            </Link>
            <Link
              href="https://www.linkedin.com/in/alperen-bayar12/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profilini aç"
            >
              <AnimatedButton variant="ghost">
                <LinkedInIcon />
                LinkedIn
              </AnimatedButton>
            </Link>
            <Link
              href="https://www.instagram.com/alperenbyr12/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profilini aç"
            >
              <AnimatedButton variant="ghost">
                <InstagramIcon />
                Instagram
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* --- yardımcı bileşenler --- */
function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-2">
      <h2 className="text-2xl md:text-3xl font-bold text-balance">{title}</h2>
      <p className="text-white/60 mt-2 text-balance">{subtitle}</p>
    </div>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 5h18v14H3z" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 007.86 10.94c.57.1.78-.24.78-.54 0-.27-.01-1.17-.02-2.12-3.2.69-3.88-1.36-3.88-1.36-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.44.11-3 0 0 .96-.31 3.15 1.18a10.96 10.96 0 015.74 0C16.53 4.7 17.5 5 17.5 5c.62 1.56.23 2.71.11 3a4.44 4.44 0 011.18 3.1c0 4.43-2.69 5.41-5.25 5.7.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.12 0 .3.21.64.79.53A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M20.45 20.45h-3.56v-5.59c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.69H9.35V9.75h3.42v1.46h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v5.59zM5.34 8.29a2.06 2.06 0 11-.02-4.12 2.06 2.06 0 01.02 4.12zM7.12 20.45H3.56V9.75h3.56v10.7zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5A4.5 4.5 0 1112 17a4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm5.25-3a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  );
}

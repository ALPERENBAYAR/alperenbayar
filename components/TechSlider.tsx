export default function TechSlider() {
  const tech = [
    { src: "/tech/csharp.png", alt: "C#" },
    { src: "/tech/dotnet.png", alt: ".NET" },
    { src: "/tech/js.png", alt: "JavaScript" },
    { src: "/tech/flutter.jpg", alt: "Flutter" },
    { src: "/tech/n8n.png", alt: "n8n" },
    { src: "/tech/zapier.png", alt: "Zapier" },
    { src: "/tech/seo.png", alt: "SEO" },
    { src: "/tech/meta.png", alt: "Meta Ads" },
    { src: "/tech/googleads.png", alt: "Google Ads" },
  ];

  return (
    <section className="mt-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Kullandığım Teknolojiler
      </h2>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        <div className="flex gap-10 py-6 px-6 tech-track">
          {/* 1. set */}
          {tech.map((t) => (
            <div key={`a-${t.alt}`} className="shrink-0 tech-item">
              <img
                src={t.src}
                alt={t.alt}
                className="h-12 md:h-14 w-auto opacity-80 hover:opacity-100 transition"
                loading="lazy"
              />
            </div>
          ))}

          {/* 2. set (tekrar) */}
          {tech.map((t) => (
            <div key={`b-${t.alt}`} className="shrink-0 tech-item">
              <img
                src={t.src}
                alt={t.alt}
                className="h-12 md:h-14 w-auto opacity-80 hover:opacity-100 transition"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

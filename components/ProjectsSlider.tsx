"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import AnimatedButton from "./AnimatedButton";

const projects = [
  {
    title: "Stok Takip Otomasyonu",
    desc: "Ürün/stoğu izleme, raporlama ve panel yapısı; iş akışlarını sadeleştirir.",
    image: "/projects/stoktakip.png",
    color: "from-purple-500/20 to-transparent",
  },
  {
    title: "Bankacılık Sistemi (MVC)",
    desc: "Kullanıcı-hesap-işlem mimarisi, güvenli akışlar ve rol bazlı ekranlar.",
    image: "/projects/bank.png",
    color: "from-blue-500/20 to-transparent",
  },
  {
    title: "FitAdvisor",
    desc: "Mobil odaklı takip sistemi; veri katmanı ve otomasyonlu analiz akışları.",
    image: "/projects/fitadvisor.png",
    color: "from-green-500/20 to-transparent",
  },
  {
    title: "n8n + AI Otomasyonları",
    desc: "Reklam & lead akışlarını otomatikleştiren pipeline; etiketleme, bildirim, raporlama.",
    image: "/projects/automation.png",
    color: "from-pink-500/20 to-transparent",
  },
];

export default function ProjectsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % projects.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + projects.length) % projects.length);

  useEffect(() => {
    if (!sliderRef.current) return;
    gsap.fromTo(
      sliderRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
    );
  }, [index]);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div
        ref={sliderRef}
        className={`p-8 sm:p-10 bg-gradient-to-br ${projects[index].color}`}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* TEXT */}
          <div className="space-y-4">
            <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10">
              PROJE
            </span>

            <h3 className="text-3xl font-bold mt-2">{projects[index].title}</h3>

            <p className="text-white/70 max-w-md text-pretty">
              {projects[index].desc}
            </p>

            <AnimatedButton className="mt-2 w-fit">Projeyi İncele</AnimatedButton>
          </div>

          {/* IMAGE */}
          <div className="relative h-[220px] sm:h-[260px] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
            <Image
              src={projects[index].image}
              alt={projects[index].title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <button
          onClick={prev}
          className="h-8 w-8 rounded-full bg-white/15 border border-white/20 text-white hover:bg-white/25 transition"
          aria-label="Önceki proje"
        >
          ‹
        </button>
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-white" : "bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Projeye git ${projects[i].title}`}
          />
        ))}
        <button
          onClick={next}
          className="h-8 w-8 rounded-full bg-white/15 border border-white/20 text-white hover:bg-white/25 transition"
          aria-label="Sonraki proje"
        >
          ›
        </button>
      </div>
    </section>
  );
}

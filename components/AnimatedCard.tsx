"use client";

export default function AnimatedCard({
  title,
  text,
  tag,
  href,
  image,
}: {
  title: string;
  text: string;
  tag?: string;
  href?: string;
  image?: string;
}) {
  const card = (
    <div
      className="group relative rounded-3xl p-[1px]
        bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.14),rgba(255,255,255,0)_45%),linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.02))]
        border border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.35)]
        transition-transform duration-300 hover:-translate-y-2"
    >
      <div className="rounded-3xl p-6 bg-black/65 backdrop-blur-sm border border-white/5 flex flex-col gap-4 min-h-0">
        {tag && (
          <div className="inline-flex text-xs px-3 py-1 rounded-full bg-white/10 text-white/70">
            {tag}
          </div>
        )}

        {image && (
          <div className="relative w-full h-36 rounded-2xl overflow-hidden ring-1 ring-white/10">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        )}

        <h3 className="text-xl font-semibold">{title}</h3>

        <div className="h-[2px] w-0 bg-white/80 transition-all duration-300 group-hover:w-16" />

        <p className="text-white/70 leading-relaxed">{text}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block" rel="noreferrer">
        {card}
      </a>
    );
  }

  return card;
}

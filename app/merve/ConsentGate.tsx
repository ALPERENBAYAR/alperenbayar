"use client";

import { useMemo, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type Phase = "question" | "no" | "celebrate" | "yes";

export default function ConsentGate({ children }: Props) {
  const [phase, setPhase] = useState<Phase>("question");
  const [noCount, setNoCount] = useState(0);
  const confetti = useMemo(() => Array.from({ length: 18 }, (_, i) => i), []);

  const handleYes = () => {
    setPhase("celebrate");
    window.setTimeout(() => {
      setPhase("yes");
    }, 2400);
  };

  const handleNo = () => {
    setPhase("no");
    setNoCount((prev) => Math.min(prev + 1, 5));
  };

  if (phase !== "yes") {
    return (
      <div className="flex min-h-[70svh] items-center justify-center px-4">
        <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,200,214,0.18),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,160,195,0.2),transparent_50%),linear-gradient(160deg,rgba(22,24,40,0.9),rgba(32,16,28,0.9))] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="h-full w-full bg-[radial-gradient(circle,rgba(255,255,255,0.35)_0_2px,transparent_3px)] [background-size:42px_42px]" />
          </div>
          {phase === "celebrate" && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="absolute inset-0">
                {confetti.map((item) => (
                  <span
                    key={item}
                    className="confetti-piece"
                    style={{
                      left: `${(item * 5.5) % 100}%`,
                      animationDelay: `${(item % 6) * 0.08}s`,
                    }}
                  />
                ))}
              </div>
              <div className="relative z-10 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-lg font-semibold text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                BEN DE SENI SEVIYORUM
              </div>
            </div>
          )}
          {phase !== "celebrate" && (
            <>
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                Özel Soru
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Beni seviyor musun?
              </h2>
              <p className="mt-2 text-sm text-white/70">
                Devam etmek için lütfen bir seçim yap.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={handleYes}
                  style={{
                    transform: `scale(${1 + noCount * 0.6})`,
                    width: noCount >= 5 ? "100%" : undefined,
                    height: noCount >= 5 ? "70vh" : undefined,
                  }}
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white/40 hover:bg-white/20"
                >
                  Evet
                </button>
                <button
                  type="button"
                  onClick={handleNo}
                  className="rounded-full border border-white/10 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/60 transition hover:border-white/30 hover:text-white/80"
                >
                  Hayır
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
}

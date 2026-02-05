import type { Metadata } from "next";
import MerveGame from "./MerveGame";
import ConsentGate from "./ConsentGate";

export const metadata: Metadata = {
  title: "Alperen'e Ulaş",
  description: "Alperen'e Ulaş mini oyunu",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function MervePage() {
  return (
    <main className="min-h-[100svh] w-full px-4 py-10 md:py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex flex-col items-start gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Gizli Sayfa
          </p>
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Alperen'e Ulaş
          </h1>
          <p className="max-w-2xl text-sm text-white/70 md:text-base">
            Basılı tut: köprü uzar. Bırak: düşür. Amacın karşıdaki
            platforma güvenli şekilde ulaşmak.
          </p>
        </div>
        <ConsentGate>
          <MerveGame />
        </ConsentGate>
      </div>
    </main>
  );
}

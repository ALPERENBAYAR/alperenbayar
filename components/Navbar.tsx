"use client";

import { useState } from "react";
import Link from "next/link";

const nav = [
  { label: "Anasayfa", href: "/" },
  { label: "Hakkımda", href: "/hakkimda" },
  { label: "Yetenekler", href: "/yetenekler" },
  { label: "Projeler", href: "/projeler" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10 bg-black/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
            Alperen Bayar
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/70 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/iletisim"
            className="text-sm font-semibold px-4 py-2 rounded-xl bg-white text-black
                       hover:opacity-90 active:scale-[0.98] transition"
          >
            İletişim
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/80 hover:text-white focus:outline-none"
            onClick={() => setOpen((p) => !p)}
            aria-label="Menüyü aç/kapat"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {open ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/70 backdrop-blur px-4 py-3 space-y-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 transition"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

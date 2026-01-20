"use client";

import { useState } from "react";

const WEBHOOK_URL =
  "https://5uycus78.rpcld.app/webhook/generate-blog";

export default function SeoBlogPage() {
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("tr");
  const [length, setLength] = useState("1000");
  const [mode, setMode] = useState("seo");
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  async function generate() {
    if (!url.trim()) {
      setError("Lütfen geçerli bir URL gir");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url.trim(),
          language,
          length: Number(length),
          mode,
          keywords: keywords
            .split("\n")
            .map((k) => k.trim())
            .filter(Boolean),
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text || "Sunucu hatası");
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { blog: text };
      }

      setResult(data.blog || text);
    } catch (err: any) {
      setError(err.message || "Bilinmeyen hata");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="seo-blog-page">
      <div className="container">
        <div className="card">
          <h1>🔗 URL → SEO Blog Yazısı</h1>
          <p className="subtitle">
            Bir URL gir. Sistem sayfayı analiz etsin ve{" "}
            <strong>SEO uyumlu blog yazısı</strong> üretsin.
          </p>

          <div className="grid">
            <input
              placeholder="https://www.siten.com/kategori"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <div className="row">
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
              </select>

              <select value={length} onChange={(e) => setLength(e.target.value)}>
                <option value="500">500 kelime</option>
                <option value="1000">1000 kelime</option>
                <option value="1500">1500 kelime</option>
              </select>

              <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="seo">SEO Odaklı</option>
                <option value="sales">Satış Odaklı</option>
                <option value="info">Bilgilendirici</option>
              </select>
            </div>

            <textarea
              placeholder={`Anahtar kelimeler (satır satır)
kahve fincan takımı
seramik kahve fincanı`}
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />

            <button onClick={generate} disabled={loading}>
              {loading ? "⏳ Üretiliyor..." : "Blog Yazısı Oluştur"}
            </button>

            {error && <div className="error">{error}</div>}

            {result && (
              <div
                className="result"
                dangerouslySetInnerHTML={{ __html: result }}
              />
            )}
          </div>
        </div>
      </div>

      <style>{`
        .seo-blog-page {
          min-height: 100vh;
          background: #0b0f19;
          color: #e5e7eb;
          padding: 40px 0;
          font-family: Inter, system-ui;
        }
        .container {
          max-width: 960px;
          margin: auto;
          padding: 24px;
        }
        .card {
          background: #111827;
          border-radius: 16px;
          padding: 28px;
          border: 1px solid #1f2937;
        }
        .subtitle {
          color: #9ca3af;
          margin-bottom: 24px;
        }
        input, select, textarea {
          width: 100%;
          padding: 12px;
          background: #020617;
          border: 1px solid #1f2937;
          color: #e5e7eb;
          border-radius: 10px;
        }
        textarea {
          min-height: 120px;
        }
        .grid {
          display: grid;
          gap: 14px;
        }
        .row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        button {
          background: #6366f1;
          padding: 14px;
          border-radius: 12px;
          border: none;
          font-weight: 700;
          cursor: pointer;
          color: #fff;
        }
        button:disabled {
          opacity: 0.6;
        }
        .error {
          color: #f87171;
          font-weight: 600;
        }
        .result {
          margin-top: 24px;
          background: #020617;
          padding: 28px;
          border-radius: 14px;
          border: 1px solid #1f2937;
        }
        @media (max-width: 900px) {
          .row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

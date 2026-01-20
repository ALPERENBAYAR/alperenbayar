"use client";

import { useState } from "react";

const WEBHOOK_URL = "https://3967283a8b36.ngrok-free.app/webhook/generate-blog";

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
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      alert("Lütfen bir URL gir");
      return;
    }

    setResult("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          url: trimmedUrl,
          language,
          length,
          mode,
          keywords: keywords.trim(),
        }),
      });

      const raw = await res.text();
      let data: { blog?: string; error?: string };
      try {
        data = JSON.parse(raw);
      } catch {
        data = { blog: raw };
      }

      if (!res.ok) {
        throw new Error(data.error || "Sunucu hatası");
      }

      setResult(data.blog || raw);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bilinmeyen hata");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="seo-blog-page">
      <div className="container">
        <div className="card">
          <h1>🔗 URL → SEO Blog Yazısı</h1>
          <div className="subtitle">
            Bir URL gir. Sistem sayfayı analiz etsin, en iyi anahtar kelimeleri
            çıkarsın ve{" "}
            <strong>SEO uyumlu, yayınlanabilir blog içeriği</strong> üretsin.
          </div>

          <div className="grid">
            <input
              id="url"
              placeholder="https://www.siten.com/kategori"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />

            <div className="row">
              <select
                id="language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
              >
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
              </select>

              <select
                id="length"
                value={length}
                onChange={(event) => setLength(event.target.value)}
              >
                <option value="500">500 kelime</option>
                <option value="1000">1000 kelime</option>
                <option value="1500">1500 kelime</option>
              </select>

              <select
                id="mode"
                value={mode}
                onChange={(event) => setMode(event.target.value)}
              >
                <option value="seo">SEO Odaklı</option>
                <option value="sales">Satış Odaklı</option>
                <option value="info">Bilgilendirici</option>
              </select>
            </div>

            <textarea
              id="keywords"
              placeholder={`Anahtar kelimeler (opsiyonel)
Örn:
kahve fincan takımı
seramik kahve fincanı
kahve fincan seti`}
              value={keywords}
              onChange={(event) => setKeywords(event.target.value)}
            />

            <button id="btn" onClick={generate} disabled={loading}>
              Blog Yazısı Oluştur
            </button>

            {loading ? (
              <div id="loading" className="loading">
                ⏳ İçerik üretiliyor...
              </div>
            ) : null}

            {error ? (
              <div id="error" className="error">
                {error}
              </div>
            ) : null}

            <div
              id="result"
              className="result"
              dangerouslySetInnerHTML={{ __html: result }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .seo-blog-page {
          min-height: 100vh;
          background: #0b0f19;
          color: #e5e7eb;
          font-family: Inter, system-ui, Arial, sans-serif;
          padding: 40px 0;
        }

        .seo-blog-page .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 24px;
        }

        .seo-blog-page .card {
          background: #111827;
          border-radius: 14px;
          padding: 26px;
          border: 1px solid #1f2937;
        }

        .seo-blog-page h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
        }

        .seo-blog-page .subtitle {
          color: #9ca3af;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .seo-blog-page input,
        .seo-blog-page select,
        .seo-blog-page textarea {
          width: 100%;
          padding: 12px 14px;
          background: #020617;
          border: 1px solid #1f2937;
          color: #e5e7eb;
          border-radius: 10px;
          font-size: 15px;
          box-sizing: border-box;
        }

        .seo-blog-page textarea {
          min-height: 120px;
          resize: vertical;
        }

        .seo-blog-page .grid {
          display: grid;
          gap: 14px;
        }

        .seo-blog-page .row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
        }

        .seo-blog-page button {
          background: #6366f1;
          border: none;
          color: #fff;
          padding: 14px;
          font-size: 16px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
        }

        .seo-blog-page button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .seo-blog-page .loading {
          margin-top: 14px;
          font-weight: 700;
        }

        .seo-blog-page .error {
          color: #f87171;
          margin-top: 10px;
          font-weight: 600;
        }

        .seo-blog-page .result {
          margin-top: 28px;
          padding: 28px;
          background: #020617;
          border: 1px solid #1f2937;
          border-radius: 14px;
        }

        .seo-blog-page .result h1,
        .seo-blog-page .result h2,
        .seo-blog-page .result h3 {
          color: #fff;
          margin-top: 28px;
        }

        .seo-blog-page .result p {
          color: #d1d5db;
          line-height: 1.8;
          margin-top: 12px;
        }

        .seo-blog-page .result ul {
          margin-top: 12px;
          padding-left: 20px;
        }

        .seo-blog-page .result li {
          margin-bottom: 8px;
          color: #d1d5db;
        }

        @media (max-width: 900px) {
          .seo-blog-page .row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

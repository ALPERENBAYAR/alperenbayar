"use client";

import { useMemo, useState } from "react";

type SeoAdvice = {
  url?: string;
  source?: string;
  target?: string;
  anchor?: string;
  title?: string;
  first_seen?: string;
};

type BacklinkResponse = {
  backlinks?: SeoAdvice[];
  total?: number;
  raw?: string;
  error?: string;
};

export default function BacklinkBulmaPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<BacklinkResponse | null>(null);

  const normalizedUrl = useMemo(() => url.trim(), [url]);

  async function handleSubmit() {
    if (!normalizedUrl) {
      setError("Lutfen gecerli bir URL gir.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/backlink-bulma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalizedUrl }),
      });

      const data = (await res.json().catch(() => null)) as BacklinkResponse | null;

      if (!res.ok) {
        throw new Error(data?.error || "Sunucu hatasi.");
      }

      setResult(data || { raw: "Bos yanit" });
    } catch (err: any) {
      setError(err?.message || "Bilinmeyen hata");
    } finally {
      setLoading(false);
    }
  }

  const advices = result?.backlinks || [];
  const hasAdvices = advices.length > 0;

  return (
    <div className="backlink-page">
      <div className="container">
        <div className="card">
          <div className="header">
            <p className="badge">AI Tools</p>
            <h1>SEO Tavsiyeleri</h1>
            <p className="subtitle">
              Websiteni gir, n8n arka planda SEO tavsiyelerini hazirlasin.
            </p>
          </div>

          <div className="form">
            <label className="label" htmlFor="site-url">
              Website URL
            </label>
            <input
              id="site-url"
              placeholder="https://alperenbayar.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button onClick={handleSubmit} disabled={loading}>
              {loading ? "Hazirlaniyor..." : "Tavsiyeleri Getir"}
            </button>

            {error && <div className="error">{error}</div>}
          </div>

          {result && (
            <div className="result">
              <div className="result-header">
                <h2>SEO Tavsiyeleri</h2>
                <p>
                  {result.total
                    ? `${result.total} adet tavsiye`
                    : hasAdvices
                    ? `${advices.length} adet tavsiye`
                    : "Tavsiye bulunamadi"}
                </p>
              </div>

              {hasAdvices && (
                <ul className="list">
                  {advices.map((item, index) => (
                    <li key={`${item.url || item.source || "row"}-${index}`}>
                      <div className="row">
                        <div>
                          <p className="label">Konu / URL</p>
                          <p className="value">{item.url || item.source || "-"}</p>
                        </div>
                        <div>
                          <p className="label">Hedef Sayfa</p>
                          <p className="value">{item.target || "-"}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div>
                          <p className="label">Tavsiye</p>
                          <p className="value">{item.title || "-"}</p>
                        </div>
                        <div>
                          <p className="label">Etki / Not</p>
                          <p className="value">{item.anchor || "-"}</p>
                        </div>
                      </div>
                      {item.first_seen && (
                        <p className="meta">Tarih: {item.first_seen}</p>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {!hasAdvices && result.raw && (
                <pre className="raw">{result.raw}</pre>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .backlink-page {
          min-height: 100vh;
          padding: 48px 0;
          color: #e2e8f0;
          font-family: "Sora", system-ui, sans-serif;
        }
        .container {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .card {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(14px);
        }
        .header h1 {
          margin: 12px 0 6px;
          font-size: 2.4rem;
          letter-spacing: -0.02em;
        }
        .subtitle {
          color: #94a3b8;
          margin-bottom: 28px;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(56, 189, 248, 0.16);
          color: #7dd3fc;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 0.7rem;
        }
        .form {
          display: grid;
          gap: 12px;
        }
        .label {
          font-size: 0.85rem;
          color: #cbd5f5;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.25);
          background: rgba(15, 23, 42, 0.7);
          color: #e2e8f0;
        }
        button {
          background: linear-gradient(135deg, #38bdf8, #6366f1);
          border: none;
          color: #0f172a;
          padding: 14px 18px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .error {
          color: #f87171;
          font-weight: 600;
        }
        .result {
          margin-top: 28px;
          background: rgba(15, 23, 42, 0.7);
          border-radius: 16px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          padding: 24px;
        }
        .result-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }
        .list {
          display: grid;
          gap: 16px;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .list li {
          padding: 16px;
          border-radius: 14px;
          background: rgba(2, 6, 23, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.18);
        }
        .row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 10px;
        }
        .value {
          word-break: break-word;
          color: #f8fafc;
        }
        .meta {
          color: #94a3b8;
          font-size: 0.85rem;
        }
        .raw {
          white-space: pre-wrap;
          color: #e2e8f0;
          background: rgba(2, 6, 23, 0.8);
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.2);
        }
        @media (max-width: 900px) {
          .row {
            grid-template-columns: 1fr;
          }
          .result-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

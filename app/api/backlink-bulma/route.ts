import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let payload: { url?: string } | null = null;
  try {
    payload = await req.json();
  } catch {
    payload = null;
  }

  const url = payload?.url?.trim();
  if (!url) {
    return NextResponse.json({ error: "URL gerekli." }, { status: 400 });
  }

  const webhookUrl = process.env.N8N_BACKLINK_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "N8N webhook URL tanimli degil." },
      { status: 500 }
    );
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  const text = await res.text();
  if (!res.ok) {
    return NextResponse.json(
      { error: text || "N8N hatasi." },
      { status: res.status }
    );
  }

  try {
    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ raw: text });
  }
}

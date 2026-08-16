interface QuotePayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  message?: unknown;
  website?: unknown;
}

interface VercelRequest {
  method?: string;
  body?: unknown;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
  end: () => void;
}

const MAX_BODY_BYTES = 12_000;
const MAX_LENGTHS = {
  name: 100,
  email: 255,
  phone: 40,
  company: 150,
  message: 2_000,
  website: 200,
} as const;

const asTrimmedString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const isValidPayload = (payload: QuotePayload) => {
  const name = asTrimmedString(payload.name);
  const email = asTrimmedString(payload.email);
  const phone = asTrimmedString(payload.phone);
  const company = asTrimmedString(payload.company);
  const message = asTrimmedString(payload.message);
  const website = asTrimmedString(payload.website);

  return (
    name.length >= 1 &&
    name.length <= MAX_LENGTHS.name &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    email.length <= MAX_LENGTHS.email &&
    phone.length >= 4 &&
    phone.length <= MAX_LENGTHS.phone &&
    company.length <= MAX_LENGTHS.company &&
    message.length >= 20 &&
    message.length <= MAX_LENGTHS.message &&
    website.length <= MAX_LENGTHS.website
  );
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const scriptSecret = process.env.GOOGLE_SCRIPT_SECRET;

  if (!appsScriptUrl || !scriptSecret) {
    console.error("Missing Google Apps Script environment variables");
    res.status(500).json({ error: "Quote form is not configured" });
    return;
  }

  const payload = (req.body ?? {}) as QuotePayload;
  const rawBody = JSON.stringify(payload);

  if (rawBody.length > MAX_BODY_BYTES || !isValidPayload(payload)) {
    res.status(400).json({ error: "Please check the form fields and try again." });
    return;
  }

  const website = asTrimmedString(payload.website);
  if (website !== "") {
    // Silently accept honeypot submissions without forwarding them.
    res.status(200).json({ ok: true });
    return;
  }

  try {
    const upstream = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, secret: scriptSecret }),
    });
    const responseText = await upstream.text();
    let responseBody: { error?: string; ok?: boolean } = {};

    try {
      responseBody = JSON.parse(responseText) as { error?: string; ok?: boolean };
    } catch {
      console.error("Google Apps Script returned non-JSON", responseText.slice(0, 500));
    }

    if (!upstream.ok || responseBody.error || responseBody.ok !== true) {
      console.error("Google Apps Script submission failed", upstream.status, responseText.slice(0, 500));
      res.status(502).json({ error: "Could not send your enquiry" });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Quote proxy failed", error);
    res.status(502).json({ error: "Could not send your enquiry" });
  }
}

import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(4).max(40),
  company: z.string().trim().max(150).optional().default(""),
  message: z.string().trim().min(20).max(2000),
  // Honeypot: humans never see or fill this.
  website: z.string().max(200).optional().default(""),
});

const NOTIFY_TO = "amitjain@alsandouqalahmar.com";

const MAX_BODY_BYTES = 12_000;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

// Best-effort in-instance throttle. Not a distributed limiter, but it blunts
// simple floods from a single source without extra infrastructure.
const hits = new Map<string, number[]>();

const throttled = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    if (throttled(ip)) {
      return json({ error: "Too many requests. Please try again shortly." }, 429);
    }

    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return json({ error: "Request too large" }, 413);
    }

    let payload: unknown;
    try {
      payload = JSON.parse(raw);
    } catch {
      return json({ error: "Invalid request" }, 400);
    }

    const parsed = BodySchema.safeParse(payload);
    if (!parsed.success) {
      return json({ error: "Please check the form fields and try again." }, 400);
    }
    const { name, email, phone, company, message, website } = parsed.data;

    // Bot filled the honeypot: accept silently, store nothing.
    if (website.trim() !== "") {
      return json({ ok: true });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Collapse accidental duplicate submits (double click, retry) within 2 min.
    const since = new Date(Date.now() - 2 * 60_000).toISOString();
    const { data: existing } = await supabase
      .from("quote_requests")
      .select("id")
      .eq("email", email)
      .eq("message", message)
      .gte("created_at", since)
      .maybeSingle();

    if (existing) {
      return json({ ok: true, id: existing.id, duplicate: true });
    }

    const { data: row, error: insertError } = await supabase
      .from("quote_requests")
      .insert({ name, email, phone, company: company || null, message })
      .select("id")
      .single();

    if (insertError) {
      console.error("insert failed", insertError);
      return json({ error: "Could not store the enquiry" }, 500);
    }

    // Notify the trading desk. Delivery depends on the project's verified
    // sender domain; the enquiry is stored either way.
    try {
      const { error: emailError } = await supabase.functions.invoke(
        "send-transactional-email",
        {
          body: {
            templateName: "quote-request",
            recipientEmail: NOTIFY_TO,
            idempotencyKey: `quote-request-${row.id}`,
            templateData: { name, email, phone, company, message },
          },
        },
      );
      if (emailError) console.error("email notification failed", emailError);
    } catch (err) {
      console.error("email notification threw", err);
    }

    return json({ ok: true, id: row.id });
  } catch (err) {
    console.error("submit-quote error", err);
    return json({ error: "Unexpected error" }, 500);
  }
});

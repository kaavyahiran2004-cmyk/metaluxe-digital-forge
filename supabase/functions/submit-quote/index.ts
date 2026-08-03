import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(4).max(40),
  company: z.string().trim().max(150).optional().default(""),
  message: z.string().trim().min(20).max(2000),
});

const NOTIFY_TO = "amitjain@alsandouqalahmar.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return json({ error: parsed.error.flatten().fieldErrors }, 400);
    }
    const { name, email, phone, company, message } = parsed.data;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

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

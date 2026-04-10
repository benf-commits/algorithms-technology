import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FROM_EMAIL = "algorithms.technology <hello@algorithms.technology>";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function welcomeHtml(name: string | null): string {
  const hi = name ? `Hi ${name}` : "Hi";
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#111827;line-height:1.6;">

<p style="color:#6b7280;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:24px;">algorithms.technology</p>

<p>${hi},</p>

<p>Thank you for signing up. We are building an evidence base to help Australian schools protect children's photos from AI scraping, facial recognition, and deepfakes.</p>

<p>Here is what we know:</p>

<ul style="padding-left:20px;">
  <li style="margin-bottom:8px;"><strong>Meta confirmed under oath</strong> that it scrapes every public Facebook post from Australians since 2007 to train AI, including children's photos. <a href="https://schools.algorithms.technology/ai-training.html" style="color:#3061ff;">Read more</a></li>
  <li style="margin-bottom:8px;"><strong>Clearview AI scraped 50 billion+ photos</strong> from Facebook for facial recognition. Children are included. <a href="https://schools.algorithms.technology/facial-recognition.html" style="color:#3061ff;">Read more</a></li>
  <li style="margin-bottom:8px;"><strong>362 Australian children were identified</strong> in a single AI training dataset from less than 0.0001% of the data. <a href="https://schools.algorithms.technology/training-datasets.html" style="color:#3061ff;">Read more</a></li>
  <li style="margin-bottom:8px;"><strong>AI-generated explicit images of 50+ schoolgirls</strong> were created using their social media photos. <a href="https://schools.algorithms.technology/deepfakes.html" style="color:#3061ff;">Read more</a></li>
</ul>

<p>The first step: ask your school to move from a public Facebook Page to a private Group. It costs nothing and immediately removes children's photos from public access.</p>

<p><a href="https://schools.algorithms.technology/what-you-can-do.html" style="color:#3061ff;font-weight:600;">How to do it, including a P&C motion template &rarr;</a></p>

<p>We will be in touch as this develops.</p>

<p style="font-size:14px;color:#6b7280;margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;">
algorithms.technology<br>Our schools. Our children. Our responsibility.<br>
<a href="https://schools.algorithms.technology" style="color:#3061ff;">schools.algorithms.technology</a></p>

</body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: cors });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: cors });
  }

  try {
    const { email, name, school, role, state, source } = await req.json();

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Valid email required" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Insert or update contact
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { error: dbError } = await supabase
      .from("contacts")
      .upsert(
        { email: cleanEmail, name, school, role, state, source: source || "schools" },
        { onConflict: "email" }
      );

    if (dbError) {
      console.error("DB error:", dbError);
      return new Response(JSON.stringify({ error: "Database error" }), {
        status: 500,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // Send welcome email
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: cleanEmail,
        subject: "Welcome to algorithms.technology",
        html: welcomeHtml(name),
      }),
    });

    if (!emailRes.ok) {
      console.error("Email error:", await emailRes.text());
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});

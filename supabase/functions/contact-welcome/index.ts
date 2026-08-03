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

<p>Thank you for signing up. Here is the short version of why this site exists.</p>

<p>On <strong>28 July 2026</strong> the eSafety Commissioner published an advisory telling Australian schools to post fewer identifiable photos of students and staff, and that some imagery is "better shared in a closed or restricted space".</p>

<p>NSW Department of Education policy requires the opposite. Its procedures state that school social media accounts "must not restrict access or be set as 'private' or 'closed.'"</p>

<p>An audit of every NSW government school found <strong>1,780 running public Facebook Pages</strong> under that instruction, covering <strong>637,818 students</strong>, in <strong>all 93 NSW state electorates</strong>.</p>

<p><a href="https://schools.algorithms.technology/esafety-advisory.html" style="color:#3061ff;font-weight:600;">Both documents, quoted side by side &rarr;</a></p>

<p>The most useful thing you can do takes about two minutes. Enter your postcode, see how many schools in your state electorate run public Pages, and send your local member a letter asking the department to change the policy.</p>

<p><a href="https://schools.algorithms.technology/take-action.html" style="color:#3061ff;font-weight:600;">Write to your MP &rarr;</a></p>

<p>This is not a campaign against schools. A principal following departmental policy is not the problem, and one school changing its settings fixes one page out of 1,780. The instruction is written centrally and can be changed centrally, without legislation.</p>

<p>We will be in touch when the department responds, or when the policy changes.</p>

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

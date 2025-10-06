// In /supabase/functions/send-contact-email/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@3.2.0"
import { corsHeaders } from "../_shared/cors.ts"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
if (!RESEND_API_KEY) {
  console.error("RESEND_API_KEY environment variable is not set")
}
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

const envRecipients = Deno.env.get("CONTACT_NOTIFICATION_RECIPIENTS")
const adminRecipients = envRecipients
  ? envRecipients.split(",").map((email) => email.trim()).filter(Boolean)
  : []

if (adminRecipients.length === 0) {
  adminRecipients.push("lamqam81103@gmail.com")
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const payload = await req.json().catch(() => null)
    const formData = payload && typeof payload === "object" && "formData" in payload ? payload.formData : payload

    if (!formData || typeof formData !== "object") {
      return new Response(
        JSON.stringify({ error: "Invalid payload" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const name = typeof formData.name === "string" ? formData.name.trim() : ""
    const email = typeof formData.email === "string" ? formData.email.trim() : ""
    const message = typeof formData.message === "string" ? formData.message.trim() : ""
    const phone = typeof formData.phone === "string" ? formData.phone.trim() : undefined
    const company = typeof formData.company === "string" ? formData.company.trim() : undefined
    const serviceInterest = typeof formData.service_interest === "string" ? formData.service_interest.trim() : undefined

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    if (!resend) {
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const subject = `New Contact Form Submission from ${name}`

    // Format the email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
      ${serviceInterest ? `<p><strong>Service Interest:</strong> ${serviceInterest}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `

    // Send email
    const { error: emailError } = await resend.emails.send({
      from: "Redoxy KSA <onboarding@resend.dev>",
      to: adminRecipients,
      subject,
      html: emailContent,
    });

    if (emailError) {
      console.error("Error sending email:", emailError);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: emailError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } 

    // Send WhatsApp notification
    try {
      const twilioSid = Deno.env.get("TWILIO_ACCOUNT_SID");
      const twilioToken = Deno.env.get("TWILIO_AUTH_TOKEN");
      const whatsappFrom = Deno.env.get("WHATSAPP_FROM");

      if (twilioSid && twilioToken && whatsappFrom) {
        const whatsappRecipients = (Deno.env.get("WHATSAPP_RECIPIENTS") ?? "")
          .split(",")
          .map((n) => n.trim())
          .filter(Boolean);

        if (whatsappRecipients.length > 0) {
          const basicAuth = btoa(`${twilioSid}:${twilioToken}`);
          const whatsappMessage = `New Contact Form Submission\nName: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ''}${company ? `Company: ${company}\n` : ''}Message: ${message}`;
          
          // Send to each recipient
          await Promise.all(whatsappRecipients.map(async (to) => {
            const body = new URLSearchParams({
              From: `whatsapp:${whatsappFrom}`,
              To: `whatsapp:${to}`,
              Body: whatsappMessage,
            });

            const response = await fetch(
              `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
              {
                method: "POST",
                headers: {
                  Authorization: `Basic ${basicAuth}`,
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body,
              }
            );

            if (!response.ok) {
              console.error(`Failed to send WhatsApp to ${to}:`, await response.text());
            }
          }));
        }
      }
    } catch (error) {
      console.error("Error sending WhatsApp notification:", error);
      // Don't fail the entire request if WhatsApp fails
    }

    return new Response(
      JSON.stringify({ success: true, message: "Form submitted successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )

  } catch (error) {
    console.error("Error in send-contact-email function:", error)
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
    
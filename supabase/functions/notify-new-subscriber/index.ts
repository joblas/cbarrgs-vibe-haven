
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// This function will be triggered by a database webhook when a new subscriber is added
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const body = await req.json();
    const subscriber = body.record;
    
    if (!subscriber || !subscriber.email) {
      throw new Error("Invalid request payload");
    }

    // Log the new subscription
    console.log(`New subscriber: ${subscriber.email}`);

    // Send email notification to the specified email addresses if Resend is configured
    if (resend) {
      try {
        const notification = await resend.emails.send({
          from: "CBARRGS Site <onboarding@resend.dev>",
          to: ["cbarrgs@cbarrgs.com", "cbarrgs@gmail.com"],
          subject: "New Subscriber Alert",
          html: `
            <h1>New Subscriber Alert</h1>
            <p>A new user has subscribed to your newsletter:</p>
            <p><strong>Email:</strong> ${subscriber.email}</p>
            <p><strong>Date:</strong> ${new Date(subscriber.created_at).toLocaleString()}</p>
            <hr>
            <p>You can view all subscribers in your Supabase dashboard.</p>
          `,
        });
        
        console.log("Email notification sent successfully:", notification);
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
        // Don't throw the error here, as we still want to return a successful response
        // for the webhook even if email sending fails
      }
    } else {
      console.log("Resend API key not configured. Email notification not sent.");
      console.log(`Would send notification to cbarrgs@cbarrgs.com and cbarrgs@gmail.com about new subscriber: ${subscriber.email}`);
    }

    // Return success response
    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    // Log and return error
    console.error("Error processing new subscriber notification:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});


import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Get the Resend API key from environment variables
const resendApiKey = Deno.env.get("RESEND_API_KEY");

// Initialize Resend if API key is available
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
    console.log(`Resend API Key configured: ${resendApiKey ? "Yes (masked for security)" : "No"}`);

    // Send email notification to the specified email addresses if Resend is configured
    if (resend) {
      try {
        console.log("Attempting to send email notification...");
        console.log(`Will send to recipients: cbarrgs@cbarrgs.com and cbarrgs@gmail.com`);
        
        // Log API key length for verification without exposing the key
        console.log(`API Key length: ${resendApiKey ? resendApiKey.length : 0}`);
        
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
        
        console.log("Email notification response:", JSON.stringify(notification));
        
        if (notification.error) {
          console.error("Error in Resend response:", notification.error);
        } else {
          console.log("Email sent successfully with ID:", notification.id);
        }
        
        return new Response(
          JSON.stringify({ success: true, emailSent: true, notification }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
        console.error("Error details:", {
          message: emailError.message,
          cause: emailError.cause ? JSON.stringify(emailError.cause) : "No cause provided"
        });
        
        // Return detailed error information for debugging
        return new Response(
          JSON.stringify({ 
            success: true, 
            emailSent: false, 
            error: emailError.message,
            stack: emailError.stack,
            cause: emailError.cause
          }),
          {
            status: 200, // Still return 200 to acknowledge the webhook
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    } else {
      console.log("Resend API key not configured or invalid. Email notification not sent.");
      console.log(`Would send notification to cbarrgs@cbarrgs.com and cbarrgs@gmail.com about new subscriber: ${subscriber.email}`);
      
      // Return a response indicating the API key issue
      return new Response(
        JSON.stringify({ 
          success: true, 
          emailSent: false, 
          reason: "Resend API key not configured",
          apiKeyPresent: !!resendApiKey,
          apiKeyLength: resendApiKey ? resendApiKey.length : 0
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

  } catch (error) {
    // Log and return error
    console.error("Error processing new subscriber notification:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack
    });
    
    return new Response(
      JSON.stringify({ error: error.message, stack: error.stack }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

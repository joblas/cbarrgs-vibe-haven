
// @ts-ignore: Deno-specific imports
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// @ts-ignore: Deno-specific imports
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// @ts-ignore: Deno-specific imports
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Get the Resend API key from environment variables
// @ts-ignore: Deno global
const resendApiKey = Deno.env.get("RESEND_API_KEY");

// Initialize Resend if API key is available
const resend = resendApiKey ? new Resend(resendApiKey) : null;

console.log("=================== FUNCTION INITIALIZATION ===================");
console.log(`Function initialized at: ${new Date().toISOString()}`);
console.log(`Resend API key configured: ${resendApiKey ? "Yes (masked)" : "No"}`);
if (resendApiKey) {
  console.log(`API Key length: ${resendApiKey.length}`);
  console.log(`API Key first/last chars: ${resendApiKey.substring(0, 2)}...${resendApiKey.substring(resendApiKey.length - 2)}`);
}

// Helper function to validate email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// This function will be triggered by a database webhook when a new subscriber is added
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("=================== REQUEST RECEIVED ===================");
    console.log(`Request received at: ${new Date().toISOString()}`);
    console.log("Request method:", req.method);
    console.log("Request headers:", JSON.stringify(Object.fromEntries(req.headers.entries())));
    
    // Parse the request body
    const body = await req.json();
    console.log("Request body:", JSON.stringify(body));
    
    // Extract subscriber information
    const subscriber = body.record;
    
    // Validate request payload
    if (!subscriber || !subscriber.email) {
      const errorMsg = "Invalid request payload: missing subscriber or email";
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    // Validate email format
    if (!isValidEmail(subscriber.email)) {
      const errorMsg = `Invalid email format: ${subscriber.email}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    console.log(`New subscriber received: ${subscriber.email}`);
    console.log(`Subscription date: ${new Date(subscriber.created_at).toISOString()}`);
    console.log(`Resend API Key configured: ${resendApiKey ? "Yes (masked)" : "No"}`);

    // Send email notification if Resend is configured
    if (resend) {
      try {
        console.log("=================== SENDING EMAIL ===================");
        console.log(`Attempting to send email notification at: ${new Date().toISOString()}`);
        
        const from = "Cbarrgs Music <onboarding@resend.dev>";
        const to = ["cbarrgs@cbarrgs.com", "cbarrgs@gmail.com"];
        const subject = "New Subscriber Alert";
        
        console.log(`Sending email from: ${from}`);
        console.log(`Sending email to: ${to.join(", ")}`);
        console.log(`Email subject: ${subject}`);
        
        const notification = await resend.emails.send({
          from,
          to,
          subject,
          html: `
            <h1>New Subscriber Alert</h1>
            <p>A new user has subscribed to your newsletter:</p>
            <p><strong>Email:</strong> ${subscriber.email}</p>
            <p><strong>Date:</strong> ${new Date(subscriber.created_at).toLocaleString()}</p>
            <hr>
            <p>You can view all subscribers in your Supabase dashboard.</p>
          `,
        });
        
        console.log("=================== EMAIL SENT ===================");
        console.log(`Email sent at: ${new Date().toISOString()}`);
        console.log("Resend API response:", JSON.stringify(notification));
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            emailSent: true, 
            notification,
            timestamp: new Date().toISOString()
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      } catch (emailError) {
        console.error("=================== EMAIL SENDING ERROR ===================");
        console.error(`Error at: ${new Date().toISOString()}`);
        console.error(`Error type: ${emailError.constructor.name}`);
        console.error(`Error message: ${emailError.message}`);
        console.error(`Error stack: ${emailError.stack}`);
        
        if (emailError.response) {
          console.error("Response error:", JSON.stringify(emailError.response));
        }
        
        return new Response(
          JSON.stringify({ 
            success: false, 
            emailSent: false, 
            error: emailError.message,
            errorName: emailError.constructor.name,
            timestamp: new Date().toISOString(),
            stack: emailError.stack,
            cause: emailError.cause,
            response: emailError.response
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    } else {
      console.error("=================== CONFIGURATION ERROR ===================");
      console.error(`Error at: ${new Date().toISOString()}`);
      console.error("Resend API key not configured or invalid");
      console.error(`Would send notification to cbarrgs@cbarrgs.com and cbarrgs@gmail.com about new subscriber: ${subscriber.email}`);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          emailSent: false, 
          reason: "Resend API key not configured or invalid",
          timestamp: new Date().toISOString(),
          apiKeyPresent: !!resendApiKey,
          apiKeyLength: resendApiKey ? resendApiKey.length : 0
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("=================== GENERAL ERROR ===================");
    console.error(`Error at: ${new Date().toISOString()}`);
    console.error(`Error type: ${error.constructor.name}`);
    console.error(`Error message: ${error.message}`);
    console.error(`Error stack: ${error.stack}`);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message, 
        errorType: error.constructor.name,
        timestamp: new Date().toISOString(),
        stack: error.stack 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

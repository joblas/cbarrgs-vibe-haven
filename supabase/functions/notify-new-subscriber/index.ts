
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    // Here you would typically use a service like Resend.com or SendGrid 
    // to send an email notification. This would require setting up a 
    // secret API key in Supabase Edge Functions.
    
    // For now, we'll just log that we would send an email
    console.log(`Would send notification to cbarrgs@cbarrgs.com about new subscriber: ${subscriber.email}`);

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

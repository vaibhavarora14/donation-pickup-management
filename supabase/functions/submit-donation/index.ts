import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { 
        organization_id, 
        first_name, 
        last_name, 
        email, 
        phone, 
        address_line,
        city,
        state,
        pincode,
        latitude,
        longitude,
        pickup_date,
        vehicle_type,
        helpers_needed,
        items
    } = await req.json()

    // Basic Validation
    if (!first_name || !email || !pickup_date || !organization_id) {
       return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify Organization Exists
    const { data: org, error: orgError } = await supabaseClient
        .from('organizations')
        .select('id')
        .eq('id', organization_id)
        .single();
    
    if (orgError || !org) {
        return new Response(
            JSON.stringify({ error: 'Invalid Organization ID' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

    // Insert Donation
    const { data, error } = await supabaseClient
      .from('donations')
      .insert([
        {
          organization_id,
          first_name,
          last_name,
          email,
          phone,
          address_line,
          city,
          state,
          pincode,
          latitude,
          longitude,
          pickup_date,
          vehicle_type,
          helpers_needed,
          items,
          status: 'pending'
        }
      ])
      .select()

    if (error) throw error

    return new Response(
      JSON.stringify({ message: "Donation request submitted successfully!", id: data[0].id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

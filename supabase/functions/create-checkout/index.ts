import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const routePrices: Record<string, number> = {
  sofiaBansko: 12000,
  sofiaPlovdiv: 8500,
  sofiaBorovets: 7000,
  sofiaThessaloniki: 28000,
  sofiaKavala: 32000,
  sofiaAlexandroupoli: 36000,
  sofiaIstanbul: 52000,
  sofiaSkopje: 21000,
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      name, email, phone, route, routeName, from, to, date, time,
      passengers, luggage, transferType, message, locale, origin,
    } = body;

    if (!name || !email || !route || !from || !to || !date || !time) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const amount = routePrices[route];
    if (!amount) {
      return new Response(
        JSON.stringify({ error: "No fixed price for this route" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: booking, error: dbError } = await supabase
      .from("bookings")
      .insert({
        name,
        email,
        phone,
        route,
        route_name: routeName || null,
        from_location: from,
        to_location: to,
        travel_date: date,
        travel_time: time,
        passengers: Number(passengers) || 1,
        luggage: Number(luggage) || 0,
        transfer_type: transferType || "airport",
        message: message || null,
        amount,
        currency: "eur",
        status: "pending",
        locale: locale || "bg",
      })
      .select("id")
      .single();

    if (dbError || !booking) {
      return new Response(
        JSON.stringify({ error: "Failed to create booking" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY")!;
    const description = `Transfer: ${from} → ${to} | ${date} ${time} | ${passengers} pax`;

    const params = new URLSearchParams();
    params.append("mode", "payment");
    params.append("success_url", `${origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`);
    params.append("cancel_url", `${origin}/?payment=cancelled`);
    params.append("customer_email", email);
    params.append("line_items[0][name]", `Private Transfer: ${from} → ${to}`);
    params.append("line_items[0][description]", description);
    params.append("line_items[0][amount]", String(amount));
    params.append("line_items[0][currency]", "eur");
    params.append("line_items[0][quantity]", "1");
    params.append("metadata[booking_id]", booking.id);
    params.append("metadata[route]", route);

    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const session = await stripeRes.json();

    if (!stripeRes.ok) {
      return new Response(
        JSON.stringify({ error: session.error?.message || "Stripe error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    await supabase
      .from("bookings")
      .update({ stripe_session_id: session.id })
      .eq("id", booking.id);

    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

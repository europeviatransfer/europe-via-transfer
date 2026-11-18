/*
# Create bookings table (single-tenant, no auth)

1. New Tables
- `bookings`
  - `id` (uuid, primary key)
  - `name` (text) — customer full name
  - `email` (text) — customer email
  - `phone` (text) — customer phone
  - `route` (text) — selected route key, e.g. "sofiaBansko"
  - `from_location` (text) — pickup location
  - `to_location` (text) — drop-off location
  - `travel_date` (date) — transfer date
  - `travel_time` (text) — transfer time
  - `passengers` (int) — number of passengers
  - `luggage` (int) — number of bags
  - `transfer_type` (text) — transfer type key
  - `message` (text) — optional notes
  - `amount` (bigint) — payment amount in euro cents
  - `currency` (text, default 'eur') — ISO currency code
  - `status` (text, default 'pending') — booking/payment status: pending, paid, failed
  - `stripe_session_id` (text) — Stripe Checkout Session ID
  - `locale` (text, default 'bg') — language the booking was made in
  - `created_at` (timestamptz)

2. Security
- Enable RLS on `bookings`.
- Allow anon + authenticated CRUD: this is a no-auth booking site, the anon-key
  frontend must be able to insert new bookings and read their own by id.
- Payment confirmation happens server-side via the stripe-webhook edge function
  using the service-role key, which bypasses RLS.
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  route text NOT NULL,
  from_location text NOT NULL,
  to_location text NOT NULL,
  travel_date date NOT NULL,
  travel_time text NOT NULL,
  passengers integer NOT NULL DEFAULT 1,
  luggage integer NOT NULL DEFAULT 0,
  transfer_type text NOT NULL DEFAULT 'airport',
  message text,
  amount bigint NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'eur',
  status text NOT NULL DEFAULT 'pending',
  stripe_session_id text,
  locale text NOT NULL DEFAULT 'bg',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_bookings" ON bookings;
CREATE POLICY "anon_select_bookings"
ON bookings FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings"
ON bookings FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_bookings" ON bookings;
CREATE POLICY "anon_update_bookings"
ON bookings FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_bookings" ON bookings;
CREATE POLICY "anon_delete_bookings"
ON bookings FOR DELETE
TO anon, authenticated USING (true);
interface CheckoutPayload {
  name: string
  email: string
  phone: string
  route: string
  routeName?: string
  from: string
  to: string
  date: string
  time: string
  passengers: number
  luggage: number
  transferType: string
  message?: string
  locale: string
}

export async function createCheckoutSession(data: CheckoutPayload): Promise<string> {
  const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      passengers: Number(data.passengers),
      luggage: Number(data.luggage),
      origin: window.location.origin,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error || `Request failed (${response.status})`)
  }

  const result = await response.json()
  if (!result.url) throw new Error('No checkout URL returned')
  return result.url as string
}

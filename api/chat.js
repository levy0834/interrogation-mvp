export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const apiKey = process.env.MAPI_API_KEY
  const upstream = process.env.MAPI_BASE_URL || 'https://mapi.ypemc.com/v1'
  const defaultModel = process.env.MAPI_MODEL || ''

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing MAPI_API_KEY' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})
    const response = await fetch(`${upstream.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: body.model || defaultModel,
        messages: body.messages || [],
        temperature: body.temperature ?? 0.9,
        max_tokens: body.max_tokens ?? 220
      })
    })

    const text = await response.text()
    res.status(response.status)
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    return res.send(text)
  } catch (error) {
    return res.status(500).json({
      error: 'Proxy request failed',
      detail: String(error.message || error)
    })
  }
}

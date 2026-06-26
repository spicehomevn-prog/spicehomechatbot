import Anthropic from '@anthropic-ai/sdk';
import { buildGuestPrompt } from '@/lib/prompt';
import { PROPERTIES } from '@/lib/properties';

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const { propId, message } = await request.json() as { propId: string; message: string };

    const prop = PROPERTIES.find(p => p.id === propId);
    if (!prop || !message) {
      return Response.json({ error: 'Missing property or message' }, { status: 400 });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const prompt = buildGuestPrompt(prop, message);

    const resp = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = resp.content[0]?.type === 'text' ? resp.content[0].text : '';

    // Parse JSON from raw
    let data: { reply?: string; language?: string } = {};
    try {
      const txt = raw.trim().replace(/^```(json)?/i, '').replace(/```$/, '').trim();
      data = JSON.parse(txt);
    } catch {
      const m = raw.match(/\{[\s\S]*\}/);
      if (m) { try { data = JSON.parse(m[0]); } catch { /* fall through */ } }
    }

    return Response.json({ reply: data.reply || raw, language: data.language || 'vi' });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Chat API error:', message);
    return Response.json({ error: message }, { status: 500 });
  }
}

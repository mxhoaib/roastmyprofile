# RoastMyProfile: what a real AI version needs

The demo is 100% client-side: a template engine (`engine.js`) plus a canned line library. A real AI version adds:

## 1. LLM API options (prices as of late 2026, so check before launch)
| Option | Free tier | Approx. paid cost |
|---|---|---|
| Google Gemini Flash / Flash-Lite (AI Studio) | Yes, rate-limited free tier (free-tier data may be used to improve Google's models, so check the terms) | ~$0.10–0.30 / 1M input tokens |
| Groq (Llama / open models) | Free dev tier, rate-limited | ~$0.05–0.60 / 1M tokens |
| OpenRouter free models | Some `:free` models, low daily limits | varies |
| Cloudflare Workers AI | ~10k "neurons"/day free | ~$0.011 / 1k neurons |
| OpenAI gpt-4o-mini class / Anthropic Haiku class / xAI Grok mini | No real free tier | ~$0.15–1 / 1M input |

## 2. Serverless proxy (hide the key): Cloudflare Workers free tier
- 100k requests/day free. The browser POSTs `{type, text}` to `/api/roast`; the Worker adds the system prompt and secret (`wrangler secret put LLM_KEY`), calls the LLM, and returns JSON `{lines[], score, tip}`.
- Never ship the API key in front-end JS. Lock CORS to your domain only.

## 3. Rate limiting and abuse
- Per IP: e.g. 5 roasts/min, 30/day (Workers KV or Durable Object counter, or Cloudflare Rate Limiting rules).
- Cloudflare Turnstile (free) on the Roast button.
- Cap input at ~2,000 chars and output at ~250 tokens.

## 4. Moderation and kindness
- System prompt: playful, kind, never mention appearance, race, gender, religion, body, disability, age or sexuality. Always end with one genuine tip. Return JSON only.
- Pre-filter input (free moderation endpoints such as OpenAI omni-moderation, or Llama Guard on Workers AI) and post-filter output. Fall back to the template engine on refusal or error.
- Strip emails, phone numbers and URLs from the input before sending.

## 5. Privacy note
- Don't store profile text. Log only counts and errors. Tell users that their text goes to a third-party AI provider to make the roast and isn't kept. Add a short privacy page (GDPR/UK/UAE PDPL basics), and don't use analytics cookies without consent.

## 6. Estimated cost per roast
~600 input + ~200 output tokens ≈ 800 tokens.
- Gemini Flash-Lite / Groq small: ≈ $0.00005–0.0002 per roast (≈ $0.05–0.20 per 1,000 roasts)
- Mid-tier model: ≈ $0.0005–0.002 per roast
- Hosting: Cloudflare Pages + Workers free tier = $0 up to 100k requests/day.

One "polished rewrite" sale (e.g. $5 via the PayPal button) covers tens of thousands of roasts.

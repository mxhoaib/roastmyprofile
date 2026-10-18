# Collecting submitted profile links

When a visitor roasts a profile **with a link**, `app.js` POSTs these form fields to `COLLECT_ENDPOINT` in `config.js`:

| field | example |
|---|---|
| `link` | `https://www.instagram.com/someone/` |
| `platform` | `Instagram` |
| `timestamp` | `2026-10-18T17:55:00.000Z` (ISO, UTC) |
| `page` | `https://mxhoaib.github.io/roastmyprofile/` |

Pasted bio text is **never** sent. Profiles are **never** scraped. It sends once per new link (re-rolls don't resend), uses `fetch(..., {mode:'no-cors'})` so it works on GitHub Pages, and silently does nothing while the endpoint is empty (as shipped now).

The page tells visitors that their link is saved (notice under the field + footer). Keep that notice if you change the UI, and mention it in a privacy note if you add one.

## Option A (recommended, free, unlimited for this volume): Google Sheet + Apps Script
1. Create a Google Sheet, e.g. "RoastMyProfile submissions". Row 1 headers: `timestamp | platform | link | page | received`.
2. **Extensions → Apps Script**, replace the code with:
   ```js
   function doPost(e) {
     var p = e.parameter || {};
     var link = String(p.link || '').slice(0, 300);
     if (!/^https?:\/\//.test(link)) return ContentService.createTextOutput('bad');
     SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].appendRow([
       String(p.timestamp || '').slice(0, 40), String(p.platform || '').slice(0, 40),
       link, String(p.page || '').slice(0, 200), new Date()
     ]);
     return ContentService.createTextOutput('ok');
   }
   ```
3. **Deploy → New deployment → Web app**. Execute as: *Me*. Who has access: *Anyone*. Authorise.
4. Copy the URL ending in `/exec` into `config.js`:
   `window.RMP_CONFIG={COLLECT_ENDPOINT:'https://script.google.com/macros/s/XXXX/exec'};`
5. Test: roast with a link, then check the sheet. (If you edit the script, deploy a **new version**; the URL stays the same.)

The /exec URL isn't a secret, but anyone can post to it, so the script length-limits and checks the input. Optional: add a check that `p.page` starts with your domain.

## Option B: Formspree (free tier ~50 submissions/month)
1. Sign up at formspree.io → New form → copy `https://formspree.io/f/abcdwxyz`.
2. Put it in `COLLECT_ENDPOINT`. Submissions arrive by email + Formspree dashboard. Turn on its spam filtering.

## Other free options
- **Getform / Basin / FormSubmit**: similar to Formspree, all have small free tiers.
- **Cloudflare Worker + KV / D1**: free tier, full control; good if you later add rate limiting (see AI_UPGRADE.md).

## Privacy checklist
- Only collect public profile links, as the notice says. Delete rows on request.
- If you serve EU/UK visitors, add a short privacy note (what is stored, why, how to request deletion).
- Never put API keys or tokens in `config.js` or any front-end file.

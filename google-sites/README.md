# RepairFront marketing site (Google Sites)

Static HTML for your public website: landing page, demo request, customer intake, EULA, and Privacy Policy.

The **RepairFront app** stays on your normal host (`app.repairfront.com`). These pages can live on **Google Sites** (or any static host).

## Files

```
google-sites/
  index.html          Home
  demo.html           Demo request form
  get-started.html    Customer intake form
  eula.html           End User License Agreement
  privacy.html        Privacy Policy
  assets/
    config.js         ← Edit API URL before publishing
    styles.css
    site.js           Nav + form submission
```

## Step 1 — Configure

Edit `assets/config.js`:

```javascript
window.REPAIRFRONT = {
  apiBase: "https://app.repairfront.com",       // your deployed app
  appLoginUrl: "https://app.repairfront.com/login",
  siteBase: "",                                  // see Step 2
};
```

Forms POST to `{apiBase}/api/leads/demo` and `{apiBase}/api/leads/intake`.

On the app host, ensure:

- `RESEND_API_KEY` + `EMAIL_FROM` are set (lead emails)
- `SALES_CONTACT_EMAIL` is set
- Optional: `MARKETING_ALLOWED_ORIGINS=https://sites.google.com` (defaults to `*` if unset)

## Step 2 — Host the HTML

Google Sites **cannot upload HTML files directly**. Use one of these:

### Option A — Link from Google Sites (simplest)

1. Host this folder on **GitHub Pages**, **Cloudflare Pages**, or **Firebase Hosting** (free).
2. In Google Sites, create pages and add **text + buttons** linking to your hosted URLs:
   - Home → `https://your-host/index.html`
   - Demo → `https://your-host/demo.html`
   - etc.

### Option B — Embed in Google Sites (iframe)

1. Host the folder on GitHub Pages (or similar).
2. In Google Sites: **Insert → Embed → Embed code**
3. Paste (adjust URL and height):

```html
<iframe
  src="https://YOUR-HOST/index.html"
  width="100%"
  height="2400"
  style="border:0;"
  title="RepairFront"
></iframe>
```

4. Repeat for `demo.html` (height ~900), `get-started.html` (~1100), legal pages (~2000).

Set `siteBase` in `config.js` to your hosted base URL so navigation works inside the iframe.

### Option C — Copy legal text only into Google Sites

For EULA/Privacy, you can paste the text from `eula.html` / `privacy.html` into native Google Sites pages. Use **Option B** or **Google Forms** for lead capture if you skip hosted forms.

## Step 3 — Google Sites site map

Suggested Google Sites pages:

| Google Sites page | Content |
|-------------------|---------|
| Home | Embed or link to `index.html` |
| Request demo | Embed or link to `demo.html` |
| Get started | Embed or link to `get-started.html` |
| EULA | Embed or link to `eula.html` |
| Privacy | Embed or link to `privacy.html` |

Point **Sign in** to `https://app.repairfront.com/login`.

## Step 4 — Intuit / legal URLs

Use your **public EULA URL** in Intuit Developer Portal:

- Hosted static: `https://YOUR-HOST/eula.html`
- Or Google Sites page URL if you pasted content there

Set on the app (optional):

```
LEGAL_EULA_URL=https://YOUR-PUBLIC-EULA-URL
LEGAL_PRIVACY_URL=https://YOUR-PUBLIC-PRIVACY-URL
```

## Local preview

```bash
cd google-sites
npx --yes serve .
```

Open `http://localhost:3000/index.html`

## GitHub Pages quick deploy

1. Push the `google-sites/` folder to a repo (or subfolder).
2. Settings → Pages → deploy from branch.
3. Site URL becomes `https://USERNAME.github.io/REPO/` — set that as `siteBase` if using iframes.

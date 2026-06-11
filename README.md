# repairfront-site

RepairFront marketing website — static HTML for the public site: landing page, demo request, customer intake, EULA, and Privacy Policy.

The **RepairFront app** stays on `app.repairfront.com`. This repo is the marketing site only.

**Live site:** [https://repairfront.com](https://repairfront.com)  
**GitHub Pages URL:** [https://bigman8u4lunch.github.io/repairfront-site/](https://bigman8u4lunch.github.io/repairfront-site/)

## Files

```
repairfront-site/
  index.html              Home
  demo.html               Demo request form
  get-started.html        Customer intake form
  eula.html               End User License Agreement
  privacy.html            Privacy Policy
  CNAME                   Custom domain (repairfront.com)
  assets/
    config.js             API URLs and site config
    styles.css
    site.js                 Nav + form submission
    images/                 Site photos (swap anytime)
```

## GitHub Pages

Site files live at the **repo root**. In GitHub:

1. **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main`
4. **Folder:** `/ (root)`

Do **not** use `/docs` or a subfolder — `index.html` is at the top level.

After you push to `main`, GitHub Pages redeploys automatically (usually within a minute or two).

## Configure

Edit `assets/config.js` before publishing:

```javascript
window.REPAIRFRONT = {
  apiBase: "https://app.repairfront.com",
  appLoginUrl: "https://app.repairfront.com/login",
  siteBase: "",   // leave empty for repairfront.com and github.io
};
```

Forms POST to:

- `{apiBase}/api/leads/demo`
- `{apiBase}/api/leads/intake`

On the app host, ensure:

- `RESEND_API_KEY` and `EMAIL_FROM` are set (lead emails)
- `SALES_CONTACT_EMAIL` is set
- `MARKETING_ALLOWED_ORIGINS=https://repairfront.com,https://www.repairfront.com` (defaults to `*` if unset)

## Legal URLs (Intuit / compliance)

Public URLs for the app environment:

```
LEGAL_EUL_URL=https://repairfront.com/eula.html
LEGAL_PRIVACY_URL=https://repairfront.com/privacy.html
```

## Swap photos

Replace files in `assets/images/` and push. No build step required.

| File | Used on |
|------|---------|
| `hero-fleet.jpg` | Home hero |
| `feature-workorders.jpg` | Work orders card, demo sidebar |
| `feature-parts.jpg` | Parts card |
| `feature-invoicing.jpg` | Invoicing card |
| `feature-integrations.jpg` | Integrations card |
| `showcase-shop.jpg` | Home showcase section |
| `aside-demo.jpg` | Demo page sidebar |
| `aside-intake.jpg` | Get started sidebar |

Keep the same filename to avoid HTML changes, or add a new file and update the `src` in the matching HTML page.

## Local preview

```bash
npx --yes serve .
```

Open [http://localhost:3000/index.html](http://localhost:3000/index.html)

## Optional — embed in Google Sites

If you also use Google Sites, link or iframe to the hosted URLs above (for example `https://repairfront.com/demo.html`). Set `siteBase` in `config.js` to your public site URL if navigation must work inside an iframe.

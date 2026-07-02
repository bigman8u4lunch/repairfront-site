# repairfront-site

RepairFront marketing website — static HTML for the public site: landing page, demo request, customer intake, EULA, and Privacy Policy.

This repo is **standalone**. The only connection to the RepairFront app is the **Sign in** button (`app.repairfront.com/login`). Demo and get-started use **Google Forms** embedded on the site.

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
  data-brokers.html       Data brokers & privacy (no sale of personal information)
  knowledge-licensing.html  Commercial knowledge data licenses (anonymized aggregates)
  CNAME                   Custom domain (repairfront.com)
  assets/
    config.js             Sign-in URL + Google Form links
    styles.css
    site.js               Nav + embed Google Forms
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

Edit `assets/config.js`:

```javascript
window.REPAIRFRONT = {
  appLoginUrl: "https://app.repairfront.com/login",
  demoFormUrl: "https://docs.google.com/forms/d/e/YOUR_DEMO_FORM/viewform",
  getStartedFormUrl: "https://docs.google.com/forms/d/e/YOUR_INTAKE_FORM/viewform",
  siteBase: "",
};
```

- **`appLoginUrl`** — the only link to the app (Sign in button).
- **`demoFormUrl`** / **`getStartedFormUrl`** — Google Form links for each page.

### Create the Google Forms

1. Go to [Google Forms](https://forms.google.com) and create two forms (demo + get started), or one form with a “Request type” question.
2. Add fields you care about (name, email, company, phone, fleet size, message, etc.).
3. **Send** → link icon → copy the form URL.
4. Paste into `config.js` and push.

Responses land in Google Sheets automatically if you enable that in the form settings. Turn on email notifications under **Responses → ⋮ → Get email notifications for new responses**.

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

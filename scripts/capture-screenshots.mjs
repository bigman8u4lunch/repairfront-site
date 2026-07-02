import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const templatesDir = path.join(root, "scripts", "screenshots");
const outputDir = path.join(root, "assets", "images");

const shots = [
  { template: "dashboard.html", output: "app-dashboard.png" },
  { template: "work-orders.html", output: "app-work-orders.png" },
  { template: "invoices.html", output: "app-invoices.png" },
  { template: "portal.html", output: "app-portal.png" },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

for (const shot of shots) {
  const fileUrl = new URL(shot.template, `file:///${templatesDir.replace(/\\/g, "/")}/`).href;
  await page.goto(fileUrl, { waitUntil: "networkidle" });
  await page.screenshot({
    path: path.join(outputDir, shot.output),
    type: "png",
  });
  console.log(`Wrote ${shot.output}`);
}

await browser.close();

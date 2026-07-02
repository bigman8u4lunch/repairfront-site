import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require(
  path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../servicecore/node_modules/sharp"
  )
);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir =
  "C:/Users/bigma/.cursor/projects/c-Users-bigma-Documents-GitHub-repairfront-site/assets";
const outputDir = path.join(root, "assets", "images");

const shopName = { x: 0.62, y: 0, w: 0.38, h: 0.14, solid: "#1c1917" };

const jobs = [
  {
    source:
      "c__Users_bigma_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-7cf5c6e4-632e-43f4-bb15-3d99ba960e06.png",
    output: "app-dashboard.png",
    regions: [shopName],
  },
  {
    source:
      "c__Users_bigma_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-06f2b51b-7871-4e54-a638-4fb99903c37b.png",
    output: "app-work-orders.png",
    regions: [
      shopName,
      { x: 0.14, y: 0.27, w: 0.86, h: 0.73 },
    ],
  },
  {
    source:
      "c__Users_bigma_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Screenshot_2026-07-02_104200-32c5a654-40a5-4327-8976-502c54ba728a.png",
    output: "app-invoices.png",
    regions: [shopName],
  },
  {
    source:
      "c__Users_bigma_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Screenshot_2026-07-02_104116-325f0bdb-a590-4a7a-81c3-2c9d94704c47.png",
    output: "app-portal.png",
    regions: [
      shopName,
      { x: 0.01, y: 0.27, w: 0.98, h: 0.4 },
    ],
  },
];

async function applyRegions(inputPath, regions) {
  const metadata = await sharp(inputPath).metadata();
  const width = metadata.width;
  const height = metadata.height;
  const composites = [];

  for (const region of regions) {
    const left = Math.max(0, Math.round(region.x * width));
    const top = Math.max(0, Math.round(region.y * height));
    const regionWidth = Math.min(width - left, Math.round(region.w * width));
    const regionHeight = Math.min(height - top, Math.round(region.h * height));

    if (regionWidth <= 0 || regionHeight <= 0) continue;

    let overlay;
    if (region.solid) {
      overlay = await sharp({
        create: {
          width: regionWidth,
          height: regionHeight,
          channels: 4,
          background: region.solid,
        },
      })
        .png()
        .toBuffer();
    } else {
      overlay = await sharp(inputPath)
        .extract({ left, top, width: regionWidth, height: regionHeight })
        .blur(30)
        .toBuffer();
    }

    composites.push({ input: overlay, left, top });
  }

  return sharp(inputPath).composite(composites).resize(1280).png({ quality: 92 }).toBuffer();
}

for (const job of jobs) {
  const inputPath = path.join(sourceDir, job.source);
  const outputPath = path.join(outputDir, job.output);
  const buffer = await applyRegions(inputPath, job.regions);
  await sharp(buffer).toFile(outputPath);
  console.log(`Wrote ${job.output}`);
}

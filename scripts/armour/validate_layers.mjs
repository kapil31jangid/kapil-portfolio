import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const dir = path.join(root, "public", "armours", "iron-man");
const files = [
  "body-open.webp",
  "faceplate.webp",
  "helmet-interior.webp",
  "helmet-mask.png",
  "kapil-face-layer.webp",
  "eyes.webp",
  "reactor.webp",
  "highlights.webp",
];

const metadata = JSON.parse(await fs.readFile(path.join(dir, "metadata.json"), "utf8"));
const expected = { width: metadata.width, height: metadata.height };
const results = [];

for (const file of files) {
  const filePath = path.join(dir, file);
  const stat = await fs.stat(filePath);
  const image = sharp(filePath, { failOn: "error" });
  const info = await image.metadata();
  if (info.width !== expected.width || info.height !== expected.height) {
    throw new Error(`${file} is ${info.width}x${info.height}; expected ${expected.width}x${expected.height}`);
  }
  if (!info.hasAlpha) throw new Error(`${file} has no alpha channel`);
  const { channels } = await image.stats();
  const alpha = channels[3];
  if (!alpha || alpha.max === 0 || alpha.sum === 0) throw new Error(`${file} has an empty alpha channel`);
  if (
    file !== "helmet-mask.png" &&
    channels.slice(0, 3).every((channel) => channel.stdev < 0.05) &&
    alpha.stdev < 0.05
  ) {
    throw new Error(`${file} appears to contain only a flat colour`);
  }
  results.push({ file, bytes: stat.size, width: info.width, height: info.height, alphaMax: alpha.max });
}

const mask = await sharp(path.join(dir, "helmet-mask.png")).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const face = await sharp(path.join(dir, "kapil-face-layer.webp")).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
let leakedPixels = 0;
for (let offset = 0; offset < mask.data.length; offset += 4) {
  if (face.data[offset + 3] > 8 && mask.data[offset + 3] < 4) leakedPixels += 1;
}
if (leakedPixels > 0) throw new Error(`Face alpha leaks outside helmet mask at ${leakedPixels} pixels`);

const totalBytes = results.reduce((sum, item) => sum + item.bytes, 0);
const report = { expected, files: results, totalBytes, attribution: metadata.attribution };
await fs.mkdir(path.join(root, "artifacts"), { recursive: true });
await fs.writeFile(path.join(root, "artifacts", "armour-validation.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));

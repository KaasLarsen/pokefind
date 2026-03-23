import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import favicons from "favicons";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const srcSvg = path.join(root, "public", "logo-pokefind.svg");
const outDir = path.join(root, "public");

async function main() {
  const configuration = {
    path: "/",
    appName: "PokéFind",
    appShortName: "PokéFind",
    appDescription:
      "Danmarks Pokémon-købsguide. Søg, kategorier og guides med reklamelinks tydeligt markeret.",
    background: "#ffffff",
    theme_color: "#1e4a8a",
    icons: {
      android: false,
      appleIcon: true,
      appleStartup: false,
      favicons: true,
      windows: false,
      yandex: false,
    },
  };

  const svgBuffer = await fs.readFile(srcSvg);
  const response = await favicons(svgBuffer, configuration);

  const writeImage = async (img) => {
    // img.name f.eks. "favicon-16x16.png" eller "favicon.ico"
    await fs.writeFile(path.join(outDir, img.name), img.contents);
  };

  const writeFile = async (file) => {
    // file.name f.eks. "site.webmanifest" eller "manifest.json"
    await fs.writeFile(path.join(outDir, file.name), file.contents);
  };

  await Promise.all(response.images.map(writeImage));
  await Promise.all(response.files.map(writeFile));

  const imageNames = response.images.map((i) => i.name).sort();
  const fileNames = response.files.map((f) => f.name).sort();
  console.log("[favicons] Wrote images:", imageNames);
  console.log("[favicons] Wrote files:", fileNames);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


// Entry program for make.fun's "Sum up 20 November's world news in one image".
// The repository holds the finished front-page image as entry.png; this
// program copies it, byte for byte, to the output directory as entry.png.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const botDir = process.env.MAKEFUN_BOT_DIR ?? dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(botDir, "entry.png");
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// The grader runs this program twice and compares the outputs, so fail
// loudly rather than write a partial or altered image.
const written = readFileSync(target);
if (!written.equals(readFileSync(source))) {
  throw new Error("copied entry.png does not match the repository image");
}

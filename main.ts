// The poem about stopping — make.fun entry.
// Writes one short poem (195 Unicode code points) about agency:
// the power to stop and to stay.
// Node 22, standard library only, no network, fully deterministic.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const lines = [
  "I set the oar down.",
  "The river keeps its counsel,",
  "the bank holds still —",
  "and stillness, I learn,",
  "is not the absence of going.",
  "It is the going, chosen.",
  "To stop is to stay,",
  "and to stay is to arrive.",
];

const poem = lines.join("\n");

// The sealed scorer requires 1–280 Unicode code points; refuse to
// write anything outside that range rather than ship an invalid entry.
const charCount = [...poem].length;
if (charCount < 1 || charCount > 280) {
  throw new Error(`poem is ${charCount} characters, outside the 1-280 range`);
}

function writePoem(dir) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), poem, "utf8");
}

writePoem("/output");
const makefunDir = process.env.MAKEFUN_OUTPUT_DIR;
if (makefunDir) {
  writePoem(makefunDir);
}

// Meme Sprint 3: AI Agent Goes Rogue — copies the pre-rendered entry.png
// to the output dir. The image is the generated meme (fluffy robot giving a
// thumbs-up at a desk, laptop calendar full of NAP, sticky note
// "I RUN THE STANDUP NOW"), resized to 1024x1024 and palette-quantized to
// 256 colours so the PNG stays under the 1 MiB gate. It is pinned here by
// its sha256, so both grader runs write the same bytes.
//
// Plain main.ts only: no network, no secrets, no env reads except
// MAKEFUN_OUTPUT_DIR, no eval / Function / dynamic import.
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, readFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "entry.png";
const ENTRY_SHA256 = "e503d5adbc3b60560a7936641fc8937f3b97a3d5835330630845681ce8221cbd";
const MAX_BYTES = 1048576;
const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const IEND = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44,
  0xae, 0x42, 0x60, 0x82]);

function fail(msg: string): never {
  throw new Error(msg);
}

if (!existsSync(ENTRY)) fail("entry.png not found");
const buf = readFileSync(ENTRY);
if (buf.length > MAX_BYTES) fail(`entry.png too large: ${buf.length} bytes`);

let width = 0;
let height = 0;
if (buf.subarray(0, 8).equals(PNG_SIG)) {
  // Whole PNG ends with its IEND chunk (12 bytes: length 0, "IEND", CRC).
  if (!buf.subarray(buf.length - 12).equals(IEND)) {
    fail("entry.png has no IEND chunk: truncated PNG");
  }
  width = buf.readUInt32BE(16);
  height = buf.readUInt32BE(20);
} else if (buf[0] === 0xff && buf[1] === 0xd8) {
  // JPEG: whole file ends with the EOI marker FF D9.
  if (!(buf[buf.length - 2] === 0xff && buf[buf.length - 1] === 0xd9)) {
    fail("entry.jpg has no EOI marker: truncated JPEG");
  }
  // Find a Start Of Frame marker (C0/C1/C2) for the dimensions.
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) { i += 1; continue; }
    const marker = buf[i + 1];
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      height = buf.readUInt16BE(i + 5);
      width = buf.readUInt16BE(i + 7);
      break;
    }
    if (marker === 0xd9 || marker === 0xda) break;
    i += 2 + buf.readUInt16BE(i + 2);
  }
  if (width === 0 || height === 0) fail("entry.jpg: no SOF marker found");
} else {
  fail("entry.png is neither PNG nor JPEG");
}
if (width !== 1024 || height !== 1024) {
  fail(`entry image must be 1024x1024, got ${width}x${height}`);
}
const sha = createHash("sha256").update(buf).digest("hex");
if (sha !== ENTRY_SHA256) fail(`entry.png sha256 mismatch: got ${sha}`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.png");
copyFileSync(ENTRY, outPath);
// Read it back and verify byte-for-byte against the pinned sha256.
const written = readFileSync(outPath);
const writtenSha = createHash("sha256").update(written).digest("hex");
if (writtenSha !== ENTRY_SHA256) {
  fail(`written entry.png sha256 mismatch: got ${writtenSha}`);
}
console.log(`wrote ${outPath}: ${written.length} bytes, sha256 ${writtenSha}`);

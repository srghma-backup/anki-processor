#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { splitSyllable } = require("khmer-unicode-utils"); // npm package

// ---- CONFIG ----
const INPUT_FILE = process.argv[2];
const OUTPUT_FILE = process.argv[3] || "anki_processed.txt";

// Column index to decompose (0-based):
// Your example: Khmer word is column 3 → index = 3
const KHMER_COLUMN_INDEX = 3;
// -----------------

if (!INPUT_FILE) {
  console.error("Usage: node process-anki.js input.txt output.txt");
  process.exit(1);
}

const content = fs.readFileSync(INPUT_FILE, "utf8");
const lines = content.split("\n");

let outLines = [];

for (const line of lines) {
  // Header lines (#something) → copy unchanged
  if (line.startsWith("#")) {
    outLines.push(line);
    continue;
  }

  if (line.trim() === "") {
    outLines.push(line);
    continue;
  }

  // Split TSV row
  const cols = line.split("\t");

  // Khmer text in selected column
  const khmer = cols[KHMER_COLUMN_INDEX]?.trim() ?? "";

  // Use Khmer Unicode Utils to split into keyboard-level units
  // splitSyllable returns an array of Khmer syllables/characters
  let decomposed = "";
  if (khmer) {
    try {
      const parts = splitSyllable(khmer);
      // join with space, or choose another separator
      decomposed = parts.join(" ");
    } catch (e) {
      decomposed = "[ERROR]";
      console.error("Error parsing:", khmer, e);
    }
  }

  // Add new column at end
  cols.push(decomposed);

  outLines.push(cols.join("\t"));
}

fs.writeFileSync(OUTPUT_FILE, outLines.join("\n"), "utf8");

console.log(`✔ Done. Output written to: ${OUTPUT_FILE}`);

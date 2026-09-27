#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import process from "node:process";
import { routeTask } from "../src/router.mjs";

function usage() {
  console.error("Usage: workflow-stoplight <task.json>");
  console.error("       cat task.json | workflow-stoplight -");
}

async function readInput(file) {
  if (file === "-") {
    const chunks = [];
    for await (const chunk of process.stdin) chunks.push(chunk);
    return chunks.join("");
  }
  return readFile(file, "utf8");
}

const file = process.argv[2];
if (!file) {
  usage();
  process.exitCode = 2;
} else {
  try {
    const raw = await readInput(file);
    const input = JSON.parse(raw);
    console.log(JSON.stringify(routeTask(input), null, 2));
  } catch (error) {
    console.error(`workflow-stoplight: ${error.message}`);
    process.exitCode = 1;
  }
}

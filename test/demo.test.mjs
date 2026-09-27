import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

test("browser demo is self-contained and uses the shared router", () => {
  const html = fs.readFileSync(new URL("../demo/index.html", import.meta.url), "utf8");
  assert.match(html, /from \"\.\/src\/router\.mjs\"/);
  assert.match(html, /Your input is not sent anywhere/);
  assert.match(html, /routeTask\(task\)/);
  assert.doesNotMatch(html, /<script[^>]+src=[\"']https?:/i);
});

// Builds WebFlasher.html: src/app.html with esptool-js inlined, so the result is one portable file.
// Usage: node build.js
const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "src");
let bundle = fs.readFileSync(path.join(src, "esptool-js-0.6.1.js"), "utf8");

// The bundle is an ES module ending in `export{a as B,...}`; turn it into a classic script that sets window.esptool.
const at = bundle.lastIndexOf("export{");
if (at < 0) throw new Error("export statement not found in esptool bundle");
const names = bundle.slice(at + 7, bundle.indexOf("}", at)).split(",").map(p => {
  const [local, exported] = p.split(" as ").map(s => s.trim());
  return `${exported || local}:${local}`;
});
bundle = `(function(){"use strict";${bundle.slice(0, at)}\nwindow.esptool={${names.join(",")}};})();`;
bundle = bundle.replace(/<\/script/gi, "<\\/script");

const html = fs.readFileSync(path.join(src, "app.html"), "utf8");
if (!html.includes("/*@@ESPTOOL_BUNDLE@@*/")) throw new Error("placeholder missing in app.html");
const out = html.replace("/*@@ESPTOOL_BUNDLE@@*/", () => bundle);
fs.writeFileSync(path.join(__dirname, "WebFlasher.html"), out);
console.log(`WebFlasher.html written (${(out.length / 1024).toFixed(0)} KB)`);

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

fs.rmSync(dist, { recursive: true, force: true });

execSync("npx tsc", { cwd: root, stdio: "inherit" });

const copy = (src, dest) => {
  const sourcePath = path.join(root, src);
  if (!fs.existsSync(sourcePath)) return;
  const destPath = path.join(dist, dest || src);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.cpSync(sourcePath, destPath, { recursive: true });
};

copy("index.html");
copy("styles.css");
copy("favicon.ico");

const assetsDest = path.join(dist, "assets");
fs.mkdirSync(assetsDest, { recursive: true });
fs.cpSync(path.join(root, "assets"), assetsDest, { recursive: true });

const htmlPath = path.join(dist, "index.html");
const html = fs.readFileSync(htmlPath, "utf8");
const updated = html.replace('src="dist/script.js"', 'src="script.js"');
fs.writeFileSync(htmlPath, updated);

console.log("build complete -> dist/");

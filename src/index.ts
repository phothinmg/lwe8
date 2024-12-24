import { fileURLToPath } from "url";
import { dirname } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const configPath = require.resolve("./config.js");

(async () => {
  const con = await import(configPath);
  console.log(con);
})();

console.log(configPath);

import fs from "node:fs";
import path from "node:path";
/* ------------------------TYPES------------------------------- */
/**
 * @typedef Routes
 * @property {Record<string,string>}[pages]
 * @property {Record<string,string>}[posts]
 */
/**
 * @typedef {Record<string,string | string[]> | {}}Metadata
 */
/**
 * @typedef Lwe8Configuration
 * @property {Metadata}[metadata]
 * @property {Routes}[routes]
 */
/* ------------------------------------------------------------------------------------- */
const routesOutFilePath = path.join(process.cwd(), "src/routes.js");
const metadataOutFilePath = path.join(process.cwd(), "src/metadata.js");
/* ------------------------------------------------------------------------------------- */
/**************
 * CONFIG FILE *
 **************/

const configPath = path.join(process.cwd(), "lwe8.json");
/**
 * Loads and parses the configuration file.
 *
 * @returns {Lwe8Configuration | {}} The parsed configuration object if successful,
 * or an empty string if an error occurs.
 */
function loadConfig() {
  try {
    const txt = fs.readFileSync(configPath, "utf8");
    return JSON.parse(txt);
  } catch (error) {
    console.error("Error loading config:", error);
    return "";
  }
}
/* ----------------------- ROUTES ------------------- */
/* Routes Files */
/** @type {{pages:Record<string,string>;posts:Record<string,string>}} */
const routesFiles = loadConfig().routes;
const _routesFiles = { ...routesFiles.pages, ...routesFiles.posts };
const routeKeys = Object.keys(_routesFiles);
/** @type {Record<string,string>} */
let _routeObj = {};
for (const key of routeKeys) {
  _routeObj[key] = fs.readFileSync(_routesFiles[key], "utf8");
}

const routesOutText = `
// This is generated file
/** @type {{pages:Record<string,string>;posts:Record<string,string>}} */
const routes = ${JSON.stringify(routesFiles, null, 2)}
// ==========================================================
/** @type {Record<string,string>} */
const routesObject = ${JSON.stringify(_routeObj, null, 2)}
// ==========================================================

export {routes,routesObject}
`;
/* --------------------------- Metadata ----------------------------------- */
/** @type {Metadata} */
const metadata = loadConfig().metadata;
const _metadata = metadata ? metadata : {};
const metadataOutText = `
// This is generated file
/**
 * @typedef {Record<string,string | string[]> | {}}Metadata
 */
/** @type {Metadata} */

const metadata = ${JSON.stringify(_metadata, null, 2)}

export {metadata}

`;
/** --------------------------------------------------------------------------------- */

fs.writeFileSync(routesOutFilePath, routesOutText);
fs.writeFileSync(metadataOutFilePath, metadataOutText);

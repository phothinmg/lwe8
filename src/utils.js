/** @import {DefineConfig} from "./defineConfig.js" */
import fs from "node:fs";
import path from "node:path";
import { transform } from "lightningcss";

const projectRoot = process.cwd();
const configPath = path.join(projectRoot, "config.js");
/** @type {{default: DefineConfig}} */
const _config = await import(configPath);
/** @type {DefineConfig} */
const config = _config.default;
const appPath = path.join(projectRoot, config.appDir);
const publicPath = path.join(projectRoot, config.public.dir);
const favicoPath = path.join(publicPath, "favico.ico");
const staticPath = path.join(projectRoot, config.devserver?.static);
/**
 *
 * @param {string} filePath
 * @returns {string}
 */
const fileName = (filePath) => path.basename(filePath).split(".")[0];
const _publicEtxs = [".png", ".jpg", ".gif", ".jpeg", ".webp"];
const publicExtensions = [
  ...new Set([..._publicEtxs, ...config.public?.extensions]),
];
const imgExts = [".png", ".jpg", ".gif", ".jpeg", ".webp"];

/**
 *
 * @param {string} dir
 * @param {string | string[]} exts
 */
const getFiles = (dir, exts) => {
  const files = fs.readdirSync(dir, { recursive: true });
  if (Array.isArray(exts)) {
    return files.filter((i) => exts.includes(path.extname(i)));
  }
  return files.filter((i) => path.extname(i) === exts);
};
/**
 *
 * @param {string} file
 * @returns {boolean}
 */
const isPublic = (file) => publicExtensions.includes(path.extname(file));
const markdownFiles = getFiles(appPath, ".md");
const cssFiles = getFiles(publicPath, ".css");
const cssPath = cssFiles.map((i) => path.join(publicPath, i));
const publicFiles = getFiles(publicPath, publicExtensions);
const imgFiles = publicFiles.filter((i) => imgExts.includes(path.extname(i)));
/**
 * @typedef MdR
 * @property {string} resurl
 * @property {string} filePath
 * @property {string} parent
 *
 */
/**
 *
 * @returns {Array<MdR>}
 */
const mdRoutes = () => {
  /** @type {Array<MdR>} */
  let routes = [];
  for (const file of markdownFiles) {
    const fname = fileName(file);
    const parentPath = path.dirname(file);
    /** @type {MdR} */
    const result = {
      resurl:
        fname === "index" && parentPath === "."
          ? "/"
          : fname === "index" && parentPath !== "."
          ? `/${parentPath}`
          : fname !== "index" && parentPath === "."
          ? `/${fname}`
          : `/${parentPath}/${fname}`,
      filePath: `${appPath}/${file}`,
      parent:
        parentPath === "." ? config.appDir : `${config.appDir}/${parentPath}`,
    };
    routes.push(result);
  }
  return routes;
};
/**
 *
 * @returns {string}
 */
const mergeCssFile = () => {
  /** @type {string[]} */
  let result = [];
  for (const file of cssFiles) {
    const fp = path.join(publicPath, file);
    result.push(fs.readFileSync(fp, "utf-8"));
  }
  return result.join("\n");
};
const compilCss = () => {
  const { code, map } = transform({
    filename: "main.css",
    code: mergeCssFile(),
    minify: true,
    sourceMap: true,
  });
  return String(code);
};
const imgFileNames = () => {
  /** @type {string[]} */
  let files = [];
  for (const file of imgFiles) {
    files.push(path.basename(file));
  }
  return files;
};
export {
  mdRoutes,
  appPath,
  favicoPath,
  publicPath,
  cssFiles,
  publicFiles,
  config,
  fileName,
  isPublic,
  mergeCssFile,
  imgFiles,
  imgFileNames,
  staticPath,
  cssPath
};

import Converter from "showmark";
import jsxCompiler from "showmark/jsx";
import fs from "node:fs";
/**
 * @typedef FrontMatter
 * @property {string}[title]
 * @property {string}[date]
 * @property {string[]}[tags]
 */

/**
 *
 * @param {string} file
 * @returns {Converter<FrontMatter>}
 */
const converter = (file) => {
  const content = fs.readFileSync(file, "utf-8");
  return new Converter(content);
};

const jsxcompile = (file) => {
  const content = fs.readFileSync(file, "utf-8");
  return jsxCompiler(content).code;
};

export { converter, jsxcompile };

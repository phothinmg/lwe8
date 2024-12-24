/**
 * @import {Node} from "@babel/traverse"
 * @import {ParseResult} from '@babel/parser'
 * @import {BabelFileMetadata} from '@babel/core'
 * @import {types} from '@babel/core'
 * */
/**
 * @typedef FunDeclarePath
 * @property {(arg0: (p: any) => any) => any}findParent
 * @property {(arg0: string) => { (): any; new (): any; node: { (): any; new (): any; name: any };}} get
 */
import fs from "node:fs";
import path from "node:path";
import * as babel from "@babel/core";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

const extensionNames = [
  ".js",
  ".cjs",
  ".mjs",
  ".ts",
  ".mts",
  ".cts",
  ".tsx",
  ".jsx",
];

const isJs = (ext) => extensionNames.includes(ext);

/**
 *
 * @param {string} content
 * @returns {ParseResult<File>}
 */
const getAst = (content) => {
  return parse(content, {
    sourceType: "module",
    plugins: [
      "jsx",
      "typescript",
      "topLevelAwait",
      "dynamicImport",
      "exportDefaultFrom",
      "classPrivateMethods",
      "classPrivateProperties",
      "classProperties",
      "classStaticBlock",
      "decimal",
      "bigInt",
    ],
  });
};

/**
 *
 * @param {string} content
 * @param {string} [fileName]
 * @returns
 */
const compiler = (content, fileName) => {
  const ast = getAst(content);
  const file = fileName ?? "compile.js";
  const result = babel.transformFromAstSync(ast, content, {
    filename: file,
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            esmodules: true,
          },
          modules: false,
        },
      ],
      ["@babel/preset-react"],
      [
        "@babel/preset-typescript",
        {
          allowNamespaces: true,
          onlyRemoveTypeAnnotations: true,
        },
      ],
    ],
    plugins: [
      "@babel/plugin-transform-typescript",
      [
        "@babel/plugin-transform-react-jsx",
        {
          throwIfNamespace: false, // defaults to true
          runtime: "automatic",
        },
      ],
    ],
  });
  return {
    code: result.code,
    map: result.map,
  };
};

const getDeps = (file) => {
  const content = fs.readFileSync(file, "utf-8");
  const ast = getAst(content);
  /** @type {Array<{importName: string; source: string }>} */
  const dependencies = [];
  /** @type {Array<string>} */
  const localImportPath = [];
  traverse.default(ast, {
    ImportDeclaration(path) {
      const { specifiers, source } = path.node;
      const importName = specifiers[0].local.name;
      if (specifiers.length > 0) {
        dependencies.push({ importName, source: source.value });
      }
      if (source.value.startsWith(".")) {
        localImportPath.push(source.value);
      }
    },
  });
  return {
    dependencies,
    localImportPath,
  };
};

export { getDeps, getAst, compiler, isJs };

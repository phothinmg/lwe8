import fs from "node:fs";
import { extname, basename, dirname } from "node:path";
import type { Request, Response, NextFunction } from "express";
import Converter, { type ShowMarkOptions } from "showmark";
import jsxCompiler, { type JSXCompilerOptions } from "showmark/jsx";
import markdownExtensions from "markdown-extensions";
import { postDir, appDir } from "../config/index.js";

type MdMiddleware =
  | {
      format: "html";
      output?: "raw" | "clean";
    }
  | {
      format: "jsx";
      output?: null;
    };

type MarkdownMiddleware = {
  middlewareOptions?: MdMiddleware;
  jsxOptions?: JSXCompilerOptions;
  htmlIOptions?: ShowMarkOptions;
};

const mdExtensions: string[] = markdownExtensions.map((i) => `.${i}`);

export const mdFiles: string[] = (
  fs.readdirSync(postDir, { recursive: true }) as string[]
).filter((i) => mdExtensions.includes(extname(i)));

const fileName = (filePath: string) => basename(filePath).split(".")[0];
// roures for markdown files
const mdRoutes: Array<{ resurl: string; filePath: string }> = [];
for (const file of mdFiles) {
  const fname = fileName(file);
  const parentPath = dirname(file);
  const result: { resurl: string; filePath: string } = {
    resurl:
      fname === "index" && parentPath === "."
        ? "/"
        : fname === "index" && parentPath !== "."
        ? `/${parentPath}`
        : fname !== "index" && parentPath === "."
        ? `/${fname}`
        : `/${parentPath}/${fname}`,
    filePath: `${appDir}/${file}`,
  };
  mdRoutes.push(result);
}

const converter = (filePath: string, options?: MarkdownMiddleware) => {
  const content = fs.readFileSync(filePath, "utf-8");
  let result: string = "";
  const mwout = options?.middlewareOptions?.format ?? "html";
  if (mwout === "jsx") {
    result = jsxCompiler(
      content,
      options?.jsxOptions,
      options?.htmlIOptions
    ).code;
  }
  const cvt = new Converter(content, options?.htmlIOptions);
  result =
    options?.middlewareOptions?.output === "raw" ? cvt.rawHtml : cvt.cleanHtml;

  return result;
};


const markdownMiddleware = (options?: MarkdownMiddleware) => {
  return function (req: Request, res: Response, next: NextFunction) {
    for (const route of mdRoutes) {
      if (req.url === route.resurl) {
        const result = converter(route.filePath, options);
        res.send(result);
      }
    }
    next();
  };
};

export { markdownMiddleware };
export type { MarkdownMiddleware, ShowMarkOptions, JSXCompilerOptions };

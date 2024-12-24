import express from "express";
import React from "react";
import path from "node:path";
import { config, staticPath, mdRoutes } from "./utils.js";
import { converter, jsxcompile } from "./converter.js";
import template from "./template.js";
import { renderToString } from "react-dom/server";
import PageView from "./client/PageView.js";
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const markdown = function (req, res, next) {
  const mdroutes = mdRoutes();
  for (const route of mdroutes) {
    if (req.url === route.resurl) {
      const clean = converter(route.filePath).cleanHtml;
      const htm = renderToString(<PageView text={clean} />);
      res.send(template(htm));
    }
  }
  next();
};

const port = config.devserver?.port || 3838;
const app = express();
app.use(express.static(path.join(staticPath, "client")));
app.use(markdown);

app.listen(port, () => {
  const url = `http://localhost:${port}`;
  console.log(url);
});

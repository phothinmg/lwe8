import path from "node:path";
import { fileURLToPath } from "node:url";
import nodeExternals from "webpack-node-externals";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('webpack').Configuration} */

const serverConig = {
  mode: "development",
  target: "node",
  devtool: "inline-source-map",
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  entry: "./src/server/index.tsx",
  output: {
    path: path.resolve(__dirname, "./.lwe8/server"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
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
            },
          },
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig-server.json",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"],
    },
  },
};

export default serverConig;

import path from "node:path";
import { fileURLToPath } from "node:url";
import nodeExternals from "webpack-node-externals";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('webpack').Configuration} */

const serverConig = {
  mode: "development",
  devtool: "inline-source-map",
  target: "node",
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  entry: "./src/config/index.ts",
  output: {
    path: path.resolve(__dirname, "./dist/config"),
    filename: "index.js",
    chunkFilename: "[name].chunk.js", // Enable dynamic import
    module: true,
    clean: true,
    libraryTarget: "module",
  },
  experiments: {
    outputModule: true,
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
                "@babel/plugin-syntax-top-level-await",
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
  stats: {
    errorDetails: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [],
};

export default serverConig;

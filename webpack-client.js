import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import HtmlWebpackPlugin from "html-webpack-plugin";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

/** @type {import('webpack').Configuration} */

const clientConfig = {
  mode: "development",
  entry: "./client/index.tsx",
  target: "web",
  output: {
    path: path.resolve(__dirname, "./web"),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js", // Enable dynamic import
    clean: true,
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
              configFile: "tsconfig-client.json",
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer"), require("postcss-nested")],
              },
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
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Home",
      filename: "index.html",
      template: "./client/index.html",
    }),
  ],
};

export default clientConfig;

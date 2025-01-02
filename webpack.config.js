import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import HtmlWebpackPlugin from "html-webpack-plugin";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

/** @type {import('webpack').Configuration} */
const webpackConfig = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].chunk.js",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    port: 5454,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          {
            loader: "ts-loader",
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
                plugins: [
                  require("autoprefixer"),
                  require("postcss-nested"),
                  require("postcss-import"),
                ],
              },
            },
          },
        ],
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/i,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "[name].[hash].[ext]",
      //         outputPath: "images",
      //         publicPath: "images/",
      //       },
      //     },
      //   ],
      // },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  stats: {
    children: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Home",
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
};

export default webpackConfig;

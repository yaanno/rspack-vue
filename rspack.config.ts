import { defineConfig } from "@rspack/cli";
import { VueLoaderPlugin } from "vue-loader";

const config = defineConfig({
  context: __dirname,
  entry: {
    main: {
      import: ["./src/main.ts"],
    },
  },
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: "dist",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.tsx$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-typescript",
                  { allExtensions: true, isTSX: true },
                ],
              ],
              plugins: ["@vue/babel-plugin-jsx"],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        type: "asset",
      },
    ],
  },
  optimization: {
    moduleIds: "deterministic",
  },
  builtins: {
    html: [
      {
        template: "./index.html",
      },
    ],
    define: {
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    },
  },
  // @ts-expect-error
  plugins: [new VueLoaderPlugin()],
});
export = config;

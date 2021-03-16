"use strict";
const path = require("path");
var px2rem = require("postcss-px2rem");
function resolve(dir) {
  return path.join(__dirname, dir);
}

// 开发启动端口，默认8080
const port = process.env.PORT || 8080; // dev port
module.exports = {
  /**
   * https://cli.vuejs.org/config/#publicpath
   */
  publicPath: "./",

  outputDir: "dist",
  filenameHashing: true,
  assetsDir: "static",
  // lintOnSave: process.env.NODE_ENV === 'development',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port,
    // 设置为true的时候会启动两个窗口，用package.json文件中启动脚本加上--open参数代替
    // open: true,
    inline: false, // 关闭热更新
    host: "0.0.0.0",
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "^/api": {
        target: "http://10.192.34.65:9017",//http://10.192.34.65:8555/cmct-bridge-demo/login/getAreaList
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: "福建驾驶舱",
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  chainWebpack: function(config) {
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test

    // 引入全局的sass资源
    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          resources: ["./src/styles/variables.scss"],
        })
        .end();
    });

    // set svg-sprite-loader
    // config.module
    //   .rule("svg")
    //   .exclude.add(resolve("src/icons"))
    //   .end();

    // set preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();
  },

  css: {
    // loaderOptions: {
    //   postcss: {
    //     plugins: [
    //       // 设计稿宽度1920/10/2=96
    //       require("postcss-px2rem")({ remUnit: 96 }),
    //     ],
    //   },
    // },
  },

  pluginOptions: {
    // lintStyleOnBuild: true,
    // stylelint: {
    //   fix: true,
    //   configBasedir: __dirname,
    //   files: ["src/**/*.{vue,css,scss}"],
    // },
  },
};

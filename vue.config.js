const { defineConfig } = require("@vue/cli-service");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },

    // webpackBundleAnalyzer: {
    //     openAnalyzer: false,
    // },
    // chainWebpack: (config) => {
    //     config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin)
    // },
  },
});

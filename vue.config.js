const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: '3000'
  },
  publicPath: '/Webtech_Frontend/',

  transpileDependencies: true
})

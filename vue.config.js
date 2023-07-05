const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: '3000'
  },
  publicPath: '/webtech_frontend/',

  transpileDependencies: true
})

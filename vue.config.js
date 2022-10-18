module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/wjelaboratory/'
    : '/',
  productionSourceMap: false,
}

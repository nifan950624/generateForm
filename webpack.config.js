const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    filename: 'form-generator.js',
    library: 'FormGenerator',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new UglifyPlugin({
      sourceMap: true,
      uglifyOptions: {
        warnings: false,
        drop_debugger: false,
        drop_console: false
      }
    })
  ]
}

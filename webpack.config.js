const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// TODO once https://github.com/mastilver/dynamic-cdn-webpack-plugin/pull/71 is merged, switch to main package
const DynamicCdnPlugin = require('@effortlessmotion/dynamic-cdn-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    app: './src/index.tsx'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html')
    }),
    ...isProduction ? [new DynamicCdnPlugin()] : []
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
}

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// TODO once https://github.com/mastilver/dynamic-cdn-webpack-plugin/pull/71 is merged, switch to main package
const DynamicCdnPlugin = require('@effortlessmotion/dynamic-cdn-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const styleLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      auto: true,
      namedExport: true
    }
  }
}

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
    ...isProduction
      ? [new DynamicCdnPlugin(), new MiniCssExtractPlugin()]
      : [new BundleAnalyzerPlugin({ openAnalyzer: false })]
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
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react', '@babel/typescript'],
            plugins: [
              ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }]
            ]
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [styleLoader, cssLoader]
      },
      {
        test: /\.module\.s[ac]ss$/i,
        use: [styleLoader, cssLoader, 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin()
    ]
  }
}

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// TODO once https://github.com/mastilver/dynamic-cdn-webpack-plugin/pull/71 is merged, switch to main package
// TODO make dynamic cdn plugin work with dependencies
// const DynamicCdnPlugin = require('@effortlessmotion/dynamic-cdn-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { ProvidePlugin, BannerPlugin } = require('webpack')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const { appName } = require('./src/config.json')
const { description, version } = require('./package.json')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { readdirSync } = require('fs')

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

const subRoute = process.env.GITHUB_REPOSITORY !== undefined
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
  : '/'
module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    app: './src/index.tsx',
    serviceWorker: './src/serviceWorker.ts'
  },
  devtool: 'source-map',
  devServer: {
    hot: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      chunks: ['app'],
      meta: {}
    }),
    new ProvidePlugin({
      process: 'process/browser'
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, './public/logo.svg'),
      favicons: {
        appName,
        appDescription: description,
        // For GitHub Pages deploy
        start_url: subRoute,
        version,
        scope: subRoute
      },
      devMode: 'light'
    }),
    // So the service worker will be different based on file changes
    new BannerPlugin({
      banner: '/*@preserve [fullhash]*/',
      entryOnly: true,
      include: 'serviceWorker',
      raw: true
    }),
    // TODO: Only use necessary stats
    new StatsWriterPlugin({
      stats: 'chunkGroup',
      transform: ({ namedChunkGroups }) => {
        const games = new Set(readdirSync(path.join(__dirname, './src/games')))
        const getName = ({ name }) => name
        const getAssets = ({ assets }) => assets.map(getName)
        return JSON.stringify({
          app: getAssets(namedChunkGroups.app),
          games: Object.fromEntries(Object.entries(namedChunkGroups)
            .map(([name, v]) => [path.basename(name), v])
            .filter(([name]) => games.has(name)).map(([name, value]) => [name, getAssets(value)]))
        })
      }
    }),
    ...isProduction
      ? [
          /* new DynamicCdnPlugin(),  */
          new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })
        ]
      : [new BundleAnalyzerPlugin({ openAnalyzer: false })]
  ],
  output: {
    filename: ({ runtime }) =>
      runtime !== 'serviceWorker' ? '[name].[contenthash].js' : '[name].js',
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
              ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
              'react-require'
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
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      path: require.resolve('path-browserify'),
      assert: require.resolve('assert-browserify')
    }
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: /@preserve/i
          }
        },
        extractComments: /^\**!|@license|@cc_on/i
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commonChunks: {
          filename: '[name].[contenthash].js'
        }
      }
    }
  }
}

import { join, basename, resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import { ProvidePlugin, BannerPlugin, Configuration } from 'webpack'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import { appName } from './src/config.json'
import { version } from './package.json'
import { StatsWriterPlugin } from 'webpack-stats-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import { readdirSync } from 'fs'
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import 'webpack-dev-server'

const isProduction = process.env.NODE_ENV === 'production'
const isDevServer = process.env.WEBPACK_SERVE === 'true'

const subRoute = process.env.GITHUB_REPOSITORY !== undefined
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
  : '/'

const config: Configuration = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    app: './src/main.tsx',
    serviceWorker: './src/serviceWorker.ts'
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    client: {
      progress: true
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, './src/index.html'),
      chunks: ['app'],
      meta: {}
    }),
    new ProvidePlugin({
      process: 'process/browser'
    }),
    new FaviconsWebpackPlugin({
      logo: join(__dirname, './public/logo.svg'),
      favicons: {
        appName,
        // For GitHub Pages deploy
        start_url: subRoute,
        version,
        scope: subRoute
      },
      devMode: 'light',
      mode: isDevServer ? 'light' : 'webapp'
    }),
    // So the service worker will be different based on file changes
    new BannerPlugin({
      banner: '/*@preserve [fullhash]*/',
      entryOnly: true,
      include: 'serviceWorker',
      raw: true
    }),
    new StatsWriterPlugin({
      stats: 'chunkGroup',
      transform: ({ namedChunkGroups }) => {
        const games = new Set(readdirSync(join(__dirname, './src/games')))
        const getName = ({ name }): string => name
        const getAssets = ({ assets }): string[] => assets.map(getName)
        return JSON.stringify({
          app: getAssets(namedChunkGroups.app),
          games: Object.fromEntries(Object.entries<any>(namedChunkGroups)
            .map(([name, v]) => [basename(name), v])
            .filter(([name]) => games.has(name)).map(([name, value]) => [name, getAssets(value)]))
        })
      }
    }) as any,
    ...isProduction
      ? [
          /* new DynamicCdnPlugin(),  */
          new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })
        ]
      : [],
    ...isDevServer
      ? [
          new BundleAnalyzerPlugin({ openAnalyzer: false }),
          new ReactRefreshPlugin()
        ]
      : []
  ],
  output: {
    filename: ({ runtime }) =>
      runtime !== 'serviceWorker' ? '[name].[contenthash].js' : '[name].js',
    path: resolve(__dirname, 'dist'),
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
              'react-require',
              ...isDevServer ? ['react-refresh/babel'] : []
            ]
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      path: require.resolve('path-browserify'),
      assert: require.resolve('assert-browserify')
    },
    modules: ['node_modules']
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
  },
  ignoreWarnings: [
    /not found/
  ]
}

export default config

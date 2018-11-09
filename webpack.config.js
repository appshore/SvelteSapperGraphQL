const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('sapper/config/webpack.js')

const pkg = require('./package.json')

const mode = process.env.NODE_ENV
const dev = mode === 'development'

module.exports = {
  client: {
    entry: config.client.entry(),
    output: Object.assign(config.client.output(), {
      filename: '[hash]/[name].js',
      chunkFilename: '[hash]/[id].js'
    }),
    resolve: {
      extensions: ['.js', '.json', '.html'],
      mainFields: ['svelte', 'module', 'browser', 'main']
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: {
            loader: 'svelte-loader',
            options: {
              dev,
              emitCss: true,
              hydratable: true,
              hotReload: true
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader'
          ]
        }
      ]
    },
    mode,
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[hash]/[name].css',
        chunkFilename: '[hash]/[id].css'
      }),
      dev && new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode)
      })
    ].filter(Boolean),
    devtool: dev && 'inline-source-map'
  },

  server: {
    entry: config.server.entry(),
    output: config.server.output(),
    target: 'node',
    resolve: {
      extensions: ['.js', '.json', '.html'],
      mainFields: ['svelte', 'module', 'browser', 'main']
    },
    externals: Object.keys(pkg.dependencies).concat('encoding'),
    module: {
      rules: [
        {
          test: /\.html$/,
          use: {
            loader: 'svelte-loader',
            options: {
              css: false,
              generate: 'ssr',
              hydratable: true,
              dev
            }
          }
        }
      ]
    },
    mode: process.env.NODE_ENV,
    performance: {
      hints: false // it doesn't matter if server.js is large
    }
  },

  serviceworker: {
    entry: config.serviceworker.entry(),
    output: config.serviceworker.output(),
    mode: process.env.NODE_ENV
  }
}

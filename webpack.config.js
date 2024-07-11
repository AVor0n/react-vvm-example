const path = require('path');
const portfinder = require('portfinder');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = async (env, argv) => {
  const isProd = argv?.mode === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'source-map' : 'inline-source-map',
    entry: {
      main: './src/main.tsx',
    },
    output: {
      publicPath: '/',
      path: path.join(__dirname, 'build'),
      filename: '[name].js',
      chunkFilename: `./resources/chunks/${isProd ? '[contenthash]' : '[id]'}.chunk.js`,
      clean: true,
    },
    target: isProd ? 'browserslist' : 'web',
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.app.json',
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: isProd ? '[hash:base64]' : '[name]__[local]--[hash:base64:5]',
                  namedExport: true,
                  auto: true,
                },
              },
            },
            { loader: 'sass-loader', options: { sourceMap: !isProd } },
          ],
        },
      ],
    },
    resolve: {
      plugins: [
        new TsconfigPathsPlugin({
          configFile: 'tsconfig.app.json',
        }),
      ],
      extensions: ['.tsx', '.ts', '.js'],
    },
    performance: { hints: false },
    infrastructureLogging: { level: 'error' },
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          parallel: true,
          extractComments: false,
          terserOptions: {
            output: { comments: false },
          },
        }),
      ],
    },
    node: { global: true },
    plugins: [
      new HtmlWebpackPlugin({
        hash: true,
        scriptLoading: 'blocking',
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: `resources/[name]${!isProd ? '' : '.[hash]'}.css`,
        chunkFilename: `resources/chunks/[id]${!isProd ? '' : '.[hash]'}.css`,
      }),
    ],
    watchOptions: {
      ignored: /node_modules/,
    },
    devServer: {
      port: await portfinder.getPortPromise({
        port: env?.port || 3000,
      }),
      open: true,
      historyApiFallback: true,
    },
  };
};

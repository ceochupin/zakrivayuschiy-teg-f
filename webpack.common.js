const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    filename: 'scripts/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/zakrivayuschiy-teg-f/',
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: { plugins: [autoprefixer()] },
            },
          },
          'sass-loader',
        ],
      },
      { test: /\.html$/i, use: 'html-loader' },
      {
        test: /\.(png|jpe?g|gif|aif)$/i,
        type: 'asset/resource',
        generator: { filename: 'images/[name].[hash][ext]' },
        include: [path.resolve(__dirname, 'src/images')],
      },
      {
        test: /\.(svg|ico)$/i,
        oneOf: [
          {
            test: /favicon\.(svg|ico)$/i,
            type: 'asset/resource',
            generator: { filename: '[name][ext]' },
          },
          {
            type: 'asset/resource',
            generator: { filename: 'svg/[name].[hash][ext]' },
            include: [path.resolve(__dirname, 'src/svg')],
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: { filename: 'fonts/[name].[hash][ext]' },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: 'styles/[id].[contenthash].css',
    }),
  ],
  resolve: {
    fallback: { util: require.resolve("util/") },
  },
};
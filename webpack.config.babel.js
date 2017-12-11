import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default {
  entry: {
    popup: './ext/popup.js',
    inject: './ext/inject.js',
    client: './website/client.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, './ext'),
          path.resolve(__dirname, './website'),
        ],
        use: 'babel-loader',
      },
    ],
  },

  plugins: [
    // create popup.html from template and inject styles and script bundles
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['popup'],
      filename: 'popup.html',
      template: './ext/popup.html',
    }),
    // copy extension manifest and icons
    new CopyWebpackPlugin([{ from: './ext/manifest.json' }]),
    new CopyWebpackPlugin([{ from: './ext/icon.png' }]),
  ],
}

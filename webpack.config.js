const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/server/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'mezhdunami.app/backend'),
  },
  plugins: [
    new webpack.DefinePlugin({
      SMS_API_KEY: process.env.SMS_API_KEY,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      TELEGRAM_BOT_KEY: process.env.TELEGRAM_BOT_KEY,
      MONGO_URI: process.env.MONGO_URI,
      MONGO_DB_NAME: process.env.MONGO_DB_NAME,
      TOKENS: [
        process.env.T1,
        process.env.T2,
      ],
    }),
  ],
};
